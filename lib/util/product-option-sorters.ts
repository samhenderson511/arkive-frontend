import type { MoneyAmount } from "@medusajs/client-types"
import { Image } from "@medusajs/product"
import { onlyUnique } from "./only-unique"

export type Variant = {
  thumbnail: string
  metadata: { colour: string; size: string }
  inventory_quantity: number
  images?: Image[]
  prices: MoneyAmount[]
}

const getHasStock = (variants: Variant[]) =>
  variants?.filter((variant) => Number(variant.inventory_quantity) > 0)

const getOptions = (variants: Variant[], key: string) =>
  variants
    ?.sort((a, b) => a.metadata.colour.localeCompare(b.metadata.colour))
    .map((variant) => variant.metadata[key])
    .filter(onlyUnique)

export { getHasStock, getOptions }
