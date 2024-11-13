import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { Mail } from "lucide-react-native";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { AuthenOTPScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import useCountdown from "~/src/app/hooks/useCountdown";
import Toast from "react-native-toast-message";
import Auth from "~/src/app/api/auth/Auth";
import { TokenData, UserData } from "~/src/app/models/auth_models";
import useAuth from "~/src/app/hooks/useAuth";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const AuthenOTP = ({ route, navigation }: AuthenOTPScreenProps) => {
  const { email, send, loginParams } = route.params;
  const { secondsLeft, start } = useCountdown();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const otpInputRef = useRef<OtpInputRef>(null);
  const [isVerified, setIsverified] = useState(false);

  useEffect(() => {
    if (send) {
      sendOTP();
    } else {
      start(60);
    }
  }, []);

  const sendOTP = async () => {
    setIsLoading(true);
    try {
      let response;
      if (loginParams) {
        response = await Auth.sendOpt(loginParams.email);
      } else if (email) {
        response = await Auth.sendOpt(email);
      }
      if (response && (response.status = 204)) {
        Toast.show({
          type: "success",
          text1: "Gửi OTP thành công",
          text2: "Vui lòng check email",
        });
        start(60);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa data màn email khi quay về
  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: "RegisterEmail" }],
  //     });
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   // Xóa handler sau khi navigate
  //   return () => backHandler.remove();
  // }, [navigation]);

  const checkedOTP = async (otp: string) => {
    setIsLoading(true);
    try {
      if (otp.length === 6 && otp) {
        let response;
        if (loginParams) {
          response = await Auth.activateAccount({
            email: loginParams.email,
            otp: otp,
          });
        } else if (email) {
          response = await Auth.activateAccount({
            email: email,
            otp: otp,
          });
        }
        if (response && response.status === 204) {
          Toast.show({
            type: "success",
            text1: "Tài khoản của bạn đã được kích hoạt thành công!",
          });
          if (loginParams) {
            const loginResponse = await Auth.login({
              email: loginParams.email,
              password: loginParams.password,
              firebaseMessageToken: loginParams.firebaseMessageToken,
            });
            if (loginResponse) {
              setIsverified(true);
              const userData: UserData = {
                accountId: loginResponse.accountId,
                address: loginResponse.address,
                dateCreate: loginResponse.dateCreate,
                email: loginResponse.email,
                name: loginResponse.name,
                phone: loginResponse.phone,
                roleId: loginResponse.roleId,
                status: loginResponse.status,
                username: loginResponse.username,
                avatarImg: loginResponse.avatarImg,
              };
              const token: TokenData = {
                refreshToken: loginResponse.refreshToken,
                refreshTokenExpiryTime: loginResponse.refreshTokenExpiryTime,
                token: loginResponse.token,
              };
              login(userData, token);
            }
          } else if (email) {
            navigation.navigate("Login");
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          Toast.show({
            type: "error",
            text1: "OTP không hợp lệ",
            text2: "Vui lòng check lại OTP trong mail",
          });
        }
      }
      setOtpValue("");
      otpInputRef.current?.clear();
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
          <Text className="text-xl">
            {email ? email : loginParams ? loginParams.email : ""}
          </Text>
        </View>
        <View className="mb-4">
          <OtpInput
            ref={otpInputRef}
            numberOfDigits={6}
            onTextChange={(text) => setOtpValue(text)}
            onFilled={(text) => checkedOTP(text)}
            focusColor={mainBlue}
            disabled={isVerified}
            blurOnFilled={otpValue.length === 5}
          />
        </View>
        <View>
          {isVerified ? (
            <View>
              <Text>Email đã được xác thực</Text>
            </View>
          ) : secondsLeft === 0 ? (
            <View>
              <Text className="text-center">
                Bạn đã nhận được mã OTP chưa? Nếu chưa, vui lòng bấm{" "}
                {!isLoading ? (
                  <Text
                    className="text-blue-700"
                    onPress={sendOTP}
                    aria-disabled={isLoading}
                  >
                    Gửi lại
                  </Text>
                ) : (
                  <ActivityIndicator size={8} color="rgb(29 78 216)" />
                )}
                <Text> để được gửi lại mã OTP mới</Text>
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
