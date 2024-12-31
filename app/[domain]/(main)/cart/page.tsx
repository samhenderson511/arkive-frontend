import CartTemplate from "@/components/cart/templates";
import { retrieveCart } from "@/lib/data";
import { enrichLineItems } from "@/lib/data/enrichLineItems";
import { getRegion } from "@/lib/data/getRegion";
import { getCustomer } from "@/lib/medusaClient";
import { Metadata } from "next";
import { StoreTabPageProps } from "types/global";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "View your shopping bag",
  robots: "noindex",
};

export default async function Cart(props: StoreTabPageProps) {
  const params = await props.params;
  const region = await getRegion(params.countryCode);
  const cart = await retrieveCart();
  const items = await enrichLineItems(cart?.items || [], region.id);
  const customer = await getCustomer();

  return <CartTemplate region={region} cart={cart} customer={customer} cartItems={items} />;
}
