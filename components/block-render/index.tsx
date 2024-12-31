import { DynamicZone } from "../../types/strapi/built-ins";
import { blocks } from "./blocks";

export async function BlockRender({ dynamicZone }: { dynamicZone: DynamicZone[] }) {
  return dynamicZone?.map(({ __component, ...block }, index) => {
    const BlockComponent = blocks[__component].component;

    if (!BlockComponent) {
      return <div key={index}>Block not found: {__component}</div>;
    }

    return <BlockComponent key={`${__component}_${index}`} {...block} />;
  });
}
