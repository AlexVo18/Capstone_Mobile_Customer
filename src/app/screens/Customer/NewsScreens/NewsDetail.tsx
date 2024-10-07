import React, { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import { WebView } from "react-native-webview";
import { NewsDetailScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import Toast from "react-native-toast-message";
import Content from "~/src/app/api/content/Content";
import { formatDate } from "~/src/app/utils/dateformat";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { NewsData } from "~/src/app/models/news_models";

const NewsDetail = ({ route }: NewsDetailScreenProps) => {
  const { contentId } = route.params;
  const [news, setNews] = useState<NewsData>();
  const [isLoading, setIsLoading] = useState(true);
  const [webViewHeight, setWebViewHeight] = useState(0);

  useEffect(() => {
    getNewsDetail();
  }, []);

  const getNewsDetail = async () => {
    try {
      const response = await Content.getContentDetail(contentId);
      if (response) {
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

  const webViewRef = useRef(null);

  const injectedJavaScript = `
    setTimeout(function() {
      const height = document.documentElement.scrollHeight;
      window.ReactNativeWebView.postMessage(height);
    }, 500);
    true;
  `;

  const handleWebViewMessage = (event: any) => {
    setWebViewHeight(Number(event.nativeEvent.data));
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
          <Text className="text-gray-500">
            Ngày đăng: {news?.dateCreate && formatDate(news.dateCreate)}
          </Text>
        </View>
        <Text className="font-semibold">{news?.summary}</Text>

        {news?.contentBody ? (
          <WebView
            ref={webViewRef}
            originWhitelist={["*"]}
            source={{
              html: `
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                      body { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; margin: 0; padding: 10px; }
                      p { font-size: 16px; }
                    </style>
                  </head>
                  <body>
                    <p>${news.contentBody}</p>
                  </body>
                </html>
              `,
            }}
            style={{ height: webViewHeight, marginTop: 20 }}
            injectedJavaScript={injectedJavaScript}
            onMessage={handleWebViewMessage}
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
