import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { CheckRequestDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { CheckRequestDetailData } from "~/src/app/models/machineCheckRequest_models";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import MachineCheckRequest from "~/src/app/api/machineCheckRequest/MachineCheckRequest";
import Toast from "react-native-toast-message";
import {
  cancelErrorMsg,
  cancelSuccessMsg,
} from "~/src/app/constants/toastMessage";
import CancelModal from "~/src/app/components/modal/CancelModal";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { cn } from "~/src/app/utils/cn";
import { formatDate } from "~/src/app/utils/dateformat";
import { Ticket } from "lucide-react-native";
import { formatVND } from "~/src/app/utils/formatVND";

const CheckRequestDetail = ({
  navigation,
  route,
}: CheckRequestDetailScreenProps) => {
  const { machineCheckRequestId } = route.params;

  const [detail, setDetail] = useState<CheckRequestDetailData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [chosen, setChosen] = useState<string | undefined>(undefined);

  useFocusEffect(
    useCallback(() => {
      getRequestDetail();
    }, [machineCheckRequestId])
  );

  const getRequestDetail = async () => {
    try {
      if (machineCheckRequestId) {
        const response = await MachineCheckRequest.getUserMachineCheckReqDetail(
          machineCheckRequestId
        );
        if (response) {
          setDetail(response);
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelRequest = async () => {
    setIsCancelLoading(true);
    try {
      if (detail) {
        const response = await MachineCheckRequest.cancelRequest(
          detail.machineCheckRequest.machineCheckRequestId
        );
        if (response.status === 204) {
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
      case "new":
        return "bg-muted-foreground";
      case "assigned":
        return "bg-blue-700";
      case "processing":
        return "bg-yellow-400";
      case "completed":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };

  const getTicketStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "unpaid":
        return "bg-yellow-400";
      case "paid":
        return "bg-blue-700";
      case "completed":
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
          type="MachineCheck"
        />
        <ScrollView>
          <View className="m-2 p-4 bg-white rounded-lg">
            <Text className="text-xl font-semibold">
              Yêu cầu {detail?.machineCheckRequest.machineCheckRequestId}
            </Text>
            <View className="flex flex-row">
              <View
                className={cn(
                  `rounded-2xl px-4 py-1 w-fit `,
                  getStatusColor(detail?.machineCheckRequest.status)
                )}
              >
                <Text className="text-center text-sm text-white ">
                  {detail?.machineCheckRequest.status.toLowerCase() === "new"
                    ? "Mới"
                    : detail?.machineCheckRequest.status.toLowerCase() ===
                        "assigned"
                      ? "Đã cử nhân viên"
                      : detail?.machineCheckRequest.status.toLowerCase() ===
                          "processing"
                        ? "Tiến hành"
                        : detail?.machineCheckRequest.status.toLowerCase() ===
                            "completed"
                          ? "Hoàn tất"
                          : "Đã hủy"}
                </Text>
              </View>
            </View>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View>
              <Text>
                Ngày tạo:{" "}
                <Text className="text-muted-foreground">
                  {formatDate(detail?.machineCheckRequest.dateCreate)}
                </Text>
              </Text>
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Nội dung yêu cầu</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-row justify-between">
              <Text>Mã hợp đồng </Text>
              <Text className="text-muted-foreground">
                {detail?.machineCheckRequest.contractId}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Mã máy </Text>
              <Text className="text-muted-foreground">
                {detail?.machineCheckRequest.serialNumber}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Địa chỉ </Text>
              <Text className="text-muted-foreground text-right w-72">
                {detail?.machineCheckRequest.contractAddress.addressBody}
              </Text>
            </View>
            {detail?.checkCriteriaList.length !== 0 ? (
              <View className="flex ">
                <Text>Máy đang bị </Text>
                <Text>
                  {detail?.checkCriteriaList.map((criteria, index) => (
                    <Text key={index} className="text-muted-foreground">
                      {index < detail.checkCriteriaList.length &&
                        index !== 0 &&
                        ","}{" "}
                      {criteria.criteriaName}
                    </Text>
                  ))}
                </Text>
              </View>
            ) : null}
            <View className="flex">
              <Text>Ghi chú</Text>
              <View className="h-20 border border-gray-300 rounded-lg p-2">
                {detail?.machineCheckRequest.note ? (
                  <Text>{detail?.machineCheckRequest.note}</Text>
                ) : (
                  <Text className="text-muted-foreground italic">
                    Không có nội dung
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Thay thế bộ phận</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-col gap-3">
              {detail.componentReplacementTickets.length !== 0 ? (
                detail.componentReplacementTickets.map((ticket, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.containerStyle}
                    onPress={() =>
                      navigation.navigate("InvoiceDetail", {
                        invoiceId: ticket.invoiceId,
                      })
                    }
                  >
                    <View className="flex flex-row justify-between items-center">
                      <Text>Mã ticket </Text>
                      <Text className="text-blue-700 text-lg font-semibold">
                        {ticket.componentReplacementTicketId}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between items-center">
                      <Text>Trạng thái </Text>
                      <View
                        className={cn(
                          `rounded-2xl px-4 py-1 w-fit `,
                          getTicketStatusColor(ticket.status)
                        )}
                      >
                        <Text className="text-center text-sm text-white ">
                          {ticket.status.toLowerCase() === "unpaid"
                            ? "Chưa thanh toán"
                            : ticket.status.toLowerCase() === "paid"
                              ? "Đã thanh toán"
                              : ticket.status.toLowerCase() === "completed"
                                ? "Đã sửa xong"
                                : "Đã hủy"}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Bộ phận thay thế </Text>
                      <Text className="text-muted-foreground">
                        {ticket.componentName}{" "}
                        <Text className="font-semibold">
                          x{ticket.quantity}
                        </Text>
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Tiền sửa chữa </Text>
                      <Text className="text-muted-foreground">
                        {formatVND(ticket.totalAmount)}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Ngày tạo </Text>
                      <Text className="text-muted-foreground">
                        {formatDate(ticket.dateCreate)}
                      </Text>
                    </View>
                    {ticket.dateRepair && (
                      <View className="flex flex-row justify-between">
                        <Text>Ngày sửa chữa </Text>
                        <Text className="text-muted-foreground">
                          {formatDate(ticket.dateRepair)}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <View className=" flex justify-center items-center flex-col my-4">
                  <Ticket color={`hsl(${mutedForground})`} size={36} />
                  <Text
                    style={{ color: `hsl(${mutedForground})` }}
                    className="text-lg"
                  >
                    Không có ticket sửa chữa nào cả
                  </Text>
                </View>
              )}
            </View>
          </View>
          {detail?.machineCheckRequest.status.toLowerCase() === "new" ||
          detail?.machineCheckRequest.status.toLowerCase() === "assigned" ? (
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
                      Hủy yêu cầu
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.redButtonColor]}
                  disabled={isCancelLoading}
                  onPress={() =>
                    setChosen(detail.machineCheckRequest.machineCheckRequestId)
                  }
                >
                  {isLoading ? (
                    <ActivityIndicator color={"#6b7280"} size={"small"} />
                  ) : (
                    <Text className="text-lg text-center text-white font-semibold">
                      Hủy yêu cầu
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

export default CheckRequestDetail;

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
    gap: 4,
  },
});
