import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { Mail } from "lucide-react-native";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { AuthenOTPScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import useCountdown from "~/src/app/hooks/useCountdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const AuthenOTP = ({ route, navigation }: AuthenOTPScreenProps) => {
  const { secondsLeft, start } = useCountdown();
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState(""); // State to store OTP value
  const otpInputRef = useRef<OtpInputRef>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    sendOTP();
  }, []);

  const sendOTP = async () => {
    try {
      start(5);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const checkedOTP = async (text: string) => {
    setIsLoading(true);
    console.log("otp:", text);
    try {
      // OTP đúng, tắt input, chuyển trang
      if (text === "123456") {
        setIsDisabled(true);
        Toast.show({
          type: "success",
          text1: "Xác thực thành công",
          text2: "Vui lòng nhập các thông tin tiếp theo để tạo tài khoản",
          visibilityTime: 2000,
        });
        navigation.navigate("RegisterAccount");
      } else {
        // OTP ko hợp lý, xóa input
        Toast.show({
          type: "error",
          text1: "Sai mã OTP",
          text2: "Mã OTP bạn nhập không hợp lệ",
        });
        otpInputRef.current?.clear();
        setOtpValue("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="p-10" style={styles.container}>
      <View className="flex justify-center items-center w-full">
        <Text className="text-center">Mã OTP đã được gửi thông qua email:</Text>
        <View className="flex flex-row items-center justify-center gap-2 my-4">
          <Mail color={mainBlue} size={28} />
          <Text className="text-xl">abc@gmail.com</Text>
        </View>
        <View className="mb-4">
          <OtpInput
            ref={otpInputRef}
            numberOfDigits={6}
            onTextChange={(text) => setOtpValue(text)}
            onFilled={(text) => checkedOTP(text)}
            focusColor={mainBlue}
            disabled={isDisabled}
            blurOnFilled={otpValue.length === 5}
          />
        </View>
        <View>
          {secondsLeft === 0 ? (
            <View className=" ">
              <Text className="text-center">
                Bạn đã nhận được mã OTP chưa? Nếu chưa, vui lòng bấm{" "}
                <Text className="text-blue-700 " onPress={sendOTP}>
                  Gửi lại
                </Text>
                <Text className=""> để được gửi lại mã OTP mới</Text>
              </Text>
            </View>
          ) : (
            <Text>
              Vui lòng chờ <Text className="text-blue-700">{secondsLeft}</Text>{" "}
              giây để có thể gửi mã xác thực mới
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default AuthenOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
