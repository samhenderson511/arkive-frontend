import { Button } from "@/components/common";
import { NavigationMenuItem, NavigationMenuLink } from "@/components/common/navigation-menu";
import { ComponentProps } from "react";

export const NewArrivals = ({ ...rest }: ComponentProps<typeof Button>) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Button size={"sm"} variant={"ghost"} href={"/new-arrivals"} {...rest}>
        New Arrivals
      </Button>
    </NavigationMenuLink>
  </NavigationMenuItem>
);
