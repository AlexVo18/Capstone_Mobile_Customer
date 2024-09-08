import { AxiosResponse } from "axios";
import baseApi from "./baseApi";
import jwtApi from "./jwtApi";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  // Auth CRUD methods
  jwtApiGet: <T>(url: string, params?: T) =>
    jwtApi.get(url, { params }).then(responseBody),
  jwtApiPost: <T>(url: string, body: T) =>
    jwtApi.post(url, body).then(responseBody),
  jwtApiPut: <T>(url: string, body: T) =>
    jwtApi.put(url, body).then(responseBody),

  // CRUD methods
  baseApiGet: <T>(url: string, params?: T) =>
    baseApi.get(url, { params }).then(responseBody),
  baseApiPost: <T>(url: string, body: T) =>
    baseApi.post(url, body).then(responseBody),
  baseApiPut: <T>(url: string, body: T) =>
    baseApi.put(url, body).then(responseBody),
};

export default requests;
