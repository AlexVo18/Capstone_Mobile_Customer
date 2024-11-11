export interface CheckRequestData {
  machineCheckRequestId: string;
  contractId: string;
  note: string;
  status: string;
  dateCreate: string;
  serialNumber: string;
  contractAddress: ContractAddressData;
}

export interface CheckRequestDetailData {
  machineCheckRequest: CheckRequestData;
  checkCriteriaList: CheckDetailCriteria[];
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
  checkCriteria: CheckCriteria[];
}

interface CheckCriteria {
  criteriaName: string;
  customerNote: string;
}

export interface ChosenContract {
  serialNumber: string;
  contractId: string;
}
