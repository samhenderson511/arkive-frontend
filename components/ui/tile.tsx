import { Text } from "@/components";
import { transformAsset } from "@/lib/util/transform-asset";
import { RepeatableGridTile } from "@/types";
import Image from "next/image";
import Link from "next/link";

export async function Tile({ background, title, url }: RepeatableGridTile) {
  const Wrapper = url ? Link : "div";
  const imageData = await transformAsset(background);

  return (
    <Wrapper
      {...((url ? { href: url } : {}) as any)}
      className="relative grow min-w-full sm:min-w-96 h-[100vw] lg:h-[30vw] flex p-3 lg:p-7 items-end overflow-hidden group"
    >
      <Text element="h3" elementStyle="h2" className="border-none z-30 text-white">
        {title}
      </Text>

      <div className="absolute inset-0 z-20 bg-gradient-to-t dark from-black/50 to-transparent" />
      <div className="flex absolute items-center justify-center dark inset-0 bg-muted heading-muted-foreground group-hover:scale-110 transition ease-out">
        {background && <Image {...imageData} fill sizes="(min-width: 640px) 50vw, 100vw" />}
      </div>
    </Wrapper>
  );
}
