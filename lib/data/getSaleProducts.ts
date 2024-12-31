"use server";

import { medusaFetch } from "@/lib/api";
import type { PriceList, Product, Region } from "@medusajs/client-types";
import { unstable_cache } from "next/cache";
import { getCategoryProducts } from "./getCategoryProducts";

export async function getSaleProducts(categoryHandle: string, region: Region) {
  const getSaleProductsCache = unstable_cache(
    async (categoryHandle: string, region) => {
      const priceLists: { price_lists: PriceList[] } = await medusaFetch({
        endpoint: "price-lists",
        api: "admin",
      });
      const salePrices = priceLists?.price_lists.filter((list) => list.status === "active");
      if (!salePrices?.length) {
        return [];
      }
      const saleProductIds: { products: Product[] }[] = await Promise.all(
        salePrices.map((list) => {
          return medusaFetch({
            endpoint: `price-lists/${list.id}/products?expand=&fields=`,
            api: "admin",
          });
        })
      );

      const allSaleProducts = getCategoryProducts({
        categoryHandle,
        ids: saleProductIds.flatMap((list) => list.products.map((p) => p.id)),
        region: region,
      });
      return allSaleProducts;
    },
    ["getSaleProducts"],
    { revalidate: false, tags: [categoryHandle, region.id] }
  );

  return getSaleProductsCache(categoryHandle, region);
}
