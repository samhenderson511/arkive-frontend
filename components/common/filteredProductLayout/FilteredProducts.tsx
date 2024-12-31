"use client";

import { EmptyState } from "@/components/home/components/product-list/empty-state";
import { getCategoryProducts } from "@/lib/data/getCategoryProducts";
import { useParamState } from "@/lib/hooks";
import type { Product, Region } from "@medusajs/client-types";
import { IconFilter } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, InfiniteScrollList } from "..";
import { SheetContent, SheetHeader, SheetTitle } from "../sheet";
import { Filters } from "./Filters";
import { FiltersList } from "./FiltersList";
import { createFilters } from "./helpers";
import { calculatePriceRange } from "./helpers/calculatePriceRange";
import Pagination from "./Pagination";

const Sheet = dynamic(() => import("../sheet"));

export function FilteredProducts({
  products,
  region,
  filterData,
  categoryHandle,
}: {
  products: Product[];
  filterData: Product[];
  region: Region;
  categoryHandle: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const filters = createFilters(filterData);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(filterData);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);

  const [page, setPage] = useParamState("page", 1, true);
  const productsPerPage = products?.length;

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, filteredProducts?.length);
  const numberOfPages = Math.ceil(filteredProducts?.length / productsPerPage);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setCurrentProducts([]);
      const newProducts = await getCategoryProducts({
        ids: filteredProducts?.slice(startIndex, endIndex)?.map((p) => p.id),
        categoryHandle,
        region,
        limit: productsPerPage,
      });

      setCurrentProducts(newProducts);
    };

    if (page && page !== 1 && filterData === filteredProducts) {
      fetchNewProducts();
    } else if (page === 1 && currentProducts !== products && filterData === filteredProducts) {
      setCurrentProducts(products);
    }
  }, [page, filteredProducts]);

  useEffect(() => {
    setFilteredProducts(filterData);
  }, [filterData]);

  useEffect(() => {
    setFilteredProducts(filterData);
  }, [filterData]);

  const [minPrice, maxPrice] = calculatePriceRange(products);
  const [selectedPriceRange, setSelectedPriceRange] = useState([minPrice, maxPrice]);

  const [selectedBrands, setSelectedBrands] = useState(new Set<string>());
  const [selectedSizes, setSelectedSizes] = useState(new Set<string>());
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState([]);
  const [selectedColorGroups, setSelectedColorGroups] = useState(new Set<string>());

  if (products?.length === 0) {
    return (
      <EmptyState
        title={"We haven't got anything at the moment"}
        description={"Check back regularly - we might have something soon!"}
      />
    );
  }

  const filterProps: Filters = {
    products,
    filterData,
    minPrice,
    maxPrice,
    categoryHandle,
    region,
    startIndex,
    endIndex,
    productsPerPage,
    currentProducts,
    setCurrentProducts,
    filteredProducts,
    setFilteredProducts,
    selectedBrands,
    setSelectedBrands,
    selectedDepartments,
    setSelectedDepartments,
    selectedSubDepartments,
    setSelectedSubDepartments,
    selectedColorGroups,
    setSelectedColorGroups,
    selectedPriceRange,
    setSelectedPriceRange,
    selectedSizes,
    setSelectedSizes,
  };

  return (
    <div className="flex px-1.5 sm:px-4 lg:px-8 justify-center w-full">
      <div className={"flex gap-8 max-w-8xl w-full"}>
        <div className="hidden lg:flex h-[calc(100vh-8rem)] flex-col sticky gap-3 top-24 p-6 py-8 basis-80 xl:basis-96 rounded-sm border shrink-0 border-border overflow-y-auto">
          <FiltersList filters={filters} filterProps={filterProps} region={region} />
        </div>
        <div className={"flex flex-col items-center gap-3 grow"}>
          <div className={"flex w-full justify-between items-center"}>
            <Button
              onClick={() => setOpen(true)}
              variant={"ghost"}
              className={"lg:invisible gap-3"}
            >
              <IconFilter size={20} />
              Filters
            </Button>
            <p className="text-lg text-muted-foreground">
              {`${startIndex + 1} - ${endIndex} of ${filteredProducts?.length} products`}
            </p>
          </div>

          <InfiniteScrollList products={currentProducts} region={region} />

          {Boolean(numberOfPages) && (
            <>
              <hr className="w-full mb-8 border-border" />

              <Pagination
                currentPage={page}
                numberOfPages={Math.ceil(filteredProducts.length / productsPerPage)}
                pageOnClick={(page) => setPage(page + 1)}
                nextOnClick={() => setPage(page + 1)}
                previousOnClick={() => setPage(page - 1)}
              />

              <hr className="w-full mt-8 border-border" />
            </>
          )}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side={"left"}>
            <SheetHeader className={"mb-2"}>
              <SheetTitle className={"sr-only"}>Filters</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col overflow-x-hidden overflow-y-auto grow">
              <FiltersList filters={filters} filterProps={filterProps} region={region} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
