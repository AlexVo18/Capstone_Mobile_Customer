import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MachineImagesSlideScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";

const MachineImagesSlide = ({ route }: MachineImagesSlideScreenProps) => {
  const { imagesList, chosenIndex } = route.params;

  return (
    <View>
      <Text>MachineImagesSlide</Text>
    </View>
  );
};

export default MachineImagesSlide;

const styles = StyleSheet.create({});
