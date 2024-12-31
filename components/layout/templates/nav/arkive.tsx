import { Button } from "@/components/common";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/common/navigation-menu";
import { RichTextPage } from "types/strapi";
import { NavItem } from "./nav-item";

export const Arkive = ({ pages }: { pages: RichTextPage[] }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger asChild>
      <Button href={"/support"} variant={"ghost"} className="!duration-0" size={"sm"}>
        Support
      </Button>
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        <NavItem href={`/contact`} title={"Contact"} />
        <NavItem href={`/support/faqs`} title={"FAQs"} />
        {pages
          .filter((page) => page.attributes.ShowInMainNav)
          .map((page) => (
            <NavigationMenuLink asChild key={page.id}>
              <NavItem
                href={`/support/${page.attributes.PageSlug}`}
                title={page.attributes.PageTitle}
              />
            </NavigationMenuLink>
          ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);
