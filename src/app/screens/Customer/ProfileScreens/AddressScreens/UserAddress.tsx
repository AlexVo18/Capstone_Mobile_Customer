import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Button } from "react-native-paper";
import { UserAddressScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { AddressData } from "~/src/app/models/address_models";
import axios from "axios";
import Address from "~/src/app/api/address/Address";
import Toast from "react-native-toast-message";
import AddressesList from "~/src/app/components/Customer/AddressScreen/AddressesList";
import { Map } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

const UserAddress = ({ navigation, route }: UserAddressScreenProps) => {
  const [allList, setAllList] = useState<AddressData[]>([]);
  const [displayList, setDisplayList] = useState<AddressData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const pageRef = useRef(1);

  useFocusEffect(
    useCallback(() => {
      getUserAddress();
    }, [])
  );

  const getUserAddress = async () => {
    try {
      const response = await Address.getUserAddress();
      if (response) {
        setAllList(response);
        setDisplayList(response.slice(0, 10));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.data === "Danh sách địa chỉ của bạn trống") {
            setAllList([]);
          } else {
            Toast.show({
              type: "error",
              text1: "Lấy thông tin thất bại",
              text2: "Đã có vấn đề xảy ra",
              visibilityTime: 2000,
            });
          }
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Lấy thông tin thất bại",
          text2: "Đã có vấn đề xảy ra",
          visibilityTime: 2000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);

      pageRef.current += 1;
      setDisplayList(allList.slice(0, 20 * pageRef.current));

      setIsLoadingMore(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View className="py-5">
          <ActivityIndicator size="large" color={mainBlue} />
        </View>
      ) : displayList.length !== 0 ? (
        <>
          

          <AddressesList
            displayList={displayList}
            newsScreenProps={{ navigation, route }}
            handleLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            ListHeaderComponent={<View className="px-10 mb-5">
              <Button
                mode="outlined"
                onPress={() => navigation.navigate("NewAddress")}
                className="mt-5"
                textColor={mainBlue}
                style={[styles.outlineButton, styles.buttonStyle]}
                
              >
                <Text className="text-lg">Thêm địa chỉ mới</Text>
              </Button>
            </View>}
          />
        </>
      ) : (
        <View className="w-full h-full flex justify-center items-center flex-col">
          <Map color={`hsl(${mutedForground})`} size={48} />
          <Text style={{ color: `hsl(${mutedForground})` }} className="text-lg">
            Không có địa chỉ nào cả
          </Text>
          <View className="px-10 mb-5">
            <Button
              mode="outlined"
              onPress={() => navigation.navigate("NewAddress")}
              className="mt-5"
              textColor={mainBlue}
              style={[styles.outlineButton, styles.buttonStyle]}
            >
              <Text className="text-lg">Thêm địa chỉ mới</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default UserAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
