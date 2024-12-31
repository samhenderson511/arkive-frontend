import AddressBook from "@/components/account/components/address-book";
import { AccountPageLayout } from "@/components/account/templates/account-page-layout";
import { getRegion } from "@/lib/data";
import { getCustomer } from "@/lib/medusaClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoreTabPageProps } from "types/global";

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
};

export default async function Addresses(props: StoreTabPageProps) {
  const params = await props.params;
  const customer = await getCustomer();
  const region = await getRegion(params.countryCode);

  if (!customer || !region) {
    notFound();
  }

  return (
    <AccountPageLayout
      title={"Addresses"}
      description={
        "View and update your shipping addresses, you can add as many as you like. Saving your addresses will make them available during checkout."
      }
      customer={customer}
    >
      <AddressBook customer={customer} region={region} />
    </AccountPageLayout>
  );
}
