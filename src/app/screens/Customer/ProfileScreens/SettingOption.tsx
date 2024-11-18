import { View, Text, Image } from "react-native";
import React from "react";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  Award,
  BookMinus,
  FileLock,
  MapPin,
  Package,
  Receipt,
  ScrollText,
  User,
  Wrench,
} from "lucide-react-native";
import { SettingOptionScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import { Button } from "react-native-paper";
import SettingTab from "~/src/app/components/settingTabs/SettingTab";
import useAuth from "~/src/app/hooks/useAuth";

const SettingOption = ({ route, navigation }: SettingOptionScreenProps) => {
  const { logout, userInfo } = useAuth();

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
        onPress={() => navigation.getParent()?.navigate("TransactionHistory")}
        Icon={<Package size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Hợp đồng"
        onPress={() => navigation.getParent()?.navigate("TransactionHistory")}
        Icon={<ScrollText size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Thanh toán"
        onPress={() => navigation.getParent()?.navigate("TransactionHistory")}
        Icon={<Receipt size={24} color={mainBlue} />}
      />

      <SettingTab
        label="Yêu cầu sửa chữa"
        onPress={() => navigation.getParent()?.navigate("TransactionHistory")}
        Icon={<Wrench size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Khách hàng thân thiết"
        onPress={() => navigation.getParent()?.navigate("MembershipTopTabs")}
        Icon={<Award size={24} color={mainBlue} />}
        title="Khách hàng bạc"
      />
      <SettingTab
        label="Chính sách quy định"
        onPress={() => navigation.getParent()?.navigate("UserTiers")}
        Icon={<BookMinus size={24} color={mainBlue} />}
      />
      <View className="mx-6">
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
