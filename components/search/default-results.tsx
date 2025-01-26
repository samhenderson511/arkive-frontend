"use client";

import { ProductSearchResult } from "@/types";
import { IconX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import {
  useCurrentRefinements,
  useHits,
  useInstantSearch,
  usePagination,
} from "react-instantsearch";
import { Button } from "../ui/button";
import { Pagination } from "../ui/pagination";
import { Text } from "../ui/text";
import { DefaultHitSkeleton } from "./default-hit-skeleton";
import { Filters, FiltersProps } from "./filters";
import { SortBy } from "./sort-by";

const DefaultHit = dynamic(() => import("./default-hit"), {
  ssr: false,
  loading: () => <DefaultHitSkeleton />,
});

export function DefaultResults({ rootPath }: FiltersProps) {
  const { items, results } = useHits<ProductSearchResult>();
  const { status } = useInstantSearch();
  const { refine: setPage, currentRefinement: page, nbPages, canRefine } = usePagination();
  const { items: refinements, refine: refineRefinements } = useCurrentRefinements();

  const sectionRef = useRef<HTMLDivElement>(null);

  const emptyState = (
    <Text element="p" className="text-center py-8 w-full flex items-center justify-center">
      No results found
    </Text>
  );

  return (
    <div className="flex justify-center w-full px-4 lg:px-8">
      <div className="flex gap-8 w-full max-w-screen-2xl">
        <Filters rootPath={rootPath} />

        <div className="grid grow gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" ref={sectionRef}>
          <div className="col-span-full flex justify-between items-center">
            <Text element="h4" className="!text-sm my-3 text-muted-foreground">
              {results?.nbHits} results
            </Text>

            <SortBy
              items={[
                {
                  value: "arkive:products",
                  label: "Latest",
                },
                {
                  value: "arkive:products/sort/price:asc",
                  label: "Price: Low to High",
                },
                {
                  value: "arkive:products/sort/price:desc",
                  label: "Price: High to Low",
                },
                {
                  value: "arkive:products/sort/discount:asc",
                  label: "Discount: Low to High",
                },
                {
                  value: "arkive:products/sort/discount:desc",
                  label: "Discount: High to Low",
                },
              ]}
            />
          </div>

          {refinements?.some((item) =>
            item.refinements.some((refinement) => refinement.label !== rootPath)
          ) && (
            <div className="col-span-full flex gap-3 -mt-5">
              {refinements
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((item) =>
                  item.refinements
                    .filter((refinement) => refinement.label !== rootPath)
                    .map((refinement) => {
                      return (
                        <Button
                          onClick={() => {
                            refineRefinements(refinement);
                          }}
                          variant="secondary"
                          size="sm"
                          className="gap-2"
                          key={[item.indexName, item.label, refinement.label].join("/")}
                        >
                          {refinement.label}
                          <IconX className="size-4" />
                        </Button>
                      );
                    })
                )}
            </div>
          )}

          {!status || status === "loading" ?
            Array.from({ length: 10 }).map((_, i) => <DefaultHitSkeleton key={i} />)
          : !items?.length && status === "idle" ?
            emptyState
          : items.map((hit) => <DefaultHit key={hit.objectID} hit={hit} />)}

          {canRefine && (
            <div className="col-span-full flex justify-center items-center">
              <Pagination
                variant="numbers"
                totalPages={nbPages - 1}
                scrollTargetRef={sectionRef}
                currentPage={page || 1}
                onPageChange={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
