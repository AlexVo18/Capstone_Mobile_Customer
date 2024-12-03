import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserAddressScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import { AddressData } from "~/src/app/models/address_models";
import { mainBlue, mutedForground } from "~/src/app/constants/cssConstants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import { MapPinHouse } from "lucide-react-native";

interface Props {
  displayList: AddressData[];
  newsScreenProps: UserAddressScreenProps;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
  ListHeaderComponent: React.ReactElement;
}

const AddressesList = ({
  displayList,
  newsScreenProps,
  handleLoadMore,
  isLoadingMore,
  ListHeaderComponent,
}: Props) => {
  return (
    <FlatList
      data={displayList}
      keyExtractor={(item) => item.addressId.toString()}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            newsScreenProps.navigation.navigate("EditAddress", {
              chosenAddress: item,
            })
          }
        >
          <View
            style={[styles.card]}
            className="p-[20px] flex flex-row gap-2 border-b-[0.5px] "
          >
            <View
              style={{ flex: 1 }}
              className="flex gap-2 flex-row items-center"
            >
              <View>
                <MapPinHouse size={20} color={mainBlue} />
              </View>
              <View className="mr-[20px]">
                <Text className="">{item.addressBody}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoadingMore ? (
          <ActivityIndicator size="large" color={mainBlue} />
        ) : null
      }
      ListEmptyComponent={
        <Text style={{ color: mutedForground }}>Không còn địa chỉ nào</Text>
      }
    />
  );
};

export default AddressesList;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    paddingVertical: 20,
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
