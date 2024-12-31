import { FAQ, RichTextPage } from "types/strapi"
import { Column } from "."
import slugify from "slugify"

interface Props {
  pages: RichTextPage[]
  currentHandle: string
  faqs: FAQ[]
}

export const Column2 = ({ pages, currentHandle, faqs }: Props) => {
  const pageLinks = pages.map((page) => {
    return {
      href: `/support/${slugify(page.attributes.PageTitle)}`,
      label: page.attributes.PageTitle,
    }
  })

  const customLinks = [
    {
      href: `/contact`,
      label: "Contact Us",
    },
    Boolean(faqs?.length) && {
      href: `/support/faqs`,
      label: "FAQs",
    },
  ].filter(Boolean)

  return <Column title={"Customer Support"} items={[customLinks, pageLinks]} />
}
