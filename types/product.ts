import type {
  ProductCategory,
  ProductCollection,
  ProductType,
} from "@medusajs/client-types"
import type { ProductStatus } from "@medusajs/types"

export interface Untitled1 {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  title: string
  subtitle?: string
  description?: string
  handle: string
  is_giftcard: boolean
  status: ProductStatus
  thumbnail?: string
  weight?: number
  length?: number
  height?: number
  width?: number
  hs_code?: string
  origin_country: string
  mid_code: string
  material: string
  collection_id: string
  type_id: string
  discountable: boolean
  external_id: string
  metadata: Untitled1_Metadata
  categories: ProductCategory[]
  collection: ProductCollection[]
  images: Image[]
  options: Option[]
  profiles: any[]
  sales_channels: SalesChannel[]
  tags: Image[]
  type: ProductType
  variants: Variant[]
}

export interface Category {
  id: string
  created_at: string
  updated_at: string
  name: string
  description: string
  handle: string
  is_active: boolean
  is_internal: boolean
  parent_category_id: string
  rank: number
  metadata: null
}

export interface Image {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  url?: string
  metadata: null
  value?: string
  option_id?: string
  variant_id?: string
}

export interface Untitled1_Metadata {
  brand: Brand
  season: string
}

export enum Brand {
  Novesta = "NOVESTA",
}

export interface Option {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  title: string
  product_id: string
  metadata: null
}

export interface SalesChannel {
  id: string
  created_at: string
  updated_at: string
  deleted_at: Date
  name: string
  description: string
  is_disabled: boolean
  metadata: null
}

export interface Variant {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  title: string
  product_id: string
  sku: string
  barcode: null
  ean: null
  upc: null
  variant_rank: number
  inventory_quantity: number
  allow_backorder: boolean
  manage_inventory: boolean
  hs_code: null
  origin_country: null
  mid_code: null
  material: null
  weight: null
  length: null
  height: null
  width: null
  metadata: VariantMetadata
  thumbnail: null | string
  images: Image[]
  options: Image[]
  prices: Price[]
  original_price: number
  calculated_price: number
  original_price_incl_tax: number
  calculated_price_incl_tax: number
  original_tax: number
  calculated_tax: number
  tax_rates: number
}

export interface VariantMetadata {
  size: string
  brand: string
  colour: string
  vatRate: string
  colourGroup1?: string
  colourGroup2?: string
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
  price_list_id: null
  region_id: null
  price_list: null
  variant_id: string
}
