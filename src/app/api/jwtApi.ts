import axios from "axios";

const baseURL = "";

const jwtApi = axios.create({
  baseURL,
  withCredentials: true,
});

jwtApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default jwtApi;
