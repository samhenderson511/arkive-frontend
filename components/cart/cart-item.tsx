"use client";

import { transformAssetClient, useGlobal } from "@/lib";
import { GBP, toTitleCase } from "@/lib/server";
import { constructSlug } from "@/lib/util/construct-slug";
import { constructHierarchy, getVariantPrice } from "@/lib/util/format-product";
import { ApiProductVariant } from "@/types";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export function CartItem({ variant, quantity }: { variant: ApiProductVariant; quantity: number }) {
  const { setOpenCart } = useGlobal();
  const productImages = variant.product.images;

  const variantImage =
    productImages.find((img) => {
      const imageColors = img.colours.map((c) => c.name.toUpperCase().trim());
      const variantColors = variant.colour.map((c) => c.name.toUpperCase().trim());

      return imageColors.some((color) => variantColors.includes(color)) && img.thumbnail?.url;
    }) || productImages.find((img) => img.thumbnail?.url);

  const image = transformAssetClient(variantImage?.thumbnail);

  const rootCategory =
    variant.product.categories.find((c) => !c.parent) || variant.product.categories[0];
  const categories = constructHierarchy(rootCategory, variant.product);
  const slug = constructSlug(categories.subDept, variant.product.name);
  const { salePrice, price } = getVariantPrice(variant);

  return (
    <div className="flex w-full items-start justify-start gap-3 my-1">
      <Link
        onClick={() => setOpenCart(false)}
        href={`/${slug}`}
        className="size-16 shrink-0 hover:border-border border transition border-transparent ease-out rounded-lg overflow-hidden relative"
      >
        <Image {...image} fill className="object-cover" sizes="64px" />
      </Link>

      <div className="flex flex-col grow">
        <Text element="span" className="text-xs leading-none text-muted-foreground">
          {variant.product.brand.name}
        </Text>

        <Link href={`/${slug}`} onClick={() => setOpenCart(false)}>
          <Text element="h5" elementStyle="span" className="hover:underline">
            {toTitleCase(variant.name)}
          </Text>
        </Link>

        <div className="flex gap-3 mt-1">
          <Text
            element="span"
            className={clsx(
              {
                "line-through": salePrice !== price,
              },
              "text-muted-foreground leading-none"
            )}
          >
            {GBP.format(price)}
          </Text>

          {salePrice !== price && (
            <Text element="span" className="font-medium text-destructive leading-none">
              {GBP.format(salePrice)}
            </Text>
          )}
        </div>

        <div className="flex gap-3 items-center justify-between mt-3 border-t border-border">
          <div className="flex gap-4 items-center">
            <Button variant="link" size="sm" className="p-1">
              <IconMinus className="size-4" />
            </Button>
            <Text element="span" className="font-medium text-muted-foreground leading-none">
              {quantity}
            </Text>
            <Button variant="link" size="sm" className="p-1">
              <IconPlus className="size-4" />
            </Button>
          </div>

          <Button variant="link" size="sm" className="text-destructive p-1 gap-2">
            Remove
            <IconTrash className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
