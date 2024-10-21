import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProductImagesSlideScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";

const ProductImagesSlide = ({ route }: ProductImagesSlideScreenProps) => {
  const { imagesList, chosenIndex } = route.params;

  return (
    <View>
      <Text>ProductImagesSlide</Text>
    </View>
  );
};

export default ProductImagesSlide;

const styles = StyleSheet.create({});
