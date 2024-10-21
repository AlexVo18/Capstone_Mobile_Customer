import axios from "axios";
import { VITE_SERVER } from "@env";

const baseURL = VITE_SERVER;

const baseApi = axios.create({
  baseURL,
  withCredentials: true,
});

export default baseApi;
