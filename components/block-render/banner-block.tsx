import { transformAsset } from "@/lib/util/transform-asset";
import { UiBanner } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Text } from "../ui/text";

export async function BannerBlock({
  title,
  background,
  description,
  href,
  className,
}: UiBanner & { className?: string }) {
  const imageData = await transformAsset(background);
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      {...((href ? { href } : {}) as any)}
      className={clsx("h-[150vw] flex sm:h-[56vw] w-full relative", className)}
    >
      <div
        className={clsx(
          "absolute inset-0 z-10 flex justify-center p-4 lg:p-8 py-16 lg:py-24 text-white lg:py-24",
          title ? "bg-black/60" : "bg-gradient-to-t from-black/50 via-transparent to-transparent"
        )}
      >
        <div className={"flex h-full w-full flex-col items-start justify-end max-w-screen-2xl"}>
          <Text element="h1" className="lg:text-6xl">
            {title}
          </Text>
          {description && <Text element="p">{description}</Text>}
        </div>
      </div>
      {imageData && <Image {...imageData} fill sizes="100vw" />}
    </Wrapper>
  );
}
