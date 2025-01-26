"use server";

import { Media } from "@/types/strapi/built-ins";
import { decode } from "blurhash";
import { ComponentProps } from "react";
import Placeholder from "@/public/placeholder.svg";
import Image from "next/image";
import sharp from "sharp";

export async function transformAsset(
  media: Partial<Media> | undefined,
  fallback = true
): Promise<ComponentProps<typeof Image>> {
  const fallbackImage = {
    src: Placeholder.src,
    alt: "Placeholder",
    className: "object-cover bg-muted border border-border rounded",
  };

  if (!media?.url || typeof media?.url !== "string") {
    return fallback ? fallbackImage : { src: "", alt: "" };
  }

  const blurDataURL = media.blurhash ? await blurhash(media.blurhash) : undefined;

  return {
    src: media.url,
    alt: media.alternativeText || media.name || "",
    placeholder: blurDataURL ? "blur" : "empty",
    className: "object-cover bg-muted",
    blurDataURL,
  };
}

export async function blurhash(image: string, width = 128, height = 96) {
  if (!image) return undefined;

  try {
    const pixels = decode(image, width, height);
    const imageData = new Uint8ClampedArray(pixels);

    return await sharp(imageData, {
      raw: { width, height, channels: 4 },
    })
      .jpeg()
      .toBuffer()
      .then((buffer) => `data:image/jpeg;base64,${buffer.toString("base64")}`);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
