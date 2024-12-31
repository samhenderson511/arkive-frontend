"use server";

import { medusaClient } from "@/lib/config";
import type { Region } from "@medusajs/client-types";
import { unstable_cache } from "next/cache";

export async function getPricedProductVariants(
  ids: string[],
  region: Region,
  disabledValues: string[]
) {
  const variantCache = unstable_cache(
    async (ids: string[], region: Region, disabledValues: string[]) => {
      const variant = await medusaClient.products.variants.list({
        id: ids,
        region_id: region.id,
        fields: "metadata,prices,inventory_quantity,thumbnail,sku,product_id,title,images",
        expand: "prices,options,images",
      });

      return variant?.variants.filter(
        (v: any) =>
          (Boolean(v?.inventory_quantity) || Boolean(v?.thumbnail)) &&
          !disabledValues.includes(v.metadata?.size) &&
          !disabledValues.includes(v.metadata?.colour)
      );
    },
    ["getPricedProductVariants"],
    { revalidate: false, tags: [region.id, ...ids] }
  );

  return variantCache(ids, region, disabledValues);
}
