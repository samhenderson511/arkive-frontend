import { Button, Logo } from "@/components";
import { getSite } from "@/lib/server";
import { IconChevronLeft } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout",
  robots: "noindex",
};

export default async function CheckoutLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  const site = await getSite(domain, {
    populate: ["logo"],
  });
  const logo = {
    src: site.logo.url || "",
    alt: site.logo.alternativeText || "",
    width: site.logo.width || 0,
    height: site.logo.height || 0,
  };

  return (
    <div className="relative w-full bg-background sm:min-h-screen divide-y divide-border">
      <nav className="items-center justify-items-center h-16 px-4 mx-auto grid grid-cols-3 bg-background max-w-screen-2xl sm:px-8">
        <Button href="/cart" className="gap-3" variant={"link"}>
          <IconChevronLeft size={16} />
          Back
        </Button>

        <Link href="/" className={"flex justify-center w-max items-center"}>
          <Logo logo={logo} />
        </Link>
      </nav>

      <div className="relative flex justify-center">{children}</div>
    </div>
  );
}
