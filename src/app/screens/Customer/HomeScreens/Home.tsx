import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React from "react";
import Banner from "~/src/app/components/Customer/HomeScreen/Banner";
import AllMachineries from "~/src/app/components/Customer/HomeScreen/AllMachineries";
import { ScrollView } from "react-native-gesture-handler";
import { HomeScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";

const Home = ({ route, navigation }: HomeScreenProps) => {
  return (
    <ScrollView style={styles.container} className="bg-white ">
      <Banner />
      <View>
        <Text>Slider</Text>
      </View>
      <AllMachineries navigation={navigation} route={route} />

    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 0,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
  },
});
