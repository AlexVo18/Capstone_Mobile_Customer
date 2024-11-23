import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RequestData } from "~/src/app/models/rentingRequest_models";
import { UserRentingRequestScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { formatVND } from "~/src/app/utils/formatVND";
import { formatDate } from "~/src/app/utils/dateformat";
import RentingRequestStatusTag from "./RentingRequestStatusTag";
import { Package } from "lucide-react-native";
import RentingRequest from "~/src/app/api/rentingRequest/RentingRequest";
import Toast from "react-native-toast-message";
import {
  cancelErrorMsg,
  cancelSuccessMsg,
} from "~/src/app/constants/toastMessage";
import CancelModal from "../../modal/CancelModal";

interface Props {
  displayList: RequestData[];
  userRentingRequestScreenProps: UserRentingRequestScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
  onCancel: () => void;
}

const RentingRequestList = ({
  displayList,
  userRentingRequestScreenProps,
  handleLoadMore,
  isLoadingMore,
  onCancel,
}: Props) => {
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelRequest = async () => {
    setIsLoading(true);
    try {
      if (chosen) {
        const response = await RentingRequest.cancelRequest(chosen);
        if (response) {
          Toast.show({
            type: "success",
            text1: cancelSuccessMsg,
          });
          onCancel();
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: cancelErrorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CancelModal
        chosen={chosen}
        setChosen={setChosen}
        onPress={handleCancelRequest}
        isLoading={isLoading}
        type="RentingRequest"
      />
      <FlatList
        data={displayList}
        keyExtractor={(item) => item.rentingRequestId}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ marginHorizontal: 15 }}
              onPress={() =>
                userRentingRequestScreenProps.navigation.navigate(
                  "RentingRequestDetail",
                  { rentingRequestId: item.rentingRequestId }
                )
              }
            >
              <View
                style={[styles.card, styles.elevation]}
                className="p-[10px] "
              >
                <View className="flex flex-row gap-4">
                  <View className="items-center justify-center relative p-2">
                    <Package size={100} color={"#000"} />
                    <RentingRequestStatusTag status={item.status} />
                  </View>
                  <View style={{ flex: 1 }} className="flex justify-between">
                    <View>
                      <Text className="line-clamp-2 font-semibold text-lg ">
                        {item.rentingRequestId}
                      </Text>
                    </View>
                    <View>
                      <Text className="line-clamp-1 ">
                        - Thanh toán:{" "}
                        {item.isOnetimePayment ? (
                          <Text className="text-blue-700">Một lần</Text>
                        ) : (
                          <Text className="text-yellow-600">Theo tháng</Text>
                        )}
                      </Text>
                    </View>
                    <View>
                      <Text className="line-clamp-1 ">
                        - Tổng tiền thuê:{" "}
                        <Text>{formatVND(item.totalRentPrice)}</Text>
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
                <View className="flex flex-row gap-2 justify-end mt-2">
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
        ListEmptyComponent={<Text>Không còn hợp đồng nào</Text>}
      />
    </>
  );
};

export default RentingRequestList;

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
