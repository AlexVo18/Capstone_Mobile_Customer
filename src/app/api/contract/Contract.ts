import { ExtendContractParams } from "@/app/models/contract_models";
import requests from "../request";

const Contract = {
  getContractDetail: (input: string) =>
    requests.jwtApiGet(`/contracts/${input}`),
  getContracts: (input: string) =>
    requests.jwtApiGet(`/contracts/customers?status=${input}`),
  getAllContractsDetail: (input: string) =>
    requests.jwtApiGet(`/rentings/${input}/contracts`),
  endContract: (input: string) =>
    requests.codeJwtApiPost(`/contracts/${input}/end-contract`, {}),
  extendContract: (input: ExtendContractParams) =>
    requests.codeJwtApiPost(`/contracts/${input.contractId}/extend-contract`, {
      dateEnd: input.dateEnd,
    }),
};
export default Contract;
