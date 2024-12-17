import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { CollectionScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { MachineryData } from "~/src/app/models/machinery_models";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ActivityIndicator } from "react-native-paper";
import { formatVND } from "~/src/app/utils/formatVND";

interface Props {
  displayList: MachineryData[];
  collectionScreenProps: CollectionScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
}

const MachineList = ({
  displayList,
  collectionScreenProps,
  handleLoadMore,
  isLoadingMore,
}: Props) => {
  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.machineId.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() =>
              collectionScreenProps.navigation
                .getParent()
                ?.navigate("MachineDetail", { machineId: item.machineId })
            }
          >
            <View
              style={[styles.card, styles.elevation]}
              className="p-[10px] flex flex-row gap-2"
            >
              <View className="items-center justify-center relative">
                <Image
                  src={item.thumbnail}
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
                    {item.machineName}
                  </Text>
                  <Text style={styles.description} className="line-clamp-1">
                    <Text className="font-semibold ">Chi tiết:</Text>{" "}
                    {item.description}
                  </Text>
                  <Text style={styles.description}>
                    <Text className="font-semibold">Model:</Text> {item.model}
                  </Text>
                  <Text style={styles.description}>
                    <Text className="font-semibold">Xuất xứ:</Text>{" "}
                    {item.origin}
                  </Text>
                </View>
                <View className="flex justify-end flex-row items-center">
                  <Text
                    style={[{ color: mainBlue }]}
                    className="text-lg font-bold"
                  >
                    {formatVND(item.rentPrice)}/ngày
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoadingMore ? (
          <ActivityIndicator size="large" color={mainBlue} />
        ) : null
      }
      ListEmptyComponent={<Text>Không còn tin tức</Text>}
    />
  );
};

export default MachineList;

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
    bottom: 0,
    right: -20,
    position: "absolute",
  },
});
