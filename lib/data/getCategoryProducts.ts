"use server"

import type { Product, Region } from "@medusajs/client-types"
import { chunkArray } from "../util/chunkArray"
import getCategoryProductVariants from "./getCategoryProductVariants"
import { getCategoryProductVariantIds } from "./getCategoryProductVariantIds"
import { getCategoryProductData } from "./getCategoryProductData"

export async function getCategoryProducts({
  categoryHandle,
  region,
  ids,
  limit,
  tags,
  query,
  productOptions,
  variantOptions,
  skip,
  requireThumbnail = true,
}: {
  categoryHandle: string
  region: Region
  ids?: string[]
  skip?: number
  limit?: number
  tags?: string[]
  query?: string
  productOptions?: { select?: string[]; relations?: string[] }
  variantOptions?: { fields?: string; expand?: string }
  requireThumbnail?: boolean
}) {
  const productData = await getCategoryProductData({
    categoryHandle,
    region,
    limit,
    tags,
    ids,
    skip,
    query,
    select: productOptions?.select,
    relations: productOptions?.relations,
  })

  const chunkedProductData = chunkArray(
    productData.map((p) => p?.id),
    50
  )

  let variantIds = []

  for (const productIds of chunkedProductData) {
    const newVariantIds = await getCategoryProductVariantIds(
      productIds,
      requireThumbnail
    )
    variantIds = [...variantIds, ...newVariantIds]
  }

  const chunkedVariantIds = chunkArray(variantIds, 50)

  let variants = []
  for (const variantIds of chunkedVariantIds) {
    const newVariants = await getCategoryProductVariants({
      ids: variantIds,
      region,
      fields: variantOptions?.fields,
      expand: variantOptions?.expand,
    })

    if (Boolean(newVariants?.length)) {
      variants = [...variants, ...newVariants]
    }
  }

  const products = productData.map((product) => {
    const disabledValues = (product.metadata?.disabledValues as string[]) || []

    const productVariants = variants.filter(
      (v) =>
        v.product_id === product.id &&
        !disabledValues.includes(v.metadata?.size) &&
        !disabledValues.includes(v.metadata?.colour)
    )

    return {
      ...(product || []),
      variants: productVariants,
    }
  })

  return products.filter((p) =>
    Boolean(p.variants?.length)
  ) as unknown as Product[]
}
