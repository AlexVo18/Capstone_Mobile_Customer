import { View } from "react-native";
import React from "react";
import BellToggler from "../../NotificationScreen/BellToggler";

const HomeUserOpts = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* <TouchableOpacity style={{ marginRight: 15 }}>
        <ShoppingCart size={24} color="black" />
      </TouchableOpacity> */}
      <BellToggler style={{ marginRight: 15 }} />
    </View>
  );
};

export default HomeUserOpts;
