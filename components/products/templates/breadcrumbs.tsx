import { Button } from "@/components/ui";
import { handleWithoutCategory } from "@/lib/util/handleWithoutCategory";
import clsx from "clsx";
import { Fragment } from "react";

export const Breadcrumbs = ({ product }) => {
  let current = "";
  const breadcrumbs = handleWithoutCategory(product.handle).split("/").filter(Boolean);

  return (
    <div className={"flex gap-x-4 justify-center flex-wrap items-center"}>
      {breadcrumbs.map((word, i) => {
        current += "/" + word;

        return (
          <Fragment key={word}>
            <Button
              className={clsx(i === breadcrumbs.length - 1 && "pointer-events-none")}
              href={current}
              variant={"link"}
            >
              {word.replace(/-/g, " ")}
            </Button>
            <span className={"last:hidden text-xs text-muted-foreground"}>/</span>
          </Fragment>
        );
      })}
    </div>
  );
};
