import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Login from "../../screens/Auth/AuthScreens/Login";
import ForgotPassword from "../../screens/Auth/AuthScreens/ForgotPassword";
import AuthMenu from "../../screens/Auth/AuthScreens/AuthMenu";
import RegisterAccount from "../../screens/Auth/AuthScreens/Register/RegisterAccount";
import RegisterProfile from "../../screens/Auth/AuthScreens/Register/RegisterProfile";
import AuthenOTP from "../../screens/Auth/AuthScreens/Register/AuthenOTP";
import RegisterEmail from "../../screens/Auth/AuthScreens/Register/RegisterEmail";
import CustomBack from "../../components/header/CustomBack";
import { LoginParams, RegisterParams } from "../../models/auth_models";

export type AuthStackParamList = {
  AuthMenu: undefined;
  Login: undefined;
  RegisterEmail: undefined;
  RegisterAccount: { RegisterParams: RegisterParams };
  RegisterProfile: { RegisterParams: RegisterParams };
  AuthenOTP: { email?: string; loginParams?: LoginParams; send: boolean };
  Forgot: undefined;
};

export type AuthMenuScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "AuthMenu"
>;
export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Login"
>;
export type RegisterEmailScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "RegisterEmail"
>;
export type RegisterAccountScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "RegisterAccount"
>;
export type RegisterProfileScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "RegisterProfile"
>;
export type AuthenOTPScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "AuthenOTP"
>;

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthMenu"
        component={AuthMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterEmail"
        component={RegisterEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthenOTP"
        component={AuthenOTP}
        options={() => ({
          headerTitle: "Nhập mã xác thực",
          headerStyle: {
            backgroundColor: "white",
          },
          // headerLeft: () => (
          //   <CustomBack
          //     onPress={() =>
          //       navigation.reset({
          //         index: 0,
          //         routes: [{ name: "RegisterEmail" }],
          //       })
          //     }
          //   />
          // ),
        })}
      />
      <Stack.Screen
        name="RegisterAccount"
        component={RegisterAccount}
        options={({ navigation }) => ({
          headerTitle: "Thông tin tài khoản",
          headerLeft: () => (
            <CustomBack
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: "RegisterEmail" }],
                })
              }
            />
          ),
        })}
      />
      <Stack.Screen
        name="RegisterProfile"
        component={RegisterProfile}
        options={{
          headerTitle: "Nhập thông tin cá nhân",
          headerStyle: {
            backgroundColor: "white",
          },
        }}
      />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
