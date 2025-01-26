"use client";

import { IconChevronLeft, IconChevronRight, IconCircleFilled, IconDots } from "@tabler/icons-react";
import clsx from "clsx";
import { Button } from "./button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  variant?: "default" | "dots" | "numbers";
  loop?: boolean;
  onPageChange: (page: number) => void;
  scrollTargetRef?: React.RefObject<HTMLDivElement | null>;
  hideButtons?: boolean;
}

export const Pagination = ({
  currentPage,
  loop,
  variant = "default",
  totalPages,
  hideButtons,
  scrollTargetRef,
  ...props
}: PaginationProps) => {
  const { onPageChange } = props;

  const handlePageChange = (page: number) => {
    if (loop && page < 1) onPageChange(totalPages);
    else if (loop && page > totalPages) onPageChange(1);
    else onPageChange(page);

    // Scroll to the target if the ref is provided
    if (scrollTargetRef?.current) {
      window.scrollTo({
        behavior: "smooth",
        top: scrollTargetRef.current.offsetTop - 100,
      });
    }
  };

  const sideButtons = 2; // Number of buttons to show on each side

  const getNumberButtons = () => {
    const buttons = [];
    const leftEdge = Math.max(1, currentPage - sideButtons);
    const rightEdge = Math.min(totalPages, currentPage + sideButtons);

    // Add the first page if necessary
    if (leftEdge > 1) {
      buttons.push(1);
      if (leftEdge > 2) buttons.push("...");
    }

    // Add the range of visible pages
    for (let i = leftEdge; i <= rightEdge; i++) {
      buttons.push(i);
    }

    // Add the last page if necessary
    if (rightEdge < totalPages) {
      if (rightEdge < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }

    return buttons;
  };

  const numberButtons = getNumberButtons();
  const paginationRange = 4;

  return (
    <div className={"flex gap items-center justify-center gap-6"}>
      {!hideButtons && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 && !loop}
        >
          <IconChevronLeft aria-label={"Previous"} size={20} />
        </Button>
      )}

      <div className={"flex items-center gap-2"}>
        {/* DEFAULT VERSION */}
        {variant === "default" && (
          <span>
            {currentPage} of {totalPages}
          </span>
        )}

        {/* DOTS */}
        {variant === "dots" &&
          Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;

            let size = 0.75;
            const pageDifference = Math.abs(currentPage - page);
            if (pageDifference === 2) size = 0.66;
            if (pageDifference === 3) size = 0.5;
            if (pageDifference > 3) size = 0.33;

            if (
              pageDifference > paginationRange &&
              (1 < page - paginationRange || totalPages > page + paginationRange)
            )
              return null;

            return (
              <Button
                key={page}
                variant={"link"}
                className={clsx("text-current", variant === "dots" ? "size-6" : "")}
                size={"icon"}
                title={page.toString()}
                onClick={() => handlePageChange(page)}
              >
                <IconCircleFilled
                  className={clsx(
                    currentPage !== page && "opacity-30",
                    "transition-all duration-300"
                  )}
                  size={`${size}rem`}
                />
              </Button>
            );
          })}

        {/* NUMBERS */}
        {variant === "numbers" &&
          numberButtons.map((page, index) => {
            if (typeof page === "string")
              return (
                <Button key={`${page}-${index}`} variant={"ghost"} size={"icon"} disabled>
                  <IconDots />
                </Button>
              );

            return (
              <Button
                key={page}
                variant={page === currentPage ? "secondary" : "ghost"}
                size={"icon"}
                title={page.toString()}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            );
          })}
      </div>

      {!hideButtons && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages && !loop}
        >
          <IconChevronRight aria-label={"Next"} size={20} />
        </Button>
      )}
    </div>
  );
};
