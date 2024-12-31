import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
} from "@tabler/icons-react"
import clsx from "clsx"
import React, { FC } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Button } from ".."

const createPagination = (params: {
  numberOfPages: number
  numberOfButtons: number
  currentPage: number
}) => {
  const {
    numberOfPages,
    currentPage,
    numberOfButtons,
  }: { numberOfPages: number; currentPage: number; numberOfButtons: number } =
    params

  if (currentPage > numberOfPages || currentPage < 1)
    return {
      pagination: [],
      currentPage,
    }

  const buttons = Array(numberOfPages)
    .fill(1)
    .map((e: number, i) => e + i)
  const sideButtons =
    numberOfButtons % 2 === 0 ? numberOfButtons / 2 : (numberOfButtons - 1) / 2

  const calculLeft = (rest = 0) => {
    return {
      array: buttons
        .slice(0, currentPage - 1)
        .reverse()
        .slice(0, sideButtons + rest)
        .reverse(),
      rest: function () {
        return sideButtons - this.array.length
      },
    }
  }

  const calculRight = (rest = 0) => {
    return {
      array: buttons.slice(currentPage).slice(0, sideButtons + rest),
      rest: function () {
        return sideButtons - this.array.length
      },
    }
  }

  const leftButtons = calculLeft(calculRight().rest()).array
  const rightButtons = calculRight(calculLeft().rest()).array

  return {
    pagination: [...leftButtons, currentPage, ...rightButtons],
    currentPage,
  }
}

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number
  numberOfPages: number

  // events
  pageOnClick: (page: number) => void
  nextOnClick: () => void
  previousOnClick: () => void
}

export const Pagination: FC<PaginationProps> = ({
  className,
  currentPage,
  numberOfPages,
  pageOnClick,
  nextOnClick,
  previousOnClick,
}) => {
  const mobile = useMediaQuery("(max-width: 640px)")
  const { pagination } = createPagination({
    numberOfPages,
    numberOfButtons: mobile ? 3 : 9,
    currentPage,
  })

  return (
    <ul className={clsx(className, "flex items-center sm:gap-2 gap-1")}>
      <li>
        <Button
          variant="outline"
          size={"icon"}
          onClick={() => pageOnClick(0)}
          disabled={pagination[0] === currentPage}
        >
          <IconChevronLeftPipe size={20} />
        </Button>
      </li>
      <li>
        <Button
          variant="outline"
          size={"icon"}
          onClick={previousOnClick}
          disabled={pagination[0] === currentPage}
        >
          <IconChevronLeft size={20} />
        </Button>
      </li>
      <div className="flex gap-2">
        {pagination.map((page, index) => (
          <li key={index}>
            <Button
              onClick={() => pageOnClick(page - 1)}
              variant={currentPage === page ? "secondary" : "ghost"}
              size={"icon"}
            >
              {page}
            </Button>
          </li>
        ))}
      </div>
      <li>
        <Button
          variant="outline"
          size={"icon"}
          onClick={nextOnClick}
          disabled={pagination.reverse()[0] === currentPage}
        >
          <IconChevronRight size={20} />
        </Button>
      </li>
      <li>
        <Button
          variant="outline"
          size={"icon"}
          onClick={() => pageOnClick(numberOfPages - 1)}
          disabled={pagination[0] === currentPage}
        >
          <IconChevronRightPipe size={20} />
        </Button>
      </li>
    </ul>
  )
}

export default Pagination
