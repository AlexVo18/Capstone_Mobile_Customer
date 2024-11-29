import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { PaymentUrlParams } from "~/src/app/models/invoice_models";
import useInvoice from "~/src/app/hooks/useInvoice";
import Invoice from "~/src/app/api/invoice/Invoice";
import Toast from "react-native-toast-message";
import {
  paymentCancelMsg,
  paymentErrorMsg,
  paymentSuccessMsg,
} from "~/src/app/constants/toastMessage";
import { InvoiceResultScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { CircleCheckBig, CircleX } from "lucide-react-native";

const InvoiceResult = ({ navigation }: InvoiceResultScreenProps) => {
  const route = useRoute();
  const { invoice, removeInvoice } = useInvoice();

  const [result, setResult] = useState<PaymentUrlParams>();
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initParams();
  }, []);

  useEffect(() => {
    if (result !== undefined) {
      sendResult();
    }
  }, [result, invoice]);

  const initParams = () => {
    const params = route.params as PaymentUrlParams;
    setResult(params);
  };

  const sendResult = async () => {
    try {
      if (result && invoice) {
        if (result.status.toLowerCase() === "paid") {
          await Invoice.sendInvoiceData(invoice);
          setSent(true);
          Toast.show({
            type: "success",
            text1: paymentSuccessMsg,
          });
          navigation.navigate("BillResult", { invoiceId: invoice });
        } else {
          removeInvoice();
          Toast.show({
            type: "error",
            text1: paymentCancelMsg,
          });
          navigation.navigate("UserInvoice");
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: paymentErrorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <View className="w-full h-full bg-white flex justify-center items-center">
      <ActivityIndicator color={mainBlue} size={"large"} />
    </View>
  ) : result?.status.toLowerCase() === "paid" && sent ? (
    <CircleCheckBig className="h-36 w-36 " color={"#34d399"} />
  ) : (
    <CircleX className="h-36 w-36 " color={"#dc2626"} />
  );
};

export default InvoiceResult;
