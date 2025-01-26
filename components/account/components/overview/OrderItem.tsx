"use client";

import { Button } from "@/components/ui";
import { Badge } from "@/components/ui/badge/index";
import { cn, formatAmount } from "@/lib/util";
import { getOrderStatus } from "@/lib/util/getOrderStatus";
import type { Order } from "@medusajs/client-types";
import { IconChevronRight } from "@tabler/icons-react";
import { ComponentProps, useMemo } from "react";

export function OrderItem({
  order,
  className,
  ...props
}: { order: Omit<Order, "beforeInsert"> } & ComponentProps<typeof Button>) {
  const numberOfProducts = useMemo(() => {
    return order.items.length;
  }, [order]);

  const status = getOrderStatus(order);

  return (
    <li>
      <Button
        variant={"outline"}
        className={cn(
          "flex !w-full !h-auto sm:!h-[4.25rem] items-center justify-between",
          className
        )}
        href={`/order/details/${order.id}`}
        {...props}
      >
        <div className="items-baseline flex-1 text-sm grid grid-cols-3 sm:grid-cols-7 gap-2 grow">
          <div className={"flex flex-col gap-1"}>
            <span className="font-semibold">Order #</span>
            <span className={"text-xs text-muted-foreground"}>#{order.display_id}</span>
          </div>
          <div className={"flex flex-col col-span-2 gap-1"}>
            <span className="font-semibold">Date</span>
            <span className={"text-xs text-muted-foreground col-span-2"}>
              {new Date(order.created_at).toDateString()}
            </span>
          </div>
          <div className={"flex flex-col gap-1"}>
            <span className="font-semibold">Total</span>
            <span className={"text-xs text-muted-foreground"}>
              {formatAmount({
                amount: order.total,
                region: order.region,
                includeTaxes: false,
              })}
            </span>
          </div>
          <div className={"flex flex-col gap-1 items-start lg:col-span-2"}>
            <span className="font-semibold col-span-2">Status</span>
            <span className={"text-xs"}>
              <Badge className={"line-clamp-1 "} variant={status.variant}>
                {status.text}
              </Badge>
            </span>
          </div>
          <div className={"flex flex-col gap-1"}>
            <span className="font-semibold">Items</span>
            <span className={"text-xs text-muted-foreground"}>{numberOfProducts}</span>
          </div>
        </div>
        <span className="sr-only">Go to order #{order.display_id}</span>
        <IconChevronRight size={20} />
      </Button>
    </li>
  );
}
