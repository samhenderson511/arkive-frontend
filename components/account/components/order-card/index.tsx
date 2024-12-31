import Item from "@/components/cart/components/item";
import type { Order, Region } from "@medusajs/client-types";
import { OrderItem } from "../overview/OrderItem";

type OrderCardProps = {
  order: Omit<Order, "beforeInsert">;
  region: Region;
};

const OrderCard = ({ order, region }: OrderCardProps) => (
  <div className="flex flex-col">
    <OrderItem order={order} className={"rounded-b-none"} />
    <ul className="flex flex-col border border-t-0 rounded-b-sm divide-y divide-border border-border">
      {order.items.map((item) => (
        <li className={"flex p-4 w-full"}>
          <Item key={item.id} item={item} canDelete={false} region={region} />
        </li>
      ))}
    </ul>
  </div>
);

export default OrderCard;
