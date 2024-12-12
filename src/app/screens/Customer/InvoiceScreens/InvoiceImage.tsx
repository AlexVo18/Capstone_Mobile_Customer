import { View, Image } from "react-native";
import React from "react";
import { InvoiceImageScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";

const InvoiceImage = ({ route }: InvoiceImageScreenProps) => {
  const { paymentConfirmationUrl } = route.params;
  return (
    <View className="flex bg-black w-full h-full justify-center items-center p-4">
      <Image
        src={
          paymentConfirmationUrl ||
          "https://www.schaeffler.vn/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg"
        }
        alt=""
        className="h-full w-full"
      />
    </View>
  );
};

export default InvoiceImage;
