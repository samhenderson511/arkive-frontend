import { RichText } from "types/strapi"

export function convertToHtml(content: RichText[]) {
  function processNode(node: RichText) {
    if (!node) return ""

    let content = ""
    if (node.children) {
      node.children.forEach((child: any) => {
        content += processNode(child)
      })
    }

    switch (node.type) {
      case "heading":
        return `<h${node.level}>${content}</h${node.level}>`
      case "paragraph":
        return `<p>${content}</p>`
      case "list":
        const tag = node.format === "ordered" ? "ol" : "ul"
        return `<${tag}>${content}</${tag}>`
      case "list-item":
        return `<li>${content}</li>`
      case "image":
        return `<img src="${node.image.url}" alt="${
          node.image.alternativeText || ""
        }" width="${node.image.width}" height="${node.image.height}" />`
      case "quote":
        return `<blockquote>${content}</blockquote>`
      case "code":
        return `<pre><code>${content}</code></pre>`
      case "link":
        return `<a href="${node.url}">${content}</a>`
      case "text":
        let text = node.text
        if (node.bold) {
          text = `<strong>${text}</strong>`
        }
        if (node.italic) {
          text = `<em>${text}</em>`
        }
        if (node.underline) {
          text = `<u>${text}</u>`
        }
        if (node.strikethrough) {
          text = `<s>${text}</s>`
        }
        return text
      default:
        return content
    }
  }

  return content?.map((node) => processNode(node)).join("")
}
