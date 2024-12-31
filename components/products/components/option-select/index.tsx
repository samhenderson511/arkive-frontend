import { Button } from "@/components/common";
import colours from "@/lib/colours.json";
import { getOptions } from "@/lib/util/product-option-sorters";
import { sortClothingSizes } from "@/lib/util/sortSizes";
import { addOrUpdateSearchParam, removeSearchParam } from "@/lib/util/updateSearchParams";
import { PricedVariant } from "@medusajs/client-types";
import { IconRestore } from "@tabler/icons-react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

type OptionSelectProps = {
  current: string;
  title: string;
  hasStock: PricedVariant[];
};

const OptionSelect: React.FC<OptionSelectProps> = ({ current, title, hasStock }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const colour = searchParams.get("Colour");
  const size = searchParams.get("Size");
  const pathname = usePathname();

  const filteredOptions = useMemo(() => {
    const options = getOptions(hasStock as any, title.toLowerCase());
    if (title.toLowerCase() === "size") {
      return sortClothingSizes(options);
    } else {
      return options;
    }
  }, [hasStock, title]);

  return (
    <div className="flex flex-col gap-2">
      <div className={"flex justify-between items-baseline gap-2"}>
        <h4 className="font-semibold">{title}</h4>
        {
          <Button
            onClick={() =>
              router.push(pathname + "?" + removeSearchParam({ searchParams, key: title }), {
                scroll: false,
              })
            }
            className={clsx("gap-3", !current && "invisible")}
            variant={"link"}
            size={"sm"}
          >
            <IconRestore size={16} />
            Reset
          </Button>
        }
      </div>
      <div className="flex flex-wrap gap-1 sm:gap-3">
        {filteredOptions?.map((v) => {
          const colourGroup1 = hasStock.find(
            (variant) => variant.options.find((o) => o.value === v)?.value
          )?.metadata?.colourGroup1;
          const colourGroup2 = hasStock.find(
            (variant) => variant.options.find((o) => o.value === v)?.value
          )?.metadata?.colourGroup2;
          const primary =
            colours[colourGroup1?.toLowerCase()]?.tailwindBg || "bg-muted border-border";
          const secondary =
            colours[colourGroup2?.toLowerCase()]?.tailwindBg || "bg-muted-foreground";

          const isDisabled = !hasStock.some((variant) => {
            // Check if the variant includes the currently iterated option value
            const hasCurrent = variant.options.some((option) => option.value === v);

            // Only check for a match with the other attribute if one is already selected
            const isOtherAttributeSelected = title.toLowerCase() === "size" ? colour : size;
            const hasOtherAttribute =
              isOtherAttributeSelected ?
                variant.options.some(
                  (option) => option.value === (title.toLowerCase() === "size" ? colour : size)
                )
              : true; // If other attribute not selected, default to true

            return hasCurrent && hasOtherAttribute;
          });

          return (
            <Button
              onClick={() =>
                router.push(
                  pathname +
                    "?" +
                    addOrUpdateSearchParam({
                      searchParams,
                      key: title,
                      value: v,
                    }),
                  { scroll: false }
                )
              }
              disabled={isDisabled}
              key={v}
              size={"lg"}
              variant={current === v ? "secondary" : "outline"}
            >
              {title === "Colour" && (
                <div
                  className={clsx(
                    `relative -translate-x-4 flex items-center justify-center overflow-hidden transition ease-out border rounded-full h-6 w-6 z-10`,
                    primary,
                    isDisabled && "opacity-50"
                  )}
                >
                  <div className="rotate-45 -z-10 h-14 absolute w-14 flex gap-0.5">
                    <div className={clsx("w-full", primary)} />
                    {colourGroup2 && <div className={clsx("w-full", secondary)} />}
                  </div>
                </div>
              )}
              {v}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelect;
