import React, { useEffect, useState } from "react";
import CustomerNavigator from "./CustomerNavigators/CustomerNavigator";
import AuthNavigator from "./AuthNavigators/AuthNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import SplashLoading from "../screens/Auth/SplashLoadingScreens/SplashLoading";

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userInfo, userLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(splashTimeout);
  }, []);

  if (userLoading || !isReady) {
    return <SplashLoading />;
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {userInfo ? (
        // Route khách hàng
        <RootStack.Screen
          name="CustomerNavigator"
          component={CustomerNavigator}
        />
      ) : (
        // Route đăng nhập
        <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
