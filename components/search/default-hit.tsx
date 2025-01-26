"use client";

import { transformAssetClient } from "@/lib";
import { GBP, toTitleCase } from "@/lib/server";
import { constructSlug } from "@/lib/util/construct-slug";
import { ProductSearchResult } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Text } from "../ui/text";

export function DefaultHit({
  hit,
  truncate = false,
}: {
  hit: ProductSearchResult;
  truncate?: boolean;
}) {
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
    <Link
      href={`/${slug}`}
      className="flex flex-col items-start justify-start group gap-3"
      title={`${hit.brand} ${hit.name}`}
    >
      <div className="aspect-square w-full min-h-32 group-hover:border-border border transition border-transparent ease-out rounded-lg overflow-hidden relative">
        <Image
          {...image}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-col">
        <Text element="span" className="text-xs leading-none text-muted-foreground">
          {hit.brand}
        </Text>

        <Text
          element="h5"
          elementStyle="span"
          className={clsx("group-hover:underline", truncate && "line-clamp-1")}
        >
          {toTitleCase(hit.name)}
        </Text>

        <Text
          element="span"
          className={clsx(
            {
              "line-through": Boolean(hit.discount),
            },
            "text-muted-foreground"
          )}
        >
          {GBP.format(hit.price)}
        </Text>
        {Boolean(hit.discount) && (
          <Text element="span" className="font-medium text-destructive leading-none">
            {GBP.format(hit.price - hit.price * (hit.discount / 100))}
          </Text>
        )}
      </div>
    </Link>
  );
}

export default DefaultHit;
