"use client";

import { useGlobal } from "@/lib";
import { ApiBrand, ApiCategory } from "@/types";
import { IconSearch } from "@tabler/icons-react";
import Fuse from "fuse.js";
import { throttle } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchBox } from "react-instantsearch";
import { Input } from "../form/input";

export function SearchSheetBox({
  brands,
  categories,
  className,
  ...props
}: {
  className?: string;
  setFilteredBrands: (brands: ApiBrand[]) => void;
  brands: ApiBrand[];
  setFilteredCategories: (categories: ApiCategory[]) => void;
  categories: ApiCategory[];
}) {
  const options = {
    includeScore: true,
    keys: ["name"],
  };
  const searchRef = useRef<HTMLInputElement>(null);
  const { openSearch } = useGlobal();

  useEffect(() => {
    if (!openSearch) {
      refine("");
      handleLocalSearch("");
    }
  }, [openSearch]);

  const { refine } = useSearchBox();
  const brandFuse = new Fuse(brands, options);
  const categoryFuse = new Fuse(categories, options);
  const [searchValue, setSearchValue] = useState("");

  function handleLocalSearch(value: string) {
    if (value) {
      const brandResult = brandFuse?.search(value);
      const categoryResult = categoryFuse?.search(value);
      props.setFilteredBrands(brandResult?.map((r) => r.item) ?? []);
      props.setFilteredCategories(categoryResult?.map((r) => r.item) ?? []);
    } else {
      props.setFilteredBrands(Array.from(brands));
      props.setFilteredCategories(Array.from(categories));
    }
  }

  const throttledSearch = useCallback(
    throttle((value: string) => {
      refine(value);
      handleLocalSearch(value);
    }, 1000),
    [refine, handleLocalSearch]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    throttledSearch(value);
  };

  return (
    <div className="relative flex items-center w-full">
      <Input
        placeholder="Find a product, department, brand"
        autoComplete="off"
        ref={searchRef}
        name="Search"
        id="Search"
        autoFocus
        value={searchValue}
        onChange={handleInputChange}
        className={className}
      />

      <IconSearch size={20} className="absolute left-4 text-muted-foreground" />
    </div>
  );
}
