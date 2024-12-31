"use client"

import type { Image as MedusaImage } from "@medusajs/client-types"
import { PricedVariant } from "@medusajs/client-types"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export function useVariantImages(
  variants: PricedVariant[] & { images?: MedusaImage[]; thumbnail?: string },
  initialImages: (MedusaImage & { blurDataURL: string; alt: string })[]
) {
  const searchParams = useSearchParams()
  const variant = variants?.find((v) =>
    v.options?.some((o) => o.value === searchParams.get("Colour"))
  )

  const filteredImages = initialImages.reduce(
    (acc: typeof initialImages, image) => {
      if (acc.some((i) => i.url === image.url)) {
        return acc
      }

      return acc.concat(image)
    },
    []
  )

  const [currentImage, setCurrentImage] = useState(
    filteredImages?.[0] || initialImages?.[0]
  )
  const [currentImages, setCurrentImages] = useState(
    filteredImages || initialImages
  )

  useEffect(() => {
    if (variant) {
      const variantWithImage = variants.find(
        (v: any) =>
          variant.metadata?.colour === v.metadata.colour &&
          (v.thumbnail || Boolean(v?.images?.length))
      )

      const images =
        variantWithImage &&
        "images" in variantWithImage &&
        (variantWithImage.images as any).reduce((acc, image) => {
          if (acc.some((i) => i.url === image.url)) {
            return acc
          }

          return acc.concat(image)
        }, [])

      setCurrentImages(images as any)

      setCurrentImage({
        url:
          (variantWithImage as any)?.images?.[0]?.url ||
          (variantWithImage as any)?.thumbnail,
        alt: variantWithImage?.title,
      } as any)
    } else {
      setCurrentImages(filteredImages)
      setCurrentImage(filteredImages?.[0])
    }
  }, [variant])

  return { variant, currentImage, setCurrentImage, currentImages }
}
