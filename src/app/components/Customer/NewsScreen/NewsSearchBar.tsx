import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { cn } from "~/src/app/utils/cn";
import { Search } from "lucide-react-native";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const NewsSearchBar = ({ keyword, setKeyword }: Props) => {
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
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
        className="w-full text-lg pl-1"
        placeholder="Tìm kiếm tin tức"
        style={{
          flex: 1,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default NewsSearchBar;

const styles = StyleSheet.create({});
