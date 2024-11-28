import { ComponentReplacementTicketData } from "./replacementTicket_models";

export interface CheckRequestData {
  machineCheckRequestId: string;
  contractId: string;
  note: string;
  status: string;
  dateCreate: string;
  serialNumber: string;
  contractAddress: ContractAddressData;
  customerId: number;
  machineId: number;
  machineName: string;
  machineTaskId: number;
  thumbnail: string;
}

export interface CheckRequestDetailData {
  machineCheckRequest: CheckRequestData;
  checkCriteriaList: CheckDetailCriteria[];
  componentReplacementTickets: ComponentReplacementTicketData[];
}

interface CheckDetailCriteria {
  machineCheckRequestCriteriaId: 0;
  machineCheckRequestId: string;
  machineCheckCriteriaId: 0;
  criteriaName: string;
  customerNote: string;
}

interface ContractAddressData {
  rentingRequestId: string;
  addressBody: string;
  district: string;
  city: string;
  coordinates: string;
}

export interface CriteriaRequest {
  machineCheckCriteriaId: number;
  name: string;
}

export interface MachineRequestParams {
  contractId: string;
  note: string;
  checkCriterias: CheckCriteria[];
}

interface CheckCriteria {
  criteriaName: string;
}

export interface ChosenContract {
  serialNumber: string;
  contractId: string;
  machineName: string;
  thumbnail: string;
  address: string;
}
