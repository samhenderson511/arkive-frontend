import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

export async function BlocksBlock({ content }: { content: BlocksContent }) {
  return <BlocksRenderer content={content} />;
}
