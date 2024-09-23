import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  onPress: () => void;
}

const CustomBack = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={{ marginRight: 36 }}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="black"
        onPress={onPress}
      />
    </TouchableOpacity>
  );
};

export default CustomBack;

const styles = StyleSheet.create({});
