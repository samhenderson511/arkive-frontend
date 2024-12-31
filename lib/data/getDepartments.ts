"use server"

import {
  ProductCategory,
  initialize as initializeProductModule,
} from "@medusajs/product"
import { unstable_cache } from "next/cache"

export async function getDepartments(categoryHandle: string) {
  const getDepartmentsCache = unstable_cache(
    async (categoryHandle) => {
      const productService = await initializeProductModule()
      const categories = await productService.listCategories(
        { handle: { $like: `%${categoryHandle}%` } as any, is_active: true },
        {
          take: 1000,
          select: ["id", "handle", "name", "parent_category_id"],
        }
      )

      function buildCategoryTree(
        categories: ProductCategory[],
        parentId: string = null
      ): ProductCategory[] {
        return categories
          .filter((c) => c.parent_category_id === parentId)
          .map((category) => {
            const children = buildCategoryTree(categories, category.id).sort(
              (a, b) => a.name.localeCompare(b.name)
            )
            return {
              id: category.id,
              handle: category.handle,
              name: category.name,
              ...(children && { category_children: children }),
            } as any
          })
      }

      const categoryTree = buildCategoryTree(categories as any)

      return (categoryTree[0]?.category_children ||
        []) as unknown as ProductCategory[]
    },
    ["getDepartments"],
    { revalidate: false, tags: [categoryHandle] }
  )

  return getDepartmentsCache(categoryHandle)
}
