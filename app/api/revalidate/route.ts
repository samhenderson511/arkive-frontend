import { NextRequest } from "next/server"
import { revalidateTag } from "next/cache"

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag")

  revalidateTag(tag)

  return Response.json({ revalidated: tag, now: Date.now() })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const strapiTag = body.model

  revalidateTag(strapiTag)

  console.log("Revalidated tag:", strapiTag)
  return Response.json({ revalidated: strapiTag, now: Date.now() })
}
