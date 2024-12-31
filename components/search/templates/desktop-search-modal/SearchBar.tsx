import { Button } from "@/components/common";
import { ProductCategory } from "@medusajs/product";
import { IconSearch, IconX } from "@tabler/icons-react";
import clsx from "clsx";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { BannerBrand } from "types/strapi";

export function SearchBar({
  refine,
  searchRef,
  setFilteredBrands,
  brands,
  setFilteredDepartments,
  departments,
}: {
  refine: (value: string) => void;
  searchRef: React.MutableRefObject<HTMLInputElement>;
  setFilteredBrands: (brands: BannerBrand[]) => void;
  brands: BannerBrand[];
  setFilteredDepartments: (departments: ProductCategory[]) => void;
  departments: ProductCategory[];
}) {
  const [brandFuse, setBrandFuse] = useState(null);
  const [departmentFuse, setDepartmentFuse] = useState(null);

  useEffect(() => {
    const options = {
      includeScore: true,
      keys: ["attributes.BrandBanner.Title", "name"],
    };
    if (brands && brands.length) {
      setBrandFuse(new Fuse(brands, options));
    }
    if (departments && departments.length) {
      setDepartmentFuse(new Fuse(departments, options));
    }
  }, [brands, departments]);

  function handleBrandSearch(event) {
    const { value } = event.target;
    if (value) {
      const brandResult = brandFuse.search(value);
      const departmentResult = departmentFuse.search(value);
      setFilteredBrands(brandResult.map((r) => r.item));
      setFilteredDepartments(departmentResult.map((r) => r.item));
    } else {
      setFilteredBrands(Array.from(brands));
      setFilteredDepartments(Array.from(departments));
    }
  }

  function handleInputChange(event) {
    refine(event.target.value);
    handleBrandSearch(event);
  }

  return (
    <div className={"relative flex items-center w-full"}>
      <input
        placeholder="Find a product, department, brand"
        autoComplete="off"
        ref={searchRef}
        name="Search"
        id="Search"
        autoFocus
        onChange={handleInputChange}
        className={
          "rounded-full bg-muted placeholder:text-muted-foreground focus:bg-card focus:outline-none focus:ring-1 ring-offset-2 ring-input transition ease-out px-12 h-12 w-full shrink-0"
        }
      />
      <Button
        className={clsx(
          "right-2 !rounded-full absolute transition ease-out",
          searchRef?.current?.value ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
        )}
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          searchRef.current.value = "";
          refine("");
        }}
      >
        <IconX size={20} />
      </Button>
      <IconSearch size={20} className="absolute left-4 text-muted-foreground" />
    </div>
  );
}
