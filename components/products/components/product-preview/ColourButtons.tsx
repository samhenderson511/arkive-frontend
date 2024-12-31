"use client"
import type { PricedVariant } from "@medusajs/client-types"
import { Image } from "@medusajs/product"
import { Dispatch, SetStateAction } from "react"
import { ColourButton } from "./ColourButton"

type Metadata = {
  colour: string
  colourGroup1: string
  colourGroup2?: string
}

export type VariantWithImages = {
  id: string
  thumbnail?: string
  metadata: { [key: string]: string }
  images?: Image[]
} & PricedVariant

type Props = {
  colourOptions: string[]
  variants: VariantWithImages[]
  setImage: Dispatch<SetStateAction<string>>
}

const ColourButtons = ({ colourOptions, variants, setImage }: Props) => (
  <ul className="flex flex-wrap gap-1 py-1 min-h-[2.25rem]">
    {colourOptions
      ? colourOptions.map((opt: string) => {
          const variantWithImage =
            variants.find(
              (variant) => variant.metadata.colour === opt && variant.thumbnail
            ) || variants.find((variant) => variant.metadata.colour === opt)
          const variantWithColour = variants.find(
            (variant) =>
              variant.metadata.colour === opt && variant.metadata.colourGroup1
          )
          const meta = variantWithColour?.metadata as Metadata

          return (
            <ColourButton
              onMouseEnter={() =>
                variantWithImage?.thumbnail &&
                setImage(variantWithImage.thumbnail || "")
              }
              onClick={(e) => e.preventDefault()}
              key={variantWithImage.id}
              colour={meta?.colour}
              colourGroup1={meta?.colourGroup1}
              colourGroup2={meta?.colourGroup2}
            />
          )
        })
      : Array.from({ length: 3 }).map((_, index) => (
          <div
            key={"colourOption " + index}
            className={
              "h-7 w-7 bg-muted border border-border rounded-sm animate pulse"
            }
          />
        ))}
  </ul>
)

export { ColourButtons }
