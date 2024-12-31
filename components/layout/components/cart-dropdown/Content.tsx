import Item from "@/components/cart/item";
import { Button } from "@/components/common";
import { SheetClose, SheetFooter } from "@/components/common/sheet";
import { formatAmount } from "@/lib/util";
import type { Cart, LineItem } from "@medusajs/client-types";
import Image from "next/image";

export function Content({
  items,
  cart,
}: {
  items: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[];
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
}) {
  const sortedItems =
    items?.length > 0 &&
    items.sort((a, b) => {
      return a.created_at > b.created_at ? -1 : 1;
    });

  if (items?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-between flex-1 gap-y-4">
        <div className={"grow w-full relative flex items-center"}>
          <Image alt={"Empty cart"} src={"/Void-Illustr.svg"} fill className={"!relative w-full"} />
        </div>
        <SheetFooter className={"!flex-col w-full gap-3 items-center"}>
          <span>Your basket is is empty.</span>
          <SheetClose asChild>
            <Button size={"lg"} href={"/"} className={"!w-full"}>
              Explore All Products
            </Button>
          </SheetClose>
        </SheetFooter>
      </div>
    );
  }

  return (
    <div className={"flex flex-col flex-1 justify-between"}>
      <div className="flex flex-col overflow-y-scroll gap-2">
        {Boolean(sortedItems?.length) &&
          sortedItems?.map((item) => <Item key={item.id} item={item} region={cart.region} />)}
      </div>
      <SheetFooter className="flex !flex-col gap-x-0 gap-y-3">
        <div className="flex items-baseline justify-between">
          <span className="font-semibold">
            Subtotal <span className="font-normal">(incl. taxes)</span>
          </span>
          <span className="text-lg font-bold">
            {formatAmount({
              amount: cart.subtotal || 0,
              region: cart.region,
              includeTaxes: true,
            })}
          </span>
        </div>
        <SheetClose asChild>
          <Button className={"!w-full"} size={"lg"} href={"/checkout?step=address"}>
            Checkout Securely
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button variant={"outline"} className={"!w-full"} size={"lg"} href={"/cart"}>
            Go to Basket
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button variant={"outline"} className={"!w-full"} size={"lg"}>
            Continue Shopping
          </Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
}

export default Content;
