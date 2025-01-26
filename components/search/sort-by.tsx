"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import type { UseSortByProps } from "react-instantsearch";
import { useSortBy } from "react-instantsearch";

export function SortBy(props: UseSortByProps) {
  const { currentRefinement, options, refine } = useSortBy(props);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2 font-medium px-4 py-2">
            Sort by{" "}
            {options.find((option) => option.value === currentRefinement)?.label.toLowerCase()}
            {currentRefinement.includes("asc") ?
              <IconSortAscending className="h-4 w-4" />
            : <IconSortDescending className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuRadioGroup
            value={currentRefinement}
            onValueChange={(value) => refine(value)}
          >
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
