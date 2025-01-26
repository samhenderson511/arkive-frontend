"use server";

import { strapiFetch } from "@/lib/api";
import { initialize as initializeProductModule } from "@medusajs/product";
import { unstable_cache } from "next/cache";
import { BannerBrand } from "types/strapi";
import { toTitleCase } from "../util/to-title-case";

export async function getCategoryBrands(categoryHandle: string) {
  const getCategoryBrandsCache = unstable_cache(
    async (categoryHandle: string) => {
      const brands: BannerBrand[] = await strapiFetch({
        endpoint: "banner-brands",
        depth: 4,
        params: { "pagination[pageSize]": "100" },
      });
      const productService = await initializeProductModule();

      let filteredBrands = [];

      for (const brand of brands) {
        const brandTitle = brand.attributes?.BrandBanner?.Title;

        if (brandTitle) {
          const brandProduct = await productService.list(
            {
              ...{
                categories: {
                  ...{ handle: { $like: `%${categoryHandle}%` } },
                },
              },
              ...{ status: "published" },
              tags: {
                value: [brandTitle.toUpperCase(), brandTitle, toTitleCase(brandTitle)],
              },
            } as any,
            {
              select: ["id"],
              take: 1,
            }
          );

          if (brandProduct.length) {
            filteredBrands.push(brand);
          }
        }
      }

      return filteredBrands;
    },
    ["getCategoryBrands"],
    { revalidate: false, tags: [categoryHandle, "banner-brands"] }
  );

  return getCategoryBrandsCache(categoryHandle);
}
