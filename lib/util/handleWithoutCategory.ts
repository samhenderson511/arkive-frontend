export function handleWithoutCategory(handle: string) {
  return `/${handle.split("/").slice(2).join("/")}`.toLowerCase()
}
