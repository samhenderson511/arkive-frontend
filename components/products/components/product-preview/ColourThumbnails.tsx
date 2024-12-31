"use client"
import { useState } from "react"
import { Thumbnail } from "../thumbnail"
import { ColourButtons, VariantWithImages } from "./ColourButtons"

interface Props {
  colourOptions: string[]
  variants: VariantWithImages[]
  thumbnail: string
  blurDataURL?: string
}

export const ColourThumbnails = ({
  colourOptions,
  variants,
  thumbnail,
}: Props) => {
  const [image, setImage] = useState(
    variants
      .sort((a, b) => a.metadata?.colour?.localeCompare(b?.metadata?.colour))
      .find(
        (v) =>
          v.thumbnail &&
          colourOptions?.some((opt) => opt === v.metadata?.colour)
      )?.thumbnail || thumbnail
  )

  return (
    <>
      <Thumbnail
        thumbnail={image}
        size="full"
        sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        alt={""}
      />
      {Boolean(colourOptions?.length) ? (
        <ColourButtons
          colourOptions={colourOptions}
          variants={variants}
          setImage={setImage}
        />
      ) : (
        <span />
      )}
    </>
  )
}
