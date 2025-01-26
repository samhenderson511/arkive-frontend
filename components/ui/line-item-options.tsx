import { toTitleCase } from "@/lib/util/to-title-case";
import type { ProductVariant } from "@medusajs/client-types";

type LineItemOptionsProps = { variant: ProductVariant };

const LineItemOptions = ({ variant }: LineItemOptionsProps) => {
  const meta = variant.metadata as { [key: string]: string };
  return (
    <div className="flex flex-col text-sm text-muted-foreground">
      {meta.colour && <span>Colour: {toTitleCase(meta.colour)}</span>}
      {meta.size && <span>Size: {meta.size}</span>}
      {meta.brand && <span>Brand: {toTitleCase(meta.brand)}</span>}
    </div>
  );
};

export default LineItemOptions;
