import { Tile } from "@/components/common/tile";
import { Logo, TitleBar } from "@/components/ui";
import { getCategoryBrands } from "@/lib/data/getCategoryBrands";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getRegion } from "@/lib/data/getRegion";
import { notFound } from "next/navigation";
import slugify from "slugify";
import { StoreTabPageProps } from "types/global";
import { BannerBrand } from "types/strapi";

export { generateMetadata } from "./metadata";

async function Brands(props: StoreTabPageProps) {
  const params = await props.params;
  const { domain, countryCode } = params;
  const { tab, handle } = await getCategoryFromDomain(domain, 4);
  const region = await getRegion(countryCode);
  const brands: BannerBrand[] = await getCategoryBrands(handle);

  if (!brands) {
    return notFound();
  }

  const { Title, Background, Description } = tab.BrandsPageBanner;

  return (
    <div className={"flex flex-col items-center justify-center gap-1.5 lg:gap-8"}>
      <TitleBar
        background={Background.data?.[0]}
        description={Description}
        title={Title}
        logo={tab.Logo.data}
      />
      <div className={"px-1.5 lg:px-8 w-full flex justify-center"}>
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-1.5 lg:gap-3 max-w-screen-2xl w-full"}>
          {brands
            .sort((a, b) =>
              a.attributes.BrandBanner.Title.localeCompare(b.attributes.BrandBanner.Title)
            )
            .map((brand) => {
              const {
                Logo: logo,
                BrandBanner: { Title, Background },
              } = brand.attributes;

              return (
                <Tile
                  title={Title}
                  logo={logo.data}
                  href={`/brands/${slugify(Title, {
                    lower: true,
                  })}`}
                  image={Background.data?.[0]}
                  className={"h-64"}
                  heading={
                    <>
                      <Logo className={"!max-w-[12rem]"} logo={logo.data} />
                      {Title}
                    </>
                  }
                  sizes={"(min-width: 768px) 50vw, 100vw"}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Brands;
