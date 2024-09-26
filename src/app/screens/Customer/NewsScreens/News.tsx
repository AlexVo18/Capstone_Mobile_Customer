import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Content from "~/src/app/api/content/Content";

const News = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const response = await Content.getContent();

    } catch (error) {
      console.log(error)
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

  return (
    <ScrollView style={styles.container} className="bg-white ">
      <View></View>
    </ScrollView>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
