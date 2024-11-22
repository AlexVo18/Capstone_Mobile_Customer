import { AccountBusinessData, AccountOrderData } from "./rentingRequest_models";

export interface TermsData {
  content: string;
  termId: number;
  title: string;
  type: string;
}

export interface ContractDetailData {
  contractId: string;
  baseContractId: string;
  contractName: string;
  dateCreate: string;
  dateSign: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  machineId: 0;
  machineName: string;
  serialNumber: string;
  rentPrice: 0;
  contractTerms: TermsData[];
  isOnetimePayment: boolean;
  accountOrder: AccountOrderData;
  content: string;
  accountSignId: 0;
  rentingRequestId: string;
  depositPrice: 0;
  numberOfMonth: 0;
  totalRentPrice: 0;
  accountBusiness: AccountBusinessData;
}

export interface ContractData {
  contractId: string;
  contractName: string;
  rentingRequestId: string;
  dateCreate: string;
  dateSign: string;
  dateStart: string;
  dateEnd: string;
  status: string;
  depositPrice: number;
  isExtended: boolean;
  rentPeriod: number;
  totalRentPrice: number;
  machineId: number;
  machineName: string;
  serialNumber: string;
  rentPrice: number;
  thumbnail: string;
  accountSignId: number;
  baseContractId: string;
}

export interface ExtendContractParams {
  contractId: string | undefined;
  dateEnd: string | undefined;
}
