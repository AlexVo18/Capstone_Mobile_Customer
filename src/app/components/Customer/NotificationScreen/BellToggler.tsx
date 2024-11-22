import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Bell } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CustomerStackParamList } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { StyleProp, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const BellToggler = ({ style }: Props) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<CustomerStackParamList, "UserNotification">
    >();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("UserNotification")}
      style={style}
    >
      <Bell size={24} color={"black"} />
    </TouchableOpacity>
  );
};

export default BellToggler;
