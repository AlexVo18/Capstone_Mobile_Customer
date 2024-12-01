import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { UserCheckRequestScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { CheckRequestData } from "~/src/app/models/machineCheckRequest_models";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import KeywordSearchBar from "~/src/app/components/header/KeywordSearchBar";
import DetailOpts from "~/src/app/components/header/DetailOpts";
import { useFocusEffect } from "@react-navigation/native";
import MachineCheckRequest from "~/src/app/api/machineCheckRequest/MachineCheckRequest";
import Toast from "react-native-toast-message";
import { listErrorMsg } from "~/src/app/constants/toastMessage";
import { formatDate } from "~/src/app/utils/dateformat";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import CheckRequestList from "~/src/app/components/Customer/CheckRequestScreen/CheckRequestList";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-paper";
import { Wrench } from "lucide-react-native";

const UserCheckRequest = ({
  navigation,
  route,
}: UserCheckRequestScreenProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState("all");
  const [allList, setAllList] = useState<CheckRequestData[]>([]);
  const [filteredList, setFilteredList] = useState<CheckRequestData[]>([]);
  const [displayList, setDisplayList] = useState<CheckRequestData[]>([]);
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
      getUserRequests();
    }, [])
  );

  useEffect(() => {
    filterRequests();
  }, [allList, type, debounceKeyword]);

  const getUserRequests = async () => {
    try {
      const response = await MachineCheckRequest.getUserMachineCheckReq();
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
    if (type?.toLowerCase() !== "all") {
      filtered = filtered.filter(
        (request) => request.status.toLowerCase() === type?.toLowerCase()
      );
    }

    if (debounceKeyword) {
      filtered = filtered.filter(
        (request) =>
          request.machineCheckRequestId
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          request.serialNumber
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          request.machineName
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          request.contractId
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          formatDate(request.dateCreate)
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
        <CheckRequestList
          displayList={displayList}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          userCheckRequestScreenProps={{ navigation, route }}
          ListHeaderComponent={
            <View className="px-10 mb-5">
              <Button
                mode="outlined"
                onPress={() =>
                  navigation.navigate("CreateCheckRequest", {
                    checkRequestList: allList,
                  })
                }
                className="mt-5"
                textColor={mainBlue}
                style={[styles.outlineButton, styles.buttonStyle]}
              >
                <Text className="text-lg">Tạo yêu cầu mới</Text>
              </Button>
            </View>
          }
        />
      ) : (
        <>
          <View className="px-10 mb-5">
            <Button
              mode="outlined"
              onPress={() =>
                navigation.navigate("CreateCheckRequest", {
                  checkRequestList: allList,
                })
              }
              className="mt-5"
              textColor={mainBlue}
              style={[styles.outlineButton, styles.buttonStyle]}
            >
              <Text className="text-lg">Tạo yêu cầu mới</Text>
            </Button>
          </View>
          <View className="w-full h-full flex justify-center items-center flex-col">
            <Wrench color={`hsl(${mutedForground})`} size={48} />
            <Text
              style={{ color: `hsl(${mutedForground})` }}
              className="text-lg"
            >
              Không có yêu cầu sửa chữa nào cả
            </Text>
          </View>
        </>
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
            { label: "Mới", value: "new" },
            { label: "Đã cử nhân viên", value: "assigned" },
            { label: "Tiến hành", value: "processing" },
            { label: "Hoàn tất", value: "completed" },
          ]}
        />
      </View>
    </View>
  );
};

export default UserCheckRequest;

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
  outlineButton: {
    borderColor: mainBlue,
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 2,
    backgroundColor: "#FFFFFF",
  },
});
