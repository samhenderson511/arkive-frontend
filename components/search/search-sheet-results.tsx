"use client";

import { ApiBrand, ApiCategory, ProductSearchResult } from "@/types";
import { IconArrowRight, IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import Image from "next/image";
import { useHits, useInstantSearch } from "react-instantsearch";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { SheetHit } from "./sheet-hit";
import { SheetHitSkeleton } from "./sheet-hit-skeleton";

export function SearchSheetResults({
  filteredBrands,
  filteredCategories,
}: {
  filteredBrands: ApiBrand[];
  filteredCategories: ApiCategory[];
}) {
  const { items, results } = useHits<ProductSearchResult>();
  const { status } = useInstantSearch();

  const emptyState = (
    <Text element="p" className="text-center py-8 grow flex items-center justify-center">
      No results found
    </Text>
  );

  const Title = ({ children }: { children: React.ReactNode }) => (
    <Text
      element="h2"
      className="text-sm h-6 sm:text-sm flex my-3 items-center gap-3 justify-between"
    >
      {children}
    </Text>
  );

  return (
    <>
      <div className="flex flex-col overflow-y-scroll p-6 gap-1 grow">
        <Title key="products">
          Products
          <Button
            variant={"link"}
            href={`/search?q=${results?.query}`}
            className={"shrink-0 gap-3 p-0"}
          >
            View all
            <IconArrowRight size={14} />
          </Button>
        </Title>
        {!status || status === "loading" ?
          Array.from({ length: 10 }).map((_, i) => <SheetHitSkeleton key={i} />)
        : !items?.length && status === "idle" ?
          emptyState
        : items.map((hit) => <SheetHit key={hit.objectID} hit={hit} />)}

        <Title key="categories">Categories</Title>
        {filteredCategories.length ?
          filteredCategories.slice(0, 10).map((category) => {
            const path = [category.parent?.name, category.name].filter(Boolean);

            return (
              <Button
                key={category.documentId}
                variant="ghost"
                className="w-full justify-start gap-2"
                href={`/${path.join("/")}`}
              >
                {path.map((name, i) => (
                  <span
                    className={clsx(
                      i < path.length - 1 && "text-muted-foreground",
                      "flex items-center gap-2"
                    )}
                    key={name}
                  >
                    {name}
                    {i < path.length - 1 && <IconChevronRight className="size-4" />}
                  </span>
                ))}
              </Button>
            );
          })
        : emptyState}

        <Title key="brands">
          Brands
          <Button variant={"link"} href={"/brands"} className={"shrink-0 gap-3 p-0"}>
            View all
            <IconArrowRight size={14} />
          </Button>
        </Title>
        {filteredBrands.length ?
          filteredBrands.slice(0, 10).map((brand) => (
            <Button key={brand.id} variant="ghost" className="w-full gap-5 justify-start">
              {brand.logo ?
                <Image
                  src={brand.logo?.url}
                  alt={brand.logo?.alternativeText || ""}
                  className="brightness-50 size-8"
                  width={32}
                  height={32}
                />
              : <div className="size-8 bg-muted rounded-full" />}
              {brand.name}
            </Button>
          ))
        : emptyState}
      </div>
    </>
  );
}
