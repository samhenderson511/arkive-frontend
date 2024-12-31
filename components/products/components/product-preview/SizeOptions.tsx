import { IconPlus } from "@tabler/icons-react"

const SizeOptions = ({ sizeOptions }: any) => (
  <ul className="@[228px]:flex flex-wrap justify-end gap-1 items-start hidden">
    {sizeOptions ? (
      <>
        {sizeOptions?.slice(0, 3).map((opt) => (
          <li
            key={opt}
            className={
              "flex text-xs font-semibold h-6 px-1 min-w-6 items-center justify-center rounded-sm bg-secondary"
            }
          >
            {opt}
          </li>
        ))}
        {sizeOptions?.length > 3 && (
          <li className={"h-6 w-6 flex items-center justify-center"}>
            <IconPlus size={14} />
          </li>
        )}
      </>
    ) : (
      Array.from({ length: 3 }).map((_, index) => (
        <div
          key={"sizeOption " + index}
          className={
            "h-7 w-7 bg-muted border border-border rounded-sm animate pulse"
          }
        />
      ))
    )}
  </ul>
)

export { SizeOptions }
