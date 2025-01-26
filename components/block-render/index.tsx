import { ApiSite, SingleDesign } from "@/types";
import clsx from "clsx";
import { DynamicZone } from "../../types/strapi/built-ins";
import { Transition } from "../layout/transition";
import { blocks } from "./blocks";

interface Props {
  dynamicZone: DynamicZone[];
  site: ApiSite;
}

export type MarginOptions = "None" | "Less" | "Default" | "More";

export const getMarginClassNames = (design: SingleDesign | undefined) => {
  return clsx({
    "-mt-8 lg:-mt-16": design?.topMargin === "None",
    "-mb-8 lg:-mb-16": design?.bottomMargin === "None",

    "-mt-4 lg:-mt-8": design?.topMargin === "Less",
    "-mb-4 lg:-mb-8": design?.bottomMargin === "Less",

    "mt-4 lg:mt-8": design?.topMargin === "More",
    "mb-4 lg:mb-8": design?.bottomMargin === "More",
  });
};

export async function BlockRender({ dynamicZone, site }: Props) {
  return dynamicZone?.map(({ __component, ...block }, index) => {
    const BlockComponent = blocks[__component].component;

    if (!BlockComponent) {
      return <div key={index}>Block not found: {__component}</div>;
    }

    return (
      <Transition waitForInView transitionName="fadeInUp" key={`${__component}_${index}`}>
        <BlockComponent {...block} site={site} className={getMarginClassNames(block.design)} />
      </Transition>
    );
  });
}
