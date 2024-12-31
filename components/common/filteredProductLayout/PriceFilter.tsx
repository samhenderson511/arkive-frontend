import { useParamState } from "@/lib/hooks";
import { formatAmount } from "@/lib/util/prices";
import type { Region } from "@medusajs/client-types";
import { barlow } from "app/fonts";
import { Slider } from "../slider";
import { Filters } from "./Filters";
import { filterProducts } from "./helpers/filterProducts";

export function PriceFilter({
  products,
  selectedColorGroups,
  minPrice,
  maxPrice,
  filteredProducts,
  selectedBrands,
  region,
  selectedDepartments,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedSubDepartments,
  setFilteredProducts,
  selectedSizes,
  productsPerPage,
  categoryHandle,
  setCurrentProducts,
  endIndex,
  startIndex,
  filterData,
}: {
  minPrice: number;
  maxPrice: number;
  region: Region;
} & Filters) {
  const [page, setPage] = useParamState("page", 1);

  function handlePriceFilter(value: number[]) {
    const newSelectedPriceRange = [...selectedPriceRange];
    newSelectedPriceRange[0] = value[0];
    newSelectedPriceRange[1] = value[1];

    setSelectedPriceRange(newSelectedPriceRange);
    page !== 1 && setPage(1);

    filterProducts({
      filteredProducts,
      setFilteredProducts,
      products,
      selectedBrands,
      selectedDepartments,
      selectedSubDepartments,
      selectedColorGroups,
      selectedPriceRange: newSelectedPriceRange,
      minPrice,
      maxPrice,
      selectedSizes,
      productsPerPage,
      categoryHandle,
      region,
      setCurrentProducts,
      endIndex,
      startIndex,
      filterData,
    });
  }

  return (
    typeof minPrice === "number" &&
    typeof maxPrice === "number" &&
    typeof region?.currency_code === "string" && (
      <div className={"flex items-center gap-3"}>
        <span className={barlow.className}>
          {formatAmount({
            amount: minPrice,
            region: region,
          })}
        </span>
        <Slider
          max={maxPrice}
          min={minPrice}
          step={100}
          onValueCommit={handlePriceFilter}
          defaultValue={[minPrice, maxPrice]}
          region={region}
        />
        <span className={barlow.className}>
          {formatAmount({
            amount: maxPrice,
            region: region,
          })}
        </span>
      </div>
    )
  );
}
