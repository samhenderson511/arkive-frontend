import { Text } from "@/components";
import { transformAsset } from "@/lib/util/blurhash";
import { RepeatableGridTile } from "@/types";
import Image from "next/image";
import Link from "next/link";

export async function Tile({ background, title, url }: RepeatableGridTile) {
  const Wrapper = url ? Link : "div";
  const imageData = await transformAsset(background);

  return (
    <Wrapper
      {...((url ? { href: url } : {}) as any)}
      className="relative flex gap-8 p-6 items-end rounded-sm overflow-hidden group"
    >
      <Text element="h3" className="z-30 text-white">
        {title}
      </Text>

      <div className="absolute inset-0 z-20 bg-gradient-to-t dark from-black/50 to-transparent" />
      <div className="flex absolute items-center justify-center dark inset-0 bg-muted heading-muted-foreground group-hover:scale-110 transition ease-out">
        {background && <Image {...imageData} fill sizes="(min-width: 640px) 50vw, 100vw" />}
      </div>
    </Wrapper>
  );
}
