"use client";

import { Button } from "@/components/common";
import compareAddresses from "@/lib/util/compare-addresses";
import type { Cart, Customer } from "@medusajs/client-types";
import { IconCircleCheckFilled, IconLoader2 } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormState } from "react-dom";
import { setAddresses } from "../../actions";
import BillingAddress from "../billing_address";
import ErrorMessage from "../error-message";
import ShippingAddress from "../shipping-address";
import { SubmitButton } from "../submit-button";

const Addresses = ({
  cart,
  customer,
}: {
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null;
  customer: Omit<Customer, "password_hash"> | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const countryCode = params.countryCode as string;

  const isOpen = searchParams.get("step") === "address";

  const [sameAsSBilling, toggleSameAsBilling] = useState(
    cart?.shipping_address && cart?.billing_address ?
      compareAddresses(cart?.shipping_address, cart?.billing_address)
    : true
  );

  const handleEdit = () => {
    router.push(pathname + "?step=address");
  };

  const [message, formAction] = useFormState(setAddresses, null);

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h2 className={clsx("flex items-center uppercase text-3xl gap-x-2", barlow.className)}>
          Shipping Address
          {!isOpen && <IconCircleCheckFilled />}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <Button onClick={handleEdit} variant="link">
            Edit
          </Button>
        )}
      </div>
      {isOpen ?
        <form action={formAction}>
          <ShippingAddress
            customer={customer}
            countryCode={countryCode}
            checked={sameAsSBilling}
            onChange={toggleSameAsBilling}
            cart={cart}
          />

          {!sameAsSBilling && (
            <div className={"flex flex-col gap-6"}>
              <h2
                className={clsx("flex items-center text-3xl uppercase gap-x-2", barlow.className)}
              >
                Billing address
              </h2>

              <BillingAddress cart={cart} countryCode={countryCode} />
            </div>
          )}
          <SubmitButton className="mt-6">Continue to delivery</SubmitButton>
          <ErrorMessage error={message} />
        </form>
      : <div className="text-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cart && cart.shipping_address ?
            <>
              <div className="flex flex-col">
                <p className="mb-1">Shipping Address</p>
                <p className="text-sm text-muted-foreground">
                  {cart.shipping_address.first_name} {cart.shipping_address.last_name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {cart.shipping_address.address_1} {cart.shipping_address.address_2}
                </p>
                <p className="text-sm text-muted-foreground">
                  {cart.shipping_address.postal_code}, {cart.shipping_address.city}
                </p>
                <p className="text-sm text-muted-foreground">
                  {cart.shipping_address.country_code?.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="mb-1">Contact</p>
                <p className="text-sm text-muted-foreground">{cart.shipping_address.phone}</p>
                <p className="text-sm text-muted-foreground">{cart.email}</p>
              </div>
              <div className="flex flex-col">
                <p className="mb-1">Billing Address</p>

                {sameAsSBilling ?
                  <p className="text-sm text-muted-foreground">
                    Billing- and delivery address are the same.
                  </p>
                : <>
                    <p className="text-sm text-muted-foreground">
                      {cart.billing_address.first_name} {cart.billing_address.last_name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cart.billing_address.address_1} {cart.billing_address.address_2}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cart.billing_address.postal_code}, {cart.billing_address.city}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cart.billing_address.country_code?.toUpperCase()}
                    </p>
                  </>
                }
              </div>
            </>
          : <div>
              <IconLoader2 className={"animate-spin"} />
            </div>
          }
        </div>
      }
      <hr className="mt-8 border-border" />
    </div>
  );
};

export default Addresses;
