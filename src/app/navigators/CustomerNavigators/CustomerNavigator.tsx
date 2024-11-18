import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import CustomerTabs from "./CustomerTabs";
import MachineDetail from "../../screens/Customer/MachineScreens/MachineDetail";
import Cart from "../../screens/Customer/CartScreens/Cart";
import UserTiers from "../../screens/Customer/PromotionScreens/UserTiers";
import Profile from "../../screens/Customer/ProfileScreens/Profile";
import TransactionHistory from "../../screens/Customer/TransactionScreens/TransactionHistory";
import NewAddress from "../../screens/Customer/ProfileScreens/AddressScreens/NewAddress";
import NewsDetail from "../../screens/Customer/NewsScreens/NewsDetail";
import { mainBlue } from "../../constants/cssConstants";
import MachineImagesSlide from "../../screens/Customer/MachineScreens/MachineImagesSlide";
import { MachineryImageData } from "../../models/machinery_models";
import DetailOpts from "../../components/Customer/DetailScreen/DetailOpts";
import Collection from "../../screens/Customer/MachineScreens/Collection";
import UserAddress from "../../screens/Customer/ProfileScreens/AddressScreens/UserAddress";
import EditAddress from "../../screens/Customer/ProfileScreens/AddressScreens/EditAddress";
import { AddressData } from "../../models/address_models";
import MembershipTopTabs from "./MembershipNavigators/MembershipTopTabs";
import ChangePassword from "../../screens/Customer/ProfileScreens/ChangePassword";

export type CustomerStackParamList = {
  // Tabs
  CustomerTabs: undefined;
  // Tin tức
  NewsDetail: {
    contentId: number;
    headerTintColor?: string;
    headerBackgroundColor?: string;
  };
  // Máy móc
  Collection: undefined;
  MachineDetail: {
    machineId: number;
    headerTintColor?: string;
    headerBackgroundColor?: string;
  };
  MachineImagesSlide: { imagesList: MachineryImageData[]; chosenIndex: number };

  Cart: undefined;
  // Profile
  Profile: undefined;
  ChangePassword: undefined;

  // Địa chỉ
  EditAddress: { chosenAddress: AddressData };
  NewAddress: undefined;
  UserAddress: undefined;

  // Thanh toán

  // Đơn hàng

  // Yêu cầu sửa chữa

  // Hợp đồng

  UserTiers: undefined;
  TransactionHistory: undefined;

  // Quyền lợi
  MembershipTopTabs: undefined;

  // Điều khoản
};

// Tabs
export type CustomerTabsScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "CustomerTabs"
>;

// Tin tức
export type NewsDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "NewsDetail"
>;

// Máy móc
export type MachineDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "MachineDetail"
>;
export type CollectionScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Collection"
>;
export type MachineImagesSlideScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "MachineImagesSlide"
>;
export type CartScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Cart"
>;
export type UserTiersScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserTiers"
>;
export type UserAddressScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserAddress"
>;
export type EditAddressScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "EditAddress"
>;
export type NewAddressScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "NewAddress"
>;
export type ProfileScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Profile"
>;
export type ChangePasswordScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "ChangePassword"
>;
export type TransactionHistoryScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "TransactionHistory"
>;

export type MembershipTopTabsProps = NativeStackScreenProps<
  CustomerStackParamList,
  "MembershipTopTabs"
>;

const CustomerNavigator = () => {
  const Stack = createNativeStackNavigator<CustomerStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CustomerTabs"
        component={CustomerTabs}
        options={{ headerShown: false }}
      />
      {/* Máy móc */}
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen
        name="MachineDetail"
        component={MachineDetail}
        options={({ route }) => ({
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: route.params?.headerTintColor || "white",
          headerStyle: {
            backgroundColor:
              route.params?.headerBackgroundColor || "rgba(128, 128, 128, 0.3)",
          },
          headerRight: () => (
            <DetailOpts color={route.params?.headerTintColor || "white"} />
          ),
        })}
      />
      <Stack.Screen
        name="MachineImagesSlide"
        component={MachineImagesSlide}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: mainBlue,
          headerStyle: {
            backgroundColor: "rgba(128, 128, 128, 0.3)",
          },
          // headerRight: () => <DetailOpts />,
        }}
      />
      {/* Tin tức */}
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={({ route }) => ({
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: route.params?.headerTintColor || "white",
          headerStyle: {
            backgroundColor:
              route.params?.headerBackgroundColor || "rgba(128, 128, 128, 0.3)",
          },
          headerRight: () => (
            <DetailOpts color={route.params?.headerTintColor || "white"} />
          ),
        })}
      />

      {/* Giỏ hàng */}
      <Stack.Screen name="Cart" component={Cart} />
      {/* Voucher và khuyến mãi */}
      <Stack.Screen name="UserTiers" component={UserTiers} />
      <Stack.Screen name="MembershipTopTabs" component={MembershipTopTabs} />
      {/* Địa chỉ */}
      <Stack.Screen
        name="UserAddress"
        component={UserAddress}
        options={{ headerTitle: "Địa chỉ của bạn" }}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddress}
        options={{ headerTitle: "Cập nhật địa chỉ" }}
      />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      {/* Hồ sơ */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      {/* Giao dịch */}
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      {/* Chính sách */}
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
