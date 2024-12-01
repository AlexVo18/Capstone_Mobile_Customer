import requests from "../request";

const Delivery = {
  getDeliveryDetail: (input: string) =>
    requests.jwtApiGet(`/deliveries/${input}/detail`),
  getDeliveries: () => requests.jwtApiGet(`/deliveries/customer`),
};
export default Delivery;
