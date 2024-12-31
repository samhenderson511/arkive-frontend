"use client";
import { cn, handleWithoutCategory, toTitleCase } from "@/lib/util";
import { PricedVariant } from "@medusajs/client-types";
import Link from "next/link";
import { PreviewProps } from ".";
import { Thumbnail } from "../thumbnail";
import { VariantWithImages } from "./ColourButtons";
import { ColourThumbnails } from "./ColourThumbnails";
import { ProductDetails } from "./ProductDetails";
import { ProductPrice } from "./ProductPrice";
import { SizeOptions } from "./SizeOptions";

interface Props extends PreviewProps {
  colourOptions: string[];
  sizeOptions: string[];
  variants: VariantWithImages[];
  cheapestVariant: PricedVariant;
}

export const ProductPreviewContent = ({
  cheapestVariant,
  colourOptions,
  handle,
  className,
  variants,
  metadata,
  sizeOptions,
  id,
  thumbnail,
  region,
  blurDataURL,
  truncate,
  title,
  orientation,
  ...rest
}: Props) => {
  return (
    <Link
      className={cn(
        "relative flex h-min gap-1 p-1.5 sm:p-3 transition ease-out border border-transparent rounded hover:border-border",
        orientation === "vertical" ? "flex-col pb-6" : "flex-row gap-3",
        className
      )}
      href={handleWithoutCategory(handle)}
      title={toTitleCase(`${metadata.brand} ${title}`)}
      {...rest}
    >
      {orientation === "vertical" ?
        <ColourThumbnails colourOptions={colourOptions} variants={variants} thumbnail={thumbnail} />
      : <div className={"w-20 shrink-0 border border-border h-min rounded-sm overflow-hidden"}>
          <Thumbnail
            blurDataURL={blurDataURL}
            thumbnail={thumbnail}
            alt={toTitleCase(`${metadata.brand} ${title}`)}
            size="small"
          />
        </div>
      }
      <div className={"flex flex-col w-full @container"}>
        <ProductDetails truncate={truncate} metadata={metadata} title={title} />
        <div className="flex items-center justify-between gap-2">
          <ProductPrice region={region} variant={cheapestVariant} />
          <SizeOptions sizeOptions={sizeOptions} />
        </div>
      </div>
    </Link>
  );
};
