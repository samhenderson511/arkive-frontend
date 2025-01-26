"use client";

import { Configure, ConfigureProps } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const url = process.env.NEXT_PUBLIC_TYPESENSE_URL;
const orgId = process.env.NEXT_PUBLIC_TYPESENSE_API_KEY;

export function SearchContext({
  children,
  indexName,
  routing = true,
  configure,
}: {
  children: React.ReactNode;
  indexName: string;
  routing?: boolean;
  configure: ConfigureProps;
}) {
  if (!url) throw new Error("NEXT_PUBLIC_TYPESENSE_URL is not set");
  if (!orgId) throw new Error("NEXT_PUBLIC_TYPESENSE_API_KEY is not set");

  const typesense = new TypesenseInstantSearchAdapter({
    server: {
      nodes: [
        {
          host: url.replace("https://", ""),
          port: 443,
          protocol: "https",
        },
      ],
      connectionTimeoutSeconds: 10,
      retryIntervalSeconds: 2,
      apiKey: orgId,
    },
    additionalSearchParameters: {
      preset: "search_only",
      query_by: "name,brand,categories",
    },
  });

  return (
    <InstantSearchNext
      searchClient={typesense.searchClient}
      indexName={indexName}
      routing={routing}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure {...configure} />

      {children}
    </InstantSearchNext>
  );
}
