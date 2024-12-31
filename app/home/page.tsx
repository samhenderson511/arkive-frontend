// This page is returned if the request is coming from localhost or the application's root domain.

import { Button, Text } from "@/components";
import { strapiQuery } from "@/lib/strapi-query";
import { ApiSite } from "@/types";
import type { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  robots: "noindex, nofollow", // Prevent search engines from indexing this page
};

export default async function HomePage() {
  const availableChannels = await strapiQuery<ApiSite[]>({
    path: "sites",
    options: {
      populate: { category: { fields: ["name"] } },
    },
  });

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  return (
    <div className="flex flex-col gap-4 p-16 min-h-svh items-center justify-center">
      <Text className="font-black" element="h1">
        Available Channels
      </Text>

      <ul className="flex flex-col items-center">
        {availableChannels?.data?.map((channel) => (
          <li key={channel.documentId}>
            <Button
              size={"lg"}
              className="text-lg"
              variant={"link"}
              href={`${protocol}://${channel.category.name}.${host}`}
            >
              {channel.category.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
