import requests from "../request";

const Machinery = {
  getAllMachineries: () => requests.baseApiGet("/products"),
};
export default Machinery;
