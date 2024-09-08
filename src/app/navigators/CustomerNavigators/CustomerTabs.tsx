import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Customer/HomeScreens/Home";
import Order from "../../screens/Customer/OrderScreens/Order";
import SettingOption from "../../screens/Customer/ProfileScreens/SettingOption";

const CustomerTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="order" component={Order} />
      <Tab.Screen name="settingOption" component={SettingOption} />
    </Tab.Navigator>
  );
};

export default CustomerTabs;
