"use client";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common";
import LineItemOptions from "@/components/common/line-item-options";
import { ProductPrice } from "@/components/products/components";
import { Thumbnail } from "@/components/products/components/thumbnail";
import { deleteLineItem, updateLineItem } from "@/lib/data";
import type { LineItem, Region } from "@medusajs/client-types";
import { PricedVariant } from "@medusajs/client-types";
import { IconTrash } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import Link from "next/link";

type ItemProps = {
  item: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">;
  canChangeQty?: boolean;
  canDelete?: boolean;
  region: Region;
};

const Item = ({ item, canChangeQty, region, canDelete = true }: ItemProps) => (
  <div className="flex items-center w-full gap-x-6">
    <Link href={(item as any)?.handle?.toLowerCase() || ""} className="w-1/4 max-w-32">
      <Thumbnail thumbnail={item.thumbnail} size="full" alt={item.title} />
    </Link>
    <div className="flex flex-col justify-between h-full gap-1 grow">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <Link
            href={(item as any)?.handle?.toLowerCase() || ""}
            className={clsx(barlow.className, "text-xl")}
          >
            {item.title}
          </Link>
          <LineItemOptions variant={item.variant} />
        </div>
        {canChangeQty ?
          <Select
            value={String(item.quantity)}
            onValueChange={(value) =>
              updateLineItem({
                lineId: item.id,
                quantity: parseInt(value),
              })
            }
          >
            <SelectTrigger className={"w-max min-w-32"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                [
                  ...Array(
                    item.variant.inventory_quantity > 0 ? item.variant.inventory_quantity : 10
                  ),
                ].keys()
              )
                .slice(0, 10)
                .map((i) => {
                  const value = i + 1;
                  return (
                    <SelectItem value={String(value)} key={i}>
                      {value}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        : <span className="text-sm">Quantity: {item.quantity}</span>}
      </div>
      <div className="flex items-center justify-between">
        {canDelete && (
          <Button
            onClick={() => deleteLineItem(item.id)}
            variant={"link"}
            className="flex items-center gap-3"
          >
            <IconTrash size={14} />
            Remove
          </Button>
        )}
        <ProductPrice
          quantity={item.quantity}
          className={"!h-auto"}
          variant={item.variant as unknown as PricedVariant}
          region={region}
        />
      </div>
    </div>
  </div>
);

export default Item;
