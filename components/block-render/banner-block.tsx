import { transformAsset } from "@/lib/util/transform-asset";
import { Media, UiBanner } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { Text } from "../ui/text";

export interface BannerBlockProps extends UiBanner {
  className?: string;
  logo?: Media;
  height?: "small" | "large";
}

export async function BannerBlock({
  title,
  background,
  description,
  href,
  className,
  logo,
  height = "small",
}: BannerBlockProps) {
  const imageData = await transformAsset(background);
  const logoData = {
    src: logo?.url || "",
    alt: logo?.alternativeText || "",
    width: logo?.width || 0,
    height: logo?.height || 0,
  };
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      {...((href ? { href } : {}) as any)}
      className={clsx(
        "w-full relative flex justify-center",
        height === "small" ? "min-h-72 sm:min-h-80" : "min-h-[150vw] sm:min-h-[56vw]",
        className
      )}
    >
      <div
        className={clsx(
          "z-10 relative flex text-white p-4 lg:p-8 justify-center w-full",
          height !== "small" && "py-16 lg:py-24",
          title ? "bg-black/60" : "bg-gradient-to-t from-black/50 via-transparent to-transparent"
        )}
      >
        <div className="max-w-screen-2xl flex flex-col items-start justify-end w-full">
          {logo && <Logo logo={logoData} />}

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
