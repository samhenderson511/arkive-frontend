import { cartUpdate } from "@/components/checkout/actions";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/common";
import compareAddresses from "@/lib/util/compare-addresses";
import type { Address, AddressPayload, Cart } from "@medusajs/client-types";
import { omit } from "lodash";
import { useMemo } from "react";

type AddressSelectProps = {
  addresses: Address[];
  cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null;
};

const AddressSelect = ({ addresses, cart }: AddressSelectProps) => {
  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id);
    if (savedAddress) {
      cartUpdate({
        shipping_address: omit(savedAddress, [
          "id",
          "created_at",
          "updated_at",
          "country",
          "deleted_at",
          "metadata",
          "customer_id",
        ]) as AddressPayload,
      });
    }
  };

  const selectedAddress = useMemo(() => {
    return addresses.find((a) => compareAddresses(a, cart?.shipping_address));
  }, [addresses, cart?.shipping_address]);

  return (
    <Select onValueChange={handleSelect} value={selectedAddress?.id}>
      <div className="relative">
        <SelectTrigger>
          <span className="block truncate">
            {selectedAddress ? selectedAddress.address_1 : "Choose an address"}
          </span>
        </SelectTrigger>
        <SelectContent>
          {addresses.map((address) => {
            return (
              <SelectItem key={address.id} value={address.id}>
                <div className="flex items-start gap-x-4">
                  <div className="flex flex-col">
                    <span className="text-left text-base-semi">
                      {address.first_name} {address.last_name}
                    </span>
                    {address.company && (
                      <span className="text-small-regular text-ui-fg-base">{address.company}</span>
                    )}
                    <div className="flex flex-col mt-2 text-left text-base-regular">
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
                    </div>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </div>
    </Select>
  );
};

export default AddressSelect;
