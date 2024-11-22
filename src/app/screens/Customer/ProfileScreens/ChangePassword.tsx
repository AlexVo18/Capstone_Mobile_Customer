import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { ErrorMessageChangePassword } from "~/src/app/constants/errorMessages";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import axios from "axios";
import Auth from "~/src/app/api/auth/Auth";
import { ChangePasswordParams } from "~/src/app/models/auth_models";
import { useFormik } from "formik";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Eye, EyeOff } from "lucide-react-native";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { cn } from "~/src/app/utils/cn";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showRePwd, setShowRePwd] = useState(false);
  const [focusInput, setFocusInput] = useState("");

  const validate = ErrorMessageChangePassword;
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(validate.password.required)
      .min(8, validate.password.length)
      .matches(/^[A-Z](?=.*[ \W])/, validate.password.invalidFormat),
    rePassword: Yup.string()
      .required(validate.rePassword.required)
      .oneOf([Yup.ref("password")], validate.rePassword.invalid),
    oldPassword: Yup.string().required(validate.password.required),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    } as ChangePasswordParams,
    validationSchema,
    onSubmit: async (values: ChangePasswordParams) => {
      setIsLoading(true);
      try {
        if (!isFormEmpty()) {
          const response = await Auth.changePassword({
            oldPassword: values.oldPassword,
            password: values.password,
          });
          if (response.status === 204) {
            Toast.show({
              type: "success",
              text1: "Đổi mật khẩu thành công",
            });
          }
          formik.resetForm();
          setShowPwd(false);
          setShowNewPwd(false);
          setShowRePwd(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.data === "Sai mật khẩu") {
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
      !formik.values.oldPassword ||
      !formik.values.password ||
      !formik.values.rePassword
    );
  };

  const isDisabled =
    isLoading || isFormEmpty() || !!Object.keys(formik.errors).length;

  return (
    <View className="p-5 bg-white h-full">
      <View className="w-full mb-4">
        <Text
          className={cn(
            "text-lg font-semibold mb-2",
            focusInput === "oldPassword" ? "text-blue-700" : ""
          )}
        >
          Mật khẩu cũ
          <Text className="text-red-600"> *</Text>
        </Text>
        <View className="relative flex flex-row justify-end items-center">
          <TextInput
            value={formik.values.oldPassword}
            secureTextEntry={!showPwd}
            onChangeText={formik.handleChange("oldPassword")}
            placeholder="Nhập mật khẩu cũ"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("oldPassword")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("oldPassword");
            }}
          />
          <Pressable
            onPress={() => {
              setShowPwd(!showPwd);
            }}
            style={styles.eyeIcon}
          >
            {!showPwd ? (
              <EyeOff color={`hsl(${mutedForground})`} />
            ) : (
              <Eye color={`hsl(${mutedForground})`} />
            )}
          </Pressable>
        </View>
        {formik.touched.oldPassword && formik.errors.oldPassword ? (
          <View>
            <Text className="text-red-600 text-sm">
              {formik.errors.oldPassword}
            </Text>
          </View>
        ) : null}
      </View>
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
            secureTextEntry={!showNewPwd}
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
              setShowNewPwd(!showNewPwd);
            }}
            style={styles.eyeIcon}
          >
            {!showNewPwd ? (
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
            secureTextEntry={!showRePwd}
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
              setShowRePwd(!showRePwd);
            }}
            style={styles.eyeIcon}
          >
            {!showRePwd ? (
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
    </View>
  );
};

export default ChangePassword;

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
    paddingVertical: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});
