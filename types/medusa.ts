import type {
  Product as MedusaProduct,
  Region as MedusaRegion,
  ProductVariant,
} from "@medusajs/client-types"
import { ProductCategory } from "@medusajs/product"

export type Variant = Omit<ProductVariant, "beforeInsert">

export interface Product extends Omit<MedusaProduct, "variants"> {
  variants: Variant[]
}

export interface Region extends Omit<MedusaRegion, "beforeInsert"> {}

export type CalculatedVariant = ProductVariant & {
  calculated_price: number
  calculated_price_type: "sale" | "default"
  original_price: number
}

export type CategoryResponse = { product_categories: ProductCategory[] }

export interface PricedVariant {
  variant: VariantPrices
}

export interface VariantPrices {
  id: string
  prices: Price[]
  original_price: number
  calculated_price: number
  calculated_price_type: string
  original_price_includes_tax: boolean
  calculated_price_includes_tax: boolean
  original_price_incl_tax: number
  calculated_price_incl_tax: number
  original_tax: number
  calculated_tax: number
  tax_rates: TaxRate[]
}

export interface Price {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  currency_code: string
  amount: number
  min_quantity: null
  max_quantity: null
  price_list_id: null | string
  region_id: null
  price_list: PriceList | null
  variant_id: string
}

export interface PriceList {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  name: string
  description: string
  type: string
  status: string
  starts_at: null
  ends_at: null
  includes_tax: boolean
}

export interface TaxRate {
  rate: number
  name: string
  code: string
}
