import { transformAsset } from "@/lib/util/blurhash";
import { UiBanner } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Text } from "../ui/text";

export async function BannerBlock({ title, background, description, href }: UiBanner) {
  const imageData = await transformAsset(background);
  const Wrapper = href ? Link : "div";

  return (
    <Wrapper
      {...((href ? { href } : {}) as any)}
      className="h-96 flex md:h-[calc(100svh-7.5rem)] lg:h-[calc(80svh-7.5rem)] w-full relative"
    >
      <div className="absolute inset-0 z-10 flex justify-center p-8 py-24 text-foreground lg:py-32 bg-black/60">
        <div className={"flex h-full w-full flex-col items-start justify-end max-w-8xl"}>
          <Text element="h1">{title}</Text>
          <Text element="p">{description}</Text>
        </div>
      </div>
      {imageData && <Image {...imageData} fill sizes="100vw" />}
    </Wrapper>
  );
}
