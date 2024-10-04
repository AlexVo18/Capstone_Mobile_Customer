import React, { useEffect } from "react";
import "./global.css";
import "./gesture-handler";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./app/navigators/AppNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";
import { LogBox } from "react-native";

export default function App() {
  LogBox.ignoreLogs(["Require cycle:"]);
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // getToken();
      console.log("Authorization status:", authStatus);
    }
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification) {
        Toast.show({
          type: "info",
          text1: remoteMessage.notification.title,
          text2: remoteMessage.notification.body,
        });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

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
