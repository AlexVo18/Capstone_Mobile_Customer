import requests from "../request";

const Content = {
  getContent: () => requests.baseApiGet("/contents"),
  getContentDetail: (contentId: number) =>
    requests.baseApiGet(`contents/${contentId}`),
};
export default Content;
