import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import { ContractData } from "~/src/app/models/contract_models";
import Contract from "~/src/app/api/contract/Contract";
import Toast from "react-native-toast-message";
import { listErrorMsg } from "~/src/app/constants/toastMessage";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { formatDate } from "~/src/app/utils/dateformat";
import { UserContractScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { ScrollText } from "lucide-react-native";
import ContractList from "~/src/app/components/Customer/ContractScreen/ContractList";
import RNPickerSelect from "react-native-picker-select";
import KeywordSearchBar from "~/src/app/components/header/KeywordSearchBar";
import DetailOpts from "~/src/app/components/header/DetailOpts";
import { useFocusEffect } from "@react-navigation/native";

const UserContract = ({ navigation, route }: UserContractScreenProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState("all");
  const [allList, setAllList] = useState<ContractData[]>([]);
  const [filteredList, setFilteredList] = useState<ContractData[]>([]);
  const [displayList, setDisplayList] = useState<ContractData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceKeyword = useDebounce(keyword);
  const itemsPerPage = 10;
  const pageRef = useRef(1);

  useFocusEffect(
    useCallback(() => {
      getContract();
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

  const getContract = async () => {
    try {
      const response = await Contract.getContracts("");
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

  useEffect(() => {
    filterRequests();
  }, [allList, type, debounceKeyword]);

  const filterRequests = () => {
    let filtered = allList;
    if (type !== "all") {
      if (type === "canceled&terminated") {
        filtered = filtered.filter(
          (contract) =>
            contract.status.toLowerCase() === "canceled" ||
            contract.status.toLowerCase() === "terminated"
        );
      } else {
        filtered = filtered.filter(
          (contract) => contract.status.toLowerCase() === type?.toLowerCase()
        );
      }
    }

    if (debounceKeyword) {
      filtered = filtered.filter(
        (contract) =>
          contract.serialNumber
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          formatDate(contract.dateStart)
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          formatDate(contract.dateEnd)
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          contract.machineName
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          contract.contractId
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
        <ContractList
          displayList={displayList}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          userContractScreenProps={{ navigation, route }}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <ScrollText color={`hsl(${mutedForground})`} size={48} />
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
            { label: "Chưa ký", value: "notsigned" },
            { label: "Đã ký", value: "signed" },
            { label: "Đang giao", value: "shipping" },
            { label: "Đang được thuê", value: "renting" },
            { label: "Đã hoàn tất", value: "completed" },
            { label: "Đợi kiểm tra", value: "inspectionpending" },
            { label: "Đang kiểm tra", value: "inspectioninprogress" },
            { label: "Đợi hoàn tiền", value: "awaitingrefundinvoice" },
            { label: "Đã hủy", value: "canceled&terminated" },
          ]}
        />
      </View>
    </View>
  );
};

export default UserContract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
