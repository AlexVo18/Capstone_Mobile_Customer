import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell } from "lucide-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CustomerStackParamList } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Notification from "~/src/app/api/notification/Notification";
import useAuth from "~/src/app/hooks/useAuth";
import { NotificationData } from "~/src/app/models/notification_models";

interface Props {
  color: string;
}

const DetailOpts = ({ color }: Props) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<CustomerStackParamList, "UserNotification">
    >();

  const { userInfo } = useAuth();
  const [hasUnreadNoti, setHasUnreadNoti] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      getNotifications();
    }, [])
  );

  const getNotifications = async () => {
    try {
      if (userInfo) {
        const response = await Notification.getUserNotifications(
          userInfo.accountId
        );
        if (response) {
          const hasUnread = response.some(
            (noti: NotificationData) => noti.status.toLowerCase() === "send"
          );
          setHasUnreadNoti(hasUnread);
        }
      }
    } catch (error) {
      return;
    }
  };

  return (
    <View
      style={[{ flexDirection: "row", alignItems: "center" }, styles.container]}
    >
      <TouchableOpacity
        style={{ marginRight: 5 }}
        onPress={() => navigation.navigate("UserNotification")}
      >
        <Bell size={24} color={color} />
        {hasUnreadNoti && (
          <View className="h-4 w-4 bg-red-600 rounded-full absolute -top-1 -right-1 flex items-center justify-center">
            <View className="h-1 w-1 bg-white rounded-full "></View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DetailOpts;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
