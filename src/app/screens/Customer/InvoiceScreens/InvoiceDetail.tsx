import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { InvoiceDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { InvoiceDetailData } from "~/src/app/models/invoice_models";
import { ComponentReplacementTicketData } from "~/src/app/models/replacementTicket_models";
import Invoice from "~/src/app/api/invoice/Invoice";
import ReplacementTicket from "~/src/app/api/replacementTicket/ReplacementTicket";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { useFocusEffect } from "@react-navigation/native";
import { cn } from "~/src/app/utils/cn";
import { formatDate } from "~/src/app/utils/dateformat";
import { formatVND } from "~/src/app/utils/formatVND";
import Toast from "react-native-toast-message";
import {
  cancelErrorMsg,
  cancelSuccessMsg,
  createErrorMsg,
} from "~/src/app/constants/toastMessage";
import CancelModal from "~/src/app/components/modal/CancelModal";
import axios from "axios";

const InvoiceDetail = ({ route }: InvoiceDetailScreenProps) => {
  const { invoiceId } = route.params;
  const [detail, setDetail] = useState<InvoiceDetailData>();
  const [ticketDetail, setTicketDetail] =
    useState<ComponentReplacementTicketData>();

  const [isLoading, setIsLoading] = useState(true);
  const [chosen, setChosen] = useState<string | undefined>(undefined);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getInvoiceDetail();
    }, [invoiceId])
  );

  const getInvoiceDetail = async () => {
    try {
      if (invoiceId) {
        const invoiceRes = (await Invoice.getInvoiceDetail(
          invoiceId
        )) as InvoiceDetailData;
        if (invoiceRes) {
          if (invoiceRes.componentReplacementTicketId) {
            const ticketRes = await ReplacementTicket.getTicketDetail(
              invoiceRes.componentReplacementTicketId
            );
            setTicketDetail(ticketRes.componentReplacementTicket);
          }
        }
        setDetail(invoiceRes);
      }
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelTicket = async () => {
    setIsCancelLoading(true);
    try {
      if (chosen) {
        const response = await ReplacementTicket.cancelTicket(chosen);
        if (response.status === 204) {
          Toast.show({
            type: "success",
            text1: cancelSuccessMsg,
          });
          getInvoiceDetail();
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }

      Toast.show({
        type: "error",
        text1: cancelErrorMsg,
      });
    }
    setIsCancelLoading(false);
  };

  const handleCreatePayment = async () => {
    setIsCreateLoading(true);
    try {
      const url = `${window.location.origin}/user/result`;
      // if (id) {
      //   addInvoice(id);
      //   const response = await Invoice.payInvoice({
      //     invoiceId: id,
      //     urlCancel: url,
      //     urlReturn: url,
      //   });
      //   if (response) {
      //     window.location.href = response;
      //   }
      // }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: createErrorMsg,
      });
    } finally {
      setIsCreateLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-700";
      case "paid":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "rental":
        return "border-blue-700 text-blue-700";
      case "componentticket":
        return "border-yellow-400 text-yellow-400";
      default:
        return "border-lime-600 text-lime-600";
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
          onPress={handleCancelTicket}
          isLoading={isLoading}
          type="Invoice"
        />
        <ScrollView>
          <View className="m-2 p-4 bg-white rounded-lg">
            <Text className="text-xl font-semibold">
              Thanh toán {detail?.invoiceId}
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
            <View>
              <Text>
                Ngày tạo:{" "}
                <Text className="text-muted-foreground">
                  {formatDate(detail.dateCreate)}
                </Text>
              </Text>
            </View>
            <View>
              <Text>
                Ngày thanh toán:{" "}
                {detail.datePaid ? (
                  <Text className="text-muted-foreground">
                    {formatDate(detail.datePaid)}
                  </Text>
                ) : (
                  <Text className="text-muted-foreground">(Chưa có)</Text>
                )}
              </Text>
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Thông tin</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            <View className="flex flex-row justify-between items-center">
              <View>
                <Text>Loại thanh toán</Text>
              </View>
              <View
                className={cn(
                  `rounded-2xl px-4 py-1 w-fit border-[1px]`,
                  getTypeColor(detail.type)
                )}
              >
                <Text
                  className={cn(
                    "text-center text-sm ",
                    getTypeColor(detail.type)
                  )}
                >
                  {detail.type.toLowerCase() === "rental"
                    ? "Tiền thuê"
                    : detail.type.toLowerCase() === "componentticket"
                      ? "Tiền sửa chữa"
                      : "Tiền cọc"}
                </Text>
              </View>
            </View>

            {detail?.contractPayments && (
              <>
                <View className="flex flex-row justify-between">
                  <Text>
                    Thời gian áp dụng{" "}
                    <Text className="text-muted-foreground">
                      (
                      {detail?.contractPayments.length !== 0 &&
                        detail?.contractPayments[0].period &&
                        detail?.contractPayments[0].period}{" "}
                      ngày)
                    </Text>
                  </Text>
                  <Text>
                    Từ{" "}
                    {detail?.contractPayments.length !== 0 &&
                      detail?.contractPayments[0].dateFrom &&
                      formatDate(detail?.contractPayments[0].dateFrom)}{" "}
                  </Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text></Text>
                  <Text>
                    đến{" "}
                    {detail?.contractPayments.length !== 0 &&
                      detail?.contractPayments[0].dateTo &&
                      formatDate(detail?.contractPayments[0].dateTo)}{" "}
                  </Text>
                </View>
              </>
            )}

            {ticketDetail && ticketDetail?.additionalFee ? (
              <View className="flex flex-row justify-between">
                <Text>Tiền dịch vụ sửa chữa</Text>
                <Text>
                  {ticketDetail?.additionalFee &&
                    formatVND(ticketDetail?.additionalFee)}
                </Text>
              </View>
            ) : null}

            {detail?.contractPayments &&
              detail?.contractPayments[0].firstRentalPayment && (
                <>
                  <View className="flex flex-row justify-between">
                    <Text>Tiền dịch vụ</Text>
                    <Text>
                      {formatVND(
                        detail?.contractPayments[0].firstRentalPayment
                          .totalServicePrice
                      )}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Tiền giao hàng</Text>
                    <Text>
                      {formatVND(
                        detail?.contractPayments[0].firstRentalPayment
                          .shippingPrice
                      )}
                    </Text>
                  </View>
                  {detail?.contractPayments[0].firstRentalPayment
                    .discountPrice ? (
                    <View className="flex flex-row justify-between ">
                      <Text className="text-red-600">Tiền giảm giá</Text>
                      <Text className="text-red-600">
                        -{" "}
                        {formatVND(
                          detail?.contractPayments[0].firstRentalPayment
                            .discountPrice
                        )}
                      </Text>
                    </View>
                  ) : null}
                </>
              )}

            <View className="flex flex-row justify-between">
              <Text>Tổng số tiền</Text>
              <Text className="text-blue-700 font-semibold text-base">
                {detail?.amount && formatVND(detail?.amount)}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Mã giao dịch</Text>
              {detail?.digitalTransactionId ? (
                <Text>{detail?.digitalTransactionId}</Text>
              ) : (
                <Text className="text-muted-foreground">Chưa thanh toán</Text>
              )}
            </View>
            <View className="flex flex-row justify-between">
              <Text>Loại giao dịch</Text>
              {detail?.paymentMethod ? (
                <Text>{detail?.paymentMethod && "Trực tuyến"}</Text>
              ) : (
                <Text className="text-muted-foreground">Chưa thanh toán</Text>
              )}
            </View>
            <View className="flex flex-row justify-between">
              <Text>Ngày thanh toán</Text>
              {detail?.datePaid ? (
                <Text>{formatDate(detail?.datePaid)}</Text>
              ) : (
                <Text className="text-muted-foreground">Chưa thanh toán</Text>
              )}
            </View>
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Nội dung</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>
            {ticketDetail && (
              <>
                <View className="flex flex-row justify-between">
                  <Text>Mã ticket</Text>
                  <Text>{ticketDetail.componentReplacementTicketId}</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Loại máy</Text>
                  <Text>{ticketDetail.serialNumber}</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Tên bộ phận</Text>
                  <Text>{ticketDetail.componentName}</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Số lượng</Text>
                  <Text>x {ticketDetail.quantity}</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Giá bộ phận</Text>
                  <Text>{ticketDetail.componentPrice}</Text>
                </View>
              </>
            )}
            {detail?.contractPayments &&
              detail?.contractPayments.length !== 0 && (
                <>
                  <View className="flex flex-row justify-between">
                    <Text>Mã hợp đồng</Text>
                    <Text>Số tiền</Text>
                  </View>
                  <View className="h-[0.5px] bg-muted-foreground my-1"></View>
                  {detail.contractPayments.map((contract, index) => (
                    <View key={index}>
                      <View className="flex flex-row justify-between">
                        <Text>{contract.contractId}</Text>
                        <Text>{formatVND(contract.amount)}</Text>
                      </View>
                    </View>
                  ))}
                  <View className="h-[0.5px] bg-muted-foreground my-1"></View>
                  <View>
                    <View className="flex flex-row justify-between">
                      <Text>Tổng cộng</Text>
                      <Text className="text-blue-700 font-semibold">
                        {detail?.contractPayments &&
                          formatVND(
                            detail?.contractPayments.reduce(
                              (total, contract) => total + contract.amount,
                              0
                            )
                          )}
                      </Text>
                    </View>
                  </View>
                </>
              )}
          </View>
          {detail?.status.toLowerCase() === "pending" ? (
            <View className="w-full p-2">
              {isCreateLoading ? (
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.disableButtonColor]}
                  disabled
                >
                  {isLoading ? (
                    <ActivityIndicator color={"#6b7280"} size={"small"} />
                  ) : (
                    <Text className="text-lg text-center text-gray-500 font-semibold">
                      Thanh toán
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.buttonColor]}
                  disabled={isCreateLoading}
                  onPress={handleCreatePayment}
                >
                  {isLoading ? (
                    <ActivityIndicator color={"#6b7280"} size={"small"} />
                  ) : (
                    <Text className="text-lg text-center text-white font-semibold">
                      Thanh toán
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ) : null}
          {detail?.status.toLowerCase() === "pending" &&
          detail?.componentReplacementTicketId &&
          detail?.type.toLowerCase() === "componentticket" ? (
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
                      Hủy sửa chữa
                    </Text>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.buttonStyle, styles.redButtonColor]}
                  disabled={isCancelLoading}
                  onPress={() => setChosen(detail.componentReplacementTicketId)}
                >
                  {isLoading ? (
                    <ActivityIndicator color={"#6b7280"} size={"small"} />
                  ) : (
                    <Text className="text-lg text-center text-white font-semibold">
                      Hủy sửa chữa
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

export default InvoiceDetail;

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
