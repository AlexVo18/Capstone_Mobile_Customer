import { View } from "react-native";
import React from "react";
import BellToggler from "../Customer/NotificationScreen/BellToggler";

const DetailOpts = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <BellToggler />
    </View>
  );
};

export default DetailOpts;
