"use server"

import "server-only"

import type { Region } from "@medusajs/client-types"
import { initialize as initializeProductModule } from "@medusajs/product"
import { ProductStatus } from "@medusajs/types"
import { unstable_cache } from "next/cache"

export async function getCategoryProductData({
  categoryHandle,
  region,
  limit,
  tags = [],
  query,
  ids,
  select,
  skip,
  relations,
}: {
  categoryHandle: string
  region: Region
  ids?: string[]
  limit?: number
  tags?: string[]
  query?: string
  skip?: number
  select?: string[]
  relations?: string[]
}) {
  const cacheFn = unstable_cache(
    async (
      categoryHandle: string,
      ids?: string[],
      limit?: number,
      tags?: string[],
      query?: string,
      skip?: number,
      select?: string[],
      relations?: string[]
    ) => {
      const productService = await initializeProductModule()

      return productService.list(
        {
          ...(Boolean(ids?.length) ? { id: ids as any } : {}),
          categories: {
            handle: { $like: `%${categoryHandle}%` },
          } as any,
          ...{
            variants: {
              inventory_quantity: { $gt: 0 },
            },
          },
          q: query || null,
          ...{ status: ProductStatus.PUBLISHED },
          ...(Boolean(tags.length) ? { tags: { value: tags } } : {}),
        },
        {
          select: select || [
            "id",
            "title",
            "handle",
            "metadata",
            "thumbnail",
            "status",
          ],
          order: { created_at: "DESC" },
          skip: skip || 0,
          relations: relations || ["images"],
          take: limit || 20,
        }
      )
    },
    ["getCategoryProducts"],
    { revalidate: false, tags: [categoryHandle, region.id] }
  )

  return cacheFn(
    categoryHandle,
    ids,
    limit,
    tags,
    query,
    skip,
    select,
    relations
  )
}
