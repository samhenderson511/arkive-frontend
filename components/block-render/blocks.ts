import { BannerBlock } from "./banner-block";
import { BlocksBlock } from "./blocks-block";
import { BrandsBlock } from "./brands-block";
import { ButtonBlock } from "./button-block";
import { CardBlock } from "./card-block";
import { CategoriesBlock } from "./categories-block";
import { GridTilesBlock } from "./grid-tiles-block";
import { ProductCarouselBlock } from "./product-carousel-block";

export const blocks: Record<
  | "ui.grid-tiles"
  | "ui.card"
  | "ui.button"
  | "ui.blocks"
  | "ui.banner"
  | "ui.products-carousel"
  | "ui.categories"
  | "ui.brands"
  | "ui.banner-carousel",
  {
    component: any;
  }
> = {
  "ui.blocks": { component: BlocksBlock },
  "ui.button": { component: ButtonBlock },
  "ui.card": { component: CardBlock },
  "ui.grid-tiles": { component: GridTilesBlock },
  "ui.banner-carousel": { component: BannerBlock },
  "ui.banner": { component: BannerBlock },
  "ui.products-carousel": { component: ProductCarouselBlock },
  "ui.categories": { component: CategoriesBlock },
  "ui.brands": { component: BrandsBlock },
};
