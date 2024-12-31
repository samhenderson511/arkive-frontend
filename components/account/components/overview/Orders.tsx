"use client"

import { OrderItem } from "./OrderItem"
import { OrdersEmptyState } from "./OrdersEmptyState"
import { AccountOverviewHeading } from "./AccountOverviewHeading"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { OverviewProps } from "."

export const Orders = ({ orders, isLoading }: OverviewProps) => {
  const [parent] = useAutoAnimate()

  return (
    <AccountOverviewHeading title={"Recent Orders"} className={"col-span-2"}>
      <ul className="flex flex-col gap-y-3" ref={parent}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <li
              key={index}
              className="w-full h-[4.25rem] bg-muted animate-pulse"
            />
          ))
        ) : Boolean(orders?.length) ? (
          orders
            .slice(0, 5)
            .map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <OrdersEmptyState />
        )}
      </ul>
    </AccountOverviewHeading>
  )
}
