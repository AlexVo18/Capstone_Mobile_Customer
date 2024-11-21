import { StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import { Search } from "lucide-react-native";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { SearchMachineryParams } from "~/src/app/models/machinery_models";

interface Props {
  searchParams: SearchMachineryParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchMachineryParams>>;
}

const MachineSearchBar = ({ searchParams, setSearchParams }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <Search
        size={20}
        style={styles.icon}
        color={isFocused ? mainBlue : `hsl(${mutedForground})`}
      />
      <TextInput
        value={searchParams.keyword}
        onChangeText={(text) =>
          setSearchParams((prev) => ({
            ...prev,
            keyword: text,
          }))
        }
        placeholder="Tìm kiếm máy móc"
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default MachineSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
    width: "85%",
    borderWidth: 1,
    borderColor: "transparent",
    left: -40,
  },
  focused: {
    borderColor: mainBlue,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000", // Ensures readability
  },
});
