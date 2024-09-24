import { Eye, EyeOff, Rotate3D } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import useAuth from "~/src/app/hooks/useAuth";
import { RegisterParams, UserData } from "~/src/app/models/auth_models";
import {
  LoginScreenProps,
  RegisterEmailScreenProps,
} from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cn } from "~/src/app/utils/cn";
import { ErrorMessageRegister } from "~/src/app/constants/errorMessages";

const RegisterEmail = ({ navigation }: RegisterEmailScreenProps) => {
  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(validate.email.required)
      .matches(/\.com$/, validate.email.invalidFormat),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        console.log(params);
        navigation.navigate("AuthenOTP", {
          RegisterParams: params,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    setParams((prev) => ({ ...prev, email: formik.values.email }));
  }, [formik.values.email]);

  const [params, setParams] = useState<RegisterParams>({
    name: "",
    email: "",
    address: "",
    phone: "",
    citizenCard: "",
    gender: 0,
    dateBirth: "",
    password: "",
    company: "",
    position: "",
    taxNumber: "",
    businessType: 0,
  });

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
          Nhập email để bắt đầu xác thực tài khoản
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
          onChangeText={formik.handleChange("email")}
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
      <View className="w-full">
        <Button
          mode="contained"
          className=""
          buttonColor={mainBlue}
          textColor="white"
          style={[styles.buttonStyle]}
          disabled={isLoading}
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
