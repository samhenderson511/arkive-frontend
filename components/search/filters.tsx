"use client";

import { cn } from "@/lib";
import colourGroups from "@/lib/colour-groups.json";
import { sortClothingSizes } from "@/lib/server";
import { useHierarchicalMenu, useRefinementList } from "react-instantsearch";
import { Checkbox } from "../form/checkbox";
import { Input } from "../form/input";
import { Label } from "../form/label";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { HierarchicalMenu } from "./hierarchical-menu";
import { RangeFilter } from "./range-filter";

export interface FiltersProps {
  rootPath: string;
}

function FilterTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text element="h4" className="!text-sm py-3 border-b border-border">
      {children}
    </Text>
  );
}

export function Filters({ rootPath }: FiltersProps) {
  const {
    items: brands,
    refine: refineBrands,
    searchForItems: searchForBrands,
    toggleShowMore: toggleShowMoreBrands,
    isShowingMore: showMoreBrands,
    canToggleShowMore: canToggleShowMoreBrands,
  } = useRefinementList({ attribute: "brand" });

  const { items: categories, refine: refineCategories } = useHierarchicalMenu({
    attributes: ["categories.cat", "categories.dept", "categories.subDept"],
    rootPath,
    separator: " > ",
  });

  const { items: sizes, refine: refineSizes } = useRefinementList({ attribute: "sizes" });

  const { items: colors, refine: refineColors } = useRefinementList({ attribute: "colourGroups" });

  return (
    <aside className="lg:flex flex-col hidden lg:border-r basis-80 shrink-0 border-border lg:pr-8 gap-5">
      {brands?.length > 0 && (
        <>
          <FilterTitle>Brands</FilterTitle>

          <Input placeholder="Search brands" onChange={(e) => searchForBrands(e.target.value)} />

          <ul className="flex flex-col gap-1">
            {brands?.map((brand) => (
              <li key={brand.value}>
                <Label className="flex text-muted-foreground items-center gap-3">
                  <Checkbox
                    checked={brand.isRefined}
                    onCheckedChange={() => refineBrands(brand.value)}
                  />
                  <Text element="span" className="grow">
                    {brand.label}
                  </Text>
                  <Badge className="text-muted-foreground" variant="outline">
                    {brand.count}
                  </Badge>
                </Label>
              </li>
            ))}
            {canToggleShowMoreBrands && (
              <Button className="pl-6" variant="link" onClick={toggleShowMoreBrands}>
                {showMoreBrands ? "Show less" : "Show more"}
              </Button>
            )}
          </ul>
        </>
      )}

      {categories?.length > 0 && (
        <>
          <FilterTitle>Categories</FilterTitle>

          <HierarchicalMenu items={categories} refine={refineCategories} />
        </>
      )}

      {sizes?.length > 0 && (
        <>
          <FilterTitle>Price</FilterTitle>

          <RangeFilter attribute="salePrice" />
        </>
      )}

      {sizes?.length > 0 && (
        <>
          <FilterTitle>Sizes</FilterTitle>

          <ul className="flex flex-wrap gap-3">
            {sortClothingSizes(sizes)?.map((size) => (
              <li key={size.value}>
                <Button
                  size="sm"
                  variant={size.isRefined ? "secondary" : "outline"}
                  onClick={() => refineSizes(size.value)}
                >
                  {size.label}
                </Button>
              </li>
            ))}
          </ul>
        </>
      )}

      {colors?.length > 0 && (
        <>
          <FilterTitle>Colours</FilterTitle>

          <ul className="flex flex-col gap-1">
            {colors?.map((color) => (
              <li key={color.value}>
                <Label className="flex text-muted-foreground items-center gap-3">
                  <Checkbox
                    checked={color.isRefined}
                    className={cn(
                      colourGroups[color.value as keyof typeof colourGroups],
                      "size-8 rounded-full ring-background ring-1 ring-inset"
                    )}
                    onCheckedChange={() => refineColors(color.value)}
                  />
                  <Text element="span" className="grow">
                    {color.label}
                  </Text>
                  <Badge className="text-muted-foreground" variant="outline">
                    {color.count}
                  </Badge>
                </Label>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
