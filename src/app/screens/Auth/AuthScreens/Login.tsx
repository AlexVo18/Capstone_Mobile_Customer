import { Eye, EyeOff, Rotate3D } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import useAuth from "~/src/app/hooks/useAuth";
import { LoginScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import { cn } from "~/src/app/utils/cn";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessageLogin } from "~/src/app/constants/errorMessages";
import Toast from "react-native-toast-message";
import { LoginParams, TokenData, UserData } from "~/src/app/models/auth_models";
import axios from "axios";
import { getToken } from "~/src/app/config/firebaseConfig";
import Auth from "~/src/app/api/auth/Auth";

const Login = ({ navigation }: LoginScreenProps) => {
  const { login } = useAuth();
  const [viewPwd, setViewPwd] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = ErrorMessageLogin;
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(validate.email.required),
    password: Yup.string().required(validate.password.required),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firebaseMessageToken: "",
    } as LoginParams,
    validationSchema,
    onSubmit: async (values: LoginParams) => {
      setIsLoading(true);
      try {
        if (!isFormEmpty()) {
          const response = await Auth.login({
            email: values.email,
            password: values.password,
            firebaseMessageToken: values.firebaseMessageToken,
          });
          if (response) {
            const userData: UserData = {
              accountId: response.accountId,
              address: response.address,
              dateCreate: response.dateCreate,
              email: response.email,
              name: response.name,
              phone: response.phone,
              roleId: response.roleId,
              status: response.status,
              username: response.username,
              avatarImg: response.avatarImg,
            };
            const token: TokenData = {
              refreshToken: response.refreshToken,
              refreshTokenExpiryTime: response.refreshTokenExpiryTime,
              token: response.token,
            };
            login(userData, token);
            Toast.show({
              type: "success",
              text1: "Đăng nhập thành công",
            });
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            let msg = "";
            if (error.response.data === "Sai mật khẩu") {
              msg = "Đăng nhập thất bại. Mật khẩu hoặc tài khoản không đúng";
            } else if (error.response.data === "Tài khoản chưa kích hoạt") {
              msg = error.response.data;
              navigation.navigate("AuthenOTP", {
                loginParams: {
                  email: formik.values.email,
                  password: formik.values.password,
                  firebaseMessageToken: formik.values.firebaseMessageToken,
                },
                send: true,
              });
            } else {
              msg = error.response.data;
            }
            return Toast.show({
              type: "error",
              text1: "Đăng nhập thất bại",
              text2: msg,
            });
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    getMsgToken();
  }, []);

  const getMsgToken = async () => {
    const token = await getToken();
    formik.setFieldValue("firebaseMessageToken", token);
  };

  const isFormEmpty = () => {
    return !formik.values.email || !formik.values.password;
  };

  return (
    <View className="flex justify-center items-center h-full text-base w-full p-10 bg-white">
      <View></View>
      <View className="mb-5">
        <Rotate3D color={mainBlue} size={84} />
      </View>
      <View>
        <Text
          className="text-4xl font-bold mb-2"
          style={{ color: `${mainBlue}`, fontWeight: "500" }}
        >
          MMRMS
        </Text>
      </View>
      <View className="mb-6">
        <Text
          className="text-lg text-center"
          style={{ color: `hsl(${mutedForground})` }}
        >
          Hãy đăng nhập để bắt đầu sử dụng ứng dụng
        </Text>
      </View>
      <View className="w-full">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "email" ? "text-blue-700" : ""
          )}
        >
          Email
        </Text>
        <TextInput
          value={formik.values.email}
          onChangeText={(value) => {
            formik.setFieldValue("email", value);
          }}
          placeholder="Nhập email"
          className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
          onFocus={() => setFocusInput("email")}
          onBlur={() => setFocusInput("")}
        />
      </View>
      <View className="w-full mt-4 ">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "password" ? "text-blue-700" : ""
          )}
        >
          Mật khẩu
        </Text>
        <View className="relative flex flex-row justify-end items-center">
          <TextInput
            value={formik.values.password}
            secureTextEntry={!viewPwd}
            onChangeText={(value) => {
              formik.setFieldValue("password", value);
            }}
            placeholder="Nhập mật khẩu"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("password")}
            onBlur={() => setFocusInput("")}
          />
          <TouchableOpacity
            className="absolute"
            onPress={() => setViewPwd(!viewPwd)}
            style={styles.eyeIcon}
          >
            {!viewPwd ? (
              <EyeOff color={`hsl(${mutedForground})`} />
            ) : (
              <Eye color={`hsl(${mutedForground})`} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full mt-2 mb-6 items-end">
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          className="flex items-center justify-center"
        >
          <Text className="" style={{ color: `hsl(${mutedForground})` }}>
            Quên mật khẩu ?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-full">
        <View className="w-full">
          {isLoading ? (
            <TouchableOpacity
              style={[styles.buttonStyle, styles.disableButtonColor]}
              disabled
            >
              {isLoading ? (
                <ActivityIndicator color={"#6b7280"} size={"small"} />
              ) : (
                <Text className="text-lg text-center text-gray-500 font-semibold">
                  Đăng nhập
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.buttonStyle, styles.buttonColor]}
              disabled={isLoading}
              onPress={() => formik.handleSubmit()}
            >
              {isLoading ? (
                <ActivityIndicator color={"#6b7280"} size={"small"} />
              ) : (
                <Text className="text-lg text-center text-white font-semibold">
                  Đăng nhập
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View className="flex flex-row items-center justify-center w-full mt-1">
        <Text style={{ fontSize: 16 }}>Không có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterEmail")}
          className="flex items-center justify-center"
        >
          <Text style={{ color: mainBlue, fontSize: 16 }}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
  },
  outlineButton: {
    borderColor: mainBlue,
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
  buttonColor: {
    backgroundColor: mainBlue,
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
  },
});
