"use client";

import CountrySelect from "@/components/checkout/components/country-select";
import { SubmitButton } from "@/components/checkout/components/submit-button";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Input,
} from "@/components/common";
import { addCustomerShippingAddress } from "@/lib/data";
import type { Region } from "@medusajs/client-types";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const AddAddress = ({ region }: { region: Region }) => {
  const [successState, setSuccessState] = useState(false);
  const [open, setOpen] = useState(false);

  const [formState, formAction] = useFormState(addCustomerShippingAddress, {
    success: false,
    error: null,
  });

  const close = () => {
    setSuccessState(false);
    setOpen(false);
  };

  useEffect(() => {
    if (successState) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState]);

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true);
    }
  }, [formState]);

  return (
    <>
      <Button
        variant={"outline"}
        className="border border-border !p-5 rounded-sm hover:border min-h-[220px] h-full !w-full flex flex-col !items-start justify-between"
        onClick={() => setOpen(true)}
      >
        <span className="text-sm font-semibold capitalize">New address</span>
        <IconPlus size={20} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Add new address</DialogTitle>
          <form action={formAction}>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input label="First name" name="first_name" required autoComplete="given-name" />
                <Input label="Last name" name="last_name" required autoComplete="family-name" />
              </div>
              <Input label="Company" name="company" autoComplete="organization" />
              <Input label="Address" name="address_1" required autoComplete="address-line1" />
              <Input label="Apartment, suite, etc." name="address_2" autoComplete="address-line2" />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input label="Postal code" name="postal_code" required autoComplete="postal-code" />
                <Input label="City" name="city" required autoComplete="locality" />
              </div>
              <Input label="Province / State" name="province" autoComplete="address-level1" />
              <CountrySelect region={region} name="country_code" required autoComplete="country" />
              <Input label="Phone" name="phone" autoComplete="phone" />
            </div>
            {formState.error && (
              <div className="py-2 text-rose-500 text-small-regular">{formState.error}</div>
            )}
            <DialogFooter>
              <div className="flex mt-6 gap-3">
                <Button type="reset" variant="ghost" onClick={close} className="h-10">
                  Cancel
                </Button>
                <SubmitButton>Save</SubmitButton>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAddress;
