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
import { mainBlue, mutedForground } from "../../constants/cssConstants";
import ProductImagesSlide from "../../screens/Customer/ProductScreens/ProductImagesSlide";
import { MachineryImageData } from "../../models/machinery_models";
import HomeUserOpts from "../../components/Customer/HomeScreen/homeHeader/HomeUserOpts";
import DetailOpts from "../../components/Customer/DetailScreen/DetailOpts";
import Collection from "../../screens/Customer/ProductScreens/Collection";

export type CustomerStackParamList = {
  CustomerTabs: undefined;
  NewsDetail: {
    contentId: number;
    headerTintColor?: string;
    headerBackgroundColor?: string;
  };
  Collection: undefined;
  ProductDetail: {
    productId: number;
    headerTintColor?: string;
    headerBackgroundColor?: string;
  };
  ProductImagesSlide: { imagesList: MachineryImageData[]; chosenIndex: number };
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
export type CollectionScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "Collection"
>;
export type ProductImagesSlideScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "ProductImagesSlide"
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
      <Stack.Screen
        name="Collection"
        component={Collection}
        // options={({ route }) => ({
        //   headerTitle: "",
        //   headerTransparent: true,
        //   headerTintColor: route.params?.headerTintColor || "white",
        //   headerStyle: {
        //     backgroundColor:
        //       route.params?.headerBackgroundColor || "rgba(128, 128, 128, 0.3)",
        //   },
        //   headerRight: () => (
        //     <DetailOpts color={route.params?.headerTintColor || "white"} />
        //   ),
        // })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
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
        name="ProductImagesSlide"
        component={ProductImagesSlide}
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
      <Stack.Screen name="VouchersWallet" component={VouchersWallet} />
      {/* Địa chỉ */}
      <Stack.Screen
        name="Address"
        component={Address}
        options={{ headerTitle: "Địa chỉ của bạn" }}
      />
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
