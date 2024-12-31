import Item from "@/components/cart/components/item";
import type { LineItem, Region } from "@medusajs/client-types";
import { barlow } from "app/fonts";
import clsx from "clsx";

type ItemsTemplateProps = {
  items?: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[];
  region?: Region;
};

const ItemsTemplate = ({ items, region }: ItemsTemplateProps) => (
  <>
    <div className="flex items-center pb-3 border-b border-border">
      <h1 className={clsx(barlow.className, "text-3xl uppercase")}>Shopping Bag</h1>
    </div>
    <div className="py-8 grid grid-cols-1 gap-y-8">
      {items
        .sort((a, b) => {
          return a.created_at > b.created_at ? -1 : 1;
        })
        .map((item) => {
          return <Item canChangeQty key={item.id} item={item} region={region} />;
        })}
    </div>
  </>
);

export default ItemsTemplate;
