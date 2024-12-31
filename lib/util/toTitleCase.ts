const toTitleCase = (str: string): string =>
  str?.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  )

export { toTitleCase }
