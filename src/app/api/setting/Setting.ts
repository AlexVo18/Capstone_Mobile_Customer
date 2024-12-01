import requests from "../request";

const Setting = {
  getSetting: () => requests.baseApiGet(`/settings`),
};
export default Setting;
