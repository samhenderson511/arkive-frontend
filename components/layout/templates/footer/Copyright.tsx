import Link from "next/link"
import Image from "next/image"
import { StoreTab } from "types/strapi"

interface Props {
  currentYear: number
  currentTab: StoreTab
}

export const Copyright = ({ currentTab, currentYear }: Props) => (
  <div className="flex flex-col items-center justify-between w-full text-sm gap-2 md:flex-row max-w-8xl text-muted-foreground">
    <span>
      {`© ${currentYear} ${currentTab?.attributes?.BrandTitle}, All rights reserved.`}
    </span>
    <p
      className={
        "flex gap-1 sm:items-baseline flex-col items-center sm:flex-row"
      }
    >
      <span>Website Design in Dundee by </span>
      <span>
        <Link
          className={"flex items-center relative justify-center gap-2"}
          href={"https://hendersondigital.co.uk"}
        >
          <b>Henderson Digital</b>
          <Image
            className={"!relative !h-4 !w-4"}
            fill
            src={"/henderson-digital.svg"}
            alt={"Henderson Digital"}
          />
        </Link>
      </span>
    </p>
  </div>
)
