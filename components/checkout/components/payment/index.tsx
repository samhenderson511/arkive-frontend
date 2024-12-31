"use client";

import { setPaymentMethod } from "@/components/checkout/actions";
import PaymentContainer from "@/components/checkout/components/payment-container";
import { StripeContext } from "@/components/checkout/components/payment-wrapper";
import { Button, Label, RadioGroup } from "@/components/common";
import { Alert, AlertTitle } from "@/components/common/alert";
import { paymentInfoMap } from "@/lib/constants";
import type { Cart } from "@medusajs/client-types";
import { CardElement } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { IconCircleCheckFilled, IconCreditCardFilled, IconLoader2 } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import { clsx } from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

const Payment = ({ cart }: { cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardBrand, setCardBrand] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "payment";

  const isStripe = cart?.payment_session?.provider_id === "stripe";
  const stripeReady = useContext(StripeContext);

  const paymentReady = cart?.payment_session && cart?.shipping_methods.length !== 0;

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#424270",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
      },
    };
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const set = async (providerId: string) => {
    setIsLoading(true);
    await setPaymentMethod(providerId)
      .catch((err) => setError(err.toString()))
      .finally(() => {
        if (providerId === "paypal") return;
        setIsLoading(false);
      });
  };

  const handleChange = (providerId: string) => {
    setError(null);
    set(providerId);
  };

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    router.push(pathname + "?" + createQueryString("step", "review"), {
      scroll: false,
    });
  };

  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, [isOpen]);

  const Icon =
    paymentInfoMap[cart.payment_session?.provider_id || ""]?.icon || IconCreditCardFilled;

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clsx("flex text-3xl uppercase gap-x-2 items-center", barlow.className, {
            "opacity-50 pointer-events-none select-none": !isOpen && !paymentReady,
          })}
        >
          Payment
          {!isOpen && paymentReady && <IconCircleCheckFilled />}
        </h2>
        {!isOpen && paymentReady && (
          <Button onClick={handleEdit} variant={"link"}>
            Edit
          </Button>
        )}
      </div>
      <div>
        {cart?.payment_sessions?.length ?
          <div className={isOpen ? "block" : "hidden"}>
            <RadioGroup
              value={cart.payment_session?.provider_id || ""}
              onValueChange={(value: string) => handleChange(value)}
            >
              {cart.payment_sessions
                .filter((paymentSession) => Boolean(paymentInfoMap[paymentSession.provider_id]))
                .sort((a, b) => {
                  return a.provider_id > b.provider_id ? 1 : -1;
                })
                .map((paymentSession) => {
                  return (
                    <PaymentContainer
                      paymentInfoMap={paymentInfoMap}
                      paymentSession={paymentSession}
                      key={paymentSession.id}
                      selectedPaymentOptionId={cart.payment_session?.provider_id || null}
                    />
                  );
                })}
            </RadioGroup>

            {isStripe && stripeReady && (
              <div className="mt-5 transition-all duration-150 ease-in-out">
                <Label>Enter your card details:</Label>

                <CardElement
                  options={useOptions as StripeCardElementOptions}
                  onChange={(e) => {
                    setCardBrand(e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1));
                    setError(e.error?.message || null);
                    setCardComplete(e.complete);
                  }}
                />
              </div>
            )}

            {error && (
              <Alert>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            <Button
              size="lg"
              className="mt-6 gap-3"
              onClick={handleSubmit}
              disabled={(isStripe && !cardComplete) || isLoading || !cart.payment_session}
            >
              {isLoading && <IconLoader2 className="animate-spin" />}
              Continue to review
            </Button>
          </div>
        : <div className="flex flex-col items-center justify-center px-4 py-16 text-ui-fg-base">
            <IconLoader2 />
          </div>
        }

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && cart.payment_session && (
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
              <div className="flex flex-col">
                <p className="mb-1">Payment method</p>
                <p className="font-medium text-muted-foreground">
                  {paymentInfoMap[cart.payment_session.provider_id]?.title ||
                    cart.payment_session.provider_id}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="mb-1">Payment details</p>
                <div className="flex items-start gap-3 font-medium capitalize text-muted-foreground">
                  <Icon className={"shrink-0"} />
                  <p>
                    {cart.payment_session.provider_id === "stripe" && cardBrand ?
                      cardBrand
                    : "Complete payment in the next step"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="mt-8 border-border" />
    </div>
  );
};

export default Payment;
