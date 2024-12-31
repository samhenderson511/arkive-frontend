import { IS_PRODUCTION, ROOT_DOMAIN } from "@/lib/constants";
import { NextRequest } from "next/server";

export async function getHostname(
  headers: NextRequest["headers"],
  cookies?: NextRequest["cookies"]
) {
  let domain = headers.get("host") || "";
  if (!IS_PRODUCTION) {
    const domainCookie = cookies?.get("arkiveDomain")?.value;
    domain = domainCookie || ROOT_DOMAIN;
  }

  return domain;
}
