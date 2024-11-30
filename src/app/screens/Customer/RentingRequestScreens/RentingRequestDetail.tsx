import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { RentingRequestDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { RequestDetailData } from "~/src/app/models/rentingRequest_models";
import { DistanceData } from "~/src/app/models/address_models";
import { startSignalRConnection } from "~/src/app/config/signalRService";
import { SettingData } from "~/src/app/models/setting_models";
import RentingRequest from "~/src/app/api/rentingRequest/RentingRequest";
import Setting from "~/src/app/api/setting/Setting";
import Address from "~/src/app/api/address/Address";
import Toast from "react-native-toast-message";
import {
  cancelErrorMsg,
  cancelSuccessMsg,
} from "~/src/app/constants/toastMessage";
import CancelModal from "~/src/app/components/modal/CancelModal";
import { cn } from "~/src/app/utils/cn";
import { formatDate } from "~/src/app/utils/dateformat";
import { formatVND } from "~/src/app/utils/formatVND";

const RentingRequestDetail = ({
  navigation,
  route,
}: RentingRequestDetailScreenProps) => {
  const { rentingRequestId } = route.params;

  const [detail, setDetail] = useState<RequestDetailData>();
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const [distance, setDistance] = useState<DistanceData>();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<SettingData[]>();
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  useEffect(() => {
    getRequestDetail();
  }, [rentingRequestId]);

  useEffect(() => {
    let connectionPayment: any = null;

    const initializeSignalR = async () => {
      connectionPayment = await startSignalRConnection("machine-check-request");
      if (connectionPayment) {
        connectionPayment.on("OnUpdateMachineCheckRequest", () => {
          getRequestDetail();
        });
      }
    };
    initializeSignalR();

    return () => {
      if (connectionPayment) connectionPayment.stop();
      console.log("Connections stopped");
    };
  }, []);

  useEffect(() => {
    getShippingDistance();
  }, [settings]);

  const getRequestDetail = async () => {
    try {
      if (rentingRequestId) {
        const response =
          await RentingRequest.getRequestDetail(rentingRequestId);
        if (response) {
          setDetail(response);
          const settingRes = await Setting.getSetting();

          if (settingRes) {
            setSettings(settingRes);
          }
        }
      }
    } catch (error) {
      return;
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
          destination: detail.rentingRequestAddress?.coordinates,
        });
        if (response) {
          setDistance(response.rows[0].elements[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelRequest = async () => {
    setIsCancelLoading(true);
    try {
      if (rentingRequestId) {
        const response = await RentingRequest.cancelRequest(rentingRequestId);
        if (response) {
          Toast.show({
            type: "success",
            text1: cancelSuccessMsg,
          });
          getRequestDetail();
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: cancelErrorMsg,
      });
    } finally {
      setIsCancelLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "bg-lime-600";
      case "unpaid":
        return "bg-yellow-400";
      case "signed":
        return "bg-blue-700";
      default:
        return "bg-red-600";
    }
  };

  const getContractStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "notsigned":
        return "bg-yellow-400";
      case "signed":
        return "bg-sky-600";
      case "shipping":
        return "bg-blue-700";
      case "renting":
        return "bg-lime-600";
      case "completed":
        return "bg-emerald-500";
      case "inspectionpending":
        return "bg-yellow-400";
      case "inspectioninprogress":
        return "bg-blue-700";
      case "awaitingrefundinvoice":
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
        <CancelModal
          chosen={chosen}
          setChosen={setChosen}
          onPress={handleCancelRequest}
          isLoading={isLoading}
          type="RentingRequest"
        />
        <ScrollView>
          <View className="m-2 p-4 bg-white rounded-lg">
            <Text className="text-xl font-semibold">
              Yêu cầu thuê {detail?.rentingRequestId}
            </Text>
            <View className="flex flex-row">
              <View
                className={cn(
                  `rounded-2xl px-4 py-1 w-fit `,
                  getStatusColor(detail.status)
                )}
              >
                <Text className="text-center text-sm text-white ">
                  {detail.status.toLowerCase() === "shipped"
                    ? "Đã giao"
                    : detail.status.toLowerCase() === "unpaid"
                      ? "Chưa trả cọc"
                      : detail.status.toLowerCase() === "signed"
                        ? "Đã ký"
                        : "Đã hủy"}
                </Text>
              </View>
            </View>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View>
              <Text>
                Ngày tạo:{" "}
                <Text className="text-muted-foreground">
                  {formatDate(detail?.dateCreate)}
                </Text>
              </Text>
            </View>
            <View>
              <Text>
                Ngày bắt đầu:{" "}
                <Text className="text-muted-foreground">
                  {formatDate(detail?.contracts[0].dateStart)}
                </Text>
              </Text>
            </View>
            <View>
              <Text>
                Trả tiền:{" "}
                <Text className="text-muted-foreground">
                  {detail?.isOnetimePayment ? "1 lần" : "Theo tháng"}
                </Text>
              </Text>
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Khách hàng</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-row justify-between">
              <Text>Tên người đặt </Text>
              <Text className="text-muted-foreground">
                {detail?.accountOrder.name}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Số điện thoại </Text>
              <Text className="text-muted-foreground">
                {detail?.accountOrder.phone}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Tên công ty </Text>
              <Text className="text-muted-foreground text-right w-72">
                {detail?.accountBusiness.company}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Email </Text>
              <Text className="text-muted-foreground text-right">
                {detail?.accountOrder.email}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Địa chỉ </Text>
              <Text className="text-muted-foreground text-right w-72">
                {detail?.rentingRequestAddress.addressBody} |{" "}
                {distance && distance.distance ? (
                  <Text className="text-black ">{distance.distance.text}</Text>
                ) : (
                  <Text className="text-muted-foreground ml-1">
                    Hiện tại chưa hiện được
                  </Text>
                )}
              </Text>
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Thông tin ngân hàng</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-row justify-between">
              <Text>Số tài khoản </Text>
              <Text className="text-muted-foreground">
                {detail?.accountNumber}
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text>Tên ngân hàng </Text>
              <Text className="text-muted-foreground text-right w-72">
                {detail?.beneficiaryBank}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Tên người nhận</Text>
              <Text className="text-muted-foreground">
                {detail?.beneficiaryName}
              </Text>
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Máy móc</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-col gap-3">
              {detail?.contracts.map((contract, index) => (
                <TouchableOpacity
                  style={styles.machineStyle}
                  key={index}
                  onPress={() =>
                    navigation.navigate("ContractDetail", {
                      contractId: contract.contractId,
                    })
                  }
                >
                  <View className="h-36 w-36">
                    <Image
                      src={
                        contract.thumbnail ||
                        "https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
                      }
                      alt=""
                      className="h-36 w-36 rounded-lg"
                    />
                  </View>

                  <View className="flex flex-col justify-evenly h-36">
                    <View>
                      <View className="w-60">
                        <Text className="text-muted-foreground">
                          {contract.machineName}
                        </Text>
                      </View>
                      <View className="w-60 line-clamp-1">
                        <Text>
                          Mã máy:{" "}
                          <Text className="text-muted-foreground">
                            {contract.serialNumber}
                          </Text>
                        </Text>
                      </View>
                      <View className="w-60 line-clamp-1">
                        <Text>
                          Mã HĐ:{" "}
                          <Text className="text-muted-foreground">
                            {contract.contractId}
                          </Text>
                        </Text>
                      </View>
                      <View className="w-60 line-clamp-1">
                        <Text>
                          Ngày bắt đầu:{" "}
                          <Text className="text-muted-foreground">
                            {formatDate(contract.dateStart)}
                          </Text>
                        </Text>
                      </View>
                      <View className="w-60 line-clamp-1">
                        <Text>
                          Ngày kết thúc:{" "}
                          <Text className="text-muted-foreground">
                            {formatDate(contract.dateEnd)}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View className="w-56 flex flex-row justify-end mr-4">
                      <Text className="">
                        <Text className="text-blue-700 font-semibold text-lg">
                          {formatVND(contract.rentPrice)}/ngày
                        </Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Dịch vụ thuê</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-row justify-between ">
              <View className="flex flex-row gap-2">
                <Text className="w-10 text-center text-muted-foreground font-semibold">
                  STT
                </Text>
                <Text className="text-muted-foreground font-semibold">
                  Tên dịch vụ
                </Text>
              </View>
              <Text className="w-20 text-right text-muted-foreground font-semibold">
                Bảng giá
              </Text>
            </View>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-col gap-2">
              {detail?.serviceRentingRequests.map((service, index) => (
                <View className="flex flex-row justify-between" key={index}>
                  <View className="flex flex-row gap-2">
                    <Text className="w-10 text-center">{index + 1}</Text>
                    <Text className="">{service.rentingServiceName}</Text>
                  </View>
                  <Text className="w-20 text-right">
                    {formatVND(service.servicePrice)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Thông tin thanh toán</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-row justify-between">
              <Text>Phí vận chuyển </Text>
              <Text className="text-muted-foreground">
                {formatVND(detail.shippingPrice)}
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text>Phí dịch vụ </Text>
              <Text className="text-muted-foreground text-right w-72">
                {formatVND(detail.totalServicePrice)}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Tiền cọc</Text>
              <Text className="text-muted-foreground">
                {formatVND(detail.totalDepositPrice)}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Tiền thuê</Text>
              <Text className="text-muted-foreground">
                {formatVND(detail.totalRentPrice)}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg font-semibold">Tiền thuê</Text>
              <Text className="text-lg text-blue-700 font-semibold">
                {formatVND(detail.totalAmount)}
              </Text>
            </View>
          </View>
          {detail?.status.toLowerCase() === "renting" ||
          detail.status.toLowerCase() === "unpaid" ? (
            <View className="w-full p-2">
              {isCancelLoading ? (
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.disableButtonColor]}
                  disabled
                >
                  {isLoading ? (
                    <ActivityIndicator color={"#6b7280"} size={"small"} />
                  ) : (
                    <Text className="text-lg text-center text-gray-500 font-semibold">
                      Hủy yêu cầu thuê
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.redButtonColor]}
                  disabled={isCancelLoading}
                  onPress={() => setChosen(detail.rentingRequestId)}
                >
                  {isLoading ? (
                    <ActivityIndicator color={"#6b7280"} size={"small"} />
                  ) : (
                    <Text className="text-lg text-center text-white font-semibold">
                      Hủy yêu cầu thuê
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </ScrollView>
      </>
    )
  );
};

export default RentingRequestDetail;

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
    borderColor: "#d1d5db",
    padding: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  machineStyle: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
