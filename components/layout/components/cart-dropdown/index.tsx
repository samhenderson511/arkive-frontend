import { Button } from "@/components/common";
import { Badge } from "@/components/common/badge";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/common/sheet";
import { useParamState } from "@/lib/hooks";
import type { Cart, LineItem } from "@medusajs/client-types";
import { IconBasket } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { Content } from "./Content";

const Sheet = dynamic(() => import("@/components/common/sheet"));

const CartSheet = ({
  cart,
  items,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  items: Omit<LineItem, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">[];
}) => {
  const totalItems = items?.length;
  const [open, setOpen] = useParamState("cart", false);

  return (
    <>
      <Button
        title={"Basket"}
        variant="ghost"
        size="icon"
        className="!duration-0 relative"
        onClick={() => setOpen(!open)}
      >
        {totalItems > 0 && <Badge className="absolute z-10 -top-2 -right-4">{totalItems}</Badge>}
        <IconBasket size={20} />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Basket</SheetTitle>
          </SheetHeader>
          <Content items={items} cart={cart} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export { CartSheet };
