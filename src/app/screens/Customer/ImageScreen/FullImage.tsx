import { View, Image } from "react-native";
import React from "react";
import { FullImageScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";

const FullImage = ({ route }: FullImageScreenProps) => {
  const { imageUrl } = route.params;
  return (
    <View className="flex bg-black w-full h-full justify-center items-center p-4">
      <Image src={imageUrl} alt="" className="h-full w-full object-contain" />
    </View>
  );
};

export default FullImage;
