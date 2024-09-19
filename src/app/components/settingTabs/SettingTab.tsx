import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronRight, User } from "lucide-react-native";
import { mainBlue, mutedForground } from "../../constants/cssConstants";

interface Props {
  label: string;
  Icon: ReactNode;
  onPress: () => void;
  title?: string;
}

const SettingTab = ({ label, Icon, onPress, title }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View className="flex flex-row items-center gap-1">
        {Icon}
        <Text className="text-lg">{label}</Text>
      </View>
      <View className="flex flex-row items-center">
        {title ? (
          <Text className="" style={{ color: `hsl(${mutedForground})` }}>
            {title}
          </Text>
        ) : (
          <></>
        )}
        <ChevronRight size={24} color={`hsl(${mutedForground})`} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingTab;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#808080",
  },
});
