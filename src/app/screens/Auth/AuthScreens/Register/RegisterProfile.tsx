import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RegisterProfileScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import { ErrorMessageRegister } from "~/src/app/constants/errorMessages";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cn } from "~/src/app/utils/cn";
import axios from "axios";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { Button } from "react-native-paper";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Rotate3D } from "lucide-react-native";
import Auth from "~/src/app/api/auth/Auth";

const RegisterProfile = ({ route, navigation }: RegisterProfileScreenProps) => {
  const { RegisterParams } = route.params;
  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(validate.name.required),
    phone: Yup.string()
      .required(validate.phone.required)
      .length(10, validate.phone.length),
    gender: Yup.string().required(validate.gender.required),
    dateBirth: Yup.string().required(validate.dateBirth.required),
    company: Yup.string().required(validate.company.required),
    position: Yup.string().required(validate.position.required),
    taxNumber: Yup.string()
      .required(validate.taxNumber.required)
      .min(10, validate.taxNumber.invalid)
      .max(13, validate.taxNumber.invalid),
    address: Yup.string().required(validate.address.required),
  });

  const formik = useFormik({
    initialValues: {
      email: RegisterParams.email,
      password: RegisterParams.password,
      name: "",
      phone: "",
      address: "",
      gender: 0,
      dateBirth: "",
      company: "",
      position: "",
      taxNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log("ads");
      try {
        if (!isFormEmpty()) {
          console.log("ads");
          const response = await Auth.register({
            name: values.name,
            email: values.email,
            address: values.address,
            phone: values.phone,
            gender: values.gender,
            dateBirth: values.dateBirth,
            password: values.password,
            company: values.company,
            position: values.position,
            taxNumber: values.taxNumber,
          });
          if (response.status === 204) {
            // customToast({
            //   toast,
            //   icon: <SuccessIcon />,
            //   description:
            //     "Tạo tài khoản thành công, xin hãy xác thực tài khoản để bắt đầu sử dụng",
            //   duration: 3000,
            // });
            // Gửi OTP để xác thực sau khi tạo tài khoản thành công
            // sendOTP();
            // setOpen(true);
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.data === "Tài khoản với email này đã tồn tại.") {
              // customToast({
              //   toast,
              //   icon: <ErrorIcon />,
              //   description: error.response.data,
              //   duration: 3000,
              // });
            } else if (
              error.response.data ===
              "Tài khoản với tên người dùng này đã tồn tại."
            ) {
              // customToast({
              //   toast,
              //   icon: <ErrorIcon />,
              //   description: error.response.data,
              //   duration: 3000,
              // });
            } else if (error.response.data === "Tài khoản không tồn tại.") {
              // customToast({
              //   toast,
              //   icon: <ErrorIcon />,
              //   description: error.response.data,
              //   duration: 3000,
              // });
            } else {
              // customToast({
              //   toast,
              //   icon: <ErrorIcon />,
              //   description: "Tạo tài khoản thất bại",
              //   duration: 3000,
              // });
            }
          }
        }
        // customToast({
        //   toast,
        //   icon: <ErrorIcon />,
        //   description: "Tạo tài khoản không thành công",
        //   duration: 3000,
        // });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const isFormEmpty = () => {
    return (
      !formik.values.email ||
      !formik.values.password ||
      !formik.values.name ||
      !formik.values.phone ||
      !formik.values.gender ||
      !formik.values.dateBirth ||
      !formik.values.company ||
      !formik.values.position ||
      !formik.values.taxNumber
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
          Nhập thông tin cá nhân để hoàn tất việc thiết lập tài khoản
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
          disabled={isLoading || isFormEmpty()}
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

export default RegisterProfile;

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
