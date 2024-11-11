import { Eye, EyeOff, Rotate3D } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { RegisterAccountParams } from "~/src/app/models/auth_models";
import { RegisterEmailScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cn } from "~/src/app/utils/cn";
import { ErrorMessageRegister } from "~/src/app/constants/errorMessages";

const RegisterEmail = ({ navigation }: RegisterEmailScreenProps) => {
  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewPwd, setViewPwd] = useState(false);
  const [viewRePwd, setViewRePwd] = useState(false);

  const validate = ErrorMessageRegister;
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
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    } as RegisterAccountParams,
    validationSchema,
    onSubmit: async (values: RegisterAccountParams) => {
      setIsLoading(true);
      try {
        if (!isFormEmpty()) {
          navigation.navigate("RegisterProfile", {
            RegisterAccountParams: values,
          });
        }
      } catch (error) {
        console.log(error);
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
          Nhập email và mật khẩu để đăng ký tài khoản
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

        <TextInput
          value={formik.values.email}
          onChangeText={(value) => {
            formik.setFieldValue("email", value);
          }}
          placeholder="Nhập email"
          className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
          onFocus={() => setFocusInput("email")}
          onBlur={() => {
            setFocusInput("");
            formik.setFieldTouched("email");
          }}
        />
        {formik.touched.email && formik.errors.email ? (
          <View>
            <Text className="text-red-600 text-sm">{formik.errors.email}</Text>
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
          Mật khẩu
          <Text className="text-red-600"> *</Text>
        </Text>
        <View className="relative flex flex-row justify-end items-center">
          <TextInput
            value={formik.values.password}
            secureTextEntry={viewPwd ? false : true}
            onChangeText={formik.handleChange("password")}
            placeholder="Nhập mật khẩu"
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
            {viewPwd ? (
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
          Nhập lại mật khẩu
          <Text className="text-red-600"> *</Text>
        </Text>
        <View className="relative flex flex-row justify-end items-center">
          <TextInput
            value={formik.values.rePassword}
            secureTextEntry={!viewRePwd}
            onChangeText={formik.handleChange("rePassword")}
            placeholder="Nhập lại mật khẩu"
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
            {viewRePwd ? (
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
        <Button
          mode="contained"
          className=""
          buttonColor={mainBlue}
          textColor="white"
          style={[styles.buttonStyle]}
          disabled={
            isLoading || isFormEmpty() || !!Object.keys(formik.errors).length
          }
          onPress={() => formik.handleSubmit()}
        >
          {isLoading ? (
            <Text className="text-lg">Đang tải</Text>
          ) : (
            <Text className="text-lg">Tiếp theo</Text>
          )}
        </Button>
      </View>
      <View className="flex flex-row items-center justify-center w-full mt-1">
        <Text style={{ fontSize: 16 }}>Đã có tài khoản? </Text>
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

export default RegisterEmail;

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
    paddingVertical: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});
