"use client"

import type { Address, Customer, ShippingMethod } from "@medusajs/client-types"

type ShippingDetailsProps = {
  shippingAddress: Address
  billingAddress: Address
  shippingMethods: ShippingMethod[]
  customer: Customer
}

const ShippingDetails = ({
  shippingAddress,
  billingAddress: providedBillingAddress,
  shippingMethods,
  customer,
}: ShippingDetailsProps) => {
  const billingAddress = customer?.billing_address || providedBillingAddress

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">Delivery Address</h3>
        <div className="flex flex-col text-muted-foreground">
          <span>{`${shippingAddress.first_name} ${shippingAddress.last_name}`}</span>
          <span>{`${shippingAddress.address_1}${
            shippingAddress.address_2 && ", " + shippingAddress.address_2
          }`}</span>
          <span>{`${shippingAddress.city}, ${shippingAddress.province} ${shippingAddress.postal_code}`}</span>
          <span>{shippingAddress.country_code?.toUpperCase()}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">Billing Address</h3>
        <div className="flex flex-col text-muted-foreground">
          {billingAddress?.address_1 ? (
            <>
              <span>{`${billingAddress?.first_name} ${billingAddress?.last_name}`}</span>
              <span>{`${billingAddress?.address_1}${
                billingAddress?.address_2 && ", " + billingAddress?.address_2
              }`}</span>
              <span>{`${billingAddress?.city}, ${billingAddress?.province} ${billingAddress?.postal_code}`}</span>
              <span>{billingAddress?.country_code?.toUpperCase()}</span>
            </>
          ) : (
            Array.from({ length: 4 }, (v, i) => i).map((i) => {
              return (
                <span
                  key={i}
                  className="w-1/2 h-4 my-1 rounded bg-muted animate-pulse"
                />
              )
            })
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">Delivery method</h3>
        <div className={"text-muted-foreground"}>
          {shippingMethods.map((sm) => {
            return <span key={sm.id}>{sm.shipping_option.name}</span>
          })}
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
