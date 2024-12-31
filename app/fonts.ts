import {
  Barlow_Condensed,
  Barlow_Semi_Condensed,
  Inter,
} from "next/font/google"

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})
export const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
})
export const barlowCon = Barlow_Condensed({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
})
