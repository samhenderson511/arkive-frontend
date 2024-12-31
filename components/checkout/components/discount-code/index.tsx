"use client";

import { removeDiscount, removeGiftCard, submitDiscountForm } from "@/components/checkout/actions";
import ErrorMessage from "@/components/checkout/components/error-message";
import { SubmitButton } from "@/components/checkout/components/submit-button";
import { Button, Input, Label } from "@/components/common";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatAmount } from "@/lib/util";
import type { Cart } from "@medusajs/client-types";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import React, { useMemo } from "react";
import { useFormState } from "react-dom";

type DiscountCodeProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">;
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [parent] = useAutoAnimate();

  const { discounts, gift_cards, region } = cart;

  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return undefined;
    }

    switch (discounts[0].rule.type) {
      case "percentage":
        return `${discounts[0].rule.value}%`;
      case "fixed":
        return `- ${formatAmount({
          amount: discounts[0].rule.value,
          region: region,
        })}`;

      default:
        return "Free shipping";
    }
  }, [discounts, region]);

  const removeGiftCardCode = async (code: string) => {
    await removeGiftCard(code, gift_cards);
  };

  const removeDiscountCode = async () => {
    await removeDiscount(discounts[0].code);
  };

  const [message, formAction] = useFormState(submitDiscountForm, null);

  return (
    <div className="flex flex-col w-full p-6 border bg-background border-border">
      {gift_cards.length > 0 && (
        <div className="flex flex-col mb-4">
          <h4 className="font-medium">Gift card(s) applied:</h4>
          {gift_cards?.map((gc) => (
            <div className="flex items-center justify-between txt-small-plus" key={gc.id}>
              <p className="flex items-baseline gap-x-1">
                <span>Code: </span>
                <span className="truncate">{gc.code}</span>
              </p>
              <p className="font-semibold">
                {formatAmount({
                  region: region,
                  amount: gc.balance,
                  includeTaxes: false,
                })}
              </p>
              <Button
                variant="link"
                className="gap-x-3"
                onClick={() => removeGiftCardCode(gc.code)}
              >
                <IconTrash size={14} />
                <span className="sr-only">Remove gift card from order</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      {appliedDiscount ?
        <div className="flex items-center w-full">
          <div className="flex flex-col w-full">
            <h4 className="font-medium">Discount applied:</h4>
            <div className="flex items-center justify-between w-full max-w-full">
              <p className="flex items-baseline w-4/5 pr-1 gap-x-1 txt-small-plus">
                <span>Code:</span>
                <span className="truncate">{discounts[0].code}</span>
                <span className="min-w-fit">({appliedDiscount})</span>
              </p>
              <Button className="gap-3" variant={"link"} onClick={removeDiscountCode}>
                <IconTrash size={14} />
                <span className="sr-only">Remove discount code from order</span>
              </Button>
            </div>
          </div>
        </div>
      : <form action={formAction} className="flex flex-col w-full gap-3" ref={parent}>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={"flex items-center justify-between cursor-pointer"}
          >
            <Label className="flex items-center my-2 gap-x-3">Add gift card or discount code</Label>
            {isOpen ?
              <IconMinus size={20} />
            : <IconPlus size={20} />}
          </div>
          {isOpen && (
            <>
              <div className="flex items-stretch w-full gap-x-2">
                <Input label="Please enter code" name="code" type="text" autoFocus={false} />
                <SubmitButton className={"!h-[45px]"}>Apply</SubmitButton>
              </div>
              <ErrorMessage error={message} />
            </>
          )}
        </form>
      }
    </div>
  );
};

export default DiscountCode;
