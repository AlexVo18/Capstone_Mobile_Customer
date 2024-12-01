export interface RequestData {
  rentingRequestId: string;
  accountOrderId: number;
  accountOrderName: string;
  dateCreate: string;
  totalRentPrice: number;
  totalDepositPrice: number;
  totalServicePrice: number;
  shippingPrice: number;
  discountPrice: number;
  totalAmount: number;
  isOnetimePayment: boolean;
  note: string;
  status: string;
  pendingInvoices: PendingInvoiceData[];
}

interface PendingInvoiceData {
  invoiceId: string;
  status: string;
  type: string;
}

export interface RequestDetailData {
  rentingRequestId: string;
  accountOrderId: number;
  accountOrderName: string;
  dateCreate: string;
  totalRentPrice: number;
  totalDepositPrice: number;
  totalServicePrice: number;
  shippingPrice: number;
  discountPrice: number;
  totalAmount: number;
  isOnetimePayment: boolean;
  note: string;
  status: string;
  accountNumber: string;
  beneficiaryBank: string;
  beneficiaryName: string;
  serviceRentingRequests: ServiceRentingRequestData[];
  accountOrder: AccountOrderData;
  rentingRequestAddress: RentingRequestAddressData;
  accountBusiness: AccountBusinessData;
  contracts: MachineryAndContractData[];
}

interface ServiceRentingRequestData {
  rentingServiceId: number;
  servicePrice: number;
  rentingServiceName: string;
}

export interface AccountOrderData {
  accountId: number;
  name: string;
  email: string;
  phone: string;
}

export interface RentingRequestAddressData {
  rentingRequestId: string;
  addressBody: string;
  district: string;
  city: string;
  coordinates: string;
}

interface MachineryAndContractData {
  contractId: string;
  contractName: string;
  rentingRequestId: string;
  dateCreate: string;
  dateSign: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  depositPrice: number;
  rentPeriod: number;
  totalRentPrice: number;
  machineId: number;
  machineName: string;
  serialNumber: string;
  rentPrice: number;
  thumbnail: string;
  accountSignId: number;
}

export interface AccountBusinessData {
  accountId: number;
  company: string;
  address: string;
  position: string;
  taxNumber: string;
}

export interface ReviewRequestData {
  numOfMonth: number;
  rentingRequestReviewSerialNumbers: RentingRequestReviewSerialNumberData[];
}
export interface RentingRequestReviewSerialNumberData {
  serialNumber: string;
  rentPricePerDays: number;
  dateStart: string;
  dateEnd: string;
}
