import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { EditAddressScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";

const EditAddress = ({ route }: EditAddressScreenProps) => {
  return (
    <View>
      <Text>{route.params.addressId}</Text>
    </View>
  );
};

export default EditAddress;

const styles = StyleSheet.create({});
