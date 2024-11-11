export interface MachineryData {
  categoryId: number;
  categoryName: string;
  dateCreate: string;
  description: string;
  machineId: number;
  machineName: string;
  machinePrice: number;
  rentPrice: number;
  shipPricePerKm: number;
  quantity: number;
  model: string;
  origin: string;
  status: string;
  thumbnail: string;
}

export interface MachineryImageData {
  machineImageId: number;
  machineId: number;
  machineImageUrl: string;
  isThumbnail: boolean;
}

export interface ProductAttributeData {
  machineAttributeId: number;
  machineId: number;
  attributeName: string;
  specifications: string;
  unit: string;
}

export interface ComponentProductData {
  machineComponentId: number;
  machineId: number;
  componentName: string;
  componentId: number;
  quantity: number;
  isRequiredMoney: boolean;
}

export interface SearchMachineryParams {
  keyword: string;
  priceRange: number[];
  categories: string[];
}

export interface MachineryDetailData {
  categoryId: number;
  categoryName: string;
  dateCreate: string;
  description: string;
  machineId: number;
  machineName: string;
  rentPrice: number;
  machinePrice: number;
  quantity: number;
  model: string;
  origin: string;
  status: string;
  shipPricePerKm: number;
  machineImageList: MachineryImageData[];
  machineAttributeList: ProductAttributeData[];
  machineComponentList: ComponentProductData[];
  machineTermList: MachineryTerm[];
}

export interface LocalOrderData {
  machineId: number;
}

export interface MachineryCartData {
  machineId: number;
  machineName: string;
  rentPrice: number;
  machinePrice: number;
  quantity: number;
  shipPricePerKm: number;
  categoryName: string;
  thumbnailUrl: string;
  rentPrices: number[];
  machineTerms: MachineryTerm[];
  machineSerialNumbers: MachineSerialData[];
}

interface MachineSerialData {
  machineId: number;
  actualRentPrice: number;
  dateCreate: string;
  rentDaysCounter: number;
  serialNumber: string;
  status: string;
}

export interface MachineryTerm {
  productTermId: number;
  machineId: number;
  title: string;
  content: string;
}

export interface ReviewCartData {
  machineId: number;
  machineName: string;
  quantity: number;
  thumbnailUrl: string;
  rentPrices: number[];
}
