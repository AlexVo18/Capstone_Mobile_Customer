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
