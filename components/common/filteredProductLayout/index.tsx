import type { Product, Region } from "@medusajs/client-types"
import { Banner, Media, StoreTab } from "types/strapi"
import { TitleBar } from ".."
import { FilteredProducts } from "./FilteredProducts"
import { SearchLayout } from "./searchLayout"

export async function FilteredProductLayout({
  page,
  category,
  products,
  showLogo,
  region,
  logo,
  enableSearch,
  filterData,
}: {
  logo?: Media
  region: Region
  enableSearch?: boolean
  page: Banner
  category: StoreTab["attributes"]
  products: Product[]
  filterData: Product[]
  showLogo?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <TitleBar
        logo={logo || category.Logo?.data}
        background={page.Background?.data?.[0]}
        description={page.Description}
        title={page.Title}
        showLogo={showLogo}
      />

      {enableSearch ? (
        <SearchLayout
          region={region}
          categoryHandle={category.CategoryHandle}
        />
      ) : (
        <FilteredProducts
          categoryHandle={category.CategoryHandle}
          filterData={filterData}
          products={products}
          region={region}
        />
      )}
    </div>
  )
}
