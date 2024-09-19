import React from "react";
import "./global.css";
import "./gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./app/navigators/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
