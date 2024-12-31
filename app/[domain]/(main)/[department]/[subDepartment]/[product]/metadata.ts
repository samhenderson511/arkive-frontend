import { getSeoData } from "@/lib/data/getSeoData";
import { getRegion } from "@/lib/data/getRegion";
import { getCategoryFromDomain } from "@/lib/data/getCategoryFromDomain";
import { getPricedProduct } from "@/lib/data/getPricedProduct";
import { createMetaData } from "@/lib/util/createMetadata";
import { handleWithoutCategory } from "@/lib/util/handleWithoutCategory";
import { Metadata } from "next";
import slugify from "slugify";
import { ProductPageProps } from "types/global";

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { department, domain, subDepartment, countryCode } = params;
  const { tab, handleAsParam } = await getCategoryFromDomain(domain);
  const data = await getSeoData("/[storeTab]/[department]/[subDepartment]/[product]");
  const region = await getRegion(countryCode);

  const categoryHandle =
    `/${handleAsParam}/${slugify(department, { strict: true })}/${slugify(subDepartment, { strict: true })}`.toUpperCase();
  const productHandle =
    `${categoryHandle}/${slugify(params.product, { strict: true })}`.toUpperCase();

  const product = await getPricedProduct(productHandle, categoryHandle, region);

  if (!product) {
    return null;
  }

  const { BrandTitle } = tab;
  const {
    baseUrl = null,
    canonicalURL = null,
    description = null,
    imageData = null,
    keywords = null,
    title = null,
  } = createMetaData({
    data: data,
    brand: product.metadata.brand as string,
    department,
    subDepartment,
    storeTab: { attributes: tab, id: 0 },
    product: product,
  });
  const image = imageData?.data?.attributes;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: new URL(handleWithoutCategory(product.handle), baseUrl),
      images: [product.thumbnail, { url: image?.url, width: image?.width, height: image?.height }],
      siteName: BrandTitle,
      locale: "en_GB",
      type: "website",
    },
    alternates: {
      canonical: canonicalURL,
    },
  };
}
