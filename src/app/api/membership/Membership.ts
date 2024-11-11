import requests from "../request";

const Membership = {
  getMembershipRanks: () => requests.baseApiGet("/membershipRanks"),
};
export default Membership;
