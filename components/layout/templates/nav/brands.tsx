import { Button } from "@/components/common";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/common/navigation-menu";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import slugify from "slugify";
import { BannerBrand } from "types/strapi";
import { NavItem } from "./nav-item";

export const Brands = ({ brands }: { brands: BannerBrand[] }) => {
  const [parent] = useAutoAnimate();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger asChild>
        <Button href={"/brands"} variant={"ghost"} className="!duration-0" size={"sm"}>
          Brands
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
          ref={parent}
        >
          {brands
            ?.sort((a, b) =>
              a.attributes.BrandBanner.Title.localeCompare(b.attributes.BrandBanner.Title)
            )
            .map((brand) => (
              <NavigationMenuLink asChild key={brand.attributes?.BrandBanner?.Title}>
                <NavItem
                  logo={brand.attributes?.Logo.data}
                  title={brand.attributes?.BrandBanner?.Title}
                  href={`/brands/${slugify(brand.attributes?.BrandBanner?.Title, {
                    lower: true,
                  })}`}
                />
              </NavigationMenuLink>
            ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
