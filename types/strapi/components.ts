import { BlocksContent } from "@strapi/blocks-react-renderer";
import { ApiBrand, ApiCategory, ApiColour } from "./apis";
import { Media } from "./built-ins";

export interface RepeatableGridTile {
  background: Media;
  title: string;
  url: string;
}

export interface UiGridTiles {
  tiles: RepeatableGridTile[];
}

export interface RepeatableAnnouncement {
  backgroundColor: string;
  color: string;
  content: BlocksContent;
}

export interface SingleDesign {
  bottomMargin: "None" | "Less" | "Default" | "More";
  topMargin: "None" | "Less" | "Default" | "More";
}

export interface UiButton {
  children: string;
  design: SingleDesign;
  href: string;
  size: "Large" | "Default" | "Small";
  variant: "Primary" | "Secondary" | "Outline" | "Ghost" | "Link";
}

export interface UiBanner {
  background?: Media;
  description?: string;
  title?: string;
  href?: string;
}

export interface UiBannerCarousel {
  slides: UiBanner[];
}

export interface RepeatableColourImage {
  colours: ApiColour[];
  images: Media[];
  name: string;
  thumbnail: Media;
}

export interface SingleSeo {
  description: string;
  images: Media;
  keywords: string;
  noIndex: boolean;
  schema: JSON;
  title: string;
}

export interface UiCard {
  content: BlocksContent;
  images: Media[];
  buttons?: UiButton[];
  design?: SingleDesign;
}

export interface RepeatableGridTile {
  background: Media;
  title: string;
  url: string;
}

export interface UiGridTiles {
  tiles: RepeatableGridTile[];
}

export interface UiProductCarousel {
  brands: ApiBrand[];
  button: UiButton;
  categories: ApiCategory[];
  limit: number;
  onSaleOnly: boolean;
  rows: number;
  title: string;
}

export interface UiCategories {
  categories: ApiCategory[];
}

export interface UiBrands {
  scrollSpeed: number;
}