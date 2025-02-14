"use client";

import clsx from "clsx";
import Image from "next/image";
import { ComponentProps, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import {
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselRoot,
  useDotButton,
} from "../ui/carousel";

import "photoswipe/dist/photoswipe.css";

export function ProductImages({ images }: { images: ComponentProps<typeof Image>[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const { selectedIndex, onDotButtonClick } = useDotButton(api);

  return (
    <CarouselRoot className="flex flex-col gap-2" setApi={setApi}>
      <CarouselContent>
        <Gallery>
          {images.map((img, index) => {
            return (
              <CarouselItem key={`${img.src}-${index}`}>
                <Item
                  original={img.src as string}
                  thumbnail={img.src as string}
                  width={1200}
                  height={1200}
                >
                  {({ ref, open }) => (
                    <div
                      ref={ref}
                      onClick={open}
                      className="relative rounded-lg bg-background overflow-hidden aspect-square"
                    >
                      <Image
                        {...img}
                        className="object-cover"
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                      />
                    </div>
                  )}
                </Item>
              </CarouselItem>
            );
          })}
        </Gallery>
      </CarouselContent>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={clsx(
                "aspect-square rounded-lg transition hover:border-border border border-transparent relative overflow-hidden",
                {
                  "opacity-50": selectedIndex !== index,
                }
              )}
            >
              <Image {...img} className="object-cover" fill sizes="128px" />
            </button>
          ))}
        </div>
      )}
    </CarouselRoot>
  );
}
