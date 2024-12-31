import { barlow } from "app/fonts"
import clsx from "clsx"

interface Props {
  metadata: { brand: string }
  title: string
  truncate?: boolean
}

const ProductDetails = ({ metadata, truncate = false, title }: any) => (
  <div className="flex flex-col">
    <span className={clsx("text-xs font-bold uppercase")}>
      {metadata.brand as string}
    </span>
    <h4
      className={clsx(
        "text-lg uppercase",
        truncate && "line-clamp-1",
        barlow.className
      )}
    >
      {title}
    </h4>
  </div>
)

export { ProductDetails }
