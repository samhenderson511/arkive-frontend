import { IconLoader2 } from "@tabler/icons-react"

export default function Loading() {
  return (
    <div className="h-[calc(100svh-10.55rem-44px)] md:h-[calc(100svh-7.5rem)] lg:h-[calc(100svh-7.5rem)] flex items-center animate-pulse justify-center">
      <IconLoader2 className="animate-spin text-muted-foreground" size={48} />
    </div>
  )
}
