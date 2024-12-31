import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ProductVariant } from "@medusajs/product";
import { IconX } from "@tabler/icons-react";
import { Button } from "..";
import { Filters } from "./Filters";
import { filterProducts } from "./helpers/filterProducts";
import { useMemo } from "react";
import { sortClothingSizes } from "@/lib/util/sortSizes";
import { useParamState } from "@/lib/hooks";

export function SizeFilters({
  filteredProducts,
  categoryHandle,
  region,
  setCurrentProducts,
  products,
  selectedBrands,
  selectedSubDepartments,
  selectedColorGroups,
  selectedPriceRange,
  selectedDepartments,
  selectedSizes,
  setSelectedSizes,
  setFilteredProducts,
  productsPerPage,
  startIndex,
  endIndex,
  sizes,
  filterData,
}: { sizes: string[] } & Filters) {
  const [animate] = useAutoAnimate();
  const [page, setPage] = useParamState("page", 1);

  const disabledSizes = useMemo(() => {
    const sizeDisabledState = {};

    sizes.forEach((size) => {
      const normalizedSize = size.toLowerCase();
      sizeDisabledState[normalizedSize] = !filteredProducts.some((product) =>
        (product.variants as unknown as ProductVariant[]).some(
          (variant) => (variant.metadata?.size as any)?.toLowerCase() === normalizedSize
        )
      );
    });

    return sizeDisabledState;
  }, [sizes, filteredProducts]);

  function handleBrandFilter(brand: string) {
    return () => {
      const newSelectedSizes = new Set(selectedSizes);
      if (!newSelectedSizes.has(brand)) {
        newSelectedSizes.add(brand);
      } else {
        newSelectedSizes.delete(brand);
      }
      setSelectedSizes(newSelectedSizes);

      page !== 1 && setPage(1);

      filterProducts({
        products,
        setFilteredProducts,
        filteredProducts,
        selectedBrands,
        selectedDepartments,
        selectedSubDepartments,
        selectedColorGroups,
        selectedPriceRange,
        selectedSizes: newSelectedSizes,
        productsPerPage,
        categoryHandle,
        region,
        setCurrentProducts,
        endIndex,
        startIndex,
        filterData,
      });
    };
  }

  const sortedSizes = useMemo(() => {
    return sortClothingSizes(sizes);
  }, [sizes]);

  return (
    <ul className="flex flex-wrap gap-1.5" ref={animate}>
      {sortedSizes.map((size) => (
        <li className={"flex items-center gap-3"} key={size}>
          <Button
            variant={selectedSizes.has(size) ? "default" : "secondary"}
            size={"xs"}
            disabled={disabledSizes[size]}
            onClick={handleBrandFilter(size)}
            className={"gap-3"}
          >
            {size}
            {selectedSizes.has(size) && <IconX size={16} />}
          </Button>
        </li>
      ))}
    </ul>
  );
}
