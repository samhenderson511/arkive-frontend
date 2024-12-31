"use client";

import { Button } from "@/components/common";
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/common/sheet";
import { useParamState } from "@/lib/hooks";
import type { Region } from "@medusajs/client-types";
import { IconSearch } from "@tabler/icons-react";
import { SEARCH_INDEX_NAME, searchClient } from "@/lib/search-client";
import dynamic from "next/dynamic";
import { Configure } from "react-instantsearch-core";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchResults } from "./SearchResults";
import { ApiCategory, ApiBrand } from "@/types";

const Sheet = dynamic(() => import("@/components/common/sheet"));

export function SearchSheet({
  departments,
  brands,
  region,
  category,
}: {
  departments: ApiCategory[];
  brands: ApiBrand[];
  region: Region;
  category: string;
}) {
  const [open, setOpen] = useParamState("search", false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="justify-between gap-3 h-full pr-2 grow opacity-50 !bg-opacity-0 !duration-0 cursor-text"
          size={"sm"}
        >
          Search
          <IconSearch size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
        </SheetHeader>
        {/* @ts-expect-error */}
        <InstantSearchNext indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
          <Configure
            filters={`status:published AND category:${category} AND is_giftcard:false`}
            hitsPerPage={5}
          />
          <SearchResults departments={departments} brands={brands} region={region} />
        </InstantSearchNext>
      </SheetContent>
    </Sheet>
  );
}
