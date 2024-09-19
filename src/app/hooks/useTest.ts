import { useTestStore } from "../store/useTestStore";

const useTest = () => {
  const { isAuthenticated, user, login, logout } = useTestStore();
  const authenticateUser = (username: string, password: string) => {
    if (username === "abc" && password === "123") {
      login(username);
    } else {
      console.log("error");
    }
  };

  const logoutUser = () => {
    logout();
  };
  return {
    isAuthenticated,
    user,
    authenticateUser,
    logoutUser,
  };
};

export default useTest;
