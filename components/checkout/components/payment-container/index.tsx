import { Label, RadioGroupItem } from "@/components/ui";
import type { PaymentSession } from "@medusajs/client-types";
import { clsx } from "clsx";
import React, { FC } from "react";

type PaymentContainerProps = {
  paymentSession: PaymentSession;
  selectedPaymentOptionId: string | null;
  disabled?: boolean;
  paymentInfoMap: Record<string, { title: string; icon: FC<any> }>;
};

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selectedPaymentOptionId,
  paymentInfoMap,
  disabled = false,
}) => {
  const Icon = paymentInfoMap[paymentSession.provider_id]?.icon;

  return (
    <>
      <Label
        key={paymentSession.provider_id}
        htmlFor={`payment-option-${paymentSession.provider_id}`}
        className={clsx(
          "flex items-center transition duration-200 justify-between font-medium cursor-pointer gap-3 p-4 border border-input rounded-sm hover:shadow",
          {
            "border-primary": selectedPaymentOptionId === paymentSession.provider_id,
          }
        )}
      >
        <RadioGroupItem
          disabled={disabled}
          id={`payment-option-${paymentSession.provider_id}`}
          value={paymentSession.provider_id}
        />
        <p className={"grow"}>
          {paymentInfoMap[paymentSession.provider_id]?.title || paymentSession.provider_id}
        </p>
        <Icon className="" />
      </Label>
    </>
  );
};

export default PaymentContainer;
