import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { UserCheckRequestScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { CheckRequestData } from "~/src/app/models/machineCheckRequest_models";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Wrench } from "lucide-react-native";
import CheckRequestStatusTag from "./CheckRequestStatusTag";
import { formatDate } from "~/src/app/utils/dateformat";

interface Props {
  displayList: CheckRequestData[];
  userCheckRequestScreenProps: UserCheckRequestScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
  ListHeaderComponent: React.ReactElement;
}

const CheckRequestList = ({
  displayList,
  userCheckRequestScreenProps,
  handleLoadMore,
  isLoadingMore,
  ListHeaderComponent,
}: Props) => {
  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.machineCheckRequestId}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() =>
              userCheckRequestScreenProps.navigation.navigate(
                "CheckRequestDetail",
                {
                  machineCheckRequestId: item.machineCheckRequestId,
                }
              )
            }
          >
            <View style={[styles.card, styles.elevation]} className="p-[10px] ">
              <View className="flex flex-row gap-2">
                <View className="items-center justify-center relative p-2">
                  {/* <Wrench size={80} color={"#000"} /> */}
                  <Image
                    src={
                      item.thumbnail ||
                      "https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
                    }
                    alt=""
                    className="h-36 w-36 rounded-lg"
                  />
                  <CheckRequestStatusTag status={item.status} />
                </View>
                <View style={{ flex: 1 }} className="flex justify-between">
                  <View>
                    <Text className="line-clamp-2 font-semibold text-lg ">
                      {item.machineCheckRequestId}
                    </Text>
                  </View>

                  <View>
                    <Text className="line-clamp-1">
                      Mã máy:{" "}
                      <Text className="text-blue-700 font-semibold">
                        {item.serialNumber}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text className="text-muted-foreground line-clamp-2">
                      {item.machineName}
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-2 ">
                      Địa chỉ:{" "}
                      <Text className="text-muted-foreground">
                        {item.contractAddress.addressBody}
                      </Text>
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
      ListEmptyComponent={<Text>Không còn yêu cầu sửa chữa nào</Text>}
    />
  );
};

export default CheckRequestList;

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
