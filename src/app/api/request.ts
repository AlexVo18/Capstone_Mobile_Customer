import { AxiosResponse } from "axios";
import baseApi from "./baseApi";
import jwtApi from "./jwtApi";
import mapApi from "./mapApi";

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

  // Map methods
  mapApiGet: <T>(url: string, params?: T) =>
    mapApi.get(url, { params }).then(responseBody),

  // CRUD methods normal (Chỉ nên dùng để check status code khi ko có response body)
  codeApiGet: <T>(url: string, params?: T) => baseApi.get(url, { params }),
  codeApiPost: <T>(url: string, body: T) => baseApi.post(url, body),
  codeApiPut: <T>(url: string, body: T) => baseApi.put(url, body),

  codeJwtApiGet: <T>(url: string, params?: T) => jwtApi.get(url, { params }),
  codeJwtApiPost: <T>(url: string, body: T) => jwtApi.post(url, body),
  codeJwtApiPut: <T>(url: string, body: T) => jwtApi.put(url, body),
  codeJwtApiDelete: <T>(url: string, params?: T) =>
    jwtApi.delete(url, { params }),
};

export default requests;
