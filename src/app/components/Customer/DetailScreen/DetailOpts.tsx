import { View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell, ShoppingCart } from "lucide-react-native";

interface Props {
  color: string;
}

const DetailOpts = ({ color }: Props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }} >
      <TouchableOpacity style={{ marginRight: 15 }}>
        <ShoppingCart size={24} color={color} />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Bell size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailOpts;
