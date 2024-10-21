import requests from "../request";

const Machinery = {
  getAllMachineries: () => requests.baseApiGet("/products"),
  getMachineryDetail: (input: number) =>
    requests.baseApiGet(`/products/${input}`),
  getLatestMachineries: () => requests.baseApiGet("/products/latest")
};
export default Machinery;
