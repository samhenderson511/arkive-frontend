export type ProductSearchResult = {
  salePrice: number;
  id: string;
  name: string;
  categories: {
    cat?: string;
    dept?: string;
    subDept?: string;
  };
  createdAt: number;
  colourGroups: string[];
  images: {
    colourGroups: (string | undefined)[];
    name?: string;
    colours?: string[];
    url?: string;
    blurhash?: string;
    width?: number;
    height?: number;
  }[];
  brand: string;
  sizes: string[];
  price: number;
  discount: number;
};
