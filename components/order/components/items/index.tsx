import Item from "@/components/cart/components/item";
import { enrichLineItems } from "@/lib/data/enrichLineItems";
import type { LineItem, Region } from "@medusajs/client-types";

type ItemsProps = {
  items: LineItem[];
  region: Region;
  cartId: string;
};

const Items = async ({ items, region }: ItemsProps) => {
  const enrichedItems = await enrichLineItems(items, region.id);

  return (
    <div className="flex flex-col py-8 border-b border-border gap-y-4">
      {enrichedItems?.map((item) => (
        <Item canDelete={false} key={item.id} item={item} region={region} />
      ))}
    </div>
  );
};

export default Items;
