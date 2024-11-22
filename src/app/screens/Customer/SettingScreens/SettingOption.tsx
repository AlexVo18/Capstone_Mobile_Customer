import { View, Text, Image } from "react-native";
import React, { useCallback } from "react";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Award,
  BookMinus,
  FileLock,
  MapPin,
  Package,
  Receipt,
  ScrollText,
  Truck,
  User,
  Wrench,
} from "lucide-react-native";
import { SettingOptionScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import { Button } from "react-native-paper";
import SettingTab from "~/src/app/components/settingTabs/SettingTab";
import useAuth from "~/src/app/hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

const SettingOption = ({ navigation }: SettingOptionScreenProps) => {
  const { logout, userInfo, getLocalData } = useAuth();

  useFocusEffect(
    useCallback(() => {
      getLocalData();
    }, [])
  );

  return (
    <ScrollView>
      <View
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity>
          <Image
            source={{ uri: userInfo?.avatarImg }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-semibold">{userInfo?.name}</Text>
        </View>
      </View>
      <SettingTab
        label="Hồ sơ của tôi"
        onPress={() => navigation.getParent()?.navigate("Profile")}
        Icon={<User size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Đổi mật khẩu"
        onPress={() => navigation.getParent()?.navigate("ChangePassword")}
        Icon={<FileLock size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Địa chỉ giao hàng"
        onPress={() => navigation.getParent()?.navigate("UserAddress")}
        Icon={<MapPin size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Đơn hàng"
        onPress={() => navigation.getParent()?.navigate("UserRentingRequest")}
        Icon={<Package size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Giao hàng"
        onPress={() => navigation.getParent()?.navigate("UserDelivery")}
        Icon={<Truck size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Hợp đồng"
        onPress={() => navigation.getParent()?.navigate("UserContract")}
        Icon={<ScrollText size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Thanh toán"
        onPress={() => navigation.getParent()?.navigate("UserInvoice")}
        Icon={<Receipt size={24} color={mainBlue} />}
      />

      <SettingTab
        label="Yêu cầu sửa chữa"
        onPress={() => navigation.getParent()?.navigate("UserCheckRequest")}
        Icon={<Wrench size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Quyền lợi khách hàng"
        onPress={() => navigation.getParent()?.navigate("MembershipTopTabs")}
        Icon={<Award size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Chính sách quy định"
        onPress={() => navigation.getParent()?.navigate("SystemTerms")}
        Icon={<BookMinus size={24} color={mainBlue} />}
      />
      <View className="mx-6 mb-5">
        <Button
          mode="contained"
          className="py-1 mt-5 "
          buttonColor={mainBlue}
          textColor="white"
          style={{
            width: "100%",
            borderRadius: 10,
          }}
          onPress={() => logout()}
        >
          <Text className="text-lg">Đăng xuất</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default SettingOption;
