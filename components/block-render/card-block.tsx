import { transformAsset } from "@/lib/util/blurhash";
import { UiCard } from "@/types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import { Carousel } from "../ui/carousel";
import { ButtonBlock } from "./button-block";

export function CardBlock({ content, images, buttons }: UiCard) {
  return (
    <section className="flex @container w-full max-w-screen-2xl">
      <div className="grid grid-cols-1 w-full px-4 @4xl:px-8 gap-4 @4xl:gap-8 @4xl:grid-cols-2 @4xl:items-center">
        <div className="order-2 w-full">
          <Carousel
            items={images.map(async (image) => {
              const imageData = await transformAsset(image);

              if (imageData) {
                return (
                  <div
                    key={String(imageData.src)}
                    className="relative overflow-hidden aspect-square rounded min-h-[40%] h-full w-full flex"
                  >
                    <Image {...imageData} fill sizes={"(min-width: 640px) 50vw, 100vw"} />
                  </div>
                );
              }
            })}
          />
        </div>

        <div className="@xl:py-8 @3xl:py-12 flex flex-col gap-4 @4xl:order-1 order-3">
          <BlocksRenderer content={content} />
          {buttons && buttons.map((button) => <ButtonBlock key={button.children} {...button} />)}
        </div>
      </div>
    </section>
  );
}
