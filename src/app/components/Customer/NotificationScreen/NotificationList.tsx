import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NotificationData } from "~/src/app/models/notification_models";
import { UserNotificationScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { dataErrorMsg } from "~/src/app/constants/toastMessage";
import Toast from "react-native-toast-message";
import Notification from "~/src/app/api/notification/Notification";
import ReplacementTicket from "~/src/app/api/replacementTicket/ReplacementTicket";
import { ComponentReplacementTicketData } from "~/src/app/models/replacementTicket_models";
import { Receipt, TicketX, Truck, Wrench } from "lucide-react-native";
import { formatDate } from "~/src/app/utils/dateformat";
import { formatTime } from "~/src/app/utils/formatTime";
import { cn } from "~/src/app/utils/cn";

interface Props {
  displayList: NotificationData[];
  userNotificationScreenProps: UserNotificationScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
}

const NotificationList = ({
  displayList,
  userNotificationScreenProps,
  handleLoadMore,
  isLoadingMore,
}: Props) => {
  const handleToggleNoti = async (noti: NotificationData) => {
    try {
      const response = await Notification.updateNotiStatus(noti.notificationId);
      if (response.status === 204) {
        switch (noti.notificationType) {
          case "MachineCheckRequest":
            userNotificationScreenProps.navigation.navigate(
              "CheckRequestDetail",
              { machineCheckRequestId: noti.detailId }
            );
            break;
          case "Invoice":
            userNotificationScreenProps.navigation.navigate("InvoiceDetail", {
              invoiceId: noti.detailId,
            });
            break;
          case "DeliveryTask":
            userNotificationScreenProps.navigation.navigate("DeliveryDetail", {
              deliveryTaskId: Number(noti.detailId),
            });
            break;
          case "ComponentReplacementTicket":
            const ticketRes = await ReplacementTicket.getTicketDetail(
              noti.detailId
            );
            const ticket =
              ticketRes.componentReplacementTicket as ComponentReplacementTicketData;
            userNotificationScreenProps.navigation.navigate("InvoiceDetail", {
              invoiceId: ticket.invoiceId,
            });
            break;
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: dataErrorMsg,
      });
    }
  };

  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.notificationId.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            style={{ marginHorizontal: 15 }}
            onPress={() => handleToggleNoti(item)}
          >
            <View style={[styles.card, styles.elevation]} className="p-[10px] ">
              <View className="flex flex-row gap-2">
                <View className="items-start justify-start relative p-2">
                  {item.notificationType === "MachineCheckRequest" ? (
                    <Wrench size={28} color={mainBlue} />
                  ) : item.notificationType === "Invoice" ? (
                    <Receipt size={28} color={mainBlue} />
                  ) : item.notificationType === "DeliveryTask" ? (
                    <Truck size={28} color={mainBlue} />
                  ) : item.notificationType === "ComponentReplacementTicket" ? (
                    <TicketX size={28} color={mainBlue} />
                  ) : (
                    ""
                  )}
                </View>
                <View style={{ flex: 1 }} className="flex justify-between">
                  <View>
                    <Text className="line-clamp-2 italic text-muted-foreground">
                      {item.notificationTitle}
                    </Text>
                  </View>
                  <View>
                    <Text className="text-base">
                      {item.messageNotification}
                    </Text>
                  </View>
                </View>
                <View className="items-center justify-center relative p-2">
                  <View
                    className={cn(
                      "h-3 w-3  rounded-full",
                      item.status.toLowerCase() === "read"
                        ? "bg-transparent"
                        : "bg-blue-700"
                    )}
                  ></View>
                </View>
              </View>
              <View className="flex justify-end flex-row items-center mt-2">
                <Text>
                  Ngày tạo:{" "}
                  <Text className="text-muted-foreground">
                    {formatDate(item.dateCreate)} -{" "}
                    {formatTime(item.dateCreate)}
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoadingMore ? (
          <ActivityIndicator size="large" color={mainBlue} />
        ) : null
      }
      ListEmptyComponent={<Text>Không còn yêu cầu thuê nào</Text>}
    />
  );
};

export default NotificationList;

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: mutedForground,
    flexShrink: 1,
    flexWrap: "wrap",
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
  tagPosition: {
    bottom: 0,
    right: -20,
    position: "absolute",
  },
});
