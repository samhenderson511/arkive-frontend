import type { Customer, Region } from "@medusajs/client-types"
import React from "react"
import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"

type AddressBookProps = {
  customer: Omit<Customer, "password_hash">
  region: Region
}

const AddressBook: React.FC<AddressBookProps> = ({ customer, region }) => {
  return (
    <div className="w-full">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AddAddress region={region} />
        {customer.shipping_addresses.map((address) => {
          return (
            <EditAddress address={address} key={address.id} region={region} />
          )
        })}
      </div>
    </div>
  )
}

export default AddressBook
