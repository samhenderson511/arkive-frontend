import { BlocksRenderer, Logo } from "@/components";
import { transformAsset } from "@/lib/util/transform-asset";
import { ApiSite } from "@/types";
import Link from "next/link";

export async function SiteInfo({ site }: { site: ApiSite }) {
  const logo = await transformAsset(site.logo);

  return (
    <div className="flex flex-col text-muted-foreground items-start justify-center gap-6">
      <Link href={`/`}>
        <Logo className={"h-14 !max-w-40"} logo={logo} />
      </Link>

      <BlocksRenderer className="text-sm" content={site.footerDescription} />
    </div>
  );
}
