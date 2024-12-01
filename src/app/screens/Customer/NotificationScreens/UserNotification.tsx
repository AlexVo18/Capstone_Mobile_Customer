import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { NotificationData } from "~/src/app/models/notification_models";
import { useFocusEffect } from "@react-navigation/native";
import Notification from "~/src/app/api/notification/Notification";
import useAuth from "~/src/app/hooks/useAuth";
import Toast from "react-native-toast-message";
import { listErrorMsg } from "~/src/app/constants/toastMessage";
import { Bell } from "lucide-react-native";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import NotificationList from "~/src/app/components/Customer/NotificationScreen/NotificationList";
import { UserNotificationScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";

const UserNotification = ({
  navigation,
  route,
}: UserNotificationScreenProps) => {
  const { userInfo } = useAuth();
  const [allList, setAllList] = useState<NotificationData[]>([]);
  const [displayList, setDisplayList] = useState<NotificationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);
  const itemsPerPage = 10;

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [])
  );

  const getNotifications = async () => {
    setIsLoading(true);
    try {
      if (userInfo) {
        const response = await Notification.getUserNotifications(
          userInfo.accountId
        );
        if (response) {
          setAllList(response);
          setDisplayList(response.slice(0, itemsPerPage));
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: listErrorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);

      pageRef.current += 1;
      setDisplayList(allList.slice(0, itemsPerPage * pageRef.current));

      setIsLoadingMore(false);
    }
  };

  return (
    <View className="bg-white" style={styles.container}>
      {isLoading ? (
        <View className="w-full h-full flex justify-center items-center">
          <ActivityIndicator color={mainBlue} size={"large"} />
        </View>
      ) : displayList.length !== 0 ? (
        <NotificationList
          displayList={displayList}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          userNotificationScreenProps={{ navigation, route }}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <Bell color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có thông báo nào cả
          </Text>
        </View>
      )}
    </View>
  );
};

export default UserNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
