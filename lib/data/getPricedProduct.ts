"use server";

import "server-only";

import type { PricedProduct, Region } from "@medusajs/client-types";
import { initialize as initializeProductModule } from "@medusajs/product";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { chunkArray } from "../util/chunk-array";
import { getPricedProductVariants } from "./getPricedProductVariants";

export async function getPricedProduct(
  productHandle: string,
  categoryHandle: string,
  region: Region
) {
  const productService = await initializeProductModule();

  const getPricedProductCache = unstable_cache(
    async (productHandle: string) => {
      return productService
        .list(
          { handle: productHandle },
          {
            select: [
              "id",
              "title",
              "handle",
              "status",
              "discountable",
              "metadata",
              "thumbnail",
              "description",
            ],
            relations: ["images"],
          }
        )
        .then((data) => data?.[0]);
    },
    ["getPricedProduct"],
    { revalidate: false, tags: [productHandle, region.id] }
  );

  const productData = await getPricedProductCache(productHandle);

  if (!productData) return notFound();

  const variantIds = await productService
    .listVariants(
      {
        product_id: productData?.id,
        $or: [{ inventory_quantity: { $gt: 0 } }, { metadata: { hasThumbnail: true } }] as any,
      },
      { select: ["id"], take: 100000 }
    )
    .then((data) => data.map((v) => v.id));

  const chunkedVariantIds = chunkArray(variantIds, 100);

  if (!variantIds?.length) return notFound();

  const optionData = await productService.listOptions(
    { product_id: productData.id },
    { select: ["id", "title"] }
  );

  const categoryData = await productService.listCategories(
    { handle: categoryHandle },
    { select: ["id", "name", "handle"] }
  );

  let variants;

  const disabledValues = (productData.metadata?.disabledValues as string[]) || [];

  for (const ids of chunkedVariantIds) {
    const newVariants = await getPricedProductVariants(ids, region, disabledValues);

    if (Boolean(newVariants?.length)) {
      variants = [...(variants || []), ...newVariants];
    }
  }

  const pricedProduct = {
    ...(productData || []),
    variants,
    options: optionData,
    categories: categoryData,
  };

  return pricedProduct as unknown as PricedProduct;
}
