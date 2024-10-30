import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import { AddressScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { ScrollView } from "react-native-gesture-handler";

const Address = ({ navigation }: AddressScreenProps) => {
  const [addressList, setAddressList] = useState([]);

  return (
    <ScrollView style={styles.container} className="bg-white">
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("NewAddress")}
        className="mt-5"
        textColor={mainBlue}
        style={[styles.outlineButton, styles.buttonStyle]}
      >
        <Text className="text-lg">Tạo địa chỉ mới</Text>
      </Button>
    </ScrollView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outlineButton: {
    borderColor: mainBlue,
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 4,
  },
});
