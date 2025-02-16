import { useCart } from "@/lib/hooks";
import { GBP } from "@/lib/server";
import { Text } from "../ui/text";

export function CartTotals() {
  const { subtotal, tax, discounts, shipping, total } = useCart();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Text
          element="p"
          className="text-sm flex justify-between !text-muted-foreground !leading-snug"
        >
          <span className="grow">Subtotal</span>
          <span className="font-semibold">{GBP.format(subtotal)}</span>
        </Text>

        <Text element="span" className="flex text-muted-foreground leading-tight">
          <span className="grow">Tax</span>
          <span className="font-semibold">{GBP.format(tax)}</span>
        </Text>

        <Text element="span" className="flex text-destructive leading-tight">
          <span className="grow">Discounts</span>
          <span className="font-semibold">{GBP.format(discounts)}</span>
        </Text>

        <Text element="span" className="flex text-muted-foreground leading-tight">
          <span className="grow">Shipping</span>
          <span className="font-semibold">{GBP.format(shipping)}</span>
        </Text>

        <Text element="h5" className="flex justify-between">
          <span className="grow">Order Total</span>
          <span className="font-semibold">{GBP.format(total)}</span>
        </Text>
      </div>
    </div>
  );
}
