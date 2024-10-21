import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Auth from "./auth/Auth";
import { TokenData } from "../models/auth_models";
import { VITE_SERVER } from "@env";
import { isTokenExpired } from "../utils/isTokenExpired";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

const baseURL = VITE_SERVER;

const jwtApi = axios.create({
  baseURL,
  withCredentials: true,
});

// Lấy token từ storage
const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    return JSON.parse(token);
  }
};

// Lấy accessToken mới
export const getNewAccessToken = async () => {
  try {
    const token = await getToken();
    if (!token.refreshToken) {
      throw new Error("No refresh token");
    }

    const response = await Auth.refreshAccessToken({
      accessToken: token.token,
      refreshToken: token.refreshToken,
    });
    if (response) {
      const newToken: TokenData = {
        refreshToken: token.refreshToken,
        refreshTokenExpiryTime: token.refreshTokenExpiryTime,
        token: response.token,
      };
      const stringifyToken = JSON.stringify(newToken);
      localStorage.setItem("token", stringifyToken);

      return newToken;
    }
  } catch (error) {
    console.log("Error refreshing access token:", error);
    return undefined;
  }
};

// Gắn accessToken vào API
jwtApi.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = await getToken();
    if (config.headers) {
      if (token && !isTokenExpired(token.token)) {
        config.headers.Authorization = `Bearer ${token.token}`;
      }

      // Lấy access token mới
      try {
        const newToken = await getNewAccessToken();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken.token}`;
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        localStorage.clear();
        Toast.show({
          type: "error",
          text1: "Phiên đăng nhập đã hết hạn",
        });
        return Promise.reject(error);
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Trường hợp lỗi 401 Unauthorized
jwtApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    // Lỗi 401
    if (error.response?.status === 401) {
      console.log("Token expired");

      try {
        const newToken = await getNewAccessToken();
        if (newToken) {
          const config = error.config;
          if (config) {
            config.headers.Authorization = `Bearer ${newToken.token}`;
            return jwtApi(config);
          }
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (error) {
        localStorage.clear();
        Toast.show({
          type: "error",
          text1: "Phiên đăng nhập đã hết hạn",
        });
        return Promise.reject(error);
      }
    }

    // Lỗi 403
    if (error.response?.status === 403) {
      Toast.show({
        type: "error",
        text1: "Tài khoản không có quyền đăng nhập",
      });
    }
    return Promise.reject(error);
  }
);

export default jwtApi;
