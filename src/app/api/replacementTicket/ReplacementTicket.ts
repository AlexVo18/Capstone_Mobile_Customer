import requests from "../request";

const ReplacementTicket = {
  getTicketDetail: (input: string) =>
    requests.jwtApiGet(`/component-replacement-ticket/${input}/detail`),
  cancelTicket: (input: string) =>
    requests.codeJwtApiPatch(
      `/component-replacement-ticket/${input}/cancel`,
      {}
    ),
};
export default ReplacementTicket;
