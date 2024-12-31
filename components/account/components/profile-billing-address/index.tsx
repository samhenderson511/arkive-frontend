"use client";

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common";
import { updateCustomerBillingAddress } from "@/lib/data";
import type { Customer, Region } from "@medusajs/client-types";
import React, { useEffect, useMemo } from "react";
import { useFormState } from "react-dom";
import AccountInfo from "../account-info";

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">;
  regions: Region[];
};

const ProfileBillingAddress: React.FC<MyInformationProps> = ({ customer, regions }) => {
  const regionOptions = useMemo(() => {
    return (
      regions
        ?.map((region) => {
          return region.countries.map((country) => ({
            value: country.iso_2,
            label: country.display_name,
          }));
        })
        .flat() || []
    );
  }, [regions]);

  const [successState, setSuccessState] = React.useState(false);

  const [state, formAction] = useFormState(updateCustomerBillingAddress, {
    error: false,
    success: false,
  });

  const clearState = () => {
    setSuccessState(false);
  };

  useEffect(() => {
    setSuccessState(state.success as any);
  }, [state]);

  const currentInfo = useMemo(() => {
    if (!customer.billing_address) {
      return "No billing address";
    }

    const country =
      regionOptions?.find((country) => country.value === customer.billing_address.country_code)
        ?.label || customer.billing_address.country_code?.toUpperCase();

    return (
      <div className="flex flex-col font-semibold">
        <span>
          {customer.billing_address.first_name} {customer.billing_address.last_name}
        </span>
        <span>{customer.billing_address.company}</span>
        <span>
          {customer.billing_address.address_1}
          {customer.billing_address.address_2 ? `, ${customer.billing_address.address_2}` : ""}
        </span>
        <span>
          {customer.billing_address.postal_code}, {customer.billing_address.city}
        </span>
        <span>{country}</span>
      </div>
    );
  }, [customer, regionOptions]);

  return (
    <form action={formAction} onReset={() => clearState()} className="w-full">
      <AccountInfo
        label="Billing address"
        currentInfo={currentInfo}
        isSuccess={successState}
        isError={!!state.error}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              name="billing_address.first_name"
              defaultValue={customer.billing_address?.first_name || undefined}
              required
            />
            <Input
              label="Last name"
              name="billing_address.last_name"
              defaultValue={customer.billing_address?.last_name || undefined}
              required
            />
          </div>
          <Input
            label="Company"
            name="billing_address.company"
            defaultValue={customer.billing_address?.company || undefined}
          />
          <Input
            label="Address"
            name="billing_address.address_1"
            defaultValue={customer.billing_address?.address_1 || undefined}
            required
          />
          <Input
            label="Apartment, suite, etc."
            name="billing_address.address_2"
            defaultValue={customer.billing_address?.address_2 || undefined}
          />
          <div className="grid grid-cols-[144px_1fr] gap-x-2">
            <Input
              label="Postal code"
              name="billing_address.postal_code"
              defaultValue={customer.billing_address?.postal_code || undefined}
              required
            />
            <Input
              label="City"
              name="billing_address.city"
              defaultValue={customer.billing_address?.city || undefined}
              required
            />
          </div>
          <Input
            label="Province"
            name="billing_address.province"
            defaultValue={customer.billing_address?.province || undefined}
          />
          <Select
            name="billing_address.country_code"
            defaultValue={customer.billing_address?.country_code || undefined}
            required
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">-</SelectItem>
              {regionOptions.map((option, i) => {
                return (
                  <SelectItem key={i} value={option.value}>
                    {option.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </AccountInfo>
    </form>
  );
};

export default ProfileBillingAddress;
