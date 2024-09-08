import React from "react";
import "./global.css";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppRouter from "./app/navigators/AppRouter";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </PaperProvider>
  );
}

registerRootComponent(App);
