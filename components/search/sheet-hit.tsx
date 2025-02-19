"use client";

import { transformAssetClient, useGlobal } from "@/lib";
import { GBP, toTitleCase } from "@/lib/server";
import { ProductSearchResult } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { constructSlug } from "../../lib/util/construct-slug";
import { Text } from "../ui/text";

export function SheetHit({ hit }: { hit: ProductSearchResult }) {
  const { setOpenSearch } = useGlobal();

  const firstImage = hit.images.find((image) => image.url);
  const slug = constructSlug(hit.categories?.subDept, hit.name);

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
      onClick={() => setOpenSearch(false)}
      className="flex items-start justify-start group gap-3 my-1"
    >
      <div className="size-16 shrink-0 group-hover:border-border border transition border-transparent ease-out rounded-lg overflow-hidden relative">
        <Image {...image} fill className="object-cover" sizes="64px" />
      </div>
      <div className="flex flex-col">
        <Text element="span" className="text-xs leading-none font-medium">
          {hit.brand}
        </Text>

        <Text element="h5" elementStyle="span" className="group-hover:underline">
          {toTitleCase(hit.name)}
        </Text>

        <div className="flex gap-3 mt-1">
          <Text
            element="span"
            className={clsx(
              {
                "line-through": hit.salePrice !== hit.price,
              },
              "text-muted-foreground leading-none"
            )}
          >
            {GBP.format(hit.price)}
          </Text>

          {hit.salePrice !== hit.price && (
            <Text element="span" className="font-medium text-destructive leading-none">
              {GBP.format(hit.salePrice)}
            </Text>
          )}
        </div>
      </div>
    </Link>
  );
}
