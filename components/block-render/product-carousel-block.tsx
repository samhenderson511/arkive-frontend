import { UiProductCarousel } from "@/types";
import { Text } from "../ui/text";
import { ButtonBlock } from "./button-block";

export function ProductCarouselBlock({
  title,
  rows = 2,
  brands,
  categories,
  button,
  limit,
  onSaleOnly,
}: UiProductCarousel) {
  const products = [];

  if (!products?.length) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center w-full p-1.5 sm:p-4 lg:p-8">
        <div className={"max-w-8xl w-full xl:bg-background flex flex-col gap-8 items-center"}>
          <div className="flex flex-col gap-2 sm:flex-row justify-between items-center">
            <Text element="h2" elementStyle="h3">
              {title}
            </Text>
            {button && <ButtonBlock {...button} />}
          </div>
        </div>
      </div>
    </>
  );
}
