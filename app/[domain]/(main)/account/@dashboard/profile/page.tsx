import ProfilePhone from "@/components/account//components/profile-phone";
import ProfileBillingAddress from "@/components/account/components/profile-billing-address";
import ProfileEmail from "@/components/account/components/profile-email";
import ProfileName from "@/components/account/components/profile-name";
import ProfilePassword from "@/components/account/components/profile-password";
import { AccountPageLayout } from "@/components/account/templates/account-page-layout";
import { getRegions } from "@/lib/data";
import { getCustomer } from "@/lib/medusaClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile.",
};

export default async function Profile() {
  const customer = await getCustomer();
  const regions = await getRegions();

  if (!customer || !regions) {
    notFound();
  }

  return (
    <AccountPageLayout
      title={"Profile"}
      description={
        "View and update your profile information, including your name, email, and phone number. You can also update your billing address, or change your password."
      }
      customer={customer}
    >
      <div className="flex flex-col w-full gap-y-8">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfilePassword customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} />
      </div>
    </AccountPageLayout>
  );
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />;
};
