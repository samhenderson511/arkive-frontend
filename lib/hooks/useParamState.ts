import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useParamState = <T>(
  key: string,
  defaultValue: T,
  scroll: boolean = false
) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const newSearchParams = new URLSearchParams(searchParams.toString())

  const paramValue = searchParams.get(key)
  let state: T
  try {
    state = paramValue !== null ? (JSON.parse(paramValue) as T) : defaultValue
  } catch {
    state = defaultValue
  }

  const setState = (newState: T) => {
    if (
      newState !== undefined &&
      newState !== null &&
      newState !== defaultValue
    ) {
      newSearchParams.set(key, JSON.stringify(newState))

      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: scroll,
      })
    } else {
      newSearchParams.delete(key)

      router.push(`${pathname}?${newSearchParams.toString()}`, {
        scroll: scroll,
      })
    }
  }

  return [state, setState] as const
}
