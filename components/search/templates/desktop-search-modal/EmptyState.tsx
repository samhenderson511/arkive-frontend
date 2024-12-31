"use client"
import { barlow } from "app/fonts"
import clsx from "clsx"
import { plural } from "pluralize"

export function EmptyState({
  searchRef,
}: {
  searchRef: React.MutableRefObject<HTMLInputElement>
}) {
  return (
    <div className="flex flex-col justify-center max-w-sm pb-16 mx-auto text-center h-96 gap-2">
      <h2 className={clsx("text-3xl uppercase", barlow.className)}>
        There's nothing here...
      </h2>
      <p className={"prose prose-sm dark:prose-invert"}>
        We've checked in the back and we don't have any{" "}
        {plural(searchRef.current?.value || "products")}
      </p>
    </div>
  )
}
