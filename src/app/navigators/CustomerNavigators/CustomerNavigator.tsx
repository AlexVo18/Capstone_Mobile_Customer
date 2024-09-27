import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import CustomerTabs from "./CustomerTabs";
import ProductDetail from "../../screens/Customer/ProductScreens/ProductDetail";
import Cart from "../../screens/Customer/CartScreens/Cart";
import UserTiers from "../../screens/Customer/PromotionScreens/UserTiers";
import Address from "../../screens/Customer/ProfileScreens/AddressScreens/Address";
import Profile from "../../screens/Customer/ProfileScreens/Profile";
import UserReview from "../../screens/Customer/ProfileScreens/UserReview";
import TransactionHistory from "../../screens/Customer/TransactionScreens/TransactionHistory";
import VouchersWallet from "../../screens/Customer/PromotionScreens/VouchersWallet";
import NewAddress from "../../screens/Customer/ProfileScreens/AddressScreens/NewAddress";
import NewsDetail from "../../screens/Customer/NewsScreens/NewsDetail";

export type CustomerStackParamList = {
  CustomerTabs: undefined;
  NewsDetail: { contentId: number };
  ProductDetail: { productId: number };
  Cart: undefined;
  UserTiers: undefined;
  Address: undefined;
  Profile: undefined;
  UserReview: undefined;
  TransactionHistory: undefined;
  VouchersWallet: undefined;
  NewAddress: undefined;
};

export type CustomerTabsScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "CustomerTabs"
>;
export type NewsDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "NewsDetail"
>;
export type ProductDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "ProductDetail"
>;
export type CartScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Cart"
>;
export type UserTiersScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserTiers"
>;
export type VouchersWalletScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "VouchersWallet"
>;
export type AddressScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Address"
>;
export type NewAddressScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "NewAddress"
>;
export type ProfileScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Profile"
>;
export type UserReviewScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserReview"
>;
export type TransactionHistoryScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "TransactionHistory"
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
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      {/* Tin tức */}
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ headerTitle: "", headerTransparent: true }}
      />
      {/* Giỏ hàng */}
      <Stack.Screen name="Cart" component={Cart} />
      {/* Voucher và khuyến mãi */}
      <Stack.Screen name="UserTiers" component={UserTiers} />
      <Stack.Screen name="VouchersWallet" component={VouchersWallet} />
      {/* Địa chỉ */}
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="NewAddress" component={NewAddress} />
      {/* Hồ sơ */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="UserReview" component={UserReview} />
      {/* Giao dịch */}
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      {/* Chính sách */}
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
