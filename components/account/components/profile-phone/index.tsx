"use client";

import { Input } from "@/components/ui";
import { updateCustomerPhone } from "@/lib/data";
import type { Customer } from "@medusajs/client-types";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import AccountInfo from "../account-info";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
};

const ProfileEmail: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = React.useState(false);

  const [state, formAction] = useFormState(updateCustomerPhone, {
    error: false,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success);
  }, [state]);

  return (
    <form action={formAction} className="w-full">
      <AccountInfo
        label="Phone"
        currentInfo={`${customer.phone}`}
        isSuccess={successState}
        isError={!!state.error}
        errorMessage={state.error}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <Input
            label="Phone"
            name="phone"
            type="phone"
            autoComplete="phone"
            required
            defaultValue={customer.phone}
          />
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileEmail;
