import React, { useEffect, useState } from "react";
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
import { Linking, LogBox, PermissionsAndroid, Platform } from "react-native";
import { getToken } from "./app/config/firebaseConfig";
import CustomToast from "./app/components/toast/CustomToast";

const NAVIGATION_IDS = ["CustomerTabs"];
type RouteNames = "CustomerTabs";

function buildDeepLinkFromNotificationData(data: any) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    return null;
  }
  if (navigationId === "CustomerTabs") {
    return "mmrms-client://CustomerTabs";
  }
  return null;
}

const linking = {
  prefixes: ["mmrms-client://"],
  config: {
    initialRouteName: "CustomerTabs" as RouteNames,
    screens: {
      CustomerTabs: "CustomerTabs",
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url) {
      return url;
    }
    const message = await messaging().getInitialNotification();
    return buildDeepLinkFromNotificationData(message?.data);
  },
};

export default function App() {
  LogBox.ignoreLogs(["Require cycle:"]);
  LogBox.ignoreLogs(["MapLibre warning {TextureViewRend}[ParseStyle]:"]);

  const [toastData, setToastData] = useState({
    type: "",
    title: "",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    const requestUserPermission = async () => {
      if (Platform.OS === "android" && Platform.Version >= 33) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      }
      const authStatus = await messaging().requestPermission();
      if (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        console.log("Notification permissions granted");
        getToken();
      }
    };

    requestUserPermission();

    // Handle when the app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage
          );
        }
      });

    // Foreground message listener
    const foregroundListener = messaging().onMessage(async (remoteMessage) => {
      console.log("A new FCM message arrived!", remoteMessage);

      // Show CustomToast when a message arrives
      setToastData({
        type: "info",
        title: remoteMessage.notification?.title || "",
        message: remoteMessage.notification?.body || "",
        isVisible: true,
      });
    });

    // Background and quit state handler
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (url) {
        Linking.openURL(url);
      }
    });

    return () => {
      foregroundListener();
      unsubscribe();
    };
  }, []);

  const handleHideToast = () => {
    setToastData((prevState) => ({ ...prevState, isVisible: false }));
  };

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <NavigationContainer linking={linking}>
          <SafeAreaProvider>
            <AppNavigator />
            <Toast topOffset={100} />
            <CustomToast
              type={toastData.type}
              message={toastData.message}
              title={toastData.title}
              isVisible={toastData.isVisible}
              onHide={handleHideToast}
            />
          </SafeAreaProvider>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
