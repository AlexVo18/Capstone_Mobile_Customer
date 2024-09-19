import React, { useState } from "react";
import CustomerNavigator from "./CustomerNavigators/CustomerNavigator";
import AuthNavigator from "./AuthNavigators/AuthNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";

const AppNavigator = () => {
  const { userInfo, token, userLoading, login, logout } = useAuth();

  const RootStack = createNativeStackNavigator();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>

      {userInfo ? (
        // Main App Flow
        <RootStack.Screen name="CustomerNavigator" component={CustomerNavigator} />
      ) : (
        // Authentication Flow
        <RootStack.Screen name="AuthNavigator" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;


