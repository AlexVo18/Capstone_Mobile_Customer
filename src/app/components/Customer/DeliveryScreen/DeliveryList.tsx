import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserDeliveryScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { DeliveryData } from "~/src/app/models/delivery_models";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Truck } from "lucide-react-native";
import DeliveryStatusTag from "./DeliveryStatusTag";
import { formatDate } from "~/src/app/utils/dateformat";

interface Props {
  displayList: DeliveryData[];
  userDeliveryScreenProps: UserDeliveryScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
}

const DeliveryList = ({
  displayList,
  userDeliveryScreenProps,
  handleLoadMore,
  isLoadingMore,
}: Props) => {
  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.deliveryTaskId.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() =>
              userDeliveryScreenProps.navigation.navigate("DeliveryDetail", {
                deliveryTaskId: item.deliveryTaskId,
              })
            }
          >
            <View style={[styles.card, styles.elevation]} className="p-[10px] ">
              <View className="flex flex-row gap-4">
                <View className="items-center justify-center relative p-2">
                  <Truck size={80} color={"#000"} />
                  <DeliveryStatusTag status={item.status} />
                </View>
                <View style={{ flex: 1 }} className="flex justify-between">
                  <View>
                    <Text className="line-clamp-2 font-semibold text-lg ">
                      {item.contractAddress.rentingRequestId}
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-2 ">
                      - Địa chỉ:{" "}
                      <Text className="text-muted-foreground">
                        {item.contractAddress.addressBody}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-1 ">
                      - Ngày giao dự kiến:{" "}
                      <Text>{formatDate(item.dateShip)}</Text>
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-1 ">
                      - Ngày hoàn thành:{" "}
                      {item.dateCompleted ? (
                        <Text>{formatDate(item.dateCompleted)}</Text>
                      ) : (
                        <Text className="text-muted-foreground italic">
                          (Chưa có)
                        </Text>
                      )}
                    </Text>
                  </View>

                  <View className="flex justify-end flex-row items-center mt-2">
                    <Text>
                      Ngày tạo:{" "}
                      <Text className="text-muted-foreground">
                        {formatDate(item.dateCreate)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              {/* <View className="flex flex-row gap-2 justify-end mt-2">
                  {item.status.toLowerCase() === "unpaid" && (
                    <TouchableOpacity
                      style={[styles.buttonStyle, styles.outlineButtonColor]}
                      onPress={() => setChosen(item.rentingRequestId)}
                    >
                      <Text className="text-sm text-center text-red-600 font-semibold">
                        Hủy đơn hàng
                      </Text>
                    </TouchableOpacity>
                  )}
                </View> */}
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
      ListEmptyComponent={<Text>Không còn đơn hàng nào</Text>}
    />
  );
};

export default DeliveryList;

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
  buttonColor: {
    backgroundColor: mainBlue,
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  outlineButtonColor: {
    borderColor: "#dc2626",
    borderWidth: 1,
  },
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 140,
  },
});
