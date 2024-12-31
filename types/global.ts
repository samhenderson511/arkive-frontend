import type { PricedProduct, Cart } from "@medusajs/client-types"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactElement, ReactNode } from "react"

export type CollectionData = {
  id: string
  title: string
}

export type CartWithCheckoutStep = Omit<
  Cart,
  "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad"
> & {
  checkout_step: "" | "address" | "delivery" | "payment"
}

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type StoreNavData = {
  collections: CollectionData[]
  hasMoreCollections: boolean
  featuredProducts: PricedProduct[]
}

// page props for store pages (products and collection pages)
export type StoreProps<T extends unknown> = {
  page: {
    data: T
  }
}

// page props for non-store pages (home, about, contact, etc)
export type SiteProps = {
  site: {
    navData: StoreNavData
  }
}

export type PrefetchedPageProps = {
  notFound: boolean
}

// For pages with nested layouts
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout: (page: ReactElement) => ReactNode
}

export type StoreTabPageProps = {
  params: {
    domain: string
    countryCode?: string
  }
}

export type DepartmentPageProps = {
  params: { department: string } & StoreTabPageProps["params"]
}

export type BrandPageProps = {
  params: { brand?: string } & StoreTabPageProps["params"]
}

export type SubDepartmentPageProps = {
  params: { subDepartment: string } & DepartmentPageProps["params"]
}

export type ProductPageProps = {
  params: {
    product: string
  } & SubDepartmentPageProps["params"]
}

export type AppPropsWithLayout<P = {}, IP = P> = AppProps<P> & {
  Component: NextPageWithLayout<P, IP>
}

export type ProductPreviewType = {
  id: string
  title: string
  handle: string | null
  thumbnail: string | null
  price?: {
    calculated_price: string
    original_price: string
    difference: string
    price_type: "default" | "sale"
  }
} & PricedProduct

export type InfiniteProductPage = {
  response: {
    products: PricedProduct[]
    count: number
  }
}
