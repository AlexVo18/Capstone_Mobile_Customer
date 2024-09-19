import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import Login from "../../screens/Auth/AuthScreens/Login";
import Register from "../../screens/Auth/AuthScreens/Register";
import ForgotPassword from "../../screens/Auth/AuthScreens/ForgotPassword";
import AuthMenu from "../../screens/Auth/AuthScreens/AuthMenu";

export type AuthStackParamList = {
  AuthMenu: undefined;
  Login: undefined;
  Register: undefined;
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
export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Register"
>;

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthMenu" component={AuthMenu} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
