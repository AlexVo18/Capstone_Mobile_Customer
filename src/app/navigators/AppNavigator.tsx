import React, { useState } from "react";
import CustomerNavigator from "./CustomerNavigators/CustomerNavigator";
import AuthNavigator from "./AuthNavigators/AuthNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import SplashLoading from "../screens/Auth/SplashLoadingScreens/SplashLoading";

const AppNavigator = () => {
  const { userInfo, token, userLoading, login, logout } = useAuth();

  const RootStack = createNativeStackNavigator();
  return userLoading ? (
    // Loading để lấy user data
    <SplashLoading />
  ) : (
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
