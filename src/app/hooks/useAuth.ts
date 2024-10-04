import useAuthStore from "../store/useAuthStore";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const useAuth = () => {
  const { userInfo, token, userLoading, login, logout } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storageUser = await SecureStore.getItemAsync("user");
        const storageToken = await SecureStore.getItemAsync("token");

        if (storageToken) {
          const user = JSON.parse(storageUser || "{}");
          const token = JSON.parse(storageToken || "{}");
          login(user, token);
        } else {
          logout();
        }
      } catch (error) {
        console.log(error);
      } finally {
        useAuthStore.setState({ userLoading: false });
      }
    };
    loadUser();
  }, [login]);

  return {
    userInfo,
    token,
    userLoading,
    login,
    logout,
  };
};

export default useAuth;
