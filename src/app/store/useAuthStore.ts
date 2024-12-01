import { create } from "zustand";
import { TokenData, UserData } from "../models/auth_models";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  userInfo: UserData | undefined;
  token: TokenData | undefined;
  userLoading: boolean;
  login: (userData: UserData, token: TokenData) => void;
  logout: () => void;
  getLocalData: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  userLoading: true,
  userInfo: undefined,
  token: undefined,

  login: async (userData: UserData, token: TokenData) => {
    const stringifyUser = JSON.stringify(userData);
    const stringifyToken = JSON.stringify(token);

    await SecureStore.setItemAsync("user", stringifyUser);
    await SecureStore.setItemAsync("token", stringifyToken);

    set({ userInfo: userData, token });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("token");

    set({ userInfo: undefined, token: undefined });
  },
  getLocalData: async () => {
    const userData = await SecureStore.getItemAsync("user");
    const tokenData = await SecureStore.getItemAsync("token");

    set({
      userInfo: userData && JSON.parse(userData),
      token: tokenData && JSON.parse(tokenData),
    });
  },
}));

export default useAuthStore;
