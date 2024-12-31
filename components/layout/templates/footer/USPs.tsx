import { barlow } from "app/fonts"
import clsx from "clsx"
import Image from "next/image"
import { FooterUsp } from "types/strapi"

interface Props {
  usps: FooterUsp[]
}

export const USPs = async ({ usps }: Props) => (
  <div className="flex flex-wrap w-full gap-4 max-w-8xl md:gap-8">
    {usps.map((usp) => {
      const { Description, Icon, Title } = usp.attributes
      return (
        <div
          key={Title}
          className="flex flex-col items-center justify-center gap-3 p-4 border rounded-sm border-border h-80 grow md:basis-96"
        >
          <div className="relative flex w-24 h-24">
            <Image
              className={"!relative dark:invert"}
              fill
              src={Icon.data.attributes.url}
              alt={Icon.data.attributes.alternativeText || Title}
            />
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className={clsx(barlow.className, "text-3xl uppercase")}>
              {Title}
            </h3>
            <p className="max-w-sm prose-sm prose dark:prose-invert">
              {Description}
            </p>
          </div>
        </div>
      )
    })}
  </div>
)
