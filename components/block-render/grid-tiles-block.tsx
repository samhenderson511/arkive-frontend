import { UiGridTiles } from "@/types";
import clsx from "clsx";
import { Tile } from "../ui/tile";

export function GridTilesBlock({ tiles, className }: UiGridTiles & { className?: string }) {
  return (
    <div className={clsx("flex flex-wrap w-full p-1 gap-1 bg-zinc-900", className)}>
      {[...tiles].map((tile) => (
        <Tile key={tile.title} {...tile} />
      ))}
    </div>
  );
}
