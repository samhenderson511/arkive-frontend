"use client";

import CountrySelect from "@/components/checkout/components/country-select";
import { SubmitButton } from "@/components/checkout/components/submit-button";
import { Button, Dialog, DialogContent, DialogFooter, DialogTitle, Input } from "@/components/ui";
import { deleteCustomerShippingAddress, updateCustomerShippingAddress } from "@/lib/data";
import type { Address, Region } from "@medusajs/client-types";
import { IconEdit, IconLoader2, IconTrash } from "@tabler/icons-react";
import { clsx } from "clsx";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";

type EditAddressProps = {
  region: Region;
  address: Address;
  isActive?: boolean;
};

const EditAddress: React.FC<EditAddressProps> = ({ region, address, isActive = false }) => {
  const [removing, setRemoving] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [open, setOpen] = useState(false);

  const [formState, formAction] = useFormState(updateCustomerShippingAddress, {
    success: false,
    error: null,
    addressId: address.id,
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

  const removeAddress = async () => {
    setRemoving(true);
    await deleteCustomerShippingAddress(address.id);
    setRemoving(false);
  };

  return (
    <>
      <div
        className={clsx(
          "border rounded-rounded p-5 pb-3 min-h-[220px] h-full w-full flex flex-col justify-between transition-colors",
          {
            "border-primary": isActive,
          }
        )}
      >
        <div className="flex flex-col">
          <h3 className="text-left font-semibold">
            {address.first_name} {address.last_name}
          </h3>
          {address.company && <p className="text-sm text-muted-foreground">{address.company}</p>}
          <p className="flex flex-col mt-2 text-left">
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span>
              {address.postal_code}, {address.city}
            </span>
            <span>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <Button size={"sm"} variant={"link"} className="gap-x-3" onClick={() => setOpen(true)}>
            <IconEdit size={14} />
            Edit
          </Button>
          <Button size={"sm"} variant={"link"} className="gap-x-3" onClick={removeAddress}>
            {removing ?
              <IconLoader2 size={14} className={"animate-spin"} />
            : <IconTrash size={14} />}
            Remove
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Edit address</DialogTitle>
          <form action={formAction}>
            <div className="grid grid-cols-1 gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="First name"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                />
                <Input
                  label="Last name"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                />
              </div>
              <Input
                label="Company"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
              />
              <Input
                label="Address"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
              />
              <Input
                label="Apartment, suite, etc."
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Postal code"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                />
                <Input
                  label="City"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                />
              </div>
              <Input
                label="Province / State"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
              />
              <Input
                label="Phone"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
              />
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

export default EditAddress;
