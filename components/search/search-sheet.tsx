"use client";

import {
  SearchContext,
  SearchSheetBox,
  SearchSheetResults,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components";
import { useGlobal } from "@/lib";
import { ApiBrand, ApiCategory } from "@/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";

export function SearchSheet({
  categories,
  brands,
  rootCategory,
}: {
  categories: ApiCategory[];
  brands: ApiBrand[];
  rootCategory: string;
}) {
  const { openSearch, setOpenSearch } = useGlobal();

  const [filteredBrands, setFilteredBrands] = useState<ApiBrand[]>(brands);
  const [filteredCategories, setFilteredCategories] = useState<ApiCategory[]>(categories);

  return (
    <Sheet open={openSearch} onOpenChange={setOpenSearch}>
      <SheetContent
        side="right"
        className="flex flex-col gap-0 p-0 max-w-[min(calc(100%-0.5rem),32rem)]"
      >
        <VisuallyHidden>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>Search for products</SheetDescription>
        </VisuallyHidden>

        <SearchContext
          indexName="arkive:products"
          configure={{
            hitsPerPage: 10,
            filters: rootCategory ? `categories.cat:${rootCategory}` : undefined,
          }}
        >
          <SheetHeader>
            <SearchSheetBox
              brands={brands}
              className="focus:bg-background/100 bg-transparent transition border-x-none border-t-none rounded-b-none rounded-t-lg h-14 w-full pl-12"
              categories={categories}
              setFilteredBrands={setFilteredBrands}
              setFilteredCategories={setFilteredCategories}
            />
          </SheetHeader>

          <SearchSheetResults
            filteredBrands={filteredBrands}
            filteredCategories={filteredCategories}
          />
        </SearchContext>
      </SheetContent>
    </Sheet>
  );
}
