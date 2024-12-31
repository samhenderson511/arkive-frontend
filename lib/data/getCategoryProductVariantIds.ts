"use server"

import { initialize as initializeProductModule } from "@medusajs/product"
import { unstable_cache } from "next/cache"

export async function getCategoryProductVariantIds(
  products: string[],
  requireThumbnail: boolean
) {
  const variantIdsCache = unstable_cache(
    async (products, requireThumbnail) => {
      const productService = await initializeProductModule()

      const variantIds = await productService
        .listVariants(
          {
            product_id: products,
            ...(requireThumbnail
              ? {
                  $or: [
                    { inventory_quantity: { $gt: 0 } } as any,
                    { metadata: { hasThumbnail: true } },
                  ],
                }
              : { inventory_quantity: { $gt: 0 } }),
          },
          { select: ["id"], take: 100000 }
        )
        .then((data) => data.map((v) => v.id))

      return variantIds
    },
    ["getCategoryProductVariantIds"],
    {
      revalidate: false,
      tags: products,
    }
  )

  return variantIdsCache(products, requireThumbnail)
}
