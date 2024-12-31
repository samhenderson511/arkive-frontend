"use client";

import { useVariantImages } from "@/lib/hooks";
import type { Image as MedusaImage } from "@medusajs/client-types";
import { PricedVariant } from "@medusajs/client-types";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Thumbnail, ThumbnailPlaceholder } from "../thumbnail";

type ImageGalleryProps = {
  images: (MedusaImage & { blurDataURL: string; alt: string })[];
  variants: PricedVariant[];
};

const ImageGallery = ({ images: initialImages, variants }: ImageGalleryProps) => {
  const { currentImage, currentImages, setCurrentImage } = useVariantImages(
    variants,
    initialImages
  );

  return (
    <div className="relative flex items-start h-full gap-3 grow">
      <div className="flex flex-col gap-y-3 max-h-lvh overflow-y-auto">
        {currentImages?.length ?
          currentImages.map((image, index) => (
            <button
              key={`thumbnail ${index} ${image.url} ${image.id}`}
              className="relative overflow-hidden border rounded shrink-0 size-24 border-border"
              onClick={() => setCurrentImage(image)}
            >
              <span className="sr-only">Go to image {index + 1}</span>
              <Thumbnail thumbnail={image.url} size="small" alt={image.alt || ""} />
            </button>
          ))
        : <ThumbnailPlaceholder className={"size-24"} size={"small"} />}
      </div>
      <div className="sticky flex flex-col flex-1 top-20 grow gap-y-4">
        <Gallery>
          {currentImages?.length ?
            currentImages.map((image, index) => (
              <Item
                original={image.url}
                key={`image ${index} ${image.url} ${image.id}`}
                width={1200}
                height={1200}
                alt={image.alt || ""}
              >
                {({ ref, open }) => (
                  <Thumbnail
                    ref={ref}
                    thumbnail={image.url}
                    size="full"
                    className={currentImage.url !== image.url ? "hidden" : "cursor-zoom-in"}
                    onClick={open}
                    alt={image.alt || ""}
                  />
                )}
              </Item>
            ))
          : <ThumbnailPlaceholder size={"full"} />}
        </Gallery>
      </div>
    </div>
  );
};

export { ImageGallery };
