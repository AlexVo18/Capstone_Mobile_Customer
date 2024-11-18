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
import {
  ChartColumnStacked,
  PackageSearch,
  RefreshCw,
} from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

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
  const [activePriceRange, setActivePriceRange] = useState(0);

  const drawerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const removeAllFilter = () => {
    setSearchParams({
      keyword: "",
      priceRange: [100000, 100000000],
      categories: [],
    });
    setActivePriceRange(0);
  };

  const handleToggleCategory = (categoryName: string) => {
    setSearchParams((prevSelected) => {
      const isCategorySelected = prevSelected.categories.includes(categoryName);

      return {
        ...prevSelected,
        categories: isCategorySelected
          ? prevSelected.categories.filter((name) => name !== categoryName)
          : [...prevSelected.categories, categoryName],
      };
    });
  };

  const handlePriceRange = (type: number) => {
    setSearchParams((prevState) => {
      let newPriceRange = [] as number[];
      if (type === 0) {
        newPriceRange = [100000, 100000000];
      } else if (type === 1) {
        newPriceRange = [100000, 500000];
      } else if (type === 2) {
        newPriceRange = [500000, 1000000];
      } else if (type === 3) {
        newPriceRange = [1000000, 2000000];
      } else if (type === 4) {
        newPriceRange = [2000000, 5000000];
      } else if (type === 5) {
        newPriceRange = [5000000, 10000000];
      }
      return { ...prevState, priceRange: newPriceRange };
    });

    setActivePriceRange(type);
  };

  return (
    <Animated.View
      style={[styles.drawer, drawerAnimatedStyle]}
      className="w-full h-full"
    >
      {isCateLoading ? (
        <View className="w-full h-full justify-center items-center">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : categoryList.length !== 0 ? (
        <ScrollView className="">
          <View className="pb-5 border-b-[1px] border-b-gray-300 p-5">
            <TouchableOpacity
              style={[styles.buttonStyle]}
              onPress={removeAllFilter}
            >
              <View className="flex flex-row items-center gap-2">
                <RefreshCw color={"white"} size={20} />
                <Text className="text-white font-semibold">Xóa Filter</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="px-5 py-2">
            <Text className="text-lg ">Khoảng giá</Text>
          </View>
          <View className="flex flex-wrap flex-row gap-2 justify-evenly pb-5 border-b-[1px] border-b-gray-300">
            <TouchableOpacity
              style={[
                activePriceRange === 0
                  ? styles.activePriceRange
                  : styles.unactivePriceRange,
              ]}
              onPress={() => handlePriceRange(0)}
            >
              <Text
                className="text-center"
                style={[
                  activePriceRange === 0
                    ? { color: "#1d4ed8" }
                    : { color: "#000" },
                ]}
              >
                Tất cả
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                activePriceRange === 1
                  ? styles.activePriceRange
                  : styles.unactivePriceRange,
              ]}
              onPress={() => handlePriceRange(1)}
            >
              <Text
                className="text-center"
                style={[
                  activePriceRange === 1
                    ? { color: "#1d4ed8" }
                    : { color: "#000" },
                ]}
              >
                100k - 500k
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                activePriceRange === 2
                  ? styles.activePriceRange
                  : styles.unactivePriceRange,
              ]}
              onPress={() => handlePriceRange(2)}
            >
              <Text
                className="text-center"
                style={[
                  activePriceRange === 2
                    ? { color: "#1d4ed8" }
                    : { color: "#000" },
                ]}
              >
                500k - 1triệu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                activePriceRange === 3
                  ? styles.activePriceRange
                  : styles.unactivePriceRange,
              ]}
              onPress={() => handlePriceRange(3)}
            >
              <Text
                className="text-center"
                style={[
                  activePriceRange === 3
                    ? { color: "#1d4ed8" }
                    : { color: "#000" },
                ]}
              >
                1triệu - 2triệu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                activePriceRange === 4
                  ? styles.activePriceRange
                  : styles.unactivePriceRange,
              ]}
              onPress={() => handlePriceRange(4)}
            >
              <Text
                className="text-center"
                style={[
                  activePriceRange === 4
                    ? { color: "#1d4ed8" }
                    : { color: "#000" },
                ]}
              >
                2triệu - 5triệu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                activePriceRange === 5
                  ? styles.activePriceRange
                  : styles.unactivePriceRange,
              ]}
              onPress={() => handlePriceRange(5)}
            >
              <Text
                className="text-center "
                style={[
                  activePriceRange === 5
                    ? { color: "#1d4ed8" }
                    : { color: "#000" },
                ]}
              >
                5triệu - 10triệu
              </Text>
            </TouchableOpacity>
          </View>
          <View className="px-5 py-2">
            <Text className="text-lg ">Lọc máy</Text>
          </View>
          <View className="flex flex-wrap flex-row gap-2 justify-evenly pb-5 border-b-[1px] border-b-gray-300">
            {categoryList.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  searchParams.categories.includes(category.categoryName)
                    ? styles.activeCategory
                    : styles.unactiveCategory,
                ]}
                onPress={() => handleToggleCategory(category.categoryName)}
              >
                <Text
                  className="text-center"
                  style={[
                    searchParams.categories.includes(category.categoryName)
                      ? { color: "#fff" }
                      : { color: "#1d4ed8" },
                  ]}
                >
                  {category.categoryName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonStyle: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#e02424",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  unactiveCategory: {
    borderColor: "#1d4ed8",
    color: "#fff",
    borderWidth: 1,
    width: 110,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  activeCategory: {
    borderColor: "#1d4ed8",
    borderWidth: 1,
    backgroundColor: "#1d4ed8",
    color: "#fff",
    width: 110,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  unactivePriceRange: {
    borderColor: "#f3f4f6",
    backgroundColor: "#f3f4f6",
    color: "#fff",
    borderWidth: 1,
    width: 110,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  activePriceRange: {
    borderColor: "#1d4ed8",
    borderWidth: 1,
    color: "#fff",
    width: 110,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});
