import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  MachineryData,
  SearchMachineryParams,
} from "~/src/app/models/machinery_models";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import { CategoryData } from "~/src/app/models/category_models";
import Machinery from "~/src/app/api/machinery/Machinery";
import Toast from "react-native-toast-message";
import Category from "~/src/app/api/category/Category";
import { CollectionScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import MachineList from "~/src/app/components/Customer/MachineScreen/MachineList";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { PackageSearch } from "lucide-react-native";

const Collection = ({ navigation, route }: CollectionScreenProps) => {
  const [searchParams, setSearchParams] = useState<SearchMachineryParams>({
    keyword: "",
    priceRange: [500000, 100000000],
    categories: [],
  });
  const debounceKeyword = useDebounce(searchParams.keyword);
  const [allList, setAllList] = useState<MachineryData[]>([]);
  const [filteredList, setFilteredList] = useState<MachineryData[]>([]);
  const [displayList, setDisplayList] = useState<MachineryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<CategoryData[]>([]);
  const [isCateLoading, setIsCateLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);

  useEffect(() => {
    // Lấy máy
    getMachineries();
    // Lấy loại
    getCategories();
  }, []);

  // Chạy filter khi có list hoặc params
  useEffect(() => {
    filterMachineries();
  }, [
    debounceKeyword,
    searchParams.priceRange,
    searchParams.categories,
    allList,
  ]);

  const getMachineries = async () => {
    try {
      const response = await Machinery.getAllMachineries();
      setAllList(response);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lấy thông tin thất bại",
        text2: "Đã có vấn đề xảy ra",
        visibilityTime: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await Category.getAllCategories();
      if (response) {
        setCategoryList(response);
      }
    } catch (error) {
      return error;
    } finally {
      setIsCateLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);

      pageRef.current += 1;
      setDisplayList(filteredList.slice(0, 10 * pageRef.current));

      setIsLoadingMore(false);
    }
  };

  const filterMachineries = () => {
    let filtered = allList;
    if (filtered.length !== 0) {
      // Search dựa trên keyword
      if (debounceKeyword) {
        filtered = filtered.filter(
          (machinery) =>
            machinery.machineName
              .toLowerCase()
              .includes(debounceKeyword.toLowerCase()) ||
            machinery.description
              .toLowerCase()
              .includes(debounceKeyword.toLowerCase()) ||
            machinery.model
              .toLowerCase()
              .includes(debounceKeyword.toLowerCase()) ||
            machinery.origin
              .toLowerCase()
              .includes(debounceKeyword.toLowerCase())
        );
      }

      // Search dựa trên giá trên
      filtered = filtered.filter(
        (machinery) =>
          machinery.rentPrice >= searchParams.priceRange[0] &&
          machinery.rentPrice <= searchParams.priceRange[1]
      );

      // Search dựa phân loại máy
      if (searchParams.categories.length > 0) {
        filtered = filtered.filter((machinery) =>
          searchParams.categories.includes(machinery.categoryName)
        );
      }

      // Lấy lại 10 item đầu
      pageRef.current = 1;
      setFilteredList(filtered); // List đã filter ban đầu
      setDisplayList(filtered.slice(0, 10)); // List sẽ được hiện
    }
  };

  return (
    <View style={styles.container} className="bg-white ">
      {isLoading ? (
        <View className="py-5">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : displayList.length !== 0 ? (
        <MachineList
          displayList={displayList}
          collectionScreenProps={{ navigation, route }}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <PackageSearch color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có tin tức nào cả
          </Text>
        </View>
      )}
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: mutedForground,
  },
  description: {
    fontSize: 14,
    color: mutedForground,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
