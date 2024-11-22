import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ContractData,
  ContractDetailData,
} from "~/src/app/models/contract_models";
import { UserContractScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { formatVND } from "~/src/app/utils/formatVND";
import { ActivityIndicator } from "react-native-paper";
import ContractStatusTag from "./ContractStatusTag";
import { formatDate } from "~/src/app/utils/dateformat";
import Toast from "react-native-toast-message";
import { dataErrorMsg } from "~/src/app/constants/toastMessage";
import Contract from "~/src/app/api/contract/Contract";

interface Props {
  displayList: ContractData[];
  userContractScreenProps: UserContractScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
}

const ContractList = ({
  displayList,
  userContractScreenProps,
  handleLoadMore,
  isLoadingMore,
}: Props) => {
  const [chosenContract, setChosenContract] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (chosenContract) {
      handleGetPDF(chosenContract);
    }
  }, [chosenContract]);

  const handleGetPDF = async (contractId: string) => {
    try {
      if (contractId) {
        const response = (await Contract.getContractDetail(
          contractId
        )) as ContractDetailData;
        if (response) {
        }
      }
    } catch (error) {
      Toast.show({ type: "error", text1: dataErrorMsg });
    } finally {
      setChosenContract(undefined);
    }
  };

  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.contractId}
      renderItem={({ item }) => {
        return (
          <View style={{ marginHorizontal: 15 }}>
            <View style={[styles.card, styles.elevation]} className="p-[10px] ">
              <View className="flex flex-row gap-2">
                <View className="items-center justify-center relative">
                  <Image
                    src={
                      item.thumbnail ||
                      "https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
                    }
                    alt=""
                    className="h-36 w-36 rounded-lg"
                  />
                  <ContractStatusTag status={item.status} />
                </View>
                <View style={{ flex: 1 }} className="flex justify-between">
                  <View>
                    <Text className="line-clamp-2 font-semibold text-lg">
                      {item.contractId}
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
                    <Text className="text-muted-foreground line-clamp-1">
                      ({item.machineName})
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-1 ">
                      - Ngày bắt đầu: <Text>{formatDate(item.dateStart)}</Text>
                    </Text>
                  </View>
                  <View>
                    <Text className="line-clamp-1 ">
                      - Ngày kết thúc: <Text>{formatDate(item.dateEnd)}</Text>
                    </Text>
                  </View>

                  <View className="flex justify-end flex-row items-center">
                    <Text>
                      Tiền thuê:{" "}
                      <Text
                        style={[{ color: mainBlue }]}
                        className="text-lg font-bold"
                      >
                        {formatVND(item.rentPrice)}/ngày
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex flex-row gap-2 justify-end mt-2">
                {item.status.toLowerCase() === "renting" &&
                  !item.isExtended && (
                    <TouchableOpacity
                      style={[styles.buttonStyle, styles.outlineButtonColor]}
                      onPress={() =>
                        userContractScreenProps.navigation.navigate(
                          "ExtendContract",
                          { contractId: item.contractId }
                        )
                      }
                    >
                      <Text className="text-sm text-center text-blue-700 font-semibold">
                        Gia hạn hợp đồng
                      </Text>
                    </TouchableOpacity>
                  )}
                {/* {chosenContract === item.contractId ? (
                  <TouchableOpacity
                    style={[styles.buttonStyle, styles.disableButtonColor]}
                    disabled
                  >
                    {chosenContract === item.contractId ? (
                      <ActivityIndicator color={"#6b7280"} size={"small"} />
                    ) : (
                      <Text className="text-sm text-center text-gray-500 font-semibold">
                        Xem hợp đồng
                      </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.buttonStyle, styles.buttonColor]}
                    disabled={chosenContract === item.contractId}
                  >
                    {chosenContract === item.contractId ? (
                      <ActivityIndicator color={"#6b7280"} size={"small"} />
                    ) : (
                      <Text className="text-sm text-center text-white font-semibold">
                        Xem hợp đồng
                      </Text>
                    )}
                  </TouchableOpacity>
                )} */}
              </View>
            </View>
          </View>
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
  );
};

export default ContractList;

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
    borderColor: mainBlue,
    borderWidth: 1,
  },
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 140,
  },
});
