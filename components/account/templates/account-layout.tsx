import Help from "@/components/order/components/help";
import type { Customer } from "@medusajs/client-types";
import Link from "next/link";
import React from "react";
import AccountNav from "../components/account-nav";

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null;
  children: React.ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ customer, children }) => {
  return (
    <div className="flex justify-center flex-1 lg:py-12 lg:px-8 bg-card">
      <div className="flex flex-col flex-1 h-full max-w-5xl divide-y rounded-sm lg:border border-border bg-background divide-border">
        <div className="flex items-stretch gap-8 px-4 py-6 lg:py-12 lg:px-8">
          {customer && (
            <div className="hidden w-full lg:flex lg:max-w-64">
              <AccountNav />
            </div>
          )}
          <div className="flex-1">{children}</div>
        </div>
        <Help
          title={"Got a question?"}
          description={
            <>
              {"You can find frequently asked questions and answers "}
              <Link href={"/support/faqs"} className={"underline"}>
                here
              </Link>
              {". Or, contact customer support"}
            </>
          }
        />
      </div>
    </div>
  );
};

export default AccountLayout;
