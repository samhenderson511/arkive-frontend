import DiscountCode from "@/components/checkout/components/discount-code";
import { CartTotals } from "@/components/common";
import Items from "@/components/order/components/items";
import { getCart } from "@/lib/medusaClient/getCart";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { cookies } from "next/headers";

const CheckoutSummary = async () => {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) {
    return null;
  }

  const cart = await getCart(cartId).then((cart) => cart);

  if (!cart) {
    return null;
  }

  return (
    <div className="sticky top-0 flex flex-col py-8 sm:py-0">
      <hr className="my-6 sm:hidden border-border" />
      <h2 className={clsx(barlow.className, "uppercase text-3xl")}>Order Summary</h2>
      <hr className="my-6 border-border" />
      <CartTotals cart={cart} />
      <Items cartId={cart.id} region={cart?.region} items={cart?.items} />
      <div className="my-6">
        <DiscountCode cart={cart} />
      </div>
    </div>
  );
};

export default CheckoutSummary;
