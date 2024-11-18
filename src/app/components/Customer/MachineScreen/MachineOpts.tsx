import { View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell, Filter } from "lucide-react-native";

interface Props {
  onToggle: () => void;
}

const MachineOpts = ({ onToggle }: Props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <TouchableOpacity onPress={() => onToggle()}>
        <Filter size={24} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Bell size={24} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default MachineOpts;
