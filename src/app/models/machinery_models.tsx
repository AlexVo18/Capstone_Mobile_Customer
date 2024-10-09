export interface MachineryData {
  productId: number;
  productName: string;
  categoryName: string;
  rentPrice: number;
  productPrice: number;
  quantity: number;
  model: string;
  description: string;
  origin: string;
  categoryId: number;
  dateCreate: string;
  status: string;
  productImageList: MachineryImageData[];
}

export interface MachineryImageData {
  productImageId: number;
  productId: number;
  productImageUrl: string;
  isThumbnail: boolean;
}

export interface ProductAttributeData {
  productAttributeId: number;
  productId: number;
  attributeName: string;
  specifications: string;
  unit: string;
}
export interface ComponentProductData {
  componentProductId: number;
  productId: number;
  componentName: string;
  componentId: number;
  quantity: number;
  status: number;
}

export interface SearchMachineryParams {
  keyword: string;
  priceRange: number[];
  categories: string[];
}

export interface MachineryDetailData {
  productId: number;
  productName: string;
  categoryName: string;
  rentPrice: number;
  productPrice: number;
  quantity: number;
  model: string;
  description: string;
  origin: string;
  categoryId: number;
  dateCreate: string;
  status: string;
  productImageList: MachineryImageData[];
  productAttributeList: ProductAttributeData[];
  componentProductList: ComponentProductData[];
}

export interface LocalCartData {
  productId: number;
  quantity: number;
}

export interface MachineryCartData {
  productId: number;
  productName: string;
  rentPrice: number;
  productPrice: number;
  quantity: number;
  categoryName: string;
  thumbnailUrl: string;
}
