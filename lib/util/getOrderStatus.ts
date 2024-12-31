import { BadgeProps } from "@/components/common/badge";
import type { Order } from "@medusajs/client-types";

export function getOrderStatus(order: Omit<Order, "beforeInsert">): {
  text: string;
  variant: BadgeProps["variant"];
} {
  if (order.fulfillment_status === "fulfilled" || order.fulfillment_status === "shipped") {
    return { text: "Dispatched", variant: "success" };
  } else if (order.payment_status === "awaiting") {
    return { text: "Pending Payment", variant: "warning" };
  }
  return { text: "Processing", variant: "info" };
}
