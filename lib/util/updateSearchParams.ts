export const addOrUpdateSearchParam = ({
  key,
  value,
  searchParams,
}: {
  searchParams: URLSearchParams
  key: string
  value: string
}) => {
  const newSearchParams = new URLSearchParams(searchParams.toString())
  newSearchParams.set(key, value)

  return newSearchParams.toString()
}

export const removeSearchParam = ({
  key,
  searchParams,
}: {
  key: string
  searchParams: URLSearchParams
}) => {
  const newSearchParams = new URLSearchParams(searchParams.toString())

  newSearchParams.delete(key)

  return newSearchParams.toString()
}
