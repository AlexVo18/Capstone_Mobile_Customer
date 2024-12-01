import React from "react";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Home from "../../screens/Customer/HomeScreens/Home";
import SettingOption from "../../screens/Customer/SettingScreens/SettingOption";
import { House, Newspaper, Settings } from "lucide-react-native";
import { mainBlue } from "../../constants/cssConstants";
import HomeUserOpts from "../../components/Customer/HomeScreen/homeHeader/HomeUserOpts";
import HomeSearchBar from "../../components/Customer/HomeScreen/homeHeader/HomeSearchBar";
import News from "../../screens/Customer/NewsScreens/News";

export type CustomerTabParamList = {
  Home: undefined;
  News: undefined;
  SettingOption: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<
  CustomerTabParamList,
  "Home"
>;
export type NewsScreenProps = BottomTabScreenProps<
  CustomerTabParamList,
  "News"
>;
export type SettingOptionScreenProps = BottomTabScreenProps<
  CustomerTabParamList,
  "SettingOption"
>;

const CustomerTabs = () => {
  const Tab = createBottomTabNavigator<CustomerTabParamList>();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          if (route.name === "Home") {
            return <House size={size} color={focused ? mainBlue : "#808080"} />;
          } else if (route.name === "News") {
            return (
              <Newspaper size={size} color={focused ? mainBlue : "#808080"} />
            );
          } else if (route.name === "SettingOption") {
            return (
              <Settings size={size} color={focused ? mainBlue : "#808080"} />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          tabBarLabel: "Trang chủ",
          headerTitle: () => <HomeSearchBar navigation={navigation} />,
          headerRight: () => <HomeUserOpts />,
        })}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: "Tin tức",
          headerRight: () => <HomeUserOpts />,
        }}
      />
      <Tab.Screen
        name="SettingOption"
        component={SettingOption}
        options={{
          tabBarLabel: "Cài đặt",
          headerRight: () => <HomeUserOpts />,
          headerTitle: "Cài đặt",
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerTabs;
