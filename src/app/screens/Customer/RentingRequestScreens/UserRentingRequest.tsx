import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { RequestData } from "~/src/app/models/rentingRequest_models";
import { useDebounce } from "~/src/app/hooks/useDebounce";

const UserRentingRequest = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [type, setType] = useState("all");
  const [allList, setAllList] = useState<RequestData[]>([]);
  const [filteredList, setFilteredList] = useState<RequestData[]>([]);
  const [displayList, setDisplayList] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debounceKeyword = useDebounce(keyword);
  const itemsPerPage = 10;
  const pageRef = useRef(1);

  return (
    <View>
      <Text>UserRentingRequest</Text>
    </View>
  );
};

export default UserRentingRequest;

const styles = StyleSheet.create({});
