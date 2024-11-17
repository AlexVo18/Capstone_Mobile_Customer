import requests from "../request";

const Machinery = {
  getAllMachineries: () => requests.baseApiGet("/machines/active"),
  getMachineryDetail: (input: number) =>
    requests.baseApiGet(`/machines/${input}`),
  getLatestMachineries: () => requests.baseApiGet("/machines/latest"),
};
export default Machinery;
