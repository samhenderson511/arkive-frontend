"use client";

import { getCategoryProducts } from "@/lib/data/getCategoryProducts";
import { PricedVariant } from "@medusajs/client-types";
import { Filters } from "../Filters";

function filterProducts({
  products,
  filterData,
  selectedBrands,
  selectedColorGroups,
  selectedDepartments,
  selectedPriceRange,
  selectedSubDepartments,
  setFilteredProducts,
  minPrice,
  maxPrice,
  selectedSizes,
  categoryHandle,
  region,
  setCurrentProducts,
}: Filters) {
  const newSelectedBrands = new Set(selectedBrands);
  const newSelectedColorGroups = new Set(selectedColorGroups);
  const newSelectedDepartments = [...selectedDepartments];
  const newSelectedSubDepartments = [...selectedSubDepartments];
  const newSelectedPriceRange = [...selectedPriceRange];
  const newSelectedSizes = new Set(selectedSizes);

  if (
    newSelectedBrands.size === 0 &&
    newSelectedColorGroups.size === 0 &&
    newSelectedDepartments.length === 0 &&
    newSelectedSubDepartments.length === 0 &&
    newSelectedPriceRange[0] === minPrice &&
    newSelectedPriceRange[1] === maxPrice &&
    newSelectedSizes.size === 0
  ) {
    setFilteredProducts(filterData);
    setCurrentProducts(products);
  } else {
    const filteredProducts = filterData.filter((product) => {
      return (product.variants as unknown as PricedVariant[]).some((variant) => {
        const brand = product?.metadata?.brand as string;
        const colourGroup1 = variant?.metadata?.colourGroup1 as string;
        const colourGroup2 = variant?.metadata?.colourGroup2 as string;
        const department = product?.handle?.split("/")[2];
        const subDepartment = product?.handle?.split("/")[3];
        const price = variant?.calculated_price;
        const size = variant?.metadata?.size as string;

        const brandMatches =
          newSelectedBrands.has(brand.toLowerCase()) || newSelectedBrands.size === 0;

        const colourGroupMatches =
          newSelectedColorGroups.has(colourGroup1?.toLowerCase()) ||
          newSelectedColorGroups.has(colourGroup2?.toLowerCase()) ||
          newSelectedColorGroups.size === 0;

        const departmentMatches =
          newSelectedDepartments.some(
            (dept) => dept.title.toLowerCase() === department.toLowerCase()
          ) || newSelectedDepartments.length === 0;

        const subDepartmentMatches =
          newSelectedSubDepartments.some(
            (subDep) => subDep.toLowerCase() === subDepartment.toLowerCase()
          ) || newSelectedSubDepartments.length === 0;

        const priceMatches =
          Boolean(price) && price >= newSelectedPriceRange[0] && price <= newSelectedPriceRange[1];

        const sizeMatches = newSelectedSizes.has(size.toLowerCase()) || newSelectedSizes.size === 0;

        return (
          brandMatches &&
          colourGroupMatches &&
          departmentMatches &&
          subDepartmentMatches &&
          priceMatches &&
          sizeMatches
        );
      });
    });

    const fetchNewProducts = async (callback) => {
      setCurrentProducts([]);

      const newProducts = await getCategoryProducts({
        ids: filteredProducts.slice(0, 72).map((p) => p.id),
        limit: 72,
        categoryHandle,
        region,
      });

      callback(newProducts);
    };

    fetchNewProducts((newProducts) => {
      setCurrentProducts(newProducts);
      setFilteredProducts(filteredProducts);
    });
  }
}

export { filterProducts };
