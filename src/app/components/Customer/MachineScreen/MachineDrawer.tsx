import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SearchMachineryParams } from "~/src/app/models/machinery_models";
import { CategoryData } from "~/src/app/models/category_models";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { ChartColumnStacked, PackageSearch } from "lucide-react-native";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.7;

interface Props {
  translateX: any;
  searchParams: SearchMachineryParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchMachineryParams>>;
  categoryList: CategoryData[];
  isCateLoading: boolean;
}

const MachineDrawer = ({
  translateX,
  searchParams,
  setSearchParams,
  categoryList,
  isCateLoading,
}: Props) => {
  const drawerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View
      style={[styles.drawer, drawerAnimatedStyle]}
      className="w-full h-full "
    >
      {isCateLoading ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : categoryList.length !== 0 ? (
        <View className="p-5">
            
        </View>
      ) : (
        <View className="w-full h-full justify-center items-center">
          <ChartColumnStacked color={`hsl(${mutedForground})`} size={40} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có bộ lọc nào cả
          </Text>
        </View>
      )}
    </Animated.View>
  );
};

export default MachineDrawer;

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "white",
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
