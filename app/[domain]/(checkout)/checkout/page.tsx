import { CheckoutPage } from "@/components/checkout/checkout-page";
import { Transition } from "@/components/layout/transition";

export default async function Checkout() {
  return (
    <Transition
      transitionName="fadeInUp"
      className="flex justify-center w-full px-4 lg:px-8 pt-8 lg:pt-16"
    >
      <CheckoutPage />
    </Transition>
  );
}
