import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  CustomerMemberShip,
  MembershipLog,
} from "~/src/app/models/membership_models";
import { UserMembershipProps } from "~/src/app/navigators/CustomerNavigators/MembershipNavigators/MembershipTopTabs";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList } from "react-native-gesture-handler";
import { Clock, FileClock } from "lucide-react-native";
import { formatDate } from "~/src/app/utils/dateformat";
import { formatTime } from "~/src/app/utils/formatTime";

interface Props extends UserMembershipProps {
  ListHeaderComponent: React.ReactElement;
  displayList: MembershipLog[];
  isLoading: boolean;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
}

const MemberShipLog = ({
  ListHeaderComponent,
  displayList,
  isLoading,
  handleLoadMore,
  isLoadingMore,
}: Props) => {
  return (
    <View>
      {isLoading ? (
        <View className="py-5">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : displayList.length !== 0 ? (
        <FlatList
          data={displayList}
          keyExtractor={(item) => item.membershipRankLogId.toString()}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={({ item }) => {
            return (
              <View className="p-2 border-y-[0.5px] border-gray-400 flex flex-row items-center gap-2">
                <Clock color={`hsl(${mutedForground})`} size={20} />
                <View>
                  <Text>{item.action}</Text>
                  <Text className="text-muted-foreground">
                    {formatDate(item.dateCreate)}, {formatTime(item.dateCreate)}
                  </Text>
                </View>
              </View>
            );
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isLoadingMore ? (
              <ActivityIndicator size="large" color={mainBlue} />
            ) : null
          }
          ListEmptyComponent={<Text>Không còn log nào cả</Text>}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <FileClock color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Chưa có thông tin chi tiêu nào cả,
          </Text>
        </View>
      )}
    </View>
  );
};

export default MemberShipLog;

const styles = StyleSheet.create({});
