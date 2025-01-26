"use client";

import Placeholder from "@/public/placeholder.svg";
import { Media } from "@/types/strapi/built-ins";
import { decode } from "blurhash";
import type Image from "next/image";
import { ComponentProps } from "react";

export function transformAssetClient(
  media: Partial<Media> | undefined,
  fallback = true
): ComponentProps<typeof Image> {
  const fallbackImage = {
    src: Placeholder.src,
    alt: "Placeholder",
    className: "object-cover bg-muted border border-border rounded",
  };

  if (!media?.url || typeof media?.url !== "string") {
    return fallback ? fallbackImage : { src: "", alt: "" };
  }

  const blurDataURL = media.blurhash ? blurhashClient(media.blurhash) : undefined;

  return {
    src: media.url,
    alt: media.alternativeText || media.name || "",
    placeholder: blurDataURL ? "blur" : "empty",
    className: "object-cover bg-muted",
    blurDataURL,
  };
}

export function blurhashClient(image: string, width = 128, height = 96) {
  if (!image) return undefined;

  try {
    const pixels = decode(image, width, height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Failed to get canvas context");

    const imageData = ctx.createImageData(width, height);
    imageData.data.set(pixels);
    ctx.putImageData(imageData, 0, 0);

    return canvas.toDataURL("image/jpeg");
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
