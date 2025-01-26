"use client";

import { Button, textStyles } from "@/components";
import { cn } from "@/lib";
import clsx from "clsx";
import Image from "next/image";
import { ComponentProps, useCallback, useState } from "react";
import slugify from "slugify";

type ClientCategory = {
  background: ComponentProps<typeof Image>;
  name: string;
};

interface Props {
  categories: ClientCategory[];
  className?: string;
}

export const CategoriesClient = ({ categories, className }: Props) => {
  const [currentImage, setCurrentImage] = useState(categories?.[0]?.background);

  // Use useCallback to memoize the animation end handler
  const handleAnimationEnd = useCallback(() => {
    setPreviousImage(currentImage);
  }, [currentImage]);

  // Track the previous image to create transition effects between images
  const [previousImage, setPreviousImage] = useState<ComponentProps<typeof Image> | null>(null);

  const ImageLayer = ({
    image,
    className,
    onAnimationEnd,
  }: {
    image: ComponentProps<typeof Image>;
    className: string;
    onAnimationEnd?: () => void;
  }) => (
    <Image
      fill
      {...image}
      sizes={"100vw"}
      className={cn("object-cover relative", className)}
      onAnimationEnd={onAnimationEnd}
    />
  );

  return (
    <div
      className={clsx(
        "bg-muted w-full overflow-hidden relative flex h-[200vw] md:h-[75vw] lg:h-[50vw] justify-center items-center dark",
        className
      )}
    >
      <div className="absolute z-20 flex justify-center w-full h-full p-4 md:p-8 xl:p-16 backdrop-blur-2xl bg-black/50 text-white">
        <div className="w-full grid gap-8 grid-cols-1 content-evenly md:content-normal md:grid-cols-2 max-w-screen-2xl">
          <div className="flex flex-col items-center justify-center h-full my-auto overflow-hidden md:my-0 gap-12">
            {categories?.map((cat) => {
              const slug = `/${slugify(cat.name, { lower: true })}`;

              return (
                <Button
                  variant="link"
                  key={slug}
                  href={`/${slug}`}
                  onMouseEnter={() => {
                    setCurrentImage(cat.background);
                  }}
                  className={cn(textStyles.h1, "hover:no-underline opacity-75 hover:opacity-100")}
                >
                  {cat.name}
                </Button>
              );
            })}
          </div>

          <div className="flex items-center relative justify-center bg-muted overflow-hidden rounded-lg h-[100vw] md:h-auto">
            {currentImage && currentImage?.src !== previousImage?.src && (
              <ImageLayer
                image={currentImage}
                className="z-10 animate-fade-in"
                onAnimationEnd={handleAnimationEnd}
              />
            )}

            {/* Previous Image Layer */}
            {currentImage && previousImage?.src && (
              <ImageLayer image={previousImage} className="z-[5]" />
            )}
          </div>
        </div>
      </div>

      {currentImage && currentImage?.src !== previousImage?.src && (
        <ImageLayer
          image={currentImage}
          className="z-10 animate-fade-in"
          onAnimationEnd={handleAnimationEnd}
        />
      )}

      {/* Previous Image Layer */}
      {currentImage && previousImage?.src && <ImageLayer image={previousImage} className="z-[5]" />}
    </div>
  );
};
