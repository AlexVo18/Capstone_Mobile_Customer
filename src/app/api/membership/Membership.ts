import requests from "../request";

const Membership = {
  getMembershipRanks: () => requests.baseApiGet("/membershipRanks"),
  getUserMembership: () => requests.jwtApiGet("/membershipRanks/customer"),
};
export default Membership;
