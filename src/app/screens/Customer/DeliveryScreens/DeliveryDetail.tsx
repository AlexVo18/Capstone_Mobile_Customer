import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { DeliveryDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { DeliveryDetailData } from "~/src/app/models/delivery_models";
import { DistanceData } from "~/src/app/models/address_models";
import { SettingData } from "~/src/app/models/setting_models";
import { useFocusEffect } from "@react-navigation/native";
import Delivery from "~/src/app/api/delivery/Delivery";
import Setting from "~/src/app/api/setting/Setting";
import Address from "~/src/app/api/address/Address";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { cn } from "~/src/app/utils/cn";
import { formatDate } from "~/src/app/utils/dateformat";
import { formatTime } from "~/src/app/utils/formatTime";

const DeliveryDetail = ({ navigation, route }: DeliveryDetailScreenProps) => {
  const { deliveryTaskId } = route.params;
  const [detail, setDetail] = useState<DeliveryDetailData>();
  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState<DistanceData>();
  const [settings, setSettings] = useState<SettingData[]>();

  useFocusEffect(
    useCallback(() => {
      getRequestDetail();
    }, [deliveryTaskId])
  );

  useEffect(() => {
    if (settings) {
      getShippingDistance();
    }
  }, [settings]);

  const getRequestDetail = async () => {
    try {
      if (deliveryTaskId) {
        const response = await Delivery.getDeliveryDetail(
          deliveryTaskId.toString()
        );
        if (response) {
          setDetail(response);
          const settingRes = await Setting.getSetting();

          if (settingRes) {
            setSettings(settingRes);
          }
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getShippingDistance = async () => {
    const coordinates = settings?.find(
      (setting) => setting.name === "companyCoordinate"
    );
    try {
      if (detail && coordinates) {
        const response = await Address.getDistance({
          origins: coordinates?.value as string,
          destination: detail.deliveryTask.contractAddress.coordinates,
        });
        if (response) {
          setDistance(response.rows[0].elements[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "created":
        return "bg-yellow-400";
      case "delivering":
        return "bg-blue-700";
      case "completed":
        return "bg-emerald-500";
      case "processedafterfailure":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };

  return isLoading ? (
    <View className="w-full h-full bg-white flex justify-center items-center">
      <ActivityIndicator color={mainBlue} size={"large"} />
    </View>
  ) : (
    detail && (
      <>
        <ScrollView>
          <View className="m-2 p-4 bg-white rounded-lg">
            <Text className="text-xl font-semibold">
              Đơn giao của{" "}
              {detail?.deliveryTask.contractAddress.rentingRequestId}
            </Text>
            <View className="flex flex-row">
              <View
                className={cn(
                  `rounded-2xl px-4 py-1 w-fit `,
                  getStatusColor(detail?.deliveryTask.status)
                )}
              >
                <Text className="text-center text-sm text-white ">
                  {detail?.deliveryTask.status.toLowerCase() === "created"
                    ? "Mới"
                    : detail?.deliveryTask.status.toLowerCase() === "delivering"
                      ? "Đang giao"
                      : detail?.deliveryTask.status.toLowerCase() ===
                          "completed"
                        ? "Hoàn thành"
                        : detail?.deliveryTask.status.toLowerCase() ===
                            "processedafterfailure"
                          ? "Đã xử lý lại"
                          : "Đã hủy"}
                </Text>
              </View>
            </View>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View>
              <Text>
                Ngày tạo:{" "}
                <Text className="text-muted-foreground">
                  {formatDate(detail?.deliveryTask.dateCreate)}
                </Text>
              </Text>
            </View>
            <View>
              <Text>
                Ngày giao dự kiến:{" "}
                <Text className="text-muted-foreground">
                  {formatDate(detail?.deliveryTask.dateShip)}
                </Text>
              </Text>
            </View>
            {detail?.deliveryTask.dateCompleted && (
              <View>
                <Text>
                  Ngày hoàn tất:{" "}
                  <Text className="text-muted-foreground">
                    {formatDate(detail?.deliveryTask.dateCompleted)}
                  </Text>
                </Text>
              </View>
            )}
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Thông tin đơn hàng</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View>
              <Text>
                Địa chỉ giao hàng:{" "}
                <Text className="text-muted-foreground">
                  {detail?.deliveryTask.contractAddress.addressBody} |{" "}
                  {distance && distance.distance ? (
                    <Text className="text-muted-foreground ml-1">
                      {distance.distance.text}
                    </Text>
                  ) : (
                    <Text className="text-muted-foreground ml-1">
                      Hiện tại chưa hiện được
                    </Text>
                  )}
                </Text>
              </Text>
            </View>
            <View className="flex flex-col gap-3">
              {detail?.contractDeliveries.map((contract, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.containerStyle}
                  onPress={() =>
                    navigation.navigate("ContractDetail", {
                      contractId: contract.contractId,
                    })
                  }
                >
                  {contract.pictureUrl ? (
                    <View className="h-36 w-36">
                      <Image
                        src={
                          contract.pictureUrl ||
                          "https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
                        }
                        alt=""
                        className="h-36 w-36 rounded-lg"
                      />
                    </View>
                  ) : (
                    <View className="h-36 w-36 flex justify-center items-center border border-gray-300 rounded-lg">
                      <Text className="text-muted-foreground text-lg">
                        Chưa có
                      </Text>
                    </View>
                  )}

                  <View className="w-full">
                    <Text className="flex">
                      Mã HĐ:{" "}
                      <Text className="text-muted-foreground">
                        {contract.contractId}
                      </Text>
                    </Text>
                    <Text>
                      Mã máy:{" "}
                      <Text className="text-muted-foreground">
                        {contract.serialNumber}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Nội dung cập nhật</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-col gap-3">
              {detail.deliveryTaskLogs.length !== 0 ? (
                detail.deliveryTaskLogs.map((log, index) => (
                  <View
                    key={index}
                    className="border border-gray-300 p-2 rounded-lg"
                  >
                    <View className="flex flex-row justify-between">
                      <Text>Thời gian cập nhật</Text>
                      <Text className="text-muted-foreground">
                        {formatTime(log.dateCreate)},{" "}
                        {formatDate(log.dateCreate)}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Người cập nhật</Text>
                      <Text>{log.accountTriggerName}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text className="w-40">Nội dung</Text>
                      <View className="overflow-auto w-56">
                        <Text className="text-right ">{log.action}</Text>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <></>
              )}
            </View>
          </View>
        </ScrollView>
      </>
    )
  );
};

export default DeliveryDetail;

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
  },
  buttonColor: {
    backgroundColor: mainBlue,
  },
  redButtonColor: {
    backgroundColor: "#dc2626",
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: "#d1d5db", // gray-300 equivalent
    padding: 8, // p-2 equivalent (2 * 0.25rem = 8px)
    borderRadius: 8, // rounded-lg equivalent
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // gap-2 equivalent
  },
});
