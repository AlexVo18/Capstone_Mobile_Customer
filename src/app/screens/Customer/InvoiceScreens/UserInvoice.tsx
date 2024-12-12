import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { InvoiceData } from "~/src/app/models/invoice_models";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import { UserInvoiceScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import KeywordSearchBar from "~/src/app/components/header/KeywordSearchBar";
import DetailOpts from "~/src/app/components/header/DetailOpts";
import Toast from "react-native-toast-message";
import { listErrorMsg } from "~/src/app/constants/toastMessage";
import Invoice from "~/src/app/api/invoice/Invoice";
import { formatDate } from "~/src/app/utils/dateformat";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import InvoiceList from "~/src/app/components/Customer/InvoiceScreen/InvoiceList";
import { Receipt } from "lucide-react-native";
import RNPickerSelect from "react-native-picker-select";
import { useFocusEffect } from "@react-navigation/native";

const UserInvoice = ({ navigation, route }: UserInvoiceScreenProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState("all");
  const [invoiceType, setInvoiceType] = useState("allType");
  const [allList, setAllList] = useState<InvoiceData[]>([]);
  const [filteredList, setFilteredList] = useState<InvoiceData[]>([]);
  const [displayList, setDisplayList] = useState<InvoiceData[]>([]);
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
      getTransaction();
    }, [])
  );

  useEffect(() => {
    filterRequests();
  }, [allList, type, debounceKeyword, invoiceType]);

  const getTransaction = async () => {
    try {
      const response = await Invoice.getUserInvoices();
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
        (invoice) => invoice.status.toLowerCase() === type?.toLowerCase()
      );
    }

    if (debounceKeyword) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.invoiceId
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          formatDate(invoice.dateCreate)
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase()) ||
          invoice.amount
            .toString()
            .toLowerCase()
            .includes(debounceKeyword.toLowerCase())
      );
    }

    if (invoiceType !== "allType") {
      filtered = filtered.filter(
        (invoice) => invoice.type.toLowerCase() === invoiceType
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
        <InvoiceList
          displayList={displayList}
          handleLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          userInvoiceScreenProps={{ navigation, route }}
          onCancel={() => getTransaction()}
        />
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <Receipt color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có thanh toán nào cả
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
                { label: "Chưa thanh toán", value: "pending" },
                { label: "Hoàn tất", value: "paid" },
                { label: "Đã hủy", value: "canceled" },
              ]}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.pickerWrapper}>
            <RNPickerSelect
              value={invoiceType}
              onValueChange={(value) => setInvoiceType(value)}
              placeholder={{
                label: "Chọn loại thanh toán",
                value: "allType",
              }}
              items={[
                { label: "Tất cả", value: "allType" },
                { label: "Tiền thuê", value: "rental" },
                { label: "Tiền sửa chữa", value: "componentticket" },
                { label: "Tiền hoàn trả", value: "refund" },
              ]}
              style={pickerSelectStyles}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserInvoice;

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
