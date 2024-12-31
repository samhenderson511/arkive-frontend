"use client";

import clsx from "clsx";
import Image from "next/image";
import { ComponentProps, useState } from "react";

interface ImageProps {
  currentImage: ComponentProps<typeof Image>;
}

export const ImageComponent = ({ currentImage }: ImageProps) => {
  const [prevImage, setPrevImage] = useState(null);

  return (
    <>
      {currentImage && (
        <>
          <Image
            fill
            {...currentImage}
            sizes={"100vw"}
            className={clsx("object-cover relative z-10 animate-fade-in")}
            onAnimationEnd={() => setPrevImage(currentImage)}
          />

          {prevImage?.url && (
            <Image
              fill
              key={"prev" + prevImage?.url}
              {...prevImage}
              sizes={"100vw"}
              className={clsx("object-cover relative z-[5]")}
            />
          )}
        </>
      )}
    </>
  );
};
