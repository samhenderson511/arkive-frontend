import { toLower } from "lodash"
import slugify from "slugify"
import { StoreTab } from "types/strapi"

interface Props {
  categories: StoreTab[]
  pathname: string
}

function getCurrentTab({ categories, pathname }: Props) {
  const slugifiedPathSegment = pathname.split("/").find((segment) => segment)
  const matchingCategory = categories.find(
    (cat) =>
      slugifiedPathSegment === slugify(toLower(cat.attributes.CategoryHandle))
  )

  return matchingCategory
    ? matchingCategory.attributes.CategoryHandle
    : categories[0].attributes.CategoryHandle
}

export { getCurrentTab }
