import React from "react";
import "./global.css";
import "./gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./app/navigators/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <AppNavigator />
            <Toast />
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
