import plugin from "tailwindcss/plugin"

export function constructClass(variable: string, foreground?: boolean) {
  if (!foreground) {
    return `hsl(var(--${variable}) / <alpha-value>)`
  } else {
    return {
      DEFAULT: `hsl(var(--${variable}) / <alpha-value>)`,
      foreground: `hsl(var(--${variable}-foreground) / <alpha-value>)`,
    }
  }
}
export function groupPeerPlugin() {
  return plugin(function ({ addVariant }) {
    let pseudoVariants = ["checked", "hover"].map((variant) =>
      Array.isArray(variant) ? variant : [variant, `&:${variant}`]
    )

    for (let [variantName, state] of pseudoVariants) {
      addVariant(`group-peer-${variantName}`, () => {
        let result = typeof state === "function" ? state() : state
        return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &")
      })
    }
  })
}
