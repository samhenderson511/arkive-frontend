import { Column } from "."

export const Column3 = () => {
  const customLinks = [
    {
      href: "/account/addresses",
      label: "My Addresses",
    },
    {
      href: "/account/orders",
      label: "My Orders",
    },
    {
      href: "/account/profile",
      label: "My Profile",
    },
    {
      href: "/account",
      label: "My Account",
    },
    // {
    //   href: "/account/wishlist",
    //   label: "My Wishlist",
    // },
    {
      href: "/cart",
      label: "My Basket",
    },
    // {
    //   href: "/gift-cards",
    //   label: "Gift Cards",
    // },
  ]

  return <Column title={"My Arkive"} items={[customLinks]} />
}
