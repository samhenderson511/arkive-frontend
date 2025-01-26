import Wrapper from "@/components/checkout/components/payment-wrapper";
import CheckoutForm from "@/components/checkout/templates/checkout-form";
import CheckoutSummary from "@/components/checkout/templates/checkout-summary";
import { enrichLineItems } from "@/lib/data/enrichLineItems";
import { getCart } from "@/lib/medusaClient/getCart";
import type { LineItem } from "@medusajs/client-types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
};

const fetchCart = async () => {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) {
    return notFound();
  }

  const cart = await getCart(cartId).then((cart) => cart);

  if (cart?.items.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id);
    cart.items = enrichedItems as LineItem[];
  }

  return cart;
};

export default async function Checkout() {
  const cart = await fetchCart();

  if (!cart) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-1 max-w-screen-2xl w-full sm:grid-cols-[1fr_416px] gap-x-8 px-4 sm:px-8 py-12">
      <Wrapper cart={cart}>
        <CheckoutForm />
      </Wrapper>
      <CheckoutSummary />
    </div>
  );
}
