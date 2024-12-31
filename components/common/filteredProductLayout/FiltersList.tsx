"use client";

import { IconX } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { Button } from "..";
import { BrandFilters } from "./BrandFilters";
import { ColourFilters } from "./ColourFilters";
import { DepartmentFilters } from "./DepartmentFilters";
import { FilterTitle } from "./FilterTitle";
import { Filters } from "./Filters";
import { PriceFilter } from "./PriceFilter";
import { SizeFilters } from "./SizeFilters";
import { Department } from "./helpers";
import { filterProducts } from "./helpers/filterProducts";
import type { Region } from "@medusajs/client-types";
import { useParamState } from "@/lib/hooks";
import { min } from "lodash";

export function FiltersList({
  filters,
  filterProps,
  region,
}: {
  filters: {
    brands: Set<string>;
    sizes: Set<string>;
    departments: Department[];
    colorGroups: Set<string>;
  };
  filterProps: Filters;
  region: Region;
}) {
  const [page, setPage] = useParamState("page", 1);

  const {
    filteredProducts,
    products,
    filterData,
    selectedBrands,
    selectedColorGroups,
    selectedDepartments,
    selectedPriceRange,
    selectedSizes,
    maxPrice,
    minPrice,
    setCurrentProducts,
    setFilteredProducts,
    setSelectedBrands,
    setSelectedColorGroups,
    setSelectedDepartments,
    setSelectedPriceRange,
    setSelectedSizes,
    setSelectedSubDepartments,
  } = filterProps;

  function clearAll() {
    setSelectedBrands(new Set<string>());
    setSelectedSizes(new Set<string>());
    setSelectedDepartments([]);
    setSelectedSubDepartments([]);
    setSelectedColorGroups(new Set<string>());
    setSelectedPriceRange([minPrice, maxPrice]);
    page !== 1 && setPage(1);

    setCurrentProducts(products);
    setFilteredProducts(filterData);
  }

  function clearBrands() {
    setSelectedBrands(new Set<string>());
    page !== 1 && setPage(1);

    filterProducts({
      ...filterProps,
      selectedBrands: new Set(),
    });
  }

  function clearSizes() {
    setSelectedSizes(new Set<string>());
    page !== 1 && setPage(1);

    filterProducts({
      ...filterProps,
      selectedSizes: new Set(),
    });
  }

  function clearDepartments() {
    setSelectedDepartments([]);
    setSelectedSubDepartments([]);
    page !== 1 && setPage(1);

    filterProducts({
      ...filterProps,
      selectedDepartments: [],
      selectedSubDepartments: [],
    });
  }

  function clearColourGroups() {
    setSelectedColorGroups(new Set<string>());
    page !== 1 && setPage(1);

    filterProducts({
      ...filterProps,
      selectedColorGroups: new Set(),
    });
  }

  function clearPriceRange() {
    setSelectedPriceRange([0, 0]);
    page !== 1 && setPage(1);

    filterProducts({
      ...filterProps,
      selectedPriceRange: [minPrice, maxPrice],
    });
  }

  return (
    <>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className={clsx(barlow.className, "text-2xl uppercase")}>Filters</h3>
        {filteredProducts?.length !== filterData?.length && (
          <Button onClick={clearAll} size={"xs"} variant={"secondary"} className={"gap-3"}>
            Clear all
            <IconX size={12} />
          </Button>
        )}
      </div>

      {/* Filter Body */}
      {filters.brands.size > 1 && (
        <>
          <FilterTitle
            onClear={selectedBrands.size !== 0 && clearBrands}
            title={"Brand"}
            size={selectedBrands.size}
          />
          <BrandFilters brands={filters.brands} {...filterProps} />
        </>
      )}

      <FilterTitle
        title={"Department"}
        onClear={selectedDepartments.length !== 0 && clearDepartments}
        size={selectedDepartments.length}
      />
      <DepartmentFilters departments={filters.departments} {...filterProps} />

      <FilterTitle
        title={"Size"}
        onClear={selectedSizes.size !== 0 && clearSizes}
        size={selectedSizes.size}
      />
      <SizeFilters sizes={Array.from(filters.sizes)} {...filterProps} />

      <FilterTitle
        title={"Colour"}
        onClear={selectedColorGroups.size !== 0 && clearColourGroups}
        size={selectedColorGroups.size}
      />
      <ColourFilters colourGroups={Array.from(filters.colorGroups)} {...filterProps} />

      {minPrice && maxPrice && minPrice !== maxPrice && (
        <>
          <FilterTitle
            title={"Price"}
            onClear={
              Boolean(minPrice) &&
              Boolean(maxPrice) &&
              (selectedPriceRange[0] !== minPrice || selectedPriceRange[1] !== maxPrice) &&
              clearPriceRange
            }
            size={
              [selectedPriceRange[0] !== minPrice, selectedPriceRange[1] !== maxPrice].filter(
                Boolean
              ).length
            }
          />
          <PriceFilter region={region} minPrice={minPrice} maxPrice={maxPrice} {...filterProps} />
        </>
      )}
    </>
  );
}
