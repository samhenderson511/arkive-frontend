import clsx from "clsx";
import type { SingleDesign } from "../../types/strapi/components";

export const designClassNames = (design: SingleDesign | undefined) =>
  clsx({
    // top margin
    "-mt-8 sm:-mt-20": design?.topMargin === "None",
    "-mt-4 sm:-mt-12": design?.topMargin === "Less",
    "": design?.topMargin === "Default",
    "mt-8 sm:mt-20": design?.topMargin === "More",
    // bottom margin
    "-mb-8 sm:-mb-20": design?.bottomMargin === "None",
    "-mb-4 sm:-mb-12": design?.bottomMargin === "Less",
    "": design?.bottomMargin === "Default",
    "mb-8 sm:mb-20": design?.bottomMargin === "More",
  });
