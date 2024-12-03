import { CreateOrderParams, OrderInitParams } from "../../models/order_models";
import requests from "../request";

const RentingRequest = {
  getUserRequests: () => requests.jwtApiGet("/rentings/customer/requests"),
  cancelRequest: (input: string) =>
    requests.jwtApiPut(`/rentings/${input}/cancel`, {}),
  getRequestDetail: (input: string) => requests.jwtApiGet(`/rentings/${input}`),
};
export default RentingRequest;
