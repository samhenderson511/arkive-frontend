import { Button } from "@/components/common";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/common/navigation-menu";
import { handleWithoutCategory } from "@/lib/util/handleWithoutCategory";
import { ProductCategory } from "@medusajs/product";
import { NavItem } from "./nav-item";

interface Props {
  departments: ProductCategory[];
}

export const Departments = ({ departments }: Props) =>
  departments.map((dep) => (
    <NavigationMenuItem key={handleWithoutCategory(dep.handle)}>
      <NavigationMenuTrigger asChild>
        <Button
          href={handleWithoutCategory(dep.handle)}
          variant={"ghost"}
          size={"sm"}
          className="!duration-0"
        >
          {dep.name}
        </Button>
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="w-full grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {(dep.category_children as unknown as ProductCategory[]).map((subDep) => (
            <NavigationMenuLink asChild key={handleWithoutCategory(subDep.handle)}>
              <NavItem title={subDep.name} href={handleWithoutCategory(subDep.handle)} />
            </NavigationMenuLink>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  ));
