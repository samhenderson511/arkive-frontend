import AccountLayout from "@/components/account/templates/account-layout";
import { getCustomer } from "@/lib/medusaClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Your account page.",
  robots: "noindex",
};

export default async function AccountPageLayout({
  dashboard,
  login,
}: {
  dashboard?: React.ReactNode;
  login?: React.ReactNode;
}) {
  const customer = await getCustomer().catch(() => null);

  return <AccountLayout customer={customer}>{customer ? dashboard : login}</AccountLayout>;
}
