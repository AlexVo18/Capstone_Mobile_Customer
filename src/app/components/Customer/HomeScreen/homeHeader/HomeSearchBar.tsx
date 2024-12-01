import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Search } from "lucide-react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "../../../../constants/cssConstants";
import { CustomerTabParamList } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface Props {
  navigation: BottomTabNavigationProp<CustomerTabParamList, "Home">;
}

const HomeSearchBar = ({ navigation }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TouchableOpacity
      style={[
        styles.input,
        isFocused ? { borderColor: mainBlue, borderWidth: 1 } : {},
      ]}
      onPress={() => navigation.getParent()?.navigate("Collection")}
    >
      <Search
        style={styles.searchIcon}
        color={isFocused ? mainBlue : `hsl(${mutedForground})`}
        size={20}
      />
      <TextInput
        placeholder="Tìm kiếm máy"
        style={styles.textInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={false}
      />
    </TouchableOpacity>
  );
};

export default HomeSearchBar;

const styles = StyleSheet.create({
  input: {
    width: 280,
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    position: "relative",
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
  },
  searchIcon: {
    position: "absolute",
    left: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 34,
  },
});
