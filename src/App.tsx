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
import { LogBox } from "react-native";

export default function App() {

  LogBox.ignoreLogs(["Require cycle:"]);
  LogBox.ignoreLogs(["MapLibre warning {TextureViewRend}[ParseStyle]:"]);

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <NavigationContainer>
          <SafeAreaProvider>
            <AppNavigator />
            <Toast topOffset={100} />
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
