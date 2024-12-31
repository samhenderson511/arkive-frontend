"use server"

import { ProductStatus } from "@medusajs/types"
import { initialize as initializeProductModule } from "@medusajs/product"
import { unstable_cache } from "next/cache"

export async function getCategoryProductHandles(categoryHandle: string) {
  const getCategoryProductHandlesCache = unstable_cache(
    async (categoryHandle: string) => {
      const productService = await initializeProductModule()

      const products = await productService.list(
        {
          categories: {
            handle: { $like: `%${categoryHandle}%` },
          } as any,
          ...{ status: ProductStatus.PUBLISHED },
        },
        {
          select: ["id", "handle"],
          take: 1000,
        }
      )
      return products
    },
    ["getCategoryProducts"],
    { revalidate: false, tags: [categoryHandle] }
  )

  return getCategoryProductHandlesCache(categoryHandle)
}
