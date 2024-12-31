import { medusaClient } from "@/lib/config";
import { getMedusaHeaders } from "@/lib/medusaClient";

export async function addItem({
  cartId,
  variantId,
  quantity,
}: {
  cartId: string;
  variantId: string;
  quantity: number;
}) {
  const headers = getMedusaHeaders(["cart"]);

  return medusaClient.carts.lineItems
    .create(cartId, { variant_id: variantId, quantity }, headers)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err);
      return null;
    });
}
