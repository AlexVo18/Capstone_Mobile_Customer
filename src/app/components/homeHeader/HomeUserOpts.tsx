import { StyleSheet, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell, ShoppingCart } from "lucide-react-native";

const HomeUserOpts = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity style={{ marginRight: 15 }}>
        <ShoppingCart size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 10 }}>
        <Bell size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeUserOpts;

const styles = StyleSheet.create({});
