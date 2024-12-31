import OrderOverview from "@/components/account/components/order-overview";
import { AccountPageLayout } from "@/components/account/templates/account-page-layout";
import { getCustomer, listCustomerOrders } from "@/lib/medusaClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Orders",
  description: "Overview of your previous orders.",
};

export default async function Orders() {
  const orders = await listCustomerOrders();
  const customer = await getCustomer();

  if (!orders) {
    notFound();
  }

  return (
    <AccountPageLayout
      title={"Orders"}
      description={
        "View your previous orders and their status. You can also create returns or exchanges for your orders if needed."
      }
      customer={customer}
    >
      <OrderOverview orders={orders as any} />
    </AccountPageLayout>
  );
}
