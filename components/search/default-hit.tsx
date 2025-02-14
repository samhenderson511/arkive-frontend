"use client";

import { transformAssetClient, useElementWidth } from "@/lib";
import { GBP } from "@/lib/server";
import { constructSlug } from "@/lib/util/construct-slug";
import { ProductSearchResult } from "@/types";
import { IconPlus } from "@tabler/icons-react";
import clsx from "clsx";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ComponentProps, useEffect, useState } from "react";
import { ColourButton } from "../ui/colour-button";
import { Text } from "../ui/text";
import { TooltipProvider } from "../ui/tooltip";

export function DefaultHit({
  hit,
  truncate = false,
}: {
  hit: ProductSearchResult;
  truncate?: boolean;
}) {
  const [image, setImage] = useState<ComponentProps<typeof Image>>();
  const [images, setImages] = useState<ComponentProps<typeof Image>[]>([]);
  const [width, ref] = useElementWidth<HTMLAnchorElement>();
  const slug = constructSlug(hit.categories?.subDept, hit.name);

  useEffect(() => {
    const transformedImages = hit.images.map((image) => ({
      ...transformAssetClient(image),
      alt: `${hit.brand} ${hit.name} ${image.colours?.join("/")}`,
    }));

    setImages(transformedImages);
    setImage(
      transformedImages.find((image) => !String(image.src).includes("placeholder")) ||
        transformedImages[0]
    );
  }, [hit]);

  const maxButtons = Math.floor(width / (24 + 8)) - 1;

  return (
    <Link
      ref={ref}
      href={`/${slug}`}
      className="flex flex-col overflow-hidden items-start justify-start group gap-2"
      title={`${hit.brand} ${hit.name}`}
    >
      <div className="aspect-square w-full min-h-32 group-hover:border-border border transition border-transparent ease-out rounded-lg overflow-hidden relative">
        {image && (
          <Image
            {...image}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>

      <TooltipProvider>
        <ul className="flex gap-2">
          {hit.images.slice(0, maxButtons).map((image, i) => (
            <ColourButton
              id={hit.name + image.colours?.join("/") + i}
              key={hit.name + image.colours?.join("/")}
              colour={image.colours?.join("/") || ""}
              colourGroups={image.colourGroups}
              onMouseEnter={() =>
                setImage(
                  images.find((img) =>
                    image.url ?
                      String(img.src).includes(image.url)
                    : String(img.src).includes("placeholder")
                  )
                )
              }
            />
          ))}
          {hit.images.length > maxButtons && (
            <div className="size-6 rounded-full border border-border inline-flex items-center justify-center">
              <IconPlus className="size-4" />
            </div>
          )}
        </ul>
      </TooltipProvider>

      <div className="flex flex-col gap-1">
        <Text element="span" className="text-xs leading-none text-muted-foreground">
          {hit.brand}
        </Text>

        <Text
          element="h4"
          elementStyle="span"
          className={clsx(
            "group-hover:underline !text-base capitalize leading-snug",
            truncate && "line-clamp-1"
          )}
        >
          {hit.name.toLowerCase()}
        </Text>

        <div className="flex gap-3 mt-1">
          <Text
            element="span"
            className={clsx(
              {
                "line-through": hit.salePrice !== hit.price,
              },
              "text-muted-foreground leading-none"
            )}
          >
            {GBP.format(hit.price)}
          </Text>

          {hit.salePrice !== hit.price && (
            <Text element="span" className="font-medium text-destructive leading-none">
              {GBP.format(hit.salePrice)}
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
}

export default DefaultHit;
