import React from "react";
import "'@/global.css'";
import { GluestackUIProvider } from "./src/app/components/ui/gluestack-ui-provider";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import AppRouter from "./src/app/navigators/AppRouter";

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <AppRouter />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

registerRootComponent(App);
