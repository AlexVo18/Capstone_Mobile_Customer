import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { EditAddressScreenProps } from "~/src/app/navigators/CustomerNavigators/CustomerNavigator";
import Address from "~/src/app/api/address/Address";
import {
  ChosenAddressData,
  PredictionData,
} from "~/src/app/models/address_models";
import { useDebounce } from "~/src/app/hooks/useDebounce";
import { ErrorMessageAddNewAddress } from "~/src/app/constants/errorMessages";
import Toast from "react-native-toast-message";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MapLibreGL, { Logger } from "@maplibre/maplibre-react-native";
import { MapPin, Trash2 } from "lucide-react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { mainBlue } from "~/src/app/constants/cssConstants";

const EditAddress = ({ navigation, route }: EditAddressScreenProps) => {
  const mapStyleURL =
    "https://tiles.goong.io/assets/goong_map_web.json?api_key=ezmMzOjP5avaIKTm0fOJXWxykZCmGxjb6aRrfFVF";
  Logger.setLogCallback((log) => {
    const { message } = log;

    if (
      message.match("Request failed due to a permanent error: Canceled") ||
      message.match("Request failed due to a permanent error: Socket Closed")
    ) {
      return true;
    }
    return false;
  });

  const camera = useRef(null);
  const [chosenLocation, setChosenLocation] = useState<
    ChosenAddressData | undefined
  >();
  const [suggestions, setSuggestions] = useState<PredictionData[]>([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const debouncedKeyword = useDebounce(keyword);

  const validate = ErrorMessageAddNewAddress;

  useEffect(() => {
    originalGeoLocation();
  }, []);

  useEffect(() => {
    const handleSuggestions = async () => {
      if (debouncedKeyword.length > 2) {
        setIsLoading(true);
        try {
          const response = await Address.suggestAddresses(debouncedKeyword);
          if (response) {
            setSuggestions(response.predictions);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    handleSuggestions();
  }, [debouncedKeyword]);

  const originalGeoLocation = async () => {
    try {
      const response = await Address.stringAddressToGeocode(
        route.params.chosenAddress.addressBody
      );
      if (response) {
        setChosenLocation(response.results[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGeoLocation = async (addressId: string) => {
    try {
      const response = await Address.addressToGeocode(addressId);
      if (response) {
        setChosenLocation(response.results[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateAddress = async () => {
    setIsLoading(true);
    try {
      if (chosenLocation && route.params.chosenAddress.accountId) {
        const response = await Address.updateAddress({
          addressId: route.params.chosenAddress.addressId,
          address: {
            addressBody: chosenLocation?.formatted_address,
            city: chosenLocation?.compound.province,
            district: chosenLocation?.compound.district,
            coordinates: `${chosenLocation?.geometry.location.lat},${chosenLocation?.geometry.location.lng}`,
          },
        });
        if (response) {
          Toast.show({
            type: "success",
            text1: "Thay đổi địa chỉ thành công",
          });
          navigation.goBack();
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Thay đổi địa chỉ không thành công",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    setIsDeleting(true);
    try {
      if (route.params.chosenAddress.accountId) {
        await Address.deleteAddress(
          route.params.chosenAddress.accountId.toString()
        );
        Toast.show({
          type: "success",
          text1: "Xóa địa chỉ thành công",
        });
        navigation.goBack();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Xóa địa chỉ không thành công",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL={mapStyleURL}
          zoomEnabled={true}
        >
          <MapLibreGL.Camera
            centerCoordinate={
              chosenLocation
                ? [
                    chosenLocation.geometry.location.lng,
                    chosenLocation.geometry.location.lat,
                  ]
                : [106.7048655, 10.7713563]
            }
            ref={camera}
            zoomLevel={15.5}
          />
          {chosenLocation && (
            <MapLibreGL.PointAnnotation
              id="chosenLocationMarker"
              coordinate={[
                chosenLocation.geometry.location.lng,
                chosenLocation.geometry.location.lat,
              ]}
            >
              <MapPin color="red" size={24} fill="transparent" />
            </MapLibreGL.PointAnnotation>
          )}
        </MapLibreGL.MapView>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          placeholder="Tìm kiếm địa chỉ"
          style={styles.textInput}
        />
        {suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleGeoLocation(suggestion.place_id)}
              >
                <Text style={styles.suggestionText}>
                  {suggestion.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View
        style={styles.searchContainer}
        className="flex flex-row items-center"
      >
        <View style={{ flex: 1 }}>
          <Text className="text-blue-700 text-base font-semibold">
            Địa chỉ đã chọn:{" "}
            {chosenLocation ? (
              <Text className="text-base text-black font-normal">
                {chosenLocation?.formatted_address}
              </Text>
            ) : (
              <Text className="text-base text-muted-foreground italic font-normal">
                Tìm và chọn địa chỉ
              </Text>
            )}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setChosenLocation(undefined)}
          style={styles.searchContainer}
        >
          <Trash2 color="red" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        {chosenLocation &&
        chosenLocation.compound.province !== "Hồ Chí Minh" ? (
          <Text className="text-red-600 text-sm">
            {validate.compound.province.noSupport}
          </Text>
        ) : chosenLocation && chosenLocation.address_components.length < 4 ? (
          <Text className="text-red-600 text-sm">
            {validate.address_components.length}
          </Text>
        ) : null}
      </View>
      <View style={styles.searchContainer}>
        <Button
          mode="outlined"
          className=""
          textColor={mainBlue}
          style={[styles.outlineButton, styles.deleteButtonStyle]}
          disabled={isLoading || isDeleting}
          onPress={handleDeleteAddress}
        >
          {isDeleting ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-base">Xóa địa chỉ</Text>
          )}
        </Button>
      </View>
      <View style={styles.searchContainer}>
        {!chosenLocation ||
        chosenLocation.compound.province !== "Hồ Chí Minh" ||
        chosenLocation.formatted_address ===
          route.params.chosenAddress.addressBody ||
        chosenLocation.address_components.length < 4 ||
        isLoading ||
        isDeleting ? (
          <TouchableOpacity
            style={[styles.buttonStyle, styles.disableButtonColor]}
            disabled
          >
            {isLoading ? (
              <ActivityIndicator color={"#6b7280"} size={"small"} />
            ) : (
              <Text className="text-lg text-center text-gray-500 font-semibold">
                Cập nhật địa chỉ
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttonStyle, styles.buttonColor]}
            disabled={
              !chosenLocation ||
              chosenLocation.compound.province !== "Hồ Chí Minh" ||
              chosenLocation.formatted_address ===
                route.params.chosenAddress.addressBody ||
              chosenLocation.address_components.length < 4 ||
              isLoading ||
              isDeleting
            }
            onPress={handleUpdateAddress}
          >
            {isLoading ? (
              <ActivityIndicator color={"#6b7280"} size={"small"} />
            ) : (
              <Text className="text-lg text-center text-white font-semibold">
                Cập nhật địa chỉ
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mapContainer: {
    height: 300,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  textInput: {
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
  },
  suggestionsContainer: {
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "white",
  },
  deleteButtonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 4,
  },
  buttonStyle: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 14,
  },
  buttonColor: {
    backgroundColor: mainBlue,
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  outlineButton: {
    borderColor: mainBlue,
  },
});
