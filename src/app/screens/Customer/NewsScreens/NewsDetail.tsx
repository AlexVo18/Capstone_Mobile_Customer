import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NewsDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { ScrollView } from "react-native-gesture-handler";
import { NewsData } from "~/src/app/models/news_models";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import Content from "~/src/app/api/content/Content";
import Toast from "react-native-toast-message";
import { formatDate } from "~/src/app/utils/dateformat";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const NewsDetail = ({ route }: NewsDetailScreenProps) => {
  const { contentId } = route.params;
  const [news, setNews] = useState<NewsData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNewsDetail();
  }, []);

  const getNewsDetail = async () => {
    try {
      const response = await Content.getContentDetail(contentId);
      if (response) {
        console.log(response);
        setNews(response);
      }
    } catch (error) {
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

  return isLoading ? (
    <View className="w-full h-full justify-center items-center">
      <ActivityIndicator color={mainBlue} size="large" />
    </View>
  ) : (
    <ScrollView className="bg-white">
      <Image
        src={news?.imageUrl}
        alt="Hình tin tức"
        className="w-full h-[350px] rounded-b-lg"
      />
      <View className="p-5">
        <Text className="text-2xl font-semibold">{news?.title}</Text>
        <View className="flex justify-end w-full items-end">
          <Text style={{ color: `hsl(${mutedForground})` }}>
            Ngày đăng: {news?.dateCreate && formatDate(news.dateCreate)}
          </Text>
        </View>
        <Text className="font-semibold">{news?.summary}</Text>
        {news?.contentBody ? (
          <WebView
            originWhitelist={["*"]}
            source={{
              html: `
                <html>
                  <head>
                   <title>Web View</title>
                   <meta http-equiv="content-type" content="text/html; charset=utf-8">
                   <meta name="viewport" content="width=device-width user-scalable=no">
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        font-size: 16px; /* Adjust base font size */
                        line-height: 1.5;
                        margin: 0;
                        padding: 0;
                      }
                      p {
                        font-size: 16px; /* Paragraph size */
                      }
                    </style>
                  </head>
                  <body>
                    <p>${news.contentBody}</p>
                  </body>
                </html>
              `,
            }}
            style={{ minHeight: 330, marginTop: 20 }}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator color={mainBlue} size="large" />
            )}
          />
        ) : (
          <Text>No content available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({});
