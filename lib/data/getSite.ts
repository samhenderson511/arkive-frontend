import { ApiSite } from "@/types";
import { StrapiInferredQueryOptions, strapiQuery } from "../strapi-query";
import { IS_PRODUCTION } from "../environment";

export async function getSite(
  encodedDomain: string,
  options?: StrapiInferredQueryOptions<ApiSite[]>
) {
  const domain = decodeURIComponent(encodedDomain);
  const subDomain = !IS_PRODUCTION ? domain.split(".")[0] : null;

  const site = await strapiQuery<ApiSite[]>({
    path: "sites",
    options: {
      filters:
        subDomain ? { category: { name: { $eqi: subDomain } } } : { domain: { $eq: domain } },
      pagination: { page: 1, pageSize: 1 },
      ...options,
    },
  });

  return site?.data?.[0];
}
