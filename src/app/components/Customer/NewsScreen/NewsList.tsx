import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { NewsData } from "~/src/app/models/news_models";
import { NewsScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ActivityIndicator } from "react-native-paper";
import { formatDate } from "~/src/app/utils/dateformat";

interface Props {
  displayList: NewsData[];
  newsScreenProps: NewsScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
}

const NewsList = ({
  displayList,
  newsScreenProps,
  handleLoadMore,
  isLoadingMore,
}: Props) => {
  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.contentId.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ marginHorizontal: 15 }}
          onPress={() =>
            newsScreenProps.navigation
              .getParent()
              ?.navigate("NewsDetail", { contentId: item.contentId })
          }
        >
          <View
            style={[styles.card, styles.elevation]}
            className="p-[10px] flex flex-row gap-2"
          >
            <View className="items-center justify-center relative">
              <Image
                src={item.imageUrl}
                alt=""
                className="h-40 w-40 rounded-lg"
              />
            </View>
            <View style={{ flex: 1 }} className="flex justify-between">
              <View>
                <Text className="line-clamp-2 font-semibold text-xl">
                  {item.title}
                </Text>
                <Text style={styles.description} className="line-clamp-3">
                  {item.summary}
                </Text>
              </View>
              <View className="flex justify-end flex-row items-center">
                <Text style={[styles.description, { color: mutedForground }]}>
                  Ngày đăng: {formatDate(item.dateCreate)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoadingMore ? (
          <ActivityIndicator size="large" color={mainBlue} />
        ) : null
      }
      ListEmptyComponent={<Text>Không còn tin tức</Text>}
    />
  );
};

export default NewsList;

const styles = StyleSheet.create({
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
