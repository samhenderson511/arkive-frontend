"use client";

import { setShippingMethod } from "@/components/checkout/actions";
import { Button, Label, RadioGroup, RadioGroupItem } from "@/components/common";
import { Alert, AlertTitle } from "@/components/common/alert";
import { formatAmount } from "@/lib/util";
import type { Cart, ShippingOption } from "@medusajs/client-types";
import { PricedShippingOption } from "@medusajs/client-types";
import { IconCircleCheckFilled, IconLoader2 } from "@tabler/icons-react";
import { barlow } from "app/fonts";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
  availableShippingMethods: PricedShippingOption[] | null;
};

const Shipping: React.FC<ShippingProps> = ({ cart, availableShippingMethods }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "delivery";

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    router.push(pathname + "?step=payment", { scroll: false });
  };

  const set = async (id: string) => {
    setIsLoading(true);
    await setShippingMethod(id)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setIsLoading(false);
      });
  };

  const isValid = (option: ShippingOption) => {
    const minSubtotalRequirement =
      option.requirements.find((r) => r.type === "min_subtotal")?.amount || 0;
    const maxSubtotalRequirement =
      option.requirements.find((r) => r.type === "max_subtotal")?.amount || Infinity;

    return (
      (cart.subtotal >= minSubtotalRequirement && cart.subtotal <= maxSubtotalRequirement) ||
      option.requirements.length === 0
    );
  };

  const handleChange = (value: string) => {
    set(value);
  };

  useEffect(() => {
    setIsLoading(false);
    setError(null);
  }, [isOpen]);

  return (
    <div className="bg-background">
      <div className="flex flex-row items-center justify-between mb-6">
        <h2
          className={clsx("flex text-3xl gap-x-2 items-center uppercase", barlow.className, {
            "opacity-50 pointer-events-none select-none":
              !isOpen && cart.shipping_methods.length === 0,
          })}
        >
          Delivery
          {!isOpen && cart.shipping_methods.length > 0 && <IconCircleCheckFilled />}
        </h2>
        {!isOpen && cart?.shipping_address && cart?.billing_address && cart?.email && (
          <Button onClick={handleEdit} variant={"link"}>
            Edit
          </Button>
        )}
      </div>
      {isOpen ?
        <div>
          <div className="pb-8">
            <RadioGroup
              value={cart.shipping_methods[0]?.shipping_option_id}
              onValueChange={handleChange}
            >
              {availableShippingMethods ?
                availableShippingMethods.map((option) => {
                  return (
                    <Label
                      key={option.id}
                      htmlFor={option.id}
                      className={clsx(
                        "flex items-center transition duration-200 justify-between font-medium cursor-pointer gap-3 p-4 border border-input rounded-sm hover:shadow",
                        {
                          "border-primary":
                            option.id === cart.shipping_methods[0]?.shipping_option_id,
                          "bg-muted text-muted-foreground border-none pointer-events-none":
                            !isValid(option),
                        }
                      )}
                    >
                      <RadioGroupItem
                        disabled={!isValid(option)}
                        id={option.id}
                        value={option.id}
                      />
                      <p className="flex items-center grow gap-x-4">{option.name}</p>
                      <p className="justify-self-end text-muted-foreground">
                        {formatAmount({
                          amount: option.amount!,
                          region: cart?.region,
                          includeTaxes: false,
                        })}
                      </p>
                    </Label>
                  );
                })
              : <div className="flex flex-col items-center justify-center px-4 py-8 text-ui-fg-base">
                  <IconLoader2 />
                </div>
              }
            </RadioGroup>
          </div>

          {error && (
            <Alert variant={"destructive"}>
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          <Button
            size="lg"
            className="gap-3"
            onClick={handleSubmit}
            disabled={!cart.shipping_methods[0] || isLoading}
          >
            {isLoading && <IconLoader2 className="animate-spin" />}
            Continue to payment
          </Button>
        </div>
      : <div>
          <div className="text-small-regular">
            {cart && cart.shipping_methods.length > 0 && (
              <div className="flex flex-col w-1/3">
                <p className="mb-1 font-medium">Method</p>
                <p className="font-medium text-muted-foreground">
                  {cart.shipping_methods[0].shipping_option.name} (
                  {formatAmount({
                    amount: cart.shipping_methods[0].price,
                    region: cart.region,
                    includeTaxes: false,
                  })
                    .replace(/,/g, "")
                    .replace(/\./g, ",")}
                  )
                </p>
              </div>
            )}
          </div>
        </div>
      }
      <hr className="mt-8 border-border" />
    </div>
  );
};

export default Shipping;
