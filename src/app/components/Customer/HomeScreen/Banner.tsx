import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { CustomerTabParamList } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
interface Props {
  navigation: BottomTabNavigationProp<CustomerTabParamList, "Home", undefined>;
}

const Banner = ({ navigation }: Props) => {
  return (
    <View className="mb-5 rounded-lg w-full h-52 px-5 pt-5">
      <ImageBackground
        source={{
          uri: "https://media.istockphoto.com/id/1252680975/photo/happy-african-builder-standing-pleased-posing-on-white-studio-background.jpg?s=612x612&w=0&k=20&c=1Uka9d-qjdgmEL9emV5aMbdxFKPNBWSSNxu1E9dcliw=",
        }}
        style={{ flex: 1, justifyContent: "center" }}
        imageStyle={{ borderRadius: 10 }}
      >
        <LinearGradient
          colors={["rgba(29, 78, 216, 0.7)", "rgba(29, 78, 216, 0.0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }} className="font-bold text-xl">
            Cập Nhật Sản Phẩm Mới
          </Text>
          <View className="mt-[5px]">
            <Text style={{ color: "white" }}>Nhiều máy móc mới đã cập </Text>
            <Text style={{ color: "white" }}>
              bến tại{" "}
              <Text style={{ color: mainBlue }} className="font-semibold">
                MMRMS
              </Text>
            </Text>
          </View>
          <View className="mt-[10px] items-start flex">
            <Button
              mode="contained"
              onPress={() => navigation.getParent()?.navigate("Collection")}
              className=""
              buttonColor="white"
              textColor={mainBlue}
              style={[styles.buttonStyle]}
            >
              <Text style={styles.textStyle}>Khám phá</Text>
            </Button>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 0,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
  },
});
