import { Eye, EyeOff, Rotate3D } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ForgetPasswordParams } from "~/src/app/models/auth_models";
import { ForgotPasswordScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cn } from "~/src/app/utils/cn";
import { ErrorMessageForgetPassword } from "~/src/app/constants/errorMessages";
import Auth from "~/src/app/api/auth/Auth";
import Toast from "react-native-toast-message";
import axios from "axios";
import useCountdown from "~/src/app/hooks/useCountdown";
import { OtpInput } from "react-native-otp-entry";

const ForgotPassword = ({ navigation }: ForgotPasswordScreenProps) => {
  const { secondsLeft, start } = useCountdown();

  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewPwd, setViewPwd] = useState(false);
  const [viewRePwd, setViewRePwd] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [send, setSend] = useState(false);

  const validate = ErrorMessageForgetPassword;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(validate.email.required)
      .matches(/\.com$/, validate.email.invalidFormat),
    password: Yup.string()
      .required(validate.password.required)
      .min(8, validate.password.length)
      .matches(/^[A-Z](?=.*[ \W])/, validate.password.invalidFormat),
    rePassword: Yup.string()
      .required(validate.rePassword.required)
      .oneOf([Yup.ref("password")], validate.rePassword.invalid),
    otp: Yup.string().required(validate.otp.required),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      otp: "",
    } as ForgetPasswordParams,
    validationSchema,
    onSubmit: async (values: ForgetPasswordParams) => {
      setIsLoading(true);
      try {
        if (!isFormEmpty()) {
          const response = await Auth.forgetPassword({
            email: values.email,
            otp: values.otp,
            password: values.password,
          });
          if (response.status === 204) {
            Toast.show({
              type: "success",
              text1: "Đổi mật khẩu thành công",
            });
            navigation.navigate("Login");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.data === "Tài khoản không tồn tại.") {
              Toast.show({
                type: "error",
                text1: error.response.data,
              });
            } else if (error.response.data === "Mã OTP không hợp lệ.") {
              Toast.show({
                type: "error",
                text1: error.response.data,
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Đổi mật khẩu thất bại",
              });
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isFormEmpty = () => {
    return (
      !formik.values.email ||
      !formik.values.password ||
      !formik.values.rePassword
    );
  };

  const sendOTP = async () => {
    setOtpLoading(true);
    try {
      if (!formik.errors.email) {
        const response = await Auth.sendOpt(formik.values.email);
        if (response && (response.status = 204)) {
          Toast.show({
            type: "success",
            text1: "Gửi OTP thành công, vui lòng check email",
          });
          setSend(true);
          start(60);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lấy OTP thất bại. Vui lòng nhấn gửi lại",
      });
    } finally {
      setOtpLoading(false);
    }
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
          Nhập thông tin để đổi mật khẩu tài khoản
        </Text>
      </View>
      <View className="w-full mb-4">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "email" ? "text-blue-700" : ""
          )}
        >
          Email
          <Text className="text-red-600"> *</Text>
        </Text>
        <View className="flex flex-row w-full">
          <View style={{ flex: 1 }}>
            <TextInput
              value={formik.values.email}
              onChangeText={(value) => {
                formik.setFieldValue("email", value);
              }}
              placeholder="Nhập email"
              className={`h-14 bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
              onFocus={() => setFocusInput("email")}
              onBlur={() => {
                setFocusInput("");
                formik.setFieldTouched("email");
              }}
            />
          </View>
          {otpLoading ||
          secondsLeft > 0 ||
          (formik.errors.email && formik.errors.email.length !== 0) ||
          !formik.values.email ? (
            <TouchableOpacity
              style={[styles.sendOtpButton, styles.disableButtonColor]}
              disabled
            >
              {otpLoading ? (
                <Text className="text-lg text-center text-gray-500 font-semibold">
                  Đang gửi
                </Text>
              ) : secondsLeft ? (
                <Text className="text-lg text-center text-gray-500 font-semibold">
                  Gửi lại ({secondsLeft}s)
                </Text>
              ) : (
                <Text className="text-lg text-center text-gray-500 font-semibold">
                  Gửi OTP
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.sendOtpButton, styles.buttonColor]}
              disabled={
                otpLoading ||
                secondsLeft > 0 ||
                (formik.errors.email && formik.errors.email.length !== 0) ||
                !formik.values.email
              }
              onPress={sendOTP}
            >
              {otpLoading ? (
                <Text className="text-lg text-center text-gray-500 font-semibold">
                  Đang gửi
                </Text>
              ) : secondsLeft ? (
                <Text className="text-lg text-center text-gray-500 font-semibold">
                  Gửi lại (${secondsLeft}s)
                </Text>
              ) : (
                <Text className="text-lg text-center text-white font-semibold">
                  Gửi OTP
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>

        {formik.touched.email && formik.errors.email ? (
          <View>
            <Text className="text-red-600 text-sm">{formik.errors.email}</Text>
          </View>
        ) : null}
      </View>
      {send && (
        <View className="my-4">
          <OtpInput
            numberOfDigits={6}
            onTextChange={(text) => formik.setFieldValue("otp", text)}
            focusColor={mainBlue}
            autoFocus={false}
            disabled={!send}
          />
        </View>
      )}

      <View className="w-full ">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "password" ? "text-blue-700" : ""
          )}
        >
          Mật khẩu mới
          <Text className="text-red-600"> *</Text>
        </Text>
        <View className="relative flex flex-row justify-end items-center">
          <TextInput
            value={formik.values.password}
            secureTextEntry={!viewPwd}
            onChangeText={formik.handleChange("password")}
            placeholder="Nhập mật khẩu mới"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("password")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("password");
            }}
          />
          <Pressable
            onPress={() => {
              setViewPwd(!viewPwd);
            }}
            style={styles.eyeIcon}
          >
            {!viewPwd ? (
              <EyeOff color={`hsl(${mutedForground})`} />
            ) : (
              <Eye color={`hsl(${mutedForground})`} />
            )}
          </Pressable>
        </View>
        {formik.touched.password && formik.errors.password ? (
          <View>
            <Text className="text-red-600 text-sm">
              {formik.errors.password}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="w-full my-4 ">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "rePassword" ? "text-blue-700" : ""
          )}
        >
          Nhập lại mật khẩu mới
          <Text className="text-red-600"> *</Text>
        </Text>
        <View className="relative flex flex-row justify-end items-center">
          <TextInput
            value={formik.values.rePassword}
            secureTextEntry={!viewRePwd}
            onChangeText={formik.handleChange("rePassword")}
            placeholder="Nhập lại mật khẩu mới"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("rePassword")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("rePassword");
            }}
          />
          <Pressable
            onPress={() => {
              setViewRePwd(!viewRePwd);
            }}
            style={styles.eyeIcon}
          >
            {!viewRePwd ? (
              <EyeOff color={`hsl(${mutedForground})`} />
            ) : (
              <Eye color={`hsl(${mutedForground})`} />
            )}
          </Pressable>
        </View>
        {formik.touched.rePassword && formik.errors.rePassword ? (
          <View>
            <Text className="text-red-600 text-sm">
              {formik.errors.rePassword}
            </Text>
          </View>
        ) : null}
      </View>
      <View className="w-full">
        {isLoading || isFormEmpty() || !!Object.keys(formik.errors).length ? (
          <TouchableOpacity
            style={[styles.buttonStyle, styles.disableButtonColor]}
            disabled
          >
            {isLoading ? (
              <ActivityIndicator color={"#6b7280"} size={"small"} />
            ) : (
              <Text className="text-lg text-center text-gray-500 font-semibold">
                Đổi mật khẩu
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttonStyle, styles.buttonColor]}
            disabled={
              isLoading || isFormEmpty() || !!Object.keys(formik.errors).length
            }
            onPress={() => formik.handleSubmit()}
          >
            {isLoading ? (
              <ActivityIndicator color={"#6b7280"} size={"small"} />
            ) : (
              <Text className="text-lg text-center text-white font-semibold">
                Đổi mật khẩu
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
      <View className="flex flex-row items-center justify-center w-full mt-1">
        <Text style={{ fontSize: 16 }}>Đã nhớ mật khẩu? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="flex items-center justify-center"
        >
          <Text style={{ color: mainBlue, fontSize: 16 }}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPassword;

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
  buttonColor: {
    backgroundColor: mainBlue,
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  sendOtpButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});
