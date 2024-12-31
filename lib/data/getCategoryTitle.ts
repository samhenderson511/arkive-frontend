"use server"

import { initialize as initializeProductModule } from "@medusajs/product"
import { unstable_cache } from "next/cache"

export async function getCategoryTitle(categoryHandle: string) {
  const getCategoryTitleCache = unstable_cache(
    async (categoryHandle: string) => {
      const productService = await initializeProductModule()
      const category = await productService.listCategories(
        { handle: categoryHandle },
        { select: ["name"] }
      )

      return category?.[0]?.name
    },
    ["getCategoryTitle"],
    { revalidate: false, tags: [categoryHandle] }
  )

  return getCategoryTitleCache(categoryHandle)
}
