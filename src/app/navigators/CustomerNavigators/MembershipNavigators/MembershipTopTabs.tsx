import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabScreenProps,
} from "@react-navigation/material-top-tabs";
import MembershipTiers from "~/src/app/screens/Customer/MembershipScreens/MembershipTiers";
import UserMembership from "~/src/app/screens/Customer/MembershipScreens/UserMembership";

export type MembershipTopTabParamList = {
  MembershipTiers: undefined;
  UserMembership: undefined;
};

export type MembershipTiersProps = MaterialTopTabScreenProps<
  MembershipTopTabParamList,
  "MembershipTiers"
>;
export type UserMembershipProps = MaterialTopTabScreenProps<
  MembershipTopTabParamList,
  "UserMembership"
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
          tabBarLabel: "Thông tin quyền lợi",
          tabBarLabelStyle: {
            textAlign: "center",
          },
        }}
      />
      <Tab.Screen
        name="UserMembership"
        component={UserMembership}
        options={{
          tabBarLabel: "Nhật kí thành viên",
          tabBarLabelStyle: {
            textAlign: "center",
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MembershipTopTabs;
