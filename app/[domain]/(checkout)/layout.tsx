import { Button, Logo } from "@/components/ui";
import { getCategoryFromDomain } from "@/lib/data";
import { IconChevronDown } from "@tabler/icons-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { StoreTabPageProps } from "types/global";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout",
  robots: "noindex",
};

const ModeToggle = dynamic(() => import("@/components/layout/components/theme-dropdown"));

export default async function CheckoutLayout(
  props: {
    children: React.ReactNode;
  } & StoreTabPageProps
) {
  const params = await props.params;

  const { children } = props;

  const { tab } = await getCategoryFromDomain(params.domain);
  return (
    <div className="relative w-full bg-background sm:min-h-screen divide-y divide-border">
      <nav className="items-center h-16 px-4 mx-auto grid grid-cols-3 bg-background max-w-screen-2xl sm:px-8">
        <Button href="/cart" className="gap-3" variant={"link"}>
          <IconChevronDown className="rotate-90" size={16} />
          <span className="hidden mt-px sm:block txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base ">
            Back to shopping cart
          </span>
          <span className="block mt-px sm:hidden txt-compact-plus text-ui-fg-subtle hover:text-ui-fg-base">
            Back
          </span>
        </Button>
        <Link href="/" className={"flex justify-center items-center"}>
          <Logo logo={tab.Logo.data} />
        </Link>
        <div className={"flex justify-end items-center"}>
          <ModeToggle />
        </div>
      </nav>

      <div className="relative flex justify-center">{children}</div>
    </div>
  );
}
