import Overview from "@/components/account/components/overview";
import { getCustomer, listCustomerOrders } from "@/lib/medusaClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
};

export default async function OverviewTemplate() {
  const customer = await getCustomer().catch(() => null);
  const orders = (await listCustomerOrders().catch(() => null)) || null;

  if (!customer) {
    notFound();
  }

  return <Overview customer={customer} orders={orders} />;
}
