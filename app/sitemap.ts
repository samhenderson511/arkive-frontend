import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { generateStaticParams as productParams } from "./[domain]/(main)/[department]/[subDepartment]/[product]/page";
import { generateStaticParams as subDepartmentParams } from "./[domain]/(main)/[department]/[subDepartment]/page";
import { generateStaticParams as departmentParams } from "./[domain]/(main)/[department]/page";
import { generateStaticParams as brandParams } from "./[domain]/(main)/brands/[brand]/page";
import { generateStaticParams as pageParams } from "./[domain]/(main)/support/[richText]/page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const domain = headersList.get("host");

  const baseUrl = `https://${domain}`;
  const date = new Date().toISOString();

  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: date },
    { url: `${baseUrl}/support/faqs`, lastModified: date },
    { url: `${baseUrl}/support/contact`, lastModified: date },
    { url: `${baseUrl}/support`, lastModified: date },
    {
      url: `${baseUrl}/brands`,
      lastModified: date,
    },
    {
      url: `${baseUrl}/new-arrivals`,
      lastModified: date,
    },
    {
      url: `${baseUrl}/sale`,
      lastModified: date,
    },
  ];

  // Add all pages to sitemap
  const pageParamsList = await pageParams();
  pageParamsList.forEach((params) => {
    const url = `${baseUrl}/support/${params.richText}`;
    urls.push({ url, lastModified: date });
  });

  // Add all products to sitemap
  const productParamsList = await productParams({ params: { domain } });
  productParamsList.forEach((params) => {
    const url = `${baseUrl}/${params.department}/${params.subDepartment}/${params.product}`;
    urls.push({ url, lastModified: date });
  });

  // Add all sub-departments to sitemap
  const subDepartmentParamsList = await subDepartmentParams({
    params: { domain },
  });
  subDepartmentParamsList.forEach((params) => {
    const url = `${baseUrl}/${params.department}/${params.subDepartment}`;
    urls.push({ url, lastModified: date });
  });

  // Add all departments to sitemap
  const departmentParamsList = await departmentParams({ params: { domain } });
  departmentParamsList.forEach((params) => {
    const url = `${baseUrl}/${params.department}`;
    urls.push({ url, lastModified: date });
  });

  // add brands to sitemap
  const brandParamsList = await brandParams({ params: { domain } });
  brandParamsList.forEach((params) => {
    const url = `${baseUrl}/brands/${params.brand}`;
    urls.push({ url, lastModified: date });
  });

  // finish up
  console.log(`✅ Generated ${urls.length} urls for sitemap`);

  return urls;
}
