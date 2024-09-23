import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RegisterAccountScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import { Button } from "react-native-paper";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { Eye, EyeOff, Rotate3D } from "lucide-react-native";
import { cn } from "~/src/app/utils/cn";

const RegisterAccount = ({ route, navigation }: RegisterAccountScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [viewPwd, setViewPwd] = useState(false);
  const [viewRePwd, setViewRePwd] = useState(false);
  const [focusInput, setFocusInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          Nhập thông tin tài khoản của bạn vào
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
          value={email}
          onChangeText={(value) => setEmail(value)}
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
            value={password}
            secureTextEntry={viewPwd ? false : true}
            onChangeText={(value) => setPassword(value)}
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
            {viewPwd ? (
              <EyeOff color={`hsl(${mutedForground})`} />
            ) : (
              <Eye color={`hsl(${mutedForground})`} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="w-full mt-2 mb-6 items-end">
        <TouchableOpacity
          onPress={() => navigation.navigate("Forgot")}
          className="flex items-center justify-center"
        >
          <Text className="" style={{ color: `hsl(${mutedForground})` }}>
            Quên mật khẩu ?
          </Text>
        </TouchableOpacity>
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
          asdasd
        </Button>
      </View>
      <View className="flex flex-row items-center justify-center w-full mt-1">
        <Text style={{ fontSize: 16 }}>Không có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RegisterAccount")}
          className="flex items-center justify-center"
        >
          <Text style={{ color: mainBlue, fontSize: 16 }}>Đăng ký</Text>
        </TouchableOpacity>
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
  },
});
