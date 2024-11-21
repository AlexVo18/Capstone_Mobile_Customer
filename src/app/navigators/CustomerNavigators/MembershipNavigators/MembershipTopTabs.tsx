import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import MembershipTiers from "~/src/app/screens/Customer/MembershipScreens/MembershipTiers";
import MembershipLogs from "~/src/app/screens/Customer/MembershipScreens/MembershipLogs";

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
        tabBarContentContainerStyle: {
          justifyContent: "space-around",
        },
      }}
    >
      <Tab.Screen
        name="MembershipTiers"
        component={MembershipTiers}
        options={{
          tabBarLabel: "Quyền lợi khách hàng",
          tabBarLabelStyle: {
            textAlign: "center",
          },
        }}
      />
      <Tab.Screen
        name="MembershipLogs"
        component={MembershipLogs}
        options={{
          tabBarLabel: "Hành trình hiện tại",
          tabBarLabelStyle: {
            textAlign: "center",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MembershipTopTabs;
