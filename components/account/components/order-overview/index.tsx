import type { Order } from "@medusajs/client-types"
import OrderCard from "../order-card"
import { OrdersEmptyState } from "../overview/OrdersEmptyState"

const OrderOverview = async ({ orders }: { orders: Order[] }) => {
  if (!orders?.length) {
    return <OrdersEmptyState />
  }

  return (
    <ul className="flex flex-col w-full gap-y-3">
      {orders.map((o) => (
        <OrderCard key={o.id} order={o} region={o.region} />
      ))}
    </ul>
  )
}

export default OrderOverview
