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
import DetailOpts from "../../components/Customer/DetailScreen/DetailOpts";
import Collection from "../../screens/Customer/MachineScreens/Collection";
import UserAddress from "../../screens/Customer/AddressScreens/UserAddress";
import EditAddress from "../../screens/Customer/AddressScreens/EditAddress";
import { AddressData } from "../../models/address_models";
import MembershipTopTabs from "./MembershipNavigators/MembershipTopTabs";
import ChangePassword from "../../screens/Customer/ProfileScreens/ChangePassword";
import SystemTerms from "../../screens/Customer/TermScreens/SystemTerms";
import InvoiceDetail from "../../screens/Customer/InvoiceScreens/InvoiceDetail";
import UserDelivery from "../../screens/Customer/DeliveryScreens/UserDelivery";
import DeliveryDetail from "../../screens/Customer/DeliveryScreens/DeliveryDetail";
import UserContract from "../../screens/Customer/ContractScreens/UserContract";
import UserCheckRequest from "../../screens/Customer/CheckRequestScreens/UserCheckRequest";
import CheckRequestDetail from "../../screens/Customer/CheckRequestScreens/CheckRequestDetail";
import CreateCheckRequest from "../../screens/Customer/CheckRequestScreens/CreateCheckRequest";
import UserRentingRequest from "../../screens/Customer/RentingRequestScreens/UserRentingRequest";
import RentingRequestDetail from "../../screens/Customer/RentingRequestScreens/RentingRequestDetail";
import UserNotification from "../../screens/Customer/NotificationScreens/UserNotification";
import ContractDetail from "../../screens/Customer/ContractScreens/ContractDetail";
import { CheckRequestData } from "../../models/machineCheckRequest_models";
import InvoiceResult from "../../screens/Customer/ResultScreens/InvoiceResult";
import BillResult from "../../screens/Customer/ResultScreens/BillResult";
import FullImage from "../../screens/Customer/ImageScreen/FullImage";

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

  // Profile
  Profile: undefined;
  ChangePassword: undefined;

  // Địa chỉ
  EditAddress: { chosenAddress: AddressData };
  NewAddress: undefined;
  UserAddress: undefined;

  // Thanh toán
  UserInvoice: undefined;
  InvoiceDetail: { invoiceId: string };

  // Yêu cầu thuê
  UserRentingRequest: undefined;
  RentingRequestDetail: { rentingRequestId: string };

  // Yêu cầu sửa chữa
  UserCheckRequest: undefined;
  CheckRequestDetail: { machineCheckRequestId: string };
  CreateCheckRequest: { checkRequestList: CheckRequestData[] };

  // Hợp đồng
  UserContract: undefined;
  ContractDetail: { contractId: string };

  // Giao hàng
  UserDelivery: undefined;
  DeliveryDetail: { deliveryTaskId: number };

  // Quyền lợi
  MembershipTopTabs: undefined;

  // Điều khoản
  SystemTerms: undefined;

  // Thông báo
  UserNotification: undefined;

  // Hình ảnh
  FullImage: { imageUrl: string };

  // Kết quả thanh toán
  InvoiceResult: undefined;
  BillResult: { invoiceId: string };
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
export type InvoiceDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "InvoiceDetail"
>;

// Yêu cầu thuê
export type UserRentingRequestScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserRentingRequest"
>;
export type RentingRequestDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "RentingRequestDetail"
>;

// Yêu cầu sửa chữa
export type UserCheckRequestScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserCheckRequest"
>;
export type CheckRequestDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "CheckRequestDetail"
>;
export type CreateCheckRequestScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "CreateCheckRequest"
>;

// Hợp đồng
export type UserContractScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserContract"
>;
export type ContractDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "ContractDetail"
>;

// Giao hàng
export type UserDeliveryScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserDelivery"
>;
export type DeliveryDetailScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "DeliveryDetail"
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

// Thông báo
export type UserNotificationScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "UserNotification"
>;

// Hình ảnh
export type FullImageScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "FullImage"
>;

// Kết quả thanh toán
export type InvoiceResultScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "InvoiceResult"
>;
export type BillResultScreenProps = NativeStackScreenProps<
  CustomerStackParamList,
  "BillResult"
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

      {/* Profile*/}
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: "Hồ sơ" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerTitle: "Thay đổi mật khẩu" }}
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

      {/* Thanh toán */}
      <Stack.Screen name="UserInvoice" component={UserInvoice} />
      <Stack.Screen
        name="InvoiceDetail"
        component={InvoiceDetail}
        options={{ headerTitle: "Thông tin đơn thanh toán" }}
      />

      {/* Yêu cầu thuê */}
      <Stack.Screen name="UserRentingRequest" component={UserRentingRequest} />
      <Stack.Screen
        name="RentingRequestDetail"
        component={RentingRequestDetail}
        options={{ headerTitle: "Thông tin yêu cầu thuê" }}
      />

      {/* Yêu cầu sửa chữa */}
      <Stack.Screen name="UserCheckRequest" component={UserCheckRequest} />
      <Stack.Screen
        name="CheckRequestDetail"
        component={CheckRequestDetail}
        options={{ headerTitle: "Thông tin yêu cầu" }}
      />
      <Stack.Screen
        name="CreateCheckRequest"
        component={CreateCheckRequest}
        options={{ headerTitle: "Tạo yêu cầu sửa chữa" }}
      />

      {/* Hợp đồng */}
      <Stack.Screen name="UserContract" component={UserContract} />
      <Stack.Screen
        name="ContractDetail"
        component={ContractDetail}
        options={{ headerTitle: "Thông tin hợp đồng" }}
      />

      {/* Giao hàng */}
      <Stack.Screen name="UserDelivery" component={UserDelivery} />
      <Stack.Screen
        name="DeliveryDetail"
        component={DeliveryDetail}
        options={{ headerTitle: "Thông tin đơn giao hàng" }}
      />

      {/* Chính sách */}
      <Stack.Screen
        name="SystemTerms"
        component={SystemTerms}
        options={{ headerTitle: "Chính sách quy định" }}
      />

      {/* Thông báo */}
      <Stack.Screen
        name="UserNotification"
        component={UserNotification}
        options={{ headerTitle: "Thông báo" }}
      />

      {/* Hình ảnh */}
      <Stack.Screen
        name="FullImage"
        component={FullImage}
        options={() => ({
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "rgba(128, 128, 128, 0.3)",
          },
        })}
      />

      {/* Kết quả thanh toán */}
      <Stack.Screen
        name="InvoiceResult"
        component={InvoiceResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BillResult"
        component={BillResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
