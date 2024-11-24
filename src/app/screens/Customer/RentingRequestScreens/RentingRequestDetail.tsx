import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RentingRequestDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { ScrollView } from "react-native-gesture-handler";
import { mainBlue } from "~/src/app/constants/cssConstants";

const RentingRequestDetail = ({
  navigation,
  route,
}: RentingRequestDetailScreenProps) => {
  const { rentingRequestId } = route.params;

  return (
    <ScrollView >
      <View className="p-4">
        
      </View>
    </ScrollView>
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
