export interface InvoiceData {
  invoiceId: string;
  accountPaidId: number;
  accountPaidName: string;
  componentReplacementTicketId: string;
  digitalTransactionId: string;
  paymentMethod: string;
  amount: number;
  dateCreate: string;
  datePaid: string;
  status: string;
  type: string;
  note: string;
  payOsOrderId: string;
}

export interface InvoiceDetailData {
  invoiceId: string;
  accountPaidId: number;
  digitalTransactionId: string;
  paymentMethod: string;
  amount: number;
  dateCreate: string;
  datePaid: string;
  status: string;
  type: string;
  note: string;
  contractPayments: ContractPaymentData[];
  componentReplacementTicketId: string;
}

export interface ContractPaymentData {
  contractPaymentId: number;
  contractId: string;
  invoiceId: string;
  title: string;
  amount: number;
  status: string;
  type: string;
  customerPaidDate: string;
  dateFrom: string;
  dateTo: string;
  period: number;
  dateCreate: string;
  dueDate: string;
  isFirstRentalPayment: boolean;
  firstRentalPayment: FirstPayment;
}

interface FirstPayment {
  totalServicePrice: number;
  shippingPrice: number;
  discountPrice: number;
}

export interface PayParams {
  invoiceId: string;
  urlCancel: string;
  urlReturn: string;
}

export interface PaymentUrlParams {
  code: string;
  id: string;
  cancel: boolean;
  status: string;
  orderCode: string;
}

export interface BankResponseData {
  code: string;
  desc: string;
  data: BankData[];
}
export interface BankData {
  bin: string;
  code: string;
  id: number;
  isTransfer: number;
  logo: string;
  lookupSupported: number;
  name: string;
  shortName: string;
  short_name: string;
  support: number;
  swift_code: string;
  transferSupported: number;
}

export interface TaxCodeResponseData {
  code: string;
  desc: string;
  data: TaxCodeData;
}
export interface TaxCodeData {
  address: string;
  id: string;
  internationalName: string;
  name: string;
  shortName: string;
}
