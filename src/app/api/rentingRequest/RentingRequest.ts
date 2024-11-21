import { CreateOrderParams, OrderInitParams } from "../../models/order_models";
import requests from "../request";

const RentingRequest = {
  getRentingInitData: (input: OrderInitParams) =>
    requests.jwtApiPost(`/rentings/init-data`, {
      machineIds: input.machineIds,
      dateStart: input.dateStart,
      dateEnd: input.dateEnd,
    }),
  getReviewInitData: (input: string[]) =>
    requests.jwtApiGet(`/machines/review/${input}`),
  createRequest: (input: CreateOrderParams) =>
    requests.jwtApiPost("/rentings", {
      addressId: input.addressId,
      shippingPrice: input.shippingPrice,
      discountPrice: input.discountPrice,
      isOnetimePayment: input.isOnetimePayment,
      note: input.note,
      rentingRequestSerialNumbers: input.rentingRequestSerialNumbers,
      serviceRentingRequests: input.serviceRentingRequests,
      accountNumber: input.accountNumber,
      beneficiaryBank: input.beneficiaryBank,
      beneficiaryName: input.beneficiaryName,
    }),
  getUserRequests: () => requests.jwtApiGet("/rentings/customer/requests"),
  cancelRequest: (input: string) =>
    requests.codeApiPut(`/rentings/${input}/cancel`, {}),
  getRequestDetail: (input: string) => requests.jwtApiGet(`/rentings/${input}`),
};
export default RentingRequest;
