import { StoreTab } from "types/strapi"
import { Column } from "."

interface Props {
  currentHandle: string
  currentTab: StoreTab
  tabs: StoreTab[]
}

export const Column1 = ({ tabs, currentHandle, currentTab }: Props) => {
  const categories = tabs.map((tab) => ({
    href: tab.attributes.CategoryHandle,
    label: tab.attributes.Title,
  }))
  const links = [
    {
      href: `${currentHandle}/sale`,
      label: `${currentTab.attributes.Title} Sale`,
    },
    {
      href: `${currentHandle}/new-arrivals`,
      label: `${currentTab.attributes.Title} New Arrivals`,
    },
    {
      href: `${currentHandle}/brands`,
      label: `${currentTab.attributes.Title} Brands`,
    },
  ]
  return (
    <Column
      title={"Explore"}
      items={[links, categories.length > 1 && categories].filter(Boolean)}
    />
  )
}
