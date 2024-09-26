import { Eye, EyeOff, Rotate3D } from "lucide-react-native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import useAuth from "~/src/app/hooks/useAuth";
import { UserDataEx } from "~/src/app/models/auth_models";
import { LoginScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import { cn } from "~/src/app/utils/cn";

const Login = ({ route, navigation }: LoginScreenProps) => {
  const { userInfo, token, userLoading, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPwd, setViewPwd] = useState(false);
  const [focusInput, setFocusInput] = useState("");

  const handleLogin = () => {
    // Add your login validation and logic here
    if (email === "abc@gmail.com" && password === "123") {
      const token = "token";
      const userData: UserDataEx = {
        email,
        password,
      };
      if (userData) {
        login(userData, token);
      }
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
          Hãy đăng nhập để bắt đàu sử dụng ứng dụng
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
          disabled={userLoading}
          onPress={() => handleLogin()}
        >
          {userLoading ? (
            <Text className="text-lg">Đang tải</Text>
          ) : (
            <Text className="text-lg">Đăng nhập</Text>
          )}
        </Button>
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
    paddingVertical: 4,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
  },
});
