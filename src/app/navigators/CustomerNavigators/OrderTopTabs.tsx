import { View, Text } from "react-native";
import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import NoPaymentOrder from "../../screens/Customer/OrderScreens/NoPaymentOrder";
import DeliveringOrder from "../../screens/Customer/OrderScreens/DeliveringOrder";
import CurrentOrder from "../../screens/Customer/OrderScreens/CurrentOrder";
import OrderHistory from "../../screens/Customer/OrderScreens/OrderHistory";
import CancelOrder from "../../screens/Customer/OrderScreens/CancelOrder";
import { mainBlue } from "../../constants/cssConstants";

export type OrderTopTabParamList = {
  NoPaymentOrder: undefined;
  DeliveringOrder: undefined;
  CurrentOrder: undefined;
  OrderHistory: undefined;
  CancelOrder: undefined;
};

export type NoPaymentOrderProps = MaterialTopTabScreenProps<
  OrderTopTabParamList,
  "NoPaymentOrder"
>;
export type DeliveringOrderProps = MaterialTopTabScreenProps<
  OrderTopTabParamList,
  "DeliveringOrder"
>;
export type CurrentOrderProps = MaterialTopTabScreenProps<
  OrderTopTabParamList,
  "CurrentOrder"
>;
export type OrderHistoryProps = MaterialTopTabScreenProps<
  OrderTopTabParamList,
  "OrderHistory"
>;
export type CancelOrderProps = MaterialTopTabScreenProps<
  OrderTopTabParamList,
  "CancelOrder"
>;

const OrderTopTabs = () => {
  const Tab = createMaterialTopTabNavigator<OrderTopTabParamList>();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: mainBlue,
        },
        tabBarLabelStyle: {
          textTransform: "none",
        },
        tabBarItemStyle: { width: 130 },
      }}
    >
      <Tab.Screen
        name="NoPaymentOrder"
        component={NoPaymentOrder}
        options={{
          tabBarLabel: "Chờ thanh toán",
        }}
      />
      <Tab.Screen
        name="DeliveringOrder"
        component={DeliveringOrder}
        options={{
          tabBarLabel: "Đang vận chuyển",
        }}
      />
      <Tab.Screen
        name="CurrentOrder"
        component={CurrentOrder}
        options={{
          tabBarLabel: "Đang thuê",
        }}
      />
      <Tab.Screen
        name="OrderHistory"
        component={OrderHistory}
        options={{
          tabBarLabel: "Lịch sử",
        }}
      />
      <Tab.Screen
        name="CancelOrder"
        component={CancelOrder}
        options={{
          tabBarLabel: "Đã hủy",
        }}
      />
    </Tab.Navigator>
  );
};

export default OrderTopTabs;
