import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView>
      <View className="justify-center items-center h-full">
        <Text className="text-blue-800 text-4xl">Login</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
