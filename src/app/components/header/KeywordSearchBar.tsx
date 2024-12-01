import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { Search } from "lucide-react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const KeywordSearchBar = ({ keyword, setKeyword }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={[styles.container, isFocused && styles.focused]}>
      <Search
        size={20}
        style={styles.icon}
        color={isFocused ? mainBlue : `hsl(${mutedForground})`}
      />
      <TextInput
        value={keyword}
        onChangeText={(text) => setKeyword(text)}
        placeholder="Tìm kiếm từ khóa"
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default KeywordSearchBar;

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
