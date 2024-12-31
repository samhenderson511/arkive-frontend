import { UiGridTiles } from "@/types";
import { Tile } from "../ui/tile";

export function GridTilesBlock({ tiles }: UiGridTiles) {
  return (
    <div className="flex flex-wrap w-full gap-1.5 lg:gap-3 p-1.5 lg:p-3 pb-4">
      {tiles.map((tile) => (
        <Tile key={tile.title} {...tile} />
      ))}
    </div>
  );
}
