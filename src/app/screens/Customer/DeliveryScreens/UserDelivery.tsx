import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { UserDeliveryScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import KeywordSearchBar from "~/src/app/components/header/KeywordSearchBar";
import DetailOpts from "~/src/app/components/header/DetailOpts";
import { useFocusEffect } from "@react-navigation/native";
import Delivery from "~/src/app/api/delivery/Delivery";
import Toast from "react-native-toast-message";
import { listErrorMsg } from "~/src/app/constants/toastMessage";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import { DeliveryData } from "~/src/app/models/delivery_models";
import { formatDate } from "~/src/app/utils/dateformat";
import RNPickerSelect from "react-native-picker-select";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { Truck } from "lucide-react-native";
import DeliveryList from "~/src/app/components/Customer/DeliveryScreen/DeliveryList";

const UserDelivery = ({ navigation, route }: UserDeliveryScreenProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState("all");
  const [allList, setAllList] = useState<DeliveryData[]>([]);
  const [filteredList, setFilteredList] = useState<DeliveryData[]>([]);
  const [displayList, setDisplayList] = useState<DeliveryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceKeyword = useDebounce(keyword);
  const itemsPerPage = 10;
  const pageRef = useRef(1);

  useFocusEffect(
    useCallback(() => {
      getRequests();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <KeywordSearchBar keyword={keyword} setKeyword={setKeyword} />
      ),
      headerRight: () => <DetailOpts />,
    });
  }, [keyword]);

  useEffect(() => {
    filterRequests();
  }, [allList, type, debounceKeyword]);

  const getRequests = async () => {
    try {
      const response = await Delivery.getDeliveries();
      if (response) {
        setAllList(response);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: listErrorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = allList;
    if (type !== "all") {
      filtered = filtered.filter(
        (delivery) => delivery.status.toLowerCase() === type?.toLowerCase()
      );
    }

    if (debounceKeyword) {
      filtered = filtered.filter(
        (delivery) =>
          delivery.contractAddress.addressBody
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          delivery.contractAddress.rentingRequestId
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          formatDate(delivery.dateShip)
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          formatDate(delivery.dateCompleted)
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          delivery.staffName
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase())
      );
    }

    pageRef.current = 1;
    setFilteredList(filtered); // List đã filter ban đầu
    setDisplayList(filtered.slice(0, itemsPerPage)); // List sẽ được hiện
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);

      pageRef.current += 1;
      setDisplayList(filteredList.slice(0, itemsPerPage * pageRef.current));

      setIsLoadingMore(false);
    }
  };

  return (
    <View className="bg-white" style={styles.container}>
      {isLoading ? (
        <View className="w-full h-full flex justify-center items-center">
          <ActivityIndicator color={mainBlue} size={"large"} />
        </View>
      ) : displayList.length !== 0 ? (
        <DeliveryList
          displayList={displayList}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          userDeliveryScreenProps={{ navigation, route }}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <Truck color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có máy móc nào cả
          </Text>
        </View>
      )}
      <View
        className={` ${displayList.length === 0 && "absolute"} bottom-0 w-full border-t-[0.5px] border-muted-foreground`}
      >
        <RNPickerSelect
          value={type}
          onValueChange={(value) => setType(value)}
          placeholder={{
            label: "Chọn trạng thái",
            value: "all",
          }}
          items={[
            { label: "Tất cả", value: "all" },
            { label: "Mới", value: "created" },
            { label: "Đang giao", value: "delivering" },
            { label: "Hoàn thành", value: "completed" },
            { label: "Đã xử lý lại", value: "processedafterfailure" },
            { label: "Thất bại", value: "failed" },
          ]}
        />
      </View>
    </View>
  );
};

export default UserDelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
