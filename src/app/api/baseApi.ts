import axios from "axios";

const baseURL = "";

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;
