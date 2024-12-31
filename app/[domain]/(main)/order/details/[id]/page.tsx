import OrderCompletedTemplate from "@/components/order/templates/order-completed-template";
import { retrieveOrder } from "@/lib/medusaClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  return {
    title: `Order #${order.display_id}`,
    description: `View your order`,
  };
}

export default async function CollectionPage(props: Props) {
  const params = await props.params;
  const order = await retrieveOrder(params.id).catch(() => null);

  return <OrderCompletedTemplate order={order} />;
}
