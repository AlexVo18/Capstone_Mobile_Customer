import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RentingRequestDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { ScrollView } from "react-native-gesture-handler";
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
              Đơn thuê {detail?.rentingRequestId}
            </Text>
            <View className="flex flex-row">
              <View
                className={cn(
                  `rounded-2xl px-4 py-1 w-fit `,
                  getStatusColor(detail.status)
                )}
              >
                <Text className="text-center text-sm text-white ">
                  {detail.status.toLowerCase() === "pending"
                    ? "Chưa thanh toán"
                    : detail.status.toLowerCase() === "paid"
                      ? "Hoàn tất"
                      : "Đã hủy"}
                </Text>
              </View>
            </View>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg"></View>
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
});
