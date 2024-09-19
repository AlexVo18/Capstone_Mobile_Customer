import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {
  ArrowRightLeft,
  Award,
  BookMinus,
  ChevronRight,
  IdCard,
  MapPin,
  Star,
  TicketPercent,
  User,
} from "lucide-react-native";
import { SettingOptionScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerTabs";
import { Button } from "react-native-paper";
import SettingTab from "~/src/app/components/settingTabs/SettingTab";
import useAuth from "~/src/app/hooks/useAuth";

const SettingOption = ({ route, navigation }: SettingOptionScreenProps) => {
  const { logout } = useAuth();
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
            source={{ uri: "https://i.redd.it/rm5trt03a5861.jpg" }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-semibold">John Lee</Text>
        </View>
      </View>
      <SettingTab
        label="Hồ sơ của tôi"
        onPress={() => navigation.getParent()?.navigate("Profile")}
        Icon={<User size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Địa chỉ giao hàng"
        onPress={() => navigation.getParent()?.navigate("Address")}
        Icon={<MapPin size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Đánh giá của tôi"
        onPress={() => navigation.getParent()?.navigate("UserReview")}
        Icon={<Star size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Lịch sử giao dịch"
        onPress={() => navigation.getParent()?.navigate("TransactionHistory")}
        Icon={<ArrowRightLeft size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Ví Voucher"
        onPress={() => navigation.getParent()?.navigate("TransactionHistory")}
        Icon={<TicketPercent size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Khách hàng thân thiết"
        onPress={() => navigation.getParent()?.navigate("UserTiers")}
        Icon={<Award size={24} color={mainBlue} />}
        title="Khách hàng bạc"
      />
      <SettingTab
        label="Chính sách quy định"
        onPress={() => navigation.getParent()?.navigate("UserTiers")}
        Icon={<BookMinus size={24} color={mainBlue} />}
      />
      <SettingTab
        label="Thiết lập tài khoản"
        onPress={() => navigation.getParent()?.navigate("UserTiers")}
        Icon={<IdCard size={24} color={mainBlue} />}
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
