import { IconX } from "@tabler/icons-react"
import pluralize from "pluralize"
import { Button } from "../button"
import { AccordionTrigger } from "../accordion"
import { useAutoAnimate } from "@formkit/auto-animate/react"

export function FilterTitle({
  title,
  onClear,
  size,
}: {
  title: string
  onClear: () => void
  size: number
}) {
  const [animate] = useAutoAnimate()
  return (
    <div
      className={"relative justify-between flex w-full items-center mt-2"}
      ref={animate}
    >
      <h3 className={"font-semibold"}>{title}</h3>
      {onClear && (
        <Button
          variant="secondary"
          size="xs"
          className="gap-3"
          onClick={onClear}
        >
          <span>Clear {pluralize("filter", size, true)}</span>
          <IconX size={12} />
        </Button>
      )}
    </div>
  )
}
