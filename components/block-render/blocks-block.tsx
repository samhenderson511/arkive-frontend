import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { BlocksRenderer } from "./strapi-blocks-renderer";

export async function BlocksBlock({ content }: { content: BlocksContent }) {
  return <BlocksRenderer content={content} />;
}
