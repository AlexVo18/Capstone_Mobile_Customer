import useAuthStore from "../store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const useAuth = () => {
  const { userInfo, token, userLoading, login, logout, checkTokenExp } =
    useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storageUser = await AsyncStorage.getItem("user");
        const storageToken = await AsyncStorage.getItem("access_token");

        if (storageToken) {
          const user = JSON.parse(storageUser || "{}");
          login(user, storageToken);
          console.log("Log in!");
        } else {
          logout();
          console.log("Log out!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        useAuthStore.setState({ userLoading: false });
      }
    };
    loadUser();
  }, [login, logout, checkTokenExp]);

  return {
    userInfo,
    token,
    userLoading,
    login,
    logout,
  };
};

export default useAuth;
