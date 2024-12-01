import { MachineRequestParams } from "../../models/machineCheckRequest_models";
import requests from "../request";

const MachineCheckRequest = {
  getUserMachineCheckReq: () =>
    requests.jwtApiGet("/machine-check-request/customer"),
  getUserMachineCheckReqDetail: (input: string) =>
    requests.jwtApiGet(`/machine-check-request/${input}/detail`),
  getRequestCriterias: () =>
    requests.jwtApiGet("/machine-check-request/criterias"),
  createMachineCheckReq: (input: MachineRequestParams) =>
    requests.jwtApiPost("/machine-check-request", input),
  cancelRequest: (input: string) =>
    requests.codeJwtApiPatch(
      `/machine-check-request/customer/${input}/cancel`,
      {}
    ),
};
export default MachineCheckRequest;
