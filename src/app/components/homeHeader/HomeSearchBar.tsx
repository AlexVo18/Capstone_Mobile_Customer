import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Search } from "lucide-react-native";
import { TextInput } from "react-native-gesture-handler";
import { mainBlue, mutedForground } from "../../constants/cssConstants";
import { cn } from "../../utils/cn";

const HomeSearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      className={cn([
        `w-80 flex flex-row h-2 items-center relative px-[10px] my-[10px] rounded-lg `,
        isFocused ? "border-[1px] border-blue-700" : "",
      ])}
      style={{
        flex: 1,
        backgroundColor: "#f0f0f0",
      }}
    >
      <Search
        className="absolute "
        color={isFocused ? mainBlue : `hsl(${mutedForground})`}
        size={20}
      />
      <TextInput
        className="w-full text-lg pl-1"
        placeholder="Tìm kiếm máy"
        style={{
          flex: 1,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default HomeSearchBar;

const styles = StyleSheet.create({});
