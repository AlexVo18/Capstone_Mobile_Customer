import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { formatVND } from "~/src/app/utils/formatVND";
import { HomeScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";

const AllMachineries = ({ navigation }: HomeScreenProps) => {
  return (
    <View className="px-5">
      <View className="w-full flex justify-between">
        <Text className="text-xl font-bold" style={{ color: mainBlue }}>
          Các sản phẩm của shop
        </Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.getParent()?.navigate("ProductDetail", { productId: 1 })
        }
      >
        <View
          style={[styles.card, styles.elevation]}
          className="p-[10px] flex flex-row gap-2"
        >
          <View className="items-center justify-center relative">
            <Image
              src="https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
              alt=""
              className="h-40 w-40 rounded-lg"
            />
            <View
              className="bg-blue-700 p-1 rounded-2xl px-2 py-1"
              style={styles.tagPosition}
            >
              <Text style={{ color: "white" }} className="text-center text-sm">
                Máy khoan tường
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }} className="flex justify-between">
            <View>
              <Text className="line-clamp-2 font-semibold text-xl">
                Xe cẩu di động model A3525
              </Text>
              <Text style={styles.description}>
                <Text className="font-semibold">Model:</Text> A3525
              </Text>
              <Text style={styles.description}>
                <Text className="font-semibold">Xuất xứ:</Text> Pháp
              </Text>
              <Text style={styles.description}>
                <Text className="font-semibold">Số lượng:</Text> 2 máy
              </Text>
            </View>
            <View className="flex justify-end flex-row items-center">
              <Text style={[{ color: mainBlue }]} className="text-xl font-bold">
                {formatVND(2000000)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>
          navigation.getParent()?.navigate("ProductDetail", { productId: 2 })
        }>
        <View
          style={[styles.card, styles.elevation]}
          className="p-[10px] flex flex-row gap-2"
        >
          <View className="items-center justify-center relative">
            <Image
              src="https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
              alt=""
              className="h-40 w-40 rounded-lg"
            />
            <View
              className="bg-blue-700 p-1 rounded-2xl px-2 py-1"
              style={styles.tagPosition}
            >
              <Text style={{ color: "white" }} className="text-center text-sm">
                Máy khoan tường
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }} className="flex justify-between">
            <View>
              <Text className="line-clamp-2 font-semibold text-xl">
                Xe cẩu di động model A3525
              </Text>
              <Text style={styles.description}>
                <Text className="font-semibold">Model:</Text> A3525
              </Text>
              <Text style={styles.description}>
                <Text className="font-semibold">Xuất xứ:</Text> Pháp
              </Text>
              <Text style={styles.description}>
                <Text className="font-semibold">Số lượng:</Text> 2 máy
              </Text>
            </View>
            <View className="flex justify-end flex-row items-center">
              <Text style={[{ color: mainBlue }]} className="text-xl font-bold">
                {formatVND(2000000)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AllMachineries;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: mutedForground,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: mutedForground,
  },
  tagPosition: {
    bottom: -5,
    right: -20,
    position: "absolute",
  },
});
