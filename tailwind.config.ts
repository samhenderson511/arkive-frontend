import { Config } from "tailwindcss/types/config"
import { constructClass, groupPeerPlugin } from "./plugins"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,json}",
    "./src/pages/**/*.{js,ts,jsx,tsx,json}",
    "./src/components/**/*.{js,ts,jsx,tsx,json}",
    "./src/modules/**/*.{js,ts,jsx,tsx,json}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "384px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-out-to-top": "slide-out-to-top 0.2s ease-in",
        "slide-in-from-top": "slide-in-from-top 0.2s ease-out",
        "slide-out-to-bottom": "slide-out-to-bottom 0.2s ease-in",
        "slide-in-from-bottom": "slide-in-from-bottom 0.2s ease-out",
        "slide-out-to-left": "slide-out-to-left 0.2s ease-in",
        "slide-in-from-left": "slide-in-from-left 0.2s ease-out",
        "slide-out-to-right": "slide-out-to-right 0.2s ease-in",
        "slide-in-from-right": "slide-in-from-right 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-in",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-out-to-top": {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(-100%)" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0%)" },
        },
        "slide-out-to-bottom": {
          from: { transform: "translateY(0%)" },
          to: { transform: "translateY(100%)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0%)" },
        },
        "slide-out-to-left": {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-100%)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0%)" },
        },
        "slide-out-to-right": {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(100%)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "100%" },
        },
        "fade-out": {
          from: { opacity: "100%" },
          to: { opacity: "0" },
        },
        "zoom-in": {
          from: { scale: "50%" },
          to: { scale: "100%" },
        },
        "zoom-out": {
          from: { scale: "100%" },
          to: { scale: "50%" },
        },
      },
      colors: {
        background: constructClass("background"),
        foreground: constructClass("foreground"),
        card: constructClass("card", true),
        popover: constructClass("popover", true),
        primary: constructClass("primary", true),
        secondary: constructClass("secondary", true),
        muted: constructClass("muted", true),
        accent: constructClass("accent", true),
        destructive: constructClass("destructive", true),
        success: constructClass("success", true),
        warning: constructClass("warning", true),
        info: constructClass("info", true),
        border: constructClass("border"),
        input: constructClass("input"),
        ring: constructClass("ring"),
      },
      borderRadius: {
        sm: `var(--radius)`,
        md: `calc(var(--radius) + 2px)`,
        lg: "calc(var(--radius) + 4px)",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    require("tailwind-merge"),
    require("tailwindcss-aspect-ratio"),
    groupPeerPlugin(),
  ],
}

export default config
