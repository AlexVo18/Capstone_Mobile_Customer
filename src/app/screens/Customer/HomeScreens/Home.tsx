import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useRef, useState } from "react";
import Banner from "~/src/app/components/Customer/HomeScreen/Banner";
import AllMachineries from "~/src/app/components/Customer/HomeScreen/AllMachineries";
import { ScrollView } from "react-native-gesture-handler";
import { HomeScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import { NewsData } from "~/src/app/models/news_models";

const Home = ({ route, navigation }: HomeScreenProps) => {
  const [allList, setAllList] = useState<NewsData[]>([]);
  const [filteredList, setFilteredList] = useState<NewsData[]>([]);
  const [displayList, setDisplayList] = useState<NewsData[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);

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
