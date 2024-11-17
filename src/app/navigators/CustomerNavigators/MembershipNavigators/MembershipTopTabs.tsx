import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import { mainBlue } from "~/src/app/constants/cssConstants";
import MembershipTiers from "~/src/app/screens/Customer/MembershipScreens/MembershipTiers";
import MembershipLogs from "~/src/app/screens/Customer/MembershipScreens/MembershipLogs";
import { Dimensions } from "react-native";

export type MembershipTopTabParamList = {
  MembershipTiers: undefined;
  MembershipLogs: undefined;
};

export type MembershipTiersProps = MaterialTopTabScreenProps<
  MembershipTopTabParamList,
  "MembershipTiers"
>;
export type MembershipLogsProps = MaterialTopTabScreenProps<
  MembershipTopTabParamList,
  "MembershipLogs"
>;

const MembershipTopTabs = () => {
  const Tab = createMaterialTopTabNavigator<MembershipTopTabParamList>();
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
        // tabBarItemStyle: { width: 130 },
      }}
      initialLayout={{
        width: Dimensions.get("window").width,
      }}
    >
      <Tab.Screen
        name="MembershipTiers"
        component={MembershipTiers}
        options={{
          tabBarLabel: "Quyền lợi khách hàng",
        }}
      />
      <Tab.Screen
        name="MembershipLogs"
        component={MembershipLogs}
        options={{
          tabBarLabel: "Hành trình hiện tại",
        }}
      />
    </Tab.Navigator>
  );
};

export default MembershipTopTabs;
