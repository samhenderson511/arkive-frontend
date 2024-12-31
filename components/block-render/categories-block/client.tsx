"use client";

import { Button, Text } from "@/components";
import Image from "next/image";
import { ComponentProps, useState } from "react";
import slugify from "slugify";
import { ImageComponent } from "./image-component";

type ClientCategory = {
  background: ComponentProps<typeof Image>;
  name: string;
};

interface Props {
  categories: ClientCategory[];
}

export const CategoriesClient = ({ categories }: Props) => {
  const [currentImage, setCurrentImage] = useState(categories?.[0]?.background);

  return (
    <div className="bg-muted text-muted-foreground w-full overflow-hidden relative flex h-[200vw] md:h-[75vw] lg:h-[50vw] justify-center items-center dark">
      <div className="absolute z-20 flex justify-center w-full h-full p-4 md:p-8 xl:p-16 backdrop-blur-2xl bg-background/25">
        <div className="w-full grid gap-8 grid-cols-1 content-evenly md:content-normal md:grid-cols-2 max-w-8xl">
          <div className="flex flex-col items-center justify-center h-full my-auto overflow-hidden md:my-0 gap-8">
            {categories?.map((cat) => {
              const slug = `/${slugify(cat.name, { lower: true })}`;

              return (
                <Button
                  variant="link"
                  key={slug}
                  href={slug}
                  onMouseEnter={() => {
                    setCurrentImage(cat.background);
                  }}
                >
                  <Text element="h3">{cat.name}</Text>
                </Button>
              );
            })}
          </div>
          <div className="flex items-center relative justify-center bg-muted overflow-hidden rounded h-[100vw] md:h-auto">
            <ImageComponent currentImage={currentImage} />
          </div>
        </div>
      </div>
      <ImageComponent currentImage={currentImage} />
    </div>
  );
};
