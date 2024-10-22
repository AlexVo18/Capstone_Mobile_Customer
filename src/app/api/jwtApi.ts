import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Auth from "./auth/Auth";
import { TokenData } from "../models/auth_models";
import { VITE_SERVER } from "@env";
import { isTokenExpired } from "../utils/isTokenExpired";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

const baseURL = VITE_SERVER;

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const setToken = (tokenData: TokenData): void => {
  SecureStore.setItemAsync("token", JSON.stringify(tokenData));
};

const clearToken = () => {
  SecureStore.deleteItemAsync("user");
  SecureStore.deleteItemAsync("token");
};
const onTokenRefreshed = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void): void => {
  refreshSubscribers.push(callback);
};

// Lấy token từ storage
const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    return JSON.parse(token);
  }
  return null;
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
      SecureStore.setItemAsync("token", stringifyToken);

      return newToken;
    }
  } catch (error) {
    console.log("Error refreshing access token:", error);
    return undefined;
  }
};

export const refreshAccessToken = async () => {
  try {
    const token = await getToken();
    if (!token?.refreshToken) {
      throw new Error("không có token");
    }

    const response = await Auth.refreshAccessToken({
      accessToken: token.token,
      refreshToken: token.refreshToken,
    });

    if (response?.token) {
      const newToken: TokenData = {
        refreshToken: token.refreshToken,
        refreshTokenExpiryTime: token.refreshTokenExpiryTime,
        token: response.token,
      };
      setToken(newToken);
      return newToken;
    }
    return null;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await getToken();

      if (!token) {
        return config;
      }

      if (!isTokenExpired(token.token)) {
        config.headers.Authorization = `Bearer ${token.token}`;
        return config;
      }

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          if (newToken) {
            onTokenRefreshed(newToken.token);
            config.headers.Authorization = `Bearer ${newToken.token}`;
          } else {
            clearToken();
            throw new Error("Failed to refresh token");
          }
        } catch (error) {
          clearToken();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          });
        });
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
};

const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && originalRequest) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await refreshAccessToken();
            if (newToken) {
              onTokenRefreshed(newToken.token);
              originalRequest.headers.Authorization = `Bearer ${newToken.token}`;
              return instance(originalRequest);
            }
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          return new Promise((resolve) => {
            addRefreshSubscriber((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(instance(originalRequest));
            });
          });
        }
        clearToken();
      }
      if (error.response?.status === 403) {
        Toast.show({
          type: "error",
          text1: "Phiên đăng nhập đã hết hạn",
        });
      }

      return Promise.reject(error);
    }
  );
};

const createAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL,
    withCredentials: true,
  });
};

const createApi = (): AxiosInstance => {
  const instance = createAxiosInstance();
  setupRequestInterceptor(instance);
  setupResponseInterceptor(instance);
  return instance;
};

export const jwtApi = createApi();

export default jwtApi;
