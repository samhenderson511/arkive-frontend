import { BlocksRenderer, Logo } from "@/components";
import { ApiSite } from "@/types";
import Link from "next/link";

export async function SiteInfo({ site }: { site: ApiSite }) {
  const logo = {
    src: site.logo.url || "",
    alt: site.logo.alternativeText || "",
    width: site.logo.width || 0,
    height: site.logo.height || 0,
  };

  return (
    <div className="flex flex-col text-muted-foreground items-start justify-center gap-6">
      <Link href={`/`}>
        <Logo className={"h-14 !max-w-40"} logo={logo} />
      </Link>

      <BlocksRenderer className="text-sm" content={site.footerDescription} />
    </div>
  );
}
