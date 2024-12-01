export interface CustomerRequestData {
  rentingRequestId: number;
  accountOrderId: number;
  accountOrderName: string;
  addressId: number;
  contractId: number;
  dateCreate: string;
  dateStart: string;
  numberOfMonth: number;
  isOnetimePayment: boolean;
  note: string;
  status: string;
}

export interface OrderDuration {
  dateStart: string;
  dateEnd: string;
  numOfMonth: number;
}

export interface CreateOrderParams {
  addressId: number;
  shippingPrice: number;
  discountPrice: number;
  isOnetimePayment: boolean;
  note: string;
  rentingRequestSerialNumbers: OrderMachine[];
  serviceRentingRequests: number[];
  accountNumber: string;
  beneficiaryBank: string;
  beneficiaryName: string;
}

export interface OrderMachine {
  machineId: number;
  serialNumber: string;
  dateStart: string;
  dateEnd: string;
}

export interface OrderInitParams {
  machineIds: string[];
  dateStart: string;
  dateEnd: string;
}

export interface OrderServiceData {
  description: string;
  isOptional: boolean;
  price: number;
  rentingServiceId: number;
  rentingServiceName: string;
}
