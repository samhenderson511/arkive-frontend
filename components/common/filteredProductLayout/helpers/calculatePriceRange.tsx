import { PricedVariant } from "@medusajs/client-types"
import type { Product } from "@medusajs/client-types"

export function calculatePriceRange(products: Product[]): [number, number] {
  const variants = products.flatMap(
    (product) => product.variants
  ) as unknown as PricedVariant[]

  const minPrice = variants?.reduce(
    (acc, variant) => Math.min(acc, variant?.calculated_price),
    Infinity
  )
  const maxPrice = variants?.reduce(
    (acc, variant) => Math.max(acc, variant?.calculated_price),
    -Infinity
  )

  return [minPrice, maxPrice]
}
