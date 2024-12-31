"use client";

import { getCategoryProducts } from "@/lib/data/getCategoryProducts";
import { useParamState } from "@/lib/hooks";
import type { Product, Region } from "@medusajs/client-types";
import { useEffect, useState } from "react";
import { Button } from "../button";
import { Input } from "../input";
import { FilteredProducts } from "./FilteredProducts";
import { useSearchParams } from "next/navigation";
import { IconLoader2 } from "@tabler/icons-react";

export function SearchLayout({
  region,
  categoryHandle,
}: {
  region: Region;
  categoryHandle: string;
}) {
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const [query, setQuery] = useParamState("q", searchParams.get("q") || "");
  const [value, setValue] = useState(query);

  useEffect(() => {
    const searchResult = async () => {
      const products = await getCategoryProducts({
        categoryHandle,
        region,
        query,
        limit: 20,
      });
      setSearchProducts(products);
    };

    searchResult();
  }, [query]);

  return (
    <div className={"flex flex-col gap-10 w-full items-center"}>
      <search className={"w-full max-w-screen-sm px-4 lg:px-8 rounded-sm"}>
        <form className={"flex gap-3 items-center"} onSubmit={() => setQuery(value)}>
          <Input
            name={"q"}
            id={"q"}
            type="text"
            className={"rounded-l-full !bg-background"}
            label={"Search"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className={"h-11 rounded-r-full"} size={"lg"} type={"submit"}>
            Search
          </Button>
        </form>
      </search>

      {!searchProducts?.length && (
        <div className="h-96 flex items-center animate-pulse justify-center">
          <IconLoader2 className="animate-spin text-muted-foreground" size={48} />
        </div>
      )}

      {Boolean(searchProducts?.length) && (
        <FilteredProducts
          products={searchProducts}
          region={region}
          filterData={searchProducts}
          categoryHandle={categoryHandle}
        />
      )}
    </div>
  );
}
