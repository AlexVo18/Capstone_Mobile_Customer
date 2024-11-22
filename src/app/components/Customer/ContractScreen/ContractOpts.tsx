import { StyleSheet, Text, View } from "react-native";
import React from "react";
interface Props {
    onToggle: () => void;
  }

const ContractOpts = ({ onToggle }: Props) => {
  return (
    <View>
      <Text>ContractOpts</Text>
    </View>
  );
};

export default ContractOpts;

const styles = StyleSheet.create({});
