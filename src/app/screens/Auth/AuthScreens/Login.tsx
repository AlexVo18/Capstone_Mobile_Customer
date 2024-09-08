import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Chip, MD2Colors } from "react-native-paper";

const Login = () => {
  return (
    <SafeAreaView>
      {/* <View className=" bg-slate-200 w-full h-full items-center justify-center">
        <Text className="text-blue-800 text-4xl">Login</Text>
      </View> */}
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
      <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
    </SafeAreaView>
  );
};

export default Login;
