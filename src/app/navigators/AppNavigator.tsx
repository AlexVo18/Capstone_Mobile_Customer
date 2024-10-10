import React, { useEffect, useState } from "react";
import CustomerNavigator from "./CustomerNavigators/CustomerNavigator";
import AuthNavigator from "./AuthNavigators/AuthNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "../hooks/useAuth";
import SplashLoading from "../screens/Auth/SplashLoadingScreens/SplashLoading";
import { PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userInfo, userLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(splashTimeout);
  }, []);

  // const requestUserPermission = async () => {
  //   // Xin người dùng dc gửi thông báo ngoài app
  //   await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //   );
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log("Authorization status:", authStatus);
  //   }
  // };

  // const sendNotiToast = async () => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     if (userInfo && remoteMessage.notification) {
  //       Toast.show({
  //         type: "info",
  //         text1: remoteMessage.notification.title,
  //         text2: remoteMessage.notification.body,
  //       });
  //     }
  //   });

  //   return unsubscribe;
  // };

  if (userLoading || !isReady) {
    return <SplashLoading />;
  }

  return (
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
