import { View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomerStackParamList } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  color: string;
}

const DetailOpts = ({ color }: Props) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<CustomerStackParamList, "UserNotification">
    >();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }} >
      <TouchableOpacity style={{ marginRight: 5 }} onPress={() => navigation.navigate("UserNotification")}>
        <Bell size={24} color={color} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailOpts;
