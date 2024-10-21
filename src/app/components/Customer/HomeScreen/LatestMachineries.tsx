import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { formatVND } from "~/src/app/utils/formatVND";
import { HomeScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import {
  MachineryData,
  MachineryImageData,
} from "~/src/app/models/machinery_models";
import Toast from "react-native-toast-message";
import Machinery from "~/src/app/api/machinery/Machinery";
import { ActivityIndicator } from "react-native-paper";

interface Props extends HomeScreenProps {
  ListHeaderComponent: React.ReactElement;
}

const LatestMachineries = ({ ListHeaderComponent, navigation }: Props) => {
  const [machineries, setMachineries] = useState<MachineryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLatest();
  }, []);

  const getLatest = async () => {
    try {
      const response = await Machinery.getLatestMachineries();
      if (response) {
        setMachineries(response);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lấy dữ liệu thất bại",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="">
      {isLoading ? (
        <View className="py-5">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : (
        <FlatList
          data={machineries}
          keyExtractor={(item) => item.productId.toString()}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={({ item }) => {
            const thumbnail = item.productImageList.find(
              (image: MachineryImageData) => image.isThumbnail === true
            );
            return (
              <TouchableOpacity
                style={{ marginHorizontal: 15 }}
                onPress={() =>
                  navigation
                    .getParent()
                    ?.navigate("ProductDetail", { productId: item.productId })
                }
              >
                <View
                  style={[styles.card, styles.elevation]}
                  className="p-[10px] flex flex-row gap-2"
                >
                  <View className="items-center justify-center relative">
                    <Image
                      src={
                        thumbnail?.productImageUrl ||
                        "https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
                      }
                      alt=""
                      className="h-40 w-40 rounded-lg"
                    />
                    <View
                      className="bg-blue-700 p-1 rounded-2xl px-2 py-1"
                      style={styles.tagPosition}
                    >
                      <Text
                        style={{ color: "white" }}
                        className="text-center text-sm"
                      >
                        {item.categoryName}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }} className="flex justify-between">
                    <View>
                      <Text className="line-clamp-2 font-semibold text-xl">
                        {item.productName}
                      </Text>
                      <Text style={styles.description}>
                        <Text className="font-semibold">Model:</Text>{" "}
                        {item.model}
                      </Text>
                      <Text style={styles.description}>
                        <Text className="font-semibold">Xuất xứ:</Text>{" "}
                        {item.origin}
                      </Text>
                      <Text style={styles.description}>
                        <Text className="font-semibold">Số lượng:</Text>{" "}
                        {item.quantity || 0} máy
                      </Text>
                    </View>
                    <View className="flex justify-end flex-row items-center">
                      <Text
                        style={[{ color: mainBlue }]}
                        className="text-lg font-bold"
                      >
                        {formatVND(item.rentPrice)} ~{" "}
                        {formatVND(item.rentPrice)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default LatestMachineries;

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
