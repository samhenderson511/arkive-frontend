"use client"

import type { Cart, PaymentSession } from "@medusajs/client-types"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import StripeWrapper from "./stripe-wrapper"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { createContext } from "react"

type WrapperProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  children: React.ReactNode
}

export const StripeContext = createContext(false)

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
const stripePromise = stripeKey ? loadStripe(stripeKey) : null

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

const Wrapper: React.FC<WrapperProps> = ({ cart, children }) => {
  const paymentSession = cart.payment_session as PaymentSession

  const isStripe = paymentSession?.provider_id?.includes("stripe")

  if (
    paymentSession?.provider_id === "paypal" &&
    paypalClientId !== undefined &&
    cart
  ) {
    return (
      <PayPalScriptProvider
        options={{
          clientId: paypalClientId,
          currency: cart?.region.currency_code.toUpperCase(),
          intent: "capture",
          components: "buttons",
        }}
      >
        {children}
      </PayPalScriptProvider>
    )
  }

  if (isStripe && paymentSession && stripePromise) {
    return (
      <StripeContext.Provider value={true}>
        <StripeWrapper
          paymentSession={paymentSession}
          stripeKey={stripeKey}
          stripePromise={stripePromise}
        >
          {children}
        </StripeWrapper>
      </StripeContext.Provider>
    )
  }

  return <div>{children}</div>
}

export default Wrapper
