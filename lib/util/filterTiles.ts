import { HomepageGridTile, StoreTab } from "types/strapi"

interface CategoriesAndTiles {
  categories: StoreTab[]
  tiles: HomepageGridTile[]
}

function filterTiles({ categories, tiles }: CategoriesAndTiles) {
  const filteredTiles = tiles.filter((tile) =>
    categories.map((cat) =>
      cat.attributes.GridTile.data.map(
        (catTile) => catTile.attributes.Title === tile.attributes.Title
      )
    )
  )
  return filteredTiles
}

export { type CategoriesAndTiles, filterTiles }
