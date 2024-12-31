import { getProfileCompletion } from "@/lib/util/getProfileCompletion";
import type { Customer, Order } from "@medusajs/client-types";
import { AccountPageLayout } from "../../templates/account-page-layout";
import { AccountOverviewHeading } from "./AccountOverviewHeading";
import { Orders } from "./Orders";

export type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash">;
  isLoading?: boolean;
};

function Overview({ customer, isLoading, orders }: OverviewProps) {
  return (
    <AccountPageLayout title={`Hey, ${customer.first_name}`} customer={customer}>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AccountOverviewHeading title={"Profile"}>
          <div className="flex items-baseline gap-x-2">
            <span className="text-4xl font-bold leading-none">
              {getProfileCompletion(customer)}%
            </span>
            <span className="uppercase text-muted-foreground">Completed</span>
          </div>
        </AccountOverviewHeading>

        <AccountOverviewHeading title={"Addresses"}>
          <div className="flex items-baseline gap-x-2">
            <span className="text-4xl font-bold leading-none">
              {customer?.shipping_addresses?.length || 0}
            </span>
            <span className="uppercase text-muted-foreground">Saved</span>
          </div>
        </AccountOverviewHeading>

        <Orders customer={customer} isLoading={isLoading} orders={orders} />
      </div>
    </AccountPageLayout>
  );
}

export default Overview;
