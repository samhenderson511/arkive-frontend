"use server";

import { medusaClient } from "@/lib/config";
import { unstable_cache } from "next/cache";

export async function getVariantPrice(variantId, regionId) {
  const variantCache = unstable_cache(
    async (variantId, regionId) => {
      const variant = (
        await medusaClient.products.variants.list({
          region_id: regionId,
          id: variantId,
          fields: "prices",
        })
      ).variants?.[0];

      return variant;
    },
    ["getVariantPrice"],
    { revalidate: false, tags: [variantId, regionId] }
  );

  return variantCache(variantId, regionId);
}
