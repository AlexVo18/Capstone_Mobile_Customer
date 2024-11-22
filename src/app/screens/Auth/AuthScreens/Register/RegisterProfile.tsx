import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RegisterProfileScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import { ErrorMessageRegister } from "~/src/app/constants/errorMessages";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cn } from "~/src/app/utils/cn";
import axios from "axios";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ActivityIndicator, Button } from "react-native-paper";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Rotate3D } from "lucide-react-native";
import Auth from "~/src/app/api/auth/Auth";
import Toast from "react-native-toast-message";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDate } from "~/src/app/utils/dateformat";
import RNPickerSelect from "react-native-picker-select";
import { VITE_SERVER } from "@env";

const baseURL = VITE_SERVER;

const RegisterProfile = ({ route, navigation }: RegisterProfileScreenProps) => {
  const { RegisterAccountParams } = route.params;
  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(validate.name.required),
    phone: Yup.string()
      .required(validate.phone.required)
      .length(10, validate.phone.length),
    gender: Yup.string()
      .required(validate.gender.required)
      .min(0, validate.gender.required),
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
      email: RegisterAccountParams.email,
      password: RegisterAccountParams.password,
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
      try {
        if (!isFormEmpty()) {
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
            Toast.show({
              type: "success",
              text1: "Tạo tài khoản thành công",
              text2: "Xin hãy xác thực tài khoản để bắt đầu sử dụng",
            });
            navigation.navigate("AuthenOTP", {
              email: formik.values.email,
              send: false,
            });
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.data === "Tài khoản với email này đã tồn tại.") {
              Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: error.response.data,
              });
            } else if (
              error.response.data ===
              "Tài khoản với tên người dùng này đã tồn tại."
            ) {
              Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: error.response.data,
              });
            } else if (error.response.data === "Tài khoản không tồn tại.") {
              Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: error.response.data,
              });
            } else {
              Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: "Đã có lỗi xảy ra",
              });
            }
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const changeData = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toISOString();
      formik.setFieldValue("dateBirth", formattedDate);
    }
    if (event.type === "dismissed") {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      setShowPicker(false);
    }
  }, [date]);

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
    <ScrollView>
      <View className="flex justify-center items-center h-full text-base w-full p-10 bg-white">
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
              focusInput === "name" ? "text-blue-700" : ""
            )}
          >
            Họ và tên
            <Text className="text-red-600"> *</Text>
          </Text>
          <TextInput
            value={formik.values.name}
            onChangeText={formik.handleChange("name")}
            placeholder="Họ và tên"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("name")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("name");
            }}
          />
          {formik.touched.name && formik.errors.name ? (
            <View>
              <Text className="text-red-600 text-sm">{formik.errors.name}</Text>
            </View>
          ) : null}
        </View>
        <View className="flex flex-row w-full gap-2 ">
          <View className="w-2/4 ">
            <Text
              className={cn(
                "text-lg font-semibold mb-2",
                focusInput === "dateBirth" ? "text-blue-700" : ""
              )}
            >
              Ngày sinh
              <Text className="text-red-600"> *</Text>
            </Text>
            <TouchableOpacity
              onPress={() => {
                () => setFocusInput("dateBirth");
                setShowPicker(!showPicker);
              }}
            >
              <TextInput
                value={formatDate(date.toISOString())}
                onChangeText={formik.handleChange("dateBirth")}
                placeholder="Ngày sinh"
                className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
                onFocus={() => setFocusInput("dateBirth")}
                onBlur={() => {
                  setFocusInput("");
                  formik.setFieldTouched("dateBirth");
                }}
                editable={false}
              />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={changeData}
              />
            )}
          </View>
          <View className="w-2/4 ">
            <Text
              className={cn(
                "text-lg font-semibold mb-2",
                focusInput === "gender" ? "text-blue-700" : ""
              )}
            >
              Giới tính
              <Text className="text-red-600"> *</Text>
            </Text>
            <RNPickerSelect
              placeholder={{ label: "Chọn giới tính", value: 0 }}
              onValueChange={(value) =>
                formik.setFieldValue("gender", parseInt(value))
              }
              onOpen={() => setFocusInput("gender")}
              items={[
                { label: "Nam", value: "1" },
                { label: "Nữ", value: "2" },
              ]}
            />
          </View>
        </View>
        <View className="flex flex-row w-full gap-2 mb-4">
          {formik.touched.dateBirth && formik.errors.dateBirth ? (
            <View className="w-2/4">
              <Text className="text-red-600 text-sm">
                {formik.errors.dateBirth}
              </Text>
            </View>
          ) : null}
          {formik.touched.gender && formik.errors.gender ? (
            <View className="w-2/4">
              <Text className="text-red-600 text-sm">
                {formik.errors.gender}
              </Text>
            </View>
          ) : null}
        </View>
        <View className="w-full mb-4">
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              focusInput === "phone" ? "text-blue-700" : ""
            )}
          >
            Số điện thoại
            <Text className="text-red-600"> *</Text>
          </Text>
          <TextInput
            value={formik.values.phone}
            onChangeText={formik.handleChange("phone")}
            placeholder="Số điện thoại"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("phone")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("phone");
            }}
            keyboardType="phone-pad"
          />
          {formik.touched.phone && formik.errors.phone ? (
            <View className="w-2/4">
              <Text className="text-red-600 text-sm">
                {formik.errors.phone}
              </Text>
            </View>
          ) : null}
        </View>
        <View className="w-full mb-4">
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              focusInput === "company" ? "text-blue-700" : ""
            )}
          >
            Tên công ty
            <Text className="text-red-600"> *</Text>
          </Text>
          <TextInput
            value={formik.values.company}
            onChangeText={formik.handleChange("company")}
            placeholder="Tên công ty"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("company")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("company");
            }}
          />
          {formik.touched.company && formik.errors.company ? (
            <View>
              <Text className="text-red-600 text-sm">
                {formik.errors.company}
              </Text>
            </View>
          ) : null}
        </View>
        <View className="flex flex-row w-full gap-2">
          <View className="w-2/4 ">
            <Text
              className={cn(
                "text-lg font-semibold mb-2",
                focusInput === "taxNumber" ? "text-blue-700" : ""
              )}
            >
              Mã số thuế
              <Text className="text-red-600"> *</Text>
            </Text>
            <TextInput
              value={formik.values.taxNumber}
              onChangeText={formik.handleChange("taxNumber")}
              placeholder="Mã số thuế"
              className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
              onFocus={() => setFocusInput("taxNumber")}
              onBlur={() => {
                setFocusInput("");
                formik.setFieldTouched("taxNumber");
              }}
              keyboardType="phone-pad"
            />
          </View>
          <View className="w-2/4">
            <Text
              className={cn(
                "text-lg font-semibold mb-2",
                focusInput === "position" ? "text-blue-700" : ""
              )}
            >
              Chức vụ
              <Text className="text-red-600"> *</Text>
            </Text>
            <RNPickerSelect
              placeholder={{ label: "Chọn chức vụ", value: "" }}
              onValueChange={formik.handleChange("position")}
              onOpen={() => setFocusInput("position")}
              items={[
                { label: "Nhân viên", value: "Nhân viên" },
                { label: "Quản lý", value: "Quản lý" },
                { label: "Giám đốc", value: "Giám đốc" },
              ]}
            />
          </View>
        </View>
        <View className="flex flex-row w-full gap-2 mb-4">
          {formik.touched.taxNumber && formik.errors.taxNumber ? (
            <View className="w-2/4">
              <Text className="text-red-600 text-sm">
                {formik.errors.taxNumber}
              </Text>
            </View>
          ) : null}
          {formik.touched.position && formik.errors.position ? (
            <View className="w-2/4">
              <Text className="text-red-600 text-sm">
                {formik.errors.position}
              </Text>
            </View>
          ) : null}
        </View>
        <View className="w-full mb-4">
          <Text
            className={cn(
              "text-lg font-semibold mb-2",
              focusInput === "address" ? "text-blue-700" : ""
            )}
          >
            Địa chỉ công ty
            <Text className="text-red-600"> *</Text>
          </Text>
          <TextInput
            value={formik.values.address}
            onChangeText={formik.handleChange("address")}
            placeholder="Địa chỉ công ty"
            className={`h-14 w-full bg-slate-100/50 border-slate-200 border-[1px] text-lg p-4 rounded-lg focus:border-blue-700 focus:border-2 border-${mutedForground}`}
            onFocus={() => setFocusInput("address")}
            onBlur={() => {
              setFocusInput("");
              formik.setFieldTouched("address");
            }}
          />
          {formik.touched.address && formik.errors.address ? (
            <View>
              <Text className="text-red-600 text-sm">
                {formik.errors.address}
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
                  Tạo tài khoản
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.buttonStyle, styles.buttonColor]}
              disabled={
                isLoading ||
                isFormEmpty() ||
                !!Object.keys(formik.errors).length
              }
              onPress={() => formik.handleSubmit()}
            >
              {isLoading ? (
                <ActivityIndicator color={"#6b7280"} size={"small"} />
              ) : (
                <Text className="text-lg text-center text-white font-semibold">
                  Tạo tài khoản
                </Text>
              )}
            </TouchableOpacity>
          )}
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
    </ScrollView>
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
    paddingVertical: 14,
  },
  buttonColor: {
    backgroundColor: mainBlue,
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});
