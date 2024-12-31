import { getHasStock, getOptions } from "@/lib/util/product-option-sorters";
import { sortClothingSizes } from "@/lib/util/sortSizes";
import type { Region } from "@medusajs/client-types";
import Link from "next/link";
import { ComponentProps } from "react";
import { VariantWithImages } from "./ColourButtons";
import { ProductPrice } from "./ProductPrice";
import { ProductPreviewContent } from "./content";

export interface PreviewProps extends Partial<ComponentProps<typeof Link>> {
  id: string;
  title: string;
  variants?: VariantWithImages[];
  handle: string;
  region: Region;
  thumbnail: string;
  blurDataURL?: string;
  metadata: { [key: string]: string };
  orientation?: "horizontal" | "vertical";
  truncate?: boolean;
}

const ProductPreview = ({
  id,
  title,
  handle,
  thumbnail,
  truncate,
  metadata,
  blurDataURL,
  orientation = "vertical",
  variants: productVariants,
  ...rest
}: PreviewProps) => {
  const variants = productVariants;
  const hasStock = getHasStock(variants as any);
  let cheapestVariant = null;
  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if (acc.prices?.[0].amount > curr.prices?.[0].amount) {
        return curr;
      }
      return acc;
    }, variants[0]);
  }

  const colourOptions = getOptions(hasStock, "colour");
  const sizeOptions = sortClothingSizes(getOptions(hasStock, "size"));

  return (
    <ProductPreviewContent
      handle={handle}
      blurDataURL={blurDataURL}
      colourOptions={colourOptions}
      variants={variants}
      metadata={metadata}
      cheapestVariant={cheapestVariant}
      sizeOptions={sizeOptions}
      id={id}
      truncate={truncate}
      title={title}
      thumbnail={thumbnail}
      orientation={orientation}
      {...rest}
    />
  );
};

export { ProductPreview, ProductPrice };
