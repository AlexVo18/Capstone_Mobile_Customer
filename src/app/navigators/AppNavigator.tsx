import React, { useEffect, useState } from "react";
import CustomerNavigator from "./CustomerNavigators/CustomerNavigator";
import AuthNavigator from "./AuthNavigators/AuthNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import SplashLoading from "../screens/Auth/SplashLoadingScreens/SplashLoading";

const AppNavigator = () => {
  const { userInfo, userLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    // Cleanup timeout
    return () => clearTimeout(splashTimeout);
  }, []);

  const RootStack = createNativeStackNavigator();
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
