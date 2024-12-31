import {
  IconBrandPaypalFilled,
  IconBrandStripe,
  IconCreditCard,
  IconCreditCardFilled,
  IconTestPipe,
} from "@tabler/icons-react"
import React, { FC } from "react"

export const IS_BROWSER = typeof window !== "undefined"
export const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "gb"
export const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN || "www.arkiveclothing.com"
export const IS_PRODUCTION = process.env.VERCEL_ENV === "production"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<string, { title: string; icon: FC }> = {
  stripe: {
    title: "Credit card",
    icon: IconCreditCardFilled,
  },
  "stripe-ideal": {
    title: "iDeal",
    icon: IconBrandStripe,
  },
  paypal: {
    title: "PayPal",
    icon: IconBrandPaypalFilled,
  },
  // Add more payment providers here
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]
