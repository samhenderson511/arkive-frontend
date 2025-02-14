import { BlocksContent } from "@strapi/blocks-react-renderer";

export function convertToPlainText(content: BlocksContent): string {
  function processNode(node: BlocksContent[number]): string {
    if (!node) return "";

    let content = "";
    if (node.children) {
      node.children.forEach((child: any) => {
        content += processNode(child);
      });
    }

    switch (node.type) {
      case "heading":
      case "paragraph":
      case "quote":
      case "code":
        return content;
      case "list":
        return content;
      case "image":
        return node.image?.alternativeText || "";
      default:
        return content;
    }
  }

  return content?.map((node) => processNode(node)).join(" ");
}
