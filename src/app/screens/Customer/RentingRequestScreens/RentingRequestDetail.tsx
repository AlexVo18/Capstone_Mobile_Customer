import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RentingRequestDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { ScrollView } from "react-native-gesture-handler";

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

const styles = StyleSheet.create({});
