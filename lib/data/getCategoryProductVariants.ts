"use server";

import { medusaClient } from "@/lib/config";
import type { Region } from "@medusajs/client-types";
import { unstable_cache } from "next/cache";

export default async function getCategoryProductVariants({
  ids,
  region,
  fields,
  expand,
}: {
  ids: string[];
  region: Region;
  fields?: string;
  expand?: string;
}) {
  const variantCache = unstable_cache(
    async (ids: string[], region: Region, fields, expand) => {
      const variant = await medusaClient.products.variants.list({
        id: ids,
        region_id: region.id,
        fields: fields || "id,title,metadata,thumbnail,product_id,inventory_quantity",
        expand: expand || "prices",
      });

      const filteredData = variant?.variants?.map((v) => {
        const data = {
          ...v,
          prices: null,
          tax_rates: null,
          created_at: null,
          original_price_incl_tax: null,
          original_tax: null,
          calculated_tax: null,
          calculated_price_incl_tax: null,
        };
        Object.keys(data).forEach((key) => data[key] === null && delete data[key]);
        return data;
      });

      if (fields && !fields.includes("inventory_quantity")) {
        return filteredData;
      }

      return filteredData?.filter(
        (v: any) => Boolean(v?.inventory_quantity) || Boolean(v?.thumbnail)
      );
    },
    ["getCategoryProductVariants"],
    { revalidate: false, tags: [region.id, ...ids] }
  );

  return variantCache(ids, region, fields, expand);
}
