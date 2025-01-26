"use client";

import { Logo } from "@/components";
import { wrap } from "@motionone/utils";
import clsx from "clsx";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { toLower } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, useRef } from "react";
import slugify from "slugify";

type ClientBrand = {
  name: string;
  logo: ComponentProps<typeof Image>;
};

interface Props {
  brands: ClientBrand[];
  scrollSpeed: number;
  className?: string;
}

export function BrandsClient({ brands, scrollSpeed, className }: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * (scrollSpeed || 3) * (delta / 1000);
    directionFactor.current = velocityFactor.get() < 0 ? -0.75 : 0.75;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={clsx("w-full overflow-hidden", className)}>
      <div className="parallax">
        <motion.div className="flex gap-16 w-max scroller" style={{ x }}>
          {Array(4).fill(
            brands.map((brand) => (
              <div key={brand.name} className="flex gap-16 flex-nowrap">
                <Link
                  title={brand.name}
                  href={toLower(`/brands/${slugify(brand.name, { lower: true })}`)}
                >
                  <Logo className={"brightness-50"} logo={brand.logo} />
                </Link>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
