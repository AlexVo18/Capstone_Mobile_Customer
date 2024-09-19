import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  userInfo: UserData | undefined;
  token: string | undefined;
  userLoading: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
  checkTokenExp: (token: string | undefined) => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  userLoading: true,
  userInfo: undefined,
  token: undefined,

  login: async (userData: UserData, token: string) => {
    const stringifyUser = JSON.stringify(userData);

    await AsyncStorage.setItem("user", stringifyUser);
    await AsyncStorage.setItem("access_token", token);

    set({ userInfo: userData, token });
  },
  logout: async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("access_token");

    set({ userInfo: undefined, token: undefined });
  },
  checkTokenExp: (token: string | undefined) => {
    if (token) {
      const decodedToken = jwtDecode(token) as { exp: number };
      return decodedToken.exp < Date.now() / 1000;
    }
    return false;
  },
}));

export default useAuthStore;
