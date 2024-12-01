import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { Rotate3D } from "lucide-react-native";
import { AuthMenuScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";

const AuthMenu = ({ navigation }: AuthMenuScreenProps) => {
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
      <View className="mb-8 mx-3">
        <Text
          className="text-lg text-center"
          style={[{ color: `hsl(${mutedForground})` }]}
        >
          Chào mừng đến với ứng dụng, nơi bạn có thuê các máy công nghiệp chất
          lượng cao tại Việt Nam
        </Text>
      </View>
      <View className="w-full">
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Login")}
          className=""
          buttonColor={mainBlue}
          textColor="white"
          style={[styles.buttonStyle]}
        >
          <Text style={styles.textStyle}>Đăng nhập</Text>
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("RegisterEmail")}
          className="mt-5"
          textColor={mainBlue}
          style={[styles.outlineButton, styles.buttonStyle]}
        >
          <Text style={styles.textStyle}>Đăng ký</Text>
        </Button>
      </View>
    </View>
  );
};

export default AuthMenu;

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
});
