import { NextURL } from "next/dist/server/web/next-url";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { strapiQuery } from "./lib/strapi-query";
import { getPreviewDomain } from "./lib/util/get-preview-domain";
import { ApiCart } from "./types";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any .svg file
     * - sitemap.xml
     * - manifest.webmanifest
     * - robots.txt
     */
    "/((?!api|_next/static|_next/image|.+.svg|sitemap.xml|robots.txt|manifest.webmanifest|favicon.ico).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";

  const path = getRequestPath(url);

  await setCartCookie();

  return handleRewrite(url, hostname, path);
}

async function setCartCookie() {
  const awaitedCookies = await cookies();
  const cartId = awaitedCookies.get("cartId")?.value;

  if (!cartId) {
    const cart = await strapiQuery<ApiCart>({
      path: "carts?status=published",
      fetchOptions: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {},
        }),
      },
    });

    awaitedCookies.set("cartId", cart?.data?.documentId);
  }
}

function handleRewrite(url: NextURL, hostname: string, path: string) {
  const previewDomain = getPreviewDomain(hostname);

  if (!previewDomain) {
    return rewriteToDynamicRoute(url, hostname, path);
  }

  // check if a chanel ID has been provided as a subdomain
  const isSubDomain = hostname.split(".").length > previewDomain.split(".").length;

  // rewrite to the home folder if no channel ID has been provided
  if (!isSubDomain) {
    return rewriteToHomeFolder(url, path);
  }

  return rewriteToDynamicRoute(url, hostname, path);
}

function getRequestPath(url: NextURL) {
  const searchParams = url.searchParams.toString();
  return `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;
}

function rewriteToHomeFolder(url: string | URL | undefined, path: string) {
  return NextResponse.rewrite(new URL(`/home${path === "/" ? "" : path}`, url));
}

function rewriteToDynamicRoute(url: string | URL | undefined, hostname: any, path: any) {
  const rewrite = new URL(`/${hostname}${path}`, url);

  return NextResponse.rewrite(rewrite, {});
}
