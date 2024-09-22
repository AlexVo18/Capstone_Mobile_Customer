import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { AddressScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue } from "~/src/app/constants/cssConstants";

const Address = ({ navigation }: AddressScreenProps) => {
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("NewAddress")}
        className="mt-5"
        textColor={mainBlue}
        style={[styles.outlineButton, styles.buttonStyle]}
      >
        <Text className="text-lg">Tạo địa chỉ mới</Text>
      </Button>
    </View>
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
