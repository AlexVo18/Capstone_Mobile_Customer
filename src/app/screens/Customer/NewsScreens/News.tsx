import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Content from "~/src/app/api/content/Content";
import { NewsData } from "~/src/app/models/news_models";
import { newsList } from "~/src/app/data/newsList";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { NewsScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import NewsSearchBar from "~/src/app/components/Customer/NewsScreen/newsHeader/NewsSearchBar";
import { Newspaper } from "lucide-react-native";
import NewsList from "~/src/app/components/Customer/NewsScreen/NewsList";
import { useDebounce } from "~/src/app/hooks/useDebounce";

const News = ({ navigation, route }: NewsScreenProps) => {
  const [allList, setAllList] = useState<NewsData[]>([]);
  const [filteredList, setFilteredList] = useState<NewsData[]>([]);
  const [displayList, setDisplayList] = useState<NewsData[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);
  // const debouncedKeyword = useDebounce(keyword);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <NewsSearchBar keyword={keyword} setKeyword={setKeyword} />
      ),
    });
  }, [navigation, keyword]);

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    filterNews();
  }, [keyword, allList]);

  const getNews = async () => {
    try {
      const response = await Content.getContent();
      if (response) {
        setAllList(response);
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Lấy thông tin thất bại",
        text2: "Đã có vấn đề xảy ra",
        visibilityTime: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Tăng số lượng trang
  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);

      pageRef.current += 1;
      setDisplayList(filteredList.slice(0, 10 * pageRef.current));

      setIsLoadingMore(false);
    }
  };

  const filterNews = () => {
    let filtered = allList;
    if (keyword) {
      filtered = filtered.filter(
        (news) =>
          news.title.toLowerCase().includes(keyword.toLowerCase()) ||
          news.summary.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Lấy lại 10 item đầu
    pageRef.current = 1;
    setFilteredList(filtered); // List đã filter ban đầu
    setDisplayList(filtered.slice(0, 10)); // List sẽ được hiện
  };

  return (
    <View style={styles.container} className="bg-white ">
      {isLoading ? (
        <View className="py-5">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : displayList.length !== 0 ? (
        <NewsList
          displayList={displayList}
          newsScreenProps={{ navigation, route }}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <Newspaper color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có tin tức nào cả
          </Text>
        </View>
      )}
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: mutedForground,
  },
  description: {
    fontSize: 14,
    color: mutedForground,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
