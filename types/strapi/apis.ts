import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { DynamicZone, Media } from "./built-ins";
import {
  RepeatableAddress,
  RepeatableAnnouncement,
  RepeatableCartLineItem,
  RepeatableColourImage,
  RepeatableOrderLineItem,
  RepeatableShipment,
  SingleSeo,
  UiBanner,
  UiBannerCarousel,
} from "./components";

export interface ApiRoute {
  id: string;
  documentId: string;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
}

export interface ApiCategory extends ApiRoute {
  banner: UiBanner;
  children: ApiCategory[];
  name: string;
  parent: ApiCategory;
  products: ApiProduct[];
  publishedAt: Date;
  seo: SingleSeo;
}

export interface ApiSite extends ApiRoute {
  domain: string;
  accent: string;
  accentForeground: string;
  announcements: RepeatableAnnouncement[];
  appleTouchIcon: Media;
  background: string;
  bodyFont: string;
  bodyWeight: "Normal" | "Medium";
  border: string;
  brandsBanner: UiBanner;
  card: string;
  cardForeground: string;
  category: ApiCategory;
  content: DynamicZone[];
  destructive: string;
  destructiveForeground: string;
  email: string;
  facebook: string;
  favicon: Media;
  footerDescription: BlocksContent;
  foreground: string;
  headingFont: string;
  headingWeight: "Normal" | "Medium" | "Semi-bold" | "Bold" | "Extra-bold" | "Black";
  heroBanner: UiBannerCarousel;
  input: string;
  instagram: string;
  logo: Media;
  muted: string;
  mutedForeground: string;
  name: string;
  newArrivalsBanner: UiBanner;
  phone: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  radius: number;
  ring: string;
  saleBanner: UiBanner;
  searchBanner: UiBanner;
  secondary: string;
  secondaryForeground: string;
  seo: SingleSeo;
  tiktok: string;
  twitter: string;
  updatedAt: Date;
  youtube: string;
}

export interface ApiUser extends ApiRoute {
  firstname: string;
  lastname: string;
  preferedLanguage: string;
  username: string;
}

export interface ApiSeo extends ApiRoute {
  page: string;
  seo: SingleSeo;
}

export interface ApiFaq extends ApiRoute {
  answer: BlocksContent;
  question: string;
}

export interface ApiSale extends ApiRoute {
  applicableProducts: ApiProduct[];
  brands: ApiBrand[];
  categories: ApiCategory[];
  discountPercentage: number;
  endDate: Date;
  locale: string;
  name: string;
  products: ApiProduct[];
  seasons: ApiSeason[];
  startDate: Date;
}

export interface ApiSeason extends ApiRoute {
  name: string;
  products: ApiProduct[];
}

export interface ApiBrand extends ApiRoute {
  banner: UiBanner;
  logo: Media;
  name: string;
  products: ApiProduct[];
  seo: SingleSeo;
}

export interface ApiColourGroup extends ApiRoute {
  colours: ApiColour[];
  name: string;
}

export interface ApiColour extends ApiRoute {
  colourGroup: ApiColourGroup;
  name: string;
}

export interface ApiProduct extends ApiRoute {
  applicableSales: ApiSale[];
  brand: ApiBrand;
  categories: ApiCategory[];
  description: BlocksContent;
  images: RepeatableColourImage[];
  name: string;
  season: ApiSeason;
  seo: SingleSeo;
  variants: ApiProductVariant[];
}

export interface ApiProductVariant extends ApiRoute {
  colour: ApiColour[];
  name: string;
  price: number;
  product: ApiProduct;
  taxRate: number;
  publishedAt: Date;
  size: string;
  sku: string;
  stock: number;
}

export interface ApiSharedPage extends ApiRoute {
  content: DynamicZone[];
  heroBanner: UiBanner;
  name: string;
  slug: string;
}

export interface ApiSeo extends ApiRoute {
  page: string;
  seo: SingleSeo;
}

export interface ApiCart extends ApiRoute {
  lineItems: RepeatableCartLineItem[];
  user: ApiUser;
}

export interface ApiDiscountCode extends ApiRoute {
  amountOffPerItem: number;
  amountOffTotal: number;
  code: string;
  endDate: Date;
  maximumTotal: number;
  maxRedemptions: number;
  metadata: JSON;
  minimumTotal: number;
  orders: ApiOrder[];
  percentageOff: number;
  startDate: Date;
  validCategories: ApiCategory[];
  validProducts: ApiProduct[];
  validSeasons: ApiSeason[];
}

export interface ApiGiftCard extends ApiRoute {
  createdFrom: ApiOrder;
  orders: ApiOrder[];
  user: ApiUser;
  value: number;
}

export interface ApiOrder extends ApiRoute {
  billingAddress: RepeatableAddress;
  lineItems: RepeatableOrderLineItem[];
  discountCode: ApiDiscountCode;
  discounts: number;
  email: string;
  eposTransactionId: string;
  giftCard: ApiGiftCard;
  locale: string;
  orderStatus:
    | "Awaiting Payment"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled"
    | "Returned"
    | "Ready for Collection";
  paymentData: JSON;
  paymentMethod: string;
  phone: string;
  publishedAt: Date;
  returns: ApiReturn[];
  shipments: RepeatableShipment[];
  shippingAddress: RepeatableAddress;
  shippingMethod: ApiShippingMethod;
  subtotal: number;
  tax: number;
  total: number;
}

export interface ApiShippingMethod extends ApiRoute {
  allowFreeShippingDiscounts: boolean;
  locale: string;
  maximumOrderAmount: number;
  metadata: JSON;
  minimumOrderAmount: number;
  name: string;
  price: number;
}

export interface ApiReturn extends ApiRoute {
  createdAt: Date;
  createdBy: ApiUser;
  lineItems: RepeatableOrderLineItem[];
  locale: string;
  localizations: ApiReturn[];
  order: ApiOrder;
  reason: "Defective" | "Wrong Size" | "Changed Mind";
  refundAmount: number;
  returnStatus: "Requested" | "Approved" | "Denied" | "Completed";
}
