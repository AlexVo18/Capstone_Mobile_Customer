import { View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Filter } from "lucide-react-native";
import BellToggler from "../NotificationScreen/BellToggler";
interface Props {
  onToggle: () => void;
}

const ContractOpts = ({ onToggle }: Props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <TouchableOpacity onPress={() => onToggle()}>
        <Filter size={24} color={"black"} />
      </TouchableOpacity>
      <BellToggler />
    </View>
  );
};

export default ContractOpts;
