import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { InvoiceDetailData } from "~/src/app/models/invoice_models";
import Invoice from "~/src/app/api/invoice/Invoice";
import { BillResultScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import Toast from "react-native-toast-message";
import {
  dataErrorMsg,
  paymentErrorMsg,
} from "~/src/app/constants/toastMessage";
import { ActivityIndicator } from "react-native-paper";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { CircleCheckBig } from "lucide-react-native";
import { formatVND } from "~/src/app/utils/formatVND";
import { formatDate } from "~/src/app/utils/dateformat";
import { TouchableOpacity } from "react-native-gesture-handler";

const BillResult = ({ navigation, route }: BillResultScreenProps) => {
  const { invoiceId } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState<InvoiceDetailData>();

  useEffect(() => {
    getInvoiceDetail();
  }, [invoiceId]);

  const getInvoiceDetail = async () => {
    try {
      if (invoiceId) {
        const response = await Invoice.getInvoiceDetail(invoiceId);
        if (response) {
          if (response.status.toLowerCase() !== "paid") {
            navigation.navigate("UserInvoice");
            Toast.show({
              type: "error",
              text1: paymentErrorMsg,
            });
          }
          setDetail(response);
        }
      }
    } catch (error) {
      navigation.navigate("UserInvoice");
      Toast.show({
        type: "error",
        text1: dataErrorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View className="w-full h-full bg-white flex justify-center items-center">
      <ActivityIndicator color={mainBlue} size={"large"} />
    </View>
  ) : (
    <View className="w-full h-full bg-white flex justify-center items-center">
      <View
        style={[styles.elevation, styles.card]}
        className="border border-gray-300 p-4 rounded-lg flex flex-col justify-center items-center gap-1"
      >
        <View className="flex flex-col justify-center items-center">
          <CircleCheckBig size={60} color={"#34d399"} />
          <Text className=" font-semibold" style={[styles.colorStyle]}>
            Thanh toán thành công
          </Text>
        </View>
        <View className="h-[0.5px] bg-muted-foreground "></View>
        <View className="w-full flex flex-row gap-2 justify-between">
          <Text>Mã thanh toán</Text>
          <Text>{detail?.invoiceId}</Text>
        </View>
        <View className="w-full flex flex-row gap-2 justify-between">
          <Text>Loại thanh toán</Text>
          <Text>
            {detail?.type.toLowerCase() === "rental"
              ? "Tiền thuê"
              : detail?.type.toLowerCase() === "componentticket"
                ? "Tiền sửa chữa"
                : "Tiền cọc"}
          </Text>
        </View>
        <View className="w-full flex flex-row gap-2 justify-between">
          <Text>Số tiền</Text>
          <Text>{detail?.amount && formatVND(detail?.amount)}</Text>
        </View>
        <View className="w-full flex flex-row gap-2 justify-between">
          <Text>Ngày thanh toán</Text>
          <Text>{detail?.datePaid && formatDate(detail?.datePaid)}</Text>
        </View>
        <View className="w-full flex flex-row gap-2 justify-between">
          <Text>Mã giao dịch</Text>
          <Text>{detail?.digitalTransactionId}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.textStyle]}
        onPress={() => navigation.navigate("UserInvoice")}
      >
        <Text className="text-center text-muted-foreground">
          Trở về danh sách thanh toán
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BillResult;

const styles = StyleSheet.create({
  elevation: {
    elevation: 10,
    shadowColor: mutedForground,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "80%",
    marginVertical: 10,
  },
  textStyle: {
    marginTop: 16,
  },
  colorStyle: {
    color: "#34d399",
  },
});
