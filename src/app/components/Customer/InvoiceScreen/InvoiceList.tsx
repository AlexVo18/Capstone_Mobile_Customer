import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { InvoiceData } from "~/src/app/models/invoice_models";
import { UserInvoiceScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { formatDate } from "~/src/app/utils/dateformat";
import { FlatList } from "react-native-gesture-handler";
import { Receipt } from "lucide-react-native";
import InvoiceStatusTag from "./InvoiceStatusTag";
import { formatVND } from "~/src/app/utils/formatVND";

interface Props {
  displayList: InvoiceData[];
  userInvoiceScreenProps: UserInvoiceScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
  onCancel: () => void;
}

const InvoiceList = ({
  displayList,
  userInvoiceScreenProps,
  handleLoadMore,
  isLoadingMore,
  onCancel,
}: Props) => {
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.invoiceId}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() =>
              userInvoiceScreenProps.navigation.navigate("InvoiceDetail", {
                invoiceId: item.invoiceId,
              })
            }
          >
            <View style={[styles.card, styles.elevation]} className="p-[10px] ">
              <View className="flex flex-row gap-4">
                <View className="items-center justify-center relative p-2">
                  <Receipt size={100} color={"#000"} />
                  <InvoiceStatusTag status={item.status} />
                </View>
                <View style={{ flex: 1 }} className="flex justify-between">
                  <View>
                    <Text className="line-clamp-2 font-semibold text-lg ">
                      {item.invoiceId}
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-1 ">
                      - Loại:{" "}
                      {item.type.toLowerCase() === "rental" ? (
                        <Text className="text-blue-700">Tiền thuê</Text>
                      ) : item.type.toLowerCase() === "componentticket" ? (
                        <Text className="text-yellow-600">Tiền sữa chửa</Text>
                      ) : (
                        <Text className="text-lime-600">Tiền cọc</Text>
                      )}
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-1 ">
                      - Ngày tạo: <Text>{formatDate(item.dateCreate)}</Text>
                    </Text>
                  </View>

                  <View className="flex justify-end flex-row items-center">
                    <Text>
                      Tổng tiền:{" "}
                      <Text
                        style={[{ color: mainBlue }]}
                        className="text-lg font-bold"
                      >
                        {formatVND(item.amount)}
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
      ListEmptyComponent={<Text>Không còn thanh toán nào</Text>}
    />
  );
};

export default InvoiceList;

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
