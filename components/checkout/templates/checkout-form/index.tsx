import Addresses from "@/components/checkout/components/addresses";
import Payment from "@/components/checkout/components/payment";
import Review from "@/components/checkout/components/review";
import Shipping from "@/components/checkout/components/shipping";
import { createPaymentSessions } from "@/lib/data/createPaymentSessions";
import { getCustomer, listShippingMethods } from "@/lib/medusaClient";
import { getCheckoutStep } from "@/lib/util/get-checkout-step";
import { cookies } from "next/headers";
import { CartWithCheckoutStep } from "types/global";

export default async function CheckoutForm() {
  const cartId = (await cookies()).get("_medusa_cart_id")?.value;

  if (!cartId) {
    return null;
  }

  // create payment sessions and get cart
  const cart = (await createPaymentSessions(cartId).then((cart) => cart)) as CartWithCheckoutStep;

  if (!cart) {
    return null;
  }

  cart.checkout_step = cart && getCheckoutStep(cart);

  // get available shipping methods
  const availableShippingMethods = await listShippingMethods(cart.region_id).then((methods) =>
    methods?.filter((m) => !m.is_return)
  );

  if (!availableShippingMethods) {
    return null;
  }

  // get customer if logged in
  const customer = await getCustomer();

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-y-8">
        <div>
          <Addresses cart={cart} customer={customer} />
        </div>

        <div>
          <Shipping cart={cart} availableShippingMethods={availableShippingMethods} />
        </div>

        <div>
          <Payment cart={cart} />
        </div>

        <div>
          <Review cart={cart} />
        </div>
      </div>
    </div>
  );
}
