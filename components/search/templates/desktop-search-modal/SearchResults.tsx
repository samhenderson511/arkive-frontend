import { Button } from "@/components/common";
import { SheetClose } from "@/components/common/sheet";
import { NavItem } from "@/components/layout/templates/nav/nav-item";
import { ProductPreview } from "@/components/products/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { handleWithoutCategory } from "@/lib/util";
import type { Region } from "@medusajs/client-types";
import { Product, ProductCategory } from "@medusajs/product";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useHits, useSearchBox } from "react-instantsearch-core";
import slugify from "slugify";
import { BannerBrand } from "types/strapi";
import { EmptyState } from "./EmptyState";
import { SearchBar } from "./SearchBar";

export type AlgoliaProduct = Product & {
  objectID: string;
  [key: string]: string;
};

type BaseHit = Record<string, AlgoliaProduct> & AlgoliaProduct;

export function SearchResults({
  departments,
  brands,
  region,
}: {
  departments: ProductCategory[];
  brands: BannerBrand[];
  region: Region;
}) {
  const { items, results } = useHits<BaseHit>();
  const { refine } = useSearchBox();
  const searchRef = useRef<HTMLInputElement>(null);
  const [parent] = useAutoAnimate();

  const [filteredBrands, setFilteredBrands] = useState<BannerBrand[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<ProductCategory[]>(departments);

  useEffect(() => {
    if (brands) {
      setFilteredBrands(brands);
    }
  }, [brands]);

  return (
    <>
      <SearchBar
        searchRef={searchRef}
        refine={refine}
        setFilteredBrands={setFilteredBrands}
        brands={brands}
        setFilteredDepartments={setFilteredDepartments}
        departments={[
          ...departments,
          ...departments.map((d) => d.category_children as unknown as ProductCategory).flat(),
        ]}
      />
      <div className="flex flex-col overflow-y-scroll grow no-scrollbar">
        <div className={"flex flex-col"} ref={parent}>
          <div
            className={
              "flex px-3 mb-3 py-0.5 text-sm font-semibold border-b border-border items-baseline justify-between"
            }
          >
            <h2>Products</h2>
            <Button
              variant={"link"}
              href={`/search?q=${results.query}`}
              className={"shrink-0 gap-3"}
            >
              View all
              <IconArrowRight size={14} />
            </Button>
          </div>
          {!results.__isArtificial && items.length === 0 ?
            <EmptyState searchRef={searchRef} />
          : items.map((hit) => (
              <SheetClose key={hit.objectID} asChild>
                <ProductPreview
                  id={hit.objectID}
                  title={hit.title}
                  orientation={"horizontal"}
                  handle={hit.handle}
                  thumbnail={hit.thumbnail}
                  variants={hit.variants as any}
                  metadata={hit.metadata as any}
                  region={region}
                />
              </SheetClose>
            ))
          }

          {Boolean(filteredDepartments.length) && (
            <>
              <h2 className="w-full p-3 mb-3 text-sm font-semibold border-b border-border">
                Departments
              </h2>
              {filteredDepartments.slice(0, 5).map((department) => (
                <SheetClose key={department.handle} asChild>
                  <NavItem
                    title={department.name}
                    href={handleWithoutCategory(department.handle.toLowerCase())}
                    className={"px-3"}
                  />
                </SheetClose>
              ))}
            </>
          )}

          {Boolean(filteredBrands.length) && (
            <>
              <h2 className="w-full p-3 mb-3 text-sm font-semibold border-b border-border">
                Brands
              </h2>
              {filteredBrands?.slice(0, 5).map((brand) => (
                <SheetClose key={brand.attributes?.BrandBanner?.Title} asChild>
                  <NavItem
                    logo={brand.attributes?.Logo.data}
                    title={brand.attributes?.BrandBanner?.Title}
                    className={"px-3 py-1.5"}
                    href={`/brands/${slugify(brand.attributes?.BrandBanner?.Title, {
                      lower: true,
                    })}`}
                  />
                </SheetClose>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchResults;
