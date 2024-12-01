import axios from "axios";

const baseURL = `https://api.vietqr.io/v2`;

const vietqrApi = axios.create({
  baseURL,
});

export default vietqrApi;
