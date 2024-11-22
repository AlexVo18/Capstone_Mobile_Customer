import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import CustomerTabs from "./CustomerTabs";
import MachineDetail from "../../screens/Customer/MachineScreens/MachineDetail";
import Profile from "../../screens/Customer/ProfileScreens/Profile";
import UserInvoice from "../../screens/Customer/InvoiceScreens/UserInvoice";
import NewAddress from "../../screens/Customer/AddressScreens/NewAddress";
import NewsDetail from "../../screens/Customer/NewsScreens/NewsDetail";
import { mainBlue } from "../../constants/cssConstants";
import MachineImagesSlide from "../../screens/Customer/MachineScreens/MachineImagesSlide";
import { MachineryImageData } from "../../models/machinery_models";
import DetailOpts from "../../components/Customer/DetailScreen/DetailOpts";
import Collection from "../../screens/Customer/MachineScreens/Collection";
import UserAddress from "../../screens/Customer/AddressScreens/UserAddress";
import EditAddress from "../../screens/Customer/AddressScreens/EditAddress";
import { AddressData } from "../../models/address_models";
import MembershipTopTabs from "./MembershipNavigators/MembershipTopTabs";
import ChangePassword from "../../screens/Customer/ProfileScreens/ChangePassword";
import SystemTerms from "../../screens/Customer/TermScreens/SystemTerms";

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

  // Profile
  Profile: undefined;
  ChangePassword: undefined;

  // Địa chỉ
  EditAddress: { chosenAddress: AddressData };
  NewAddress: undefined;
  UserAddress: undefined;

  // Thanh toán
  UserInvoice: undefined;

  // Đơn hàng

  // Yêu cầu sửa chữa

  // Hợp đồng

  // Quyền lợi
  MembershipTopTabs: undefined;

  // Điều khoản
  SystemTerms: undefined;
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

// Địa chỉ
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

// Profile
export type ProfileScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Profile"
>;
export type ChangePasswordScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "ChangePassword"
>;

// Thanh toán
export type UserInvoiceScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserInvoice"
>;

// Quyền lợi
export type MembershipTopTabsProps = NativeStackScreenProps<
  CustomerStackParamList,
  "MembershipTopTabs"
>;

// Terms
export type SystemTermsScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "SystemTerms"
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

      {/* Quyền lợi */}
      <Stack.Screen
        name="MembershipTopTabs"
        component={MembershipTopTabs}
        options={{ headerTitle: "Quyền lợi khách hàng" }}
      />

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
      <Stack.Screen name="UserInvoice" component={UserInvoice} />
      

      {/* Chính sách */}
      <Stack.Screen
        name="SystemTerms"
        component={SystemTerms}
        options={{ headerTitle: "Chính sách quy định" }}
      />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
