import { View } from "react-native";
import React from "react";
import BellToggler from "../NotificationScreen/BellToggler";

const ContractOpts = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <BellToggler />
    </View>
  );
};

export default ContractOpts;
