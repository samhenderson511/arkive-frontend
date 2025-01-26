"use client";

import { SheetContent } from "@/components/common/sheet";
import { Button } from "@/components/ui";
import type { Customer } from "@medusajs/client-types";
import { IconMenu } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useState } from "react";
import AccountNav from "../components/account-nav";

const Sheet = dynamic(() => import("@/components/common/sheet"));

interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
  customer: Omit<Customer, "password_hash">;
}

export function AccountPageLayout({ children, customer, description, title }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={"flex flex-col gap-4"}>
        <div className={"flex gap-3 items-center"}>
          <div className={"flex items-start lg:hidden self-stretch justify-center"}>
            <Button onClick={() => setOpen(true)} variant="ghost" size={"icon"}>
              <IconMenu size={20} />
            </Button>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col items-baseline justify-between w-full sm:flex-row">
              <h1 className={clsx(barlow.className, "uppercase text-3xl")}>{title}</h1>
              <p className="flex prose prose-sm dark:prose-invert gap-1">
                Signed in as:
                <b>{customer?.email}</b>
              </p>
            </div>
            {description && (
              <p className="prose prose-sm dark:prose-invert max-w-none">{description}</p>
            )}
          </div>
        </div>
        <hr className={"border-border mb-4"} />
        {children}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side={"left"}>
          <AccountNav />
        </SheetContent>
      </Sheet>
    </>
  );
}
