import { PricedProduct } from "@medusajs/client-types"
import { StaticSEO, StoreTab } from "types/strapi"
import { toTitleCase } from "./toTitleCase"

export type RequiredMeta = {
  storeTab?: StoreTab
  department?: string
  subDepartment?: string
  product?: PricedProduct
  brand?: string
}

function replacePlaceholders({
  str,
  storeTab,
  department,
  subDepartment,
  product,
  brand,
}: {
  str: string
} & RequiredMeta) {
  const BrandTitle = storeTab?.attributes?.BrandTitle || null
  const Title = storeTab?.attributes?.Title || null
  return toTitleCase(
    str
      ?.replaceAll("[storeTab]", Title || "")
      ?.replaceAll("[storeTab.brandTitle]", BrandTitle || "")
      ?.replaceAll("[department]", department || "")
      ?.replaceAll("[subDepartment]", subDepartment || "")
      ?.replaceAll("[product]", product?.title || "")
      ?.replaceAll("[brand]", brand || "")
  )
}

function createMetaData({
  data,
  brand,
  department,
  product,
  storeTab,
  subDepartment,
}: { data: StaticSEO } & RequiredMeta) {
  const baseUrl = `https://${storeTab.attributes.Domain}`

  const {
    metaTitle: title = null,
    metaDescription: description = null,
    keywords = null,
    metaImage: imageData = null,
    canonicalURL = null,
    metaSocial: social = null,
    structuredData = null,
  } = data?.attributes?.Seo

  const props = {
    storeTab,
    department,
    subDepartment,
    product,
    brand,
  }

  return {
    title: replacePlaceholders({
      str: title,
      ...props,
    }),
    description: replacePlaceholders({
      str: description,
      ...props,
    }),
    keywords: replacePlaceholders({
      str: keywords,
      ...props,
    })
      .split(",")
      .map((keyword) => keyword.trim()),
    imageData,
    canonicalURL: replacePlaceholders({
      str: canonicalURL,
      ...props,
    }),
    social: {
      title: replacePlaceholders({
        str: social?.[0]?.title,
        ...props,
      }),
      description: replacePlaceholders({
        str: social?.[0]?.description,
        ...props,
      }),
      imageData,
    },
    structuredData: replacePlaceholders({
      str: structuredData,
      ...props,
    }),
    baseUrl,
  }
}

export { createMetaData, replacePlaceholders }
