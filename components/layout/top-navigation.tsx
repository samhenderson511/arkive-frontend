import { cn } from "@/lib";
import { ApiSite } from "@/types";
import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "../ui/logo";

export async function TopNavigation({ sites, site }: { sites: ApiSite[]; site: ApiSite }) {
  const logo = {
    src: site.logo.url || "",
    alt: site.logo.alternativeText || "",
    width: site.logo.width || 0,
    height: site.logo.height || 0,
  };

  return (
    <div className="flex h-14 px-8 justify-center w-full border-b border-border/30">
      <div className="grid grid-cols-1 lg:grid-cols-3 max-w-screen-2xl w-full">
        <div className="flex items-center lg:gap-8">
          {sites.map(({ category }) => (
            <Button
              variant="link"
              size="sm"
              className={cn(
                site.category.name !== category.name && "text-muted-foreground",
                "p-0 grow text-xs lg:grow-0 hover:no-underline hover:text-foreground"
              )}
              key={category.name}
              href={`https://${site.domain}`}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <Link href={`/`}>
            <Logo logo={logo} />
          </Link>
        </div>
      </div>
    </div>
  );
}
