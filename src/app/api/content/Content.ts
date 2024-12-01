import requests from "../request";

const Content = {
  getContent: () => requests.baseApiGet("/contents?status=Active"),
  getContentDetail: (contentId: number) =>
    requests.baseApiGet(`contents/${contentId}`),
};
export default Content;
