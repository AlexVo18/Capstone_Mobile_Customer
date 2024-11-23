import { StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { RequestData } from "~/src/app/models/rentingRequest_models";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import { UserRentingRequestScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import KeywordSearchBar from "~/src/app/components/header/KeywordSearchBar";
import DetailOpts from "~/src/app/components/header/DetailOpts";
import RentingRequest from "~/src/app/api/rentingRequest/RentingRequest";
import Toast from "react-native-toast-message";
import { listErrorMsg } from "~/src/app/constants/toastMessage";
import { formatDate } from "~/src/app/utils/dateformat";
import { ActivityIndicator } from "react-native-paper";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import RentingRequestList from "~/src/app/components/Customer/RentingRequestScreen/RentingRequestList";
import { Package2 } from "lucide-react-native";
import RNPickerSelect from "react-native-picker-select";
import { useFocusEffect } from "@react-navigation/native";

const UserRentingRequest = ({
  navigation,
  route,
}: UserRentingRequestScreenProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState("all");
  const [requestType, setRequestType] = useState("allType");
  const [allList, setAllList] = useState<RequestData[]>([]);
  const [filteredList, setFilteredList] = useState<RequestData[]>([]);
  const [displayList, setDisplayList] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceKeyword = useDebounce(keyword);
  const itemsPerPage = 10;
  const pageRef = useRef(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <KeywordSearchBar keyword={keyword} setKeyword={setKeyword} />
      ),
      headerRight: () => <DetailOpts />,
    });
  }, [keyword]);

  useFocusEffect(
    useCallback(() => {
      getRequests();
    }, [])
  );

  useEffect(() => {
    filterRequests();
  }, [allList, type, debounceKeyword, requestType]);

  const getRequests = async () => {
    try {
      const response = await RentingRequest.getUserRequests();
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
        (request) => request.status.toLowerCase() === type?.toLowerCase()
      );
    }

    if (debounceKeyword) {
      filtered = filtered.filter(
        (request) =>
          request.rentingRequestId
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          request.totalRentPrice
            .toString()
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          formatDate(request.dateCreate)
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase())
      );
    }

    if (requestType === "oneTime") {
      filtered = filtered.filter((request) => request.isOnetimePayment);
    } else if (requestType === "monthly") {
      filtered = filtered.filter((request) => !request.isOnetimePayment);
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
        <RentingRequestList
          displayList={displayList}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          userRentingRequestScreenProps={{ navigation, route }}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <Package2 color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có đơn hàng nào cả
          </Text>
        </View>
      )}
      <View
        className={` ${displayList.length === 0 && "absolute"} bottom-0 w-full border-t-[0.5px] border-muted-foreground`}
      >
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              value={type}
              onValueChange={(value) => setType(value)}
              placeholder={{
                label: "Chọn trạng thái",
                value: "all",
              }}
              items={[
                { label: "Tất cả", value: "all" },
                { label: "Đã giao", value: "shipped" },
                { label: "Chưa trả cọc", value: "unpaid" },
                { label: "Đã ký", value: "signed" },
                { label: "Đã hủy", value: "canceled" },
              ]}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              value={requestType}
              onValueChange={(value) => setRequestType(value)}
              placeholder={{
                label: "Chọn loại thanh toán",
                value: "allType",
              }}
              items={[
                { label: "Tất cả", value: "allType" },
                { label: "Một lần", value: "oneTime" },
                { label: "Theo tháng", value: "monthly" },
              ]}
              style={pickerSelectStyles}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserRentingRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    backgroundColor: "white",
  },
});
