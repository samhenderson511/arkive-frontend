import { Logo, Text } from "@/components";
import { transformAsset } from "@/lib/util/transform-asset";
import { Media, RepeatableGridTile } from "@/types";
import { Link } from "next-view-transitions";
import Image from "next/image";

export async function Tile({
  background,
  title,
  url,
  logo,
}: RepeatableGridTile & { logo?: Media }) {
  const Wrapper = url ? Link : "div";
  const imageData = await transformAsset(background);
  const logoData = {
    src: logo?.url || "",
    alt: logo?.alternativeText || "",
    width: logo?.width || 0,
    height: logo?.height || 0,
  };

  return (
    <Wrapper
      {...((url ? { href: url } : {}) as any)}
      className="relative grow min-w-full z-10 sm:min-w-96 h-[100vw] lg:h-[30vw] flex flex-col gap-3 p-3 lg:p-7 justify-end overflow-hidden group"
    >
      {logo && <Logo className="z-30" logo={logoData} />}

      <Text element="h3" elementStyle="h2" className="border-none z-30 text-white">
        {title}
      </Text>

      <div className="absolute inset-0 bg-gradient-to-t dark from-black/50 to-transparent" />
      <div className="flex absolute -z-10 items-center justify-center dark inset-0 bg-muted heading-muted-foreground group-hover:scale-110 transition ease-out">
        {background && <Image {...imageData} fill sizes="(min-width: 640px) 50vw, 100vw" />}
      </div>
    </Wrapper>
  );
}
