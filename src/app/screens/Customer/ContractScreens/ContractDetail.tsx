import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { ContractDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { ContractDetailData } from "~/src/app/models/contract_models";
import { DistanceData } from "~/src/app/models/address_models";
import { SettingData } from "~/src/app/models/setting_models";
import { useFocusEffect } from "@react-navigation/native";
import Contract from "~/src/app/api/contract/Contract";
import Setting from "~/src/app/api/setting/Setting";
import Address from "~/src/app/api/address/Address";
import Toast from "react-native-toast-message";
import {
  cancelErrorMsg,
  cancelSuccessMsg,
} from "~/src/app/constants/toastMessage";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import CancelModal from "~/src/app/components/modal/CancelModal";
import { ScrollView } from "react-native-gesture-handler";
import { cn } from "~/src/app/utils/cn";
import { formatDate } from "~/src/app/utils/dateformat";
import { formatVND } from "~/src/app/utils/formatVND";
import { Receipt, Ticket } from "lucide-react-native";

const ContractDetail = ({ navigation, route }: ContractDetailScreenProps) => {
  const { contractId } = route.params;

  const [detail, setDetail] = useState<ContractDetailData>();
  const [distance, setDistance] = useState<DistanceData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const [settings, setSettings] = useState<SettingData[]>();
  const [chosenType, setChosenType] = useState("payment");

  useFocusEffect(
    useCallback(() => {
      getContractDetail();
    }, [contractId])
  );

  useEffect(() => {
    getShippingDistance();
  }, [settings]);

  const getContractDetail = async () => {
    try {
      if (contractId) {
        const response = await Contract.getContractDetail(contractId);
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
          destination: detail.contractAddress?.coordinates,
        });
        if (response) {
          setDistance(response.rows[0].elements[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEndContract = async () => {
    setIsCancelLoading(true);
    try {
      if (contractId) {
        const response = await Contract.endContract(contractId);
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: cancelSuccessMsg,
          });
          getContractDetail();
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

  const getInvoiceStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-700";
      case "paid":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };

  const getInvoiceTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "rental":
        return "border-blue-700 text-blue-700";
      case "componentticket":
        return "border-yellow-400 text-yellow-400";
      case "refund":
        return "border-lime-400 text-lime-400";
      case "fine":
        return "border-red-400 text-red-400";
      default:
        return "border-blue-600 text-blue-600";
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
          onPress={handleEndContract}
          isLoading={isLoading}
          type="Contract"
        />
        <ScrollView>
          <View className="m-2 p-4 bg-white rounded-lg">
            <Text className="text-xl font-semibold">
              Hợp đồng {detail?.contractId}
            </Text>
            <View className="flex flex-row">
              <View
                className={cn(
                  `rounded-2xl px-4 py-1 w-fit `,
                  getStatusColor(detail.status)
                )}
              >
                <Text className="text-center text-sm text-white ">
                  {detail.status.toLowerCase() === "notsigned"
                    ? "Chưa ký"
                    : detail.status.toLowerCase() === "signed"
                      ? "Đã ký"
                      : detail.status.toLowerCase() === "shipping"
                        ? "Đang giao"
                        : detail.status.toLowerCase() === "renting"
                          ? "Đang được thuê"
                          : detail.status.toLowerCase() === "completed"
                            ? "Đã hoàn tất"
                            : detail.status.toLowerCase() ===
                                "inspectionpending"
                              ? "Đợi kiểm tra"
                              : detail.status.toLowerCase() ===
                                  "inspectioninprogress"
                                ? "Đang kiểm tra"
                                : detail.status.toLowerCase() ===
                                    "awaitingrefundinvoice"
                                  ? "Đợi hoàn tiền"
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
                  {formatDate(detail?.dateStart)}
                </Text>
              </Text>
            </View>
            {detail?.dateSign ? (
              <View>
                <Text>
                  Ngày kí:{" "}
                  <Text className="text-muted-foreground">
                    {formatDate(detail?.dateSign)}
                  </Text>
                </Text>
              </View>
            ) : null}
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
                {detail?.contractAddress.addressBody} |{" "}
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
                {detail?.bankAccountRefund.accountNumber}
              </Text>
            </View>

            <View className="flex flex-row justify-between">
              <Text>Tên ngân hàng </Text>
              <Text className="text-muted-foreground text-right w-72">
                {detail?.bankAccountRefund.beneficiaryBank}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Tên người nhận</Text>
              <Text className="text-muted-foreground">
                {detail?.bankAccountRefund.beneficiaryName}
              </Text>
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Máy móc</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View style={styles.machineStyle}>
              <View className="h-36 w-36">
                <Image
                  src={
                    detail.thumbnail ||
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
                      {detail.machineName}
                    </Text>
                  </View>
                  <View className="w-60 line-clamp-1">
                    <Text>
                      Mã máy:{" "}
                      <Text className="text-muted-foreground">
                        {detail.serialNumber}
                      </Text>
                    </Text>
                  </View>
                </View>
                <View className="w-56 flex flex-row justify-end mr-4">
                  <Text className="">
                    <Text className="text-blue-700 font-semibold text-lg">
                      {formatVND(detail.rentPrice)}/ngày
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-lg font-semibold">
                Lịch sử {chosenType === "payment" ? "thanh toán" : "sửa chữa"}
              </Text>
              {chosenType === "payment" ? (
                <TouchableOpacity onPress={() => setChosenType("ticket")}>
                  <Text className="text-blue-700">Sửa chữa</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setChosenType("payment")}>
                  <Text className="text-blue-700">Thanh toán</Text>
                </TouchableOpacity>
              )}
            </View>

            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            {chosenType === "payment" ? (
              <>
                {/* Lịch sử giao dịch */}
                <View className="flex flex-col gap-3">
                  {detail.contractPayments.length !== 0 ? (
                    detail.contractPayments.map((payment, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.containerStyle}
                        onPress={() =>
                          payment.type.toLowerCase() !== "fine"
                            ? navigation.navigate("InvoiceDetail", {
                                invoiceId: payment.invoiceId,
                              })
                            : null
                        }
                      >
                        {payment.invoiceId ? (
                          <View className="flex flex-row justify-between items-center">
                            <Text>Mã thanh toán </Text>
                            <Text className="text-blue-700 text-lg font-semibold">
                              {payment.invoiceId}
                            </Text>
                          </View>
                        ) : null}

                        <View className="flex flex-row justify-between items-center">
                          <Text>Loại thanh toán </Text>
                          <View
                            className={cn(
                              `rounded-2xl px-4 py-1 w-fit border`,
                              getInvoiceTypeColor(payment.type)
                            )}
                          >
                            <Text
                              className={cn(
                                `text-center text-sm`,
                                getInvoiceTypeColor(payment.type)
                              )}
                            >
                              {payment.type.toLowerCase() === "rental"
                                ? "Tiền thuê"
                                : payment.type.toLowerCase() ===
                                    "componentticket"
                                  ? "Tiền sửa chữa"
                                  : payment.type.toLowerCase() === "fine"
                                    ? "Tiền phạt"
                                    : payment.type.toLowerCase() === "refund"
                                      ? "Tiền hoàn trả"
                                      : "Tiền cọc"}
                            </Text>
                          </View>
                        </View>
                        <View className="flex flex-row justify-between">
                          <Text>Trạng thái</Text>
                          <View
                            className={cn(
                              `rounded-2xl px-4 py-1 w-fit `,
                              getInvoiceStatusColor(payment.status)
                            )}
                          >
                            <Text className="text-center text-sm text-white ">
                              {payment.status.toLowerCase() === "pending"
                                ? "Chưa thanh toán"
                                : payment.status.toLowerCase() === "paid"
                                  ? "Hoàn tất"
                                  : "Đã hủy"}
                            </Text>
                          </View>
                        </View>
                        <View className="flex flex-row justify-between">
                          <Text>
                            Thời gian áp dụng{" "}
                            <Text className="text-muted-foreground">
                              ({payment.period && payment.period} ngày)
                            </Text>
                          </Text>
                          <Text className="text-muted-foreground">
                            Từ {formatDate(payment.dateFrom)}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between">
                          <Text></Text>
                          <Text className="text-muted-foreground">
                            đến {formatDate(payment.dateTo)}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between">
                          <Text>Tổng số tiền</Text>
                          <Text className="text-blue-700 font-semibold">
                            {formatVND(payment?.amount)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View className=" flex justify-center items-center flex-col my-4">
                      <Receipt color={`hsl(${mutedForground})`} size={36} />
                      <Text
                        style={{ color: `hsl(${mutedForground})` }}
                        className="text-lg"
                      >
                        Không có thanh toán nào cả
                      </Text>
                    </View>
                  )}
                </View>
              </>
            ) : (
              <>
                {/* Ticket sửa chữa */}
                <View className="flex flex-col gap-3">
                  {detail.componentReplacementTickets.length !== 0 ? (
                    detail.componentReplacementTickets.map((ticket, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.containerStyle}
                        onPress={() =>
                          ticket.invoiceId
                            ? navigation.navigate("InvoiceDetail", {
                                invoiceId: ticket.invoiceId,
                              })
                            : null
                        }
                      >
                        <View className="flex flex-row justify-between items-center">
                          <Text>Mã ticket</Text>
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
                            <Text
                              className={cn(
                                `text-center text-sm text-white `,
                                getTicketStatusColor(ticket.status)
                              )}
                            >
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
                        <View className="flex flex-row justify-between items-center">
                          <Text>Bộ phận thay thế</Text>
                          <Text className="text-muted-foreground">
                            {ticket.componentName} x{ticket.quantity}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between">
                          <Text>Ngày tạo</Text>
                          <Text className="text-muted-foreground">
                            {formatDate(ticket.dateCreate)}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between">
                          <Text>Ngày sửa chữa</Text>
                          <Text className="text-muted-foreground">
                            {formatDate(ticket.dateRepair)}
                          </Text>
                        </View>
                        <View className="flex flex-row justify-between">
                          <Text>Tổng số tiền</Text>
                          <Text className="text-blue-700 font-semibold">
                            {formatVND(ticket.totalAmount)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <View className=" flex justify-center items-center flex-col my-4">
                      <Ticket color={`hsl(${mutedForground})`} size={36} />
                      <Text
                        style={{ color: `hsl(${mutedForground})` }}
                        className="text-lg"
                      >
                        Không có sửa chữa nào cả
                      </Text>
                    </View>
                  )}
                </View>
              </>
            )}
          </View>
          {detail?.status.toLowerCase() === "renting" ? (
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
                      Hủy hợp đồng
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.redButtonColor]}
                  disabled={isCancelLoading}
                  onPress={() => setChosen(detail.contractId)}
                >
                  {isLoading ? (
                    <ActivityIndicator color={"#6b7280"} size={"small"} />
                  ) : (
                    <Text className="text-lg text-center text-white font-semibold">
                      Hủy hợp đồng
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

export default ContractDetail;

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
