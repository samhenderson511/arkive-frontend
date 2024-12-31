import { Button } from "@/components/common";
import { NavigationMenuItem, NavigationMenuLink } from "@/components/common/navigation-menu";
import { ComponentProps } from "react";

export const Sale = ({ ...rest }: ComponentProps<typeof Button>) => (
  <NavigationMenuItem>
    <NavigationMenuLink asChild>
      <Button size={"sm"} variant={"ghost"} href={"/sale"} {...rest}>
        Sale
      </Button>
    </NavigationMenuLink>
  </NavigationMenuItem>
);
