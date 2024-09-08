import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomerTabs from "./CustomerTabs";

const CustomerNavigators = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="customerTabs" component={CustomerTabs} />
    </Stack.Navigator>
  );
};

export default CustomerNavigators;

const styles = StyleSheet.create({});
