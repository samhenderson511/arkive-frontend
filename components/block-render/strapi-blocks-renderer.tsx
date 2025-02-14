"use client";

import { Text } from "@/components";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { BlocksRenderer as StrapiBlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export function BlocksRenderer({
  content,
  className,
}: {
  content: BlocksContent;
  className?: string;
}) {
  return (
    <StrapiBlocksRenderer
      content={content}
      blocks={{
        heading: ({ level, children }) => (
          <Text className={className} element={`h${level}`}>
            {children}
          </Text>
        ),
        paragraph: ({ children }) => (
          <Text className={className} element="p">
            {children}
          </Text>
        ),
        image: ({ image }) => (
          <Image
            className={className}
            src={image.url}
            alt={image.alternativeText || ""}
            width={image.width}
            height={image.height}
          />
        ),
      }}
    />
  );
}
