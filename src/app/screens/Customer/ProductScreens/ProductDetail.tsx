import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProductDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";

const ProductDetail = ({ route }: ProductDetailScreenProps) => {
  const { productId } = route.params;
  return (
    <View>
      <Text>ProductDetail</Text>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({});
