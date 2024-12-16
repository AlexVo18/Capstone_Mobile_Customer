import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
import useInvoice from "~/src/app/hooks/useInvoice";
import * as WebBrowser from "expo-web-browser";

const InvoiceDetail = ({ navigation, route }: InvoiceDetailScreenProps) => {
  const { invoiceId } = route.params;
  const { addInvoice } = useInvoice();

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
    const url = "mmrms-client://customer-navigator/invoice-result";
    try {
      if (invoiceId) {
        addInvoice(invoiceId);
        const response = await Invoice.payInvoice({
          invoiceId: invoiceId,
          urlCancel: url,
          urlReturn: url,
        });
        if (response) {
          WebBrowser.openBrowserAsync(response);
        }
      }
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
      case "refund":
        return "border-lime-600 text-lime-600";
      default:
        return "border-red-600 text-red-600";
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
                      : detail.type.toLowerCase() === "refund"
                        ? "Tiền hoàn trả"
                        : "Tiền bồi thường"}
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
            {detail.type.toLowerCase() !== "refund" && (
              <View className="flex flex-row justify-between">
                <Text>Mã giao dịch</Text>
                {detail?.digitalTransactionId ? (
                  <Text>{detail?.digitalTransactionId}</Text>
                ) : (
                  <Text className="text-muted-foreground">Chưa thanh toán</Text>
                )}
              </View>
            )}

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
            {detail.type.toLowerCase() === "refund" && (
              <View className="flex flex-row justify-between">
                <Text></Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("InvoiceImage", {
                      paymentConfirmationUrl: detail.paymentConfirmationUrl,
                    })
                  }
                >
                  <Text className="underline text-blue-600">
                    Xem ảnh giao dịch
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="mb-2 mx-2 p-4 bg-white rounded-lg">
            <Text className="text-lg font-semibold">Nội dung</Text>
            <View className="h-[0.5px] bg-muted-foreground my-2"></View>

            {/* Phần invoice của ticket */}
            {ticketDetail &&
              detail.type.toLowerCase() === "componentticket" && (
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
                    <Text>Bộ phận thay thế</Text>
                    <Text>{ticketDetail.componentName}</Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Số lượng</Text>
                    <Text>x {ticketDetail.quantity}</Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Giá bộ phận</Text>
                    <Text>{formatVND(ticketDetail.componentPrice)}</Text>
                  </View>
                  <View className="h-[0.5px] bg-muted-foreground my-2"></View>
                  <View className="flex flex-row justify-between">
                    <Text>Tiền dịch vụ sửa chữa</Text>
                    <Text>
                      {ticketDetail?.additionalFee &&
                        formatVND(ticketDetail?.additionalFee)}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="text-muted-foreground font-semibold text-lg">
                      Tổng cộng
                    </Text>
                    <Text className="text-blue-700 font-semibold text-lg">
                      {formatVND(detail?.amount)}
                    </Text>
                  </View>
                </>
              )}
            {/* Phần invoice của cho thuê và cọc */}
            {detail?.contractPayments &&
              detail?.contractPayments.length !== 0 &&
              detail.type.toLowerCase() === "rental" && (
                <>
                  <View className="flex flex-row justify-between">
                    <Text>Mã hợp đồng</Text>
                    <Text>Số tiền</Text>
                  </View>
                  <View className="h-[0.5px] bg-muted-foreground my-1"></View>
                  {detail.contractPayments.map((contract, index) => (
                    <View key={index}>
                      <View className="flex flex-row justify-between">
                        <Text>
                          {contract.contractId}{" "}
                          <Text className="text-muted-foreground">
                            (
                            {contract.type.toLowerCase() === "rental"
                              ? "Tiền thuê"
                              : "Tiền cọc"}
                            )
                          </Text>
                        </Text>
                        <Text>{formatVND(contract.amount)}</Text>
                      </View>
                    </View>
                  ))}
                  <View className="h-[0.5px] bg-muted-foreground my-1"></View>
                  <View>
                    <View className="flex flex-row justify-between">
                      <Text>Thành tiền</Text>
                      <Text>
                        {" "}
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

                  {detail?.firstRentalPayment ? (
                    <>
                      <View>
                        <View className="flex flex-row justify-between">
                          <Text>Tiền dịch vụ</Text>
                          <Text>
                            {formatVND(
                              detail?.firstRentalPayment.totalServicePrice
                            )}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <View className="flex flex-row justify-between">
                          <Text>Tiền giao hàng</Text>
                          <Text>
                            {formatVND(
                              detail?.firstRentalPayment.shippingPrice
                            )}
                          </Text>
                        </View>
                      </View>
                      {detail?.firstRentalPayment.discountPrice ? (
                        <View>
                          <View className="flex flex-row justify-between">
                            <Text className="text-red-600">Tiền giảm giá</Text>
                            <Text className="text-red-600">
                              -{" "}
                              {detail?.amount &&
                                formatVND(
                                  detail.firstRentalPayment.discountPrice
                                )}
                            </Text>
                          </View>
                        </View>
                      ) : null}
                    </>
                  ) : null}

                  <View>
                    <View className="flex flex-row justify-between">
                      <Text className="text-lg font-semibold text-muted-foreground">
                        Tổng cộng
                      </Text>
                      <Text className="text-blue-700 font-semibold text-lg">
                        {formatVND(detail?.amount)}
                      </Text>
                    </View>
                  </View>
                </>
              )}
            {/* Phần invoice của hoàn tiền */}
            {detail &&
              detail.contractPayments &&
              detail.type.toLowerCase() === "refund" && (
                <>
                  <View className="flex flex-row justify-between">
                    <Text>Loại tiền</Text>
                    <Text>Số tiền</Text>
                  </View>
                  <View className="h-[0.5px] bg-muted-foreground my-1"></View>
                  {detail.contractPayments.map((contract, index) => (
                    <View key={index}>
                      <View className="flex flex-row justify-between">
                        <Text>
                          {contract.contractId}{" "}
                          <Text className="text-muted-foreground">
                            {contract.type.toLowerCase() === "refund" &&
                              "(Cọc gốc)"}
                          </Text>
                        </Text>
                        <Text>{formatVND(contract.amount)}</Text>
                      </View>
                    </View>
                  ))}
                  {detail.componentReplacementTickets.length > 0 ? (
                    detail.componentReplacementTickets.map((ticket, index) => (
                      <View key={index}>
                        <View className="flex flex-row justify-between">
                          <View>
                            <Text>{ticket.componentReplacementTicketId} </Text>
                            <Text className="text-muted-foreground">
                              (Phí sửa chữa hư hỏng)
                            </Text>
                          </View>
                          <Text className="text-red-600">
                            - {formatVND(ticket.totalAmount)}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : detail.refundShippingPrice ? (
                    <View>
                      <View className="flex flex-row justify-between">
                        <Text>Hoàn tiền ship</Text>
                        <Text className="text-lime-600">
                          + {formatVND(detail.refundShippingPrice)}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                  <View className="h-[0.5px] bg-muted-foreground my-1"></View>
                  <View>
                    <View className="flex flex-row justify-between">
                      <Text className="text-lg text-muted-foreground font-semibold">
                        Tổng cộng
                      </Text>
                      <Text className="text-blue-700 font-semibold text-lg">
                        {formatVND(detail?.amount)}
                      </Text>
                    </View>
                  </View>
                </>
              )}

            {/* Phần invoice của tiền phạt */}
            {detail &&
              detail.contractPayments &&
              detail.type.toLowerCase() === "damagepenalty" && (
                <>
                  <View className="flex flex-row justify-between">
                    <Text>Loại tiền</Text>
                    <Text>Số tiền</Text>
                  </View>
                  <View className="h-[0.5px] bg-muted-foreground my-1"></View>
                  {detail.contractPayments
                    .filter(
                      (contract) =>
                        contract.type.toLowerCase() === "damagepenalty"
                    )
                    .map((contract, index) => (
                      <View key={index}>
                        <View className="flex flex-row justify-between">
                          <Text>
                            {contract.contractId}{" "}
                            <Text className="text-muted-foreground">
                              {contract.type.toLowerCase() ===
                                "damagepenalty" && "(Bồi thường)"}
                            </Text>
                          </Text>
                          <Text>{formatVND(contract.amount)}</Text>
                        </View>
                      </View>
                    ))}
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
