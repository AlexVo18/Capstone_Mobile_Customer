import React, { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell } from "lucide-react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import useAuth from "~/src/app/hooks/useAuth";
import Notification from "~/src/app/api/notification/Notification";
import { NotificationData } from "~/src/app/models/notification_models";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const BellToggler = ({ style }: Props) => {
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
    <TouchableOpacity
      onPress={() => navigation.navigate("UserNotification")}
      style={[style, styles.container]}
    >
      <Bell size={24} color={"black"} className="" />
      {hasUnreadNoti && (
        <View className="h-4 w-4 bg-red-600 rounded-full absolute -top-1 -right-1 flex items-center justify-center">
          <View className="h-1 w-1 bg-white rounded-full "></View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BellToggler;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
