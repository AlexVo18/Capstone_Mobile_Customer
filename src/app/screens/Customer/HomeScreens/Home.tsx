import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Banner from "~/src/app/components/Customer/HomeScreen/Banner";
import { HomeScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import LatestMachineries from "~/src/app/components/Customer/HomeScreen/LatestMachineries";
import { TouchableOpacity } from "react-native-gesture-handler";

const Home = ({ route, navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <LatestMachineries
        navigation={navigation}
        route={route}
        ListHeaderComponent={
          <View>
            <Banner />
            <View>
              <Text>Slider</Text>
            </View>
            <View className="w-full flex flex-row justify-between px-5">
              <Text className="text-xl font-bold">Các sản phẩm của shop</Text>
              <TouchableOpacity
                onPress={() => navigation.getParent()?.navigate("Collection")}
              >
                <Text className="text-blue-700">Xem tất cả</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
