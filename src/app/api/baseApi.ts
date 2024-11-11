import axios from "axios";
import { VITE_SERVER } from "@env";

if (__DEV__) {
  console.log("Environment URL:", VITE_SERVER);
}

const baseURL = VITE_SERVER;

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;
