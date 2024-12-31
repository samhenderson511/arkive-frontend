"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { toTitleCase } from "@/lib/util";
import { CheckedState } from "@radix-ui/react-checkbox";
import Fuse from "fuse.js";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Button, Checkbox, Input, Label } from "..";
import { Filters } from "./Filters";
import { filterProducts } from "./helpers/filterProducts";
import { useParamState } from "@/lib/hooks";

export function BrandFilters({
  brands,
  filteredProducts,
  products,
  selectedBrands,
  setSelectedBrands,
  selectedSubDepartments,
  selectedColorGroups,
  selectedPriceRange,
  selectedDepartments,
  selectedSizes,
  categoryHandle,
  region,
  setCurrentProducts,
  endIndex,
  productsPerPage,
  startIndex,
  setFilteredProducts,
  filterData,
}: {
  brands: Set<string>;
} & Filters) {
  const [animate] = useAutoAnimate();
  const [page, setPage] = useParamState("page", 1);
  const [filteredBrands, setFilteredBrands] = useState(() => Array.from(brands));
  const [showAll, setShowAll] = useState(false);

  const amountAvailable = useMemo(() => {
    const productCountPerBrand = new Map();

    const productsToConsider = selectedBrands.size === 0 ? filteredProducts : filterData;

    productsToConsider.forEach((product) => {
      // Directly access the brand from the product's metadata
      const productBrand = product.metadata?.brand?.toLowerCase();

      if (productBrand) {
        if (productCountPerBrand.has(productBrand)) {
          productCountPerBrand.set(productBrand, productCountPerBrand.get(productBrand) + 1);
        } else {
          productCountPerBrand.set(productBrand, 1);
        }
      }
    });

    return (brand) => productCountPerBrand.get(brand.toLowerCase()) || 0;
  }, [selectedBrands, filteredProducts]);

  function handleBrandSearch(
    filteredBrands: readonly string[],
    setFilteredBrands: Dispatch<SetStateAction<string[]>>,
    brands: Set<string>
  ) {
    return (event: { target: { value: any } }) => {
      const options = {
        includeScore: true,
      };

      const fuse = new Fuse(filteredBrands, options);
      const { value } = event.target;
      const result = fuse.search(value);

      if (value) {
        setFilteredBrands(result.map((r) => r.item));
      } else {
        setFilteredBrands(Array.from(brands));
      }
    };
  }

  function handleBrandFilter(brand: string) {
    return (checked: CheckedState) => {
      const newSelectedBrands = new Set(selectedBrands);
      if (checked) {
        newSelectedBrands.add(brand);
      } else {
        newSelectedBrands.delete(brand);
      }
      setSelectedBrands(newSelectedBrands);

      page !== 1 && setPage(1);

      filterProducts({
        filterData,
        filteredProducts,
        setFilteredProducts,
        products,
        selectedBrands: newSelectedBrands,
        selectedDepartments,
        selectedSubDepartments,
        selectedColorGroups,
        selectedPriceRange,
        selectedSizes,
        productsPerPage,
        categoryHandle,
        region,
        setCurrentProducts,
        endIndex,
        startIndex,
      });
    };
  }

  return (
    <div className="flex flex-col">
      <Input
        name={"search"}
        className={"mb-3"}
        label={"Search for a brand"}
        onChange={handleBrandSearch(filteredBrands, setFilteredBrands, brands)}
      />
      <ul className="flex flex-col gap-2" ref={animate}>
        {filteredBrands
          .sort((a, b) => a.localeCompare(b))
          .slice(0, showAll ? filteredBrands.length : 10)
          .map((brand) => (
            <li className={"flex items-center gap-3"} key={brand}>
              <Checkbox
                name={brand}
                id={brand}
                value={brand}
                checked={selectedBrands.has(brand)}
                disabled={amountAvailable(brand) === 0}
                onCheckedChange={handleBrandFilter(brand)}
              />
              <Label className={"grow"} htmlFor={brand}>
                {toTitleCase(brand)}
              </Label>
              <span className="text-muted-foreground">{amountAvailable(brand)}</span>
            </li>
          ))}
      </ul>
      <Button variant={"link"} className={"mt-1"} onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show less" : "Show all brands"}
      </Button>
    </div>
  );
}
