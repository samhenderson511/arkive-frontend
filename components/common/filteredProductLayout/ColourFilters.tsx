"use client";
import { ColourButton } from "@/components/products/components/product-preview/ColourButton";
import { useParamState } from "@/lib/hooks";
import { ProductVariant } from "@medusajs/product";
import { useMemo } from "react";
import { Filters } from "./Filters";
import { filterProducts } from "./helpers/filterProducts";

export function ColourFilters({
  setFilteredProducts,
  products,
  colourGroups,
  selectedColorGroups,
  setSelectedColorGroups,
  selectedBrands,
  selectedDepartments,
  selectedPriceRange,
  selectedSubDepartments,
  filteredProducts,
  selectedSizes,
  productsPerPage,
  categoryHandle,
  region,
  setCurrentProducts,
  endIndex,
  startIndex,
  filterData,
}: {
  colourGroups: string[];
} & Filters) {
  const [page, setPage] = useParamState("page", 1);

  const disabledColours = useMemo(() => {
    const sizeDisabledState = {};

    colourGroups.forEach((colourGroup) => {
      // const normalized = colourGroup.toLowerCase()
      sizeDisabledState[colourGroup] = !filteredProducts.some((product) =>
        (product.variants as unknown as ProductVariant[]).some(
          (variant) =>
            (variant.metadata?.colourGroup1 as any)?.toLowerCase() === colourGroup ||
            (variant.metadata?.colourGroup1 as any)?.toLowerCase() === colourGroup
        )
      );
    });

    return sizeDisabledState;
  }, [colourGroups, filteredProducts]);

  function handleColourFilter(colour: string) {
    return () => {
      const newSelectedColorGroups = new Set(selectedColorGroups);
      if (!newSelectedColorGroups.has(colour)) {
        newSelectedColorGroups.add(colour);
      } else {
        newSelectedColorGroups.delete(colour);
      }
      setSelectedColorGroups(newSelectedColorGroups);

      page !== 1 && setPage(1);

      if (newSelectedColorGroups.size === 0) {
        setFilteredProducts(products);
      } else {
        filterProducts({
          filterData,
          products,
          selectedBrands,
          selectedColorGroups: newSelectedColorGroups,
          selectedDepartments,
          selectedPriceRange,
          selectedSubDepartments,
          filteredProducts,
          setFilteredProducts,
          selectedSizes,
          productsPerPage,
          categoryHandle,
          region,
          setCurrentProducts,
          endIndex,
          startIndex,
        });
      }
    };
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {colourGroups.map((colour) => (
        <ColourButton
          colour={colour}
          colourGroup1={colour}
          key={colour}
          aria-disabled={disabledColours[colour]}
          onClick={handleColourFilter(colour)}
          className={selectedColorGroups?.has(colour) && "ring-1 ring-offset-1 ring-ring"}
        />
      ))}
    </ul>
  );
}
