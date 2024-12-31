import OrderCompletedTemplate from "@/components/order/templates/order-completed-template";
import { retrieveOrder } from "@/lib/medusaClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
};

export default async function OrderPage(props: Props) {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  return <OrderCompletedTemplate order={order} />;
}
