import { BackHandler, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RegisterAccountScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import { Button } from "react-native-paper";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { Eye, EyeOff, Rotate3D } from "lucide-react-native";
import { cn } from "~/src/app/utils/cn";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ErrorMessageRegister } from "~/src/app/constants/errorMessages";
import { RegisterParams } from "~/src/app/models/auth_models";

const RegisterAccount = ({ route, navigation }: RegisterAccountScreenProps) => {
  const { RegisterParams } = route.params;
  const [viewPwd, setViewPwd] = useState(false);
  const [viewRePwd, setViewRePwd] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const validate = ErrorMessageRegister;
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(validate.password.required)
      .min(6, validate.password.length)
      .matches(/^(?=.*[A-Z])(?=.*\s)/, validate.password.invalidFormat),
    rePassword: Yup.string()
      .required(validate.rePassword.required)
      .oneOf([Yup.ref("password")], validate.rePassword.invalid),
    // name: Yup.string().required(validate.name.required),
    // phone: Yup.string()
    //   .required(validate.phone.required)
    //   .length(9, validate.phone.length),
    // citizenCard: Yup.string()
    //   .required(validate.citizenCard.required)
    //   .min(12, validate.citizenCard.length)
    //   .max(12, validate.citizenCard.length),
    // gender: Yup.string().required(validate.gender.required),
    // // dateBirth: Yup.string()
    // //   .required(validate.dateBirth.required)
    // //   .min(18, validate.dateBirth.tooYoung)
    // //   .max(new Date(), validate.dateBirth.invalid)
    // company: Yup.string().required(validate.company.required),
    // position: Yup.string().required(validate.position.required),
    // businessType: Yup.string().required(validate.businessType.required),
    // taxNumber: Yup.string()
    //   .required(validate.taxNumber.required)
    //   .min(10, validate.taxNumber.invalid)
    //   .max(13, validate.taxNumber.invalid),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        console.log(params);
        navigation.navigate("RegisterProfile", {
          RegisterParams: params,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Dùng để quay về màn hình input mail thay vì màn hình OTP
  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "RegisterEmail" }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Xóa handler sau khi navigate
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    setParams((prev) => ({ ...prev, password: formik.values.password }));
  }, [formik.values.password]);

  useEffect(() => {
    console.log(viewRePwd);
  }, [viewRePwd]);

  const [params, setParams] = useState<RegisterParams>({
    name: "",
    email: RegisterParams.email,
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
          Nhập mật khẩu của tài khoản bạn vào
        </Text>
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
          // disabled={userLoading}
          // onPress={() => handleLogin()}
        >
          {/* {userLoading ? (
            <Text className="text-lg">Đang tải</Text>
          ) : (
            <Text className="text-lg">Đăng nhập</Text>
          )} */}
          Tiếp theo
        </Button>
      </View>
    </View>
  );
};

export default RegisterAccount;

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
    padding: 5,
  },
});
