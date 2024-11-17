import { View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell, Filter } from "lucide-react-native";
import { SearchMachineryParams } from "~/src/app/models/machinery_models";

interface Props {
  searchParams: SearchMachineryParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchMachineryParams>>;
}

const MachineOpts = ({ searchParams, setSearchParams }: Props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <TouchableOpacity>
        <Filter size={24} color={"black"} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Bell size={24} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default MachineOpts;
