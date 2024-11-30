import requests from "../request";

const Term = {
  getTermList: () => requests.jwtApiGet("/terms"),
};

export default Term;
