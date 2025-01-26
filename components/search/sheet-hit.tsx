"use client";

import { transformAssetClient } from "@/lib";
import { GBP, toTitleCase } from "@/lib/server";
import { ProductSearchResult } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { constructSlug } from "../../lib/util/construct-slug";
import { Text } from "../ui/text";

export function SheetHit({ hit }: { hit: ProductSearchResult }) {
  const firstImage = hit.images.find((image) => image.url);
  const slug = constructSlug(hit);

  const image = transformAssetClient(
    firstImage ?
      {
        url: firstImage?.url,
        blurhash: firstImage?.blurhash,
        width: firstImage?.width,
        height: firstImage?.height,
      }
    : undefined
  );

  return (
    <Link href={`/${slug}`} className="flex items-start justify-start group gap-3 my-1">
      <div className="size-16 shrink-0 group-hover:border-border border transition border-transparent ease-out rounded-lg overflow-hidden relative">
        <Image {...image} fill className="object-cover" sizes="64px" />
      </div>
      <div className="flex flex-col">
        <Text element="span" className="text-xs leading-none text-muted-foreground">
          {hit.brand}
        </Text>

        <Text element="h5" elementStyle="span" className="group-hover:underline">
          {toTitleCase(hit.name)}
        </Text>

        <Text
          element="span"
          className={clsx(
            {
              "line-through": hit.discount !== 0,
            },
            "text-sm text-muted-foreground"
          )}
        >
          {GBP.format(hit.price)}
        </Text>

        {hit.discount !== 0 && (
          <Text element="span" className="text-sm font-medium text-destructive leading-none">
            {GBP.format(hit.price - hit.price * (hit.discount / 100))}
          </Text>
        )}
      </div>
    </Link>
  );
}
