import axios from "axios";
import { CircleX } from "lucide-react-native";
import { useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { mainBlue, mutedForground } from "../../constants/cssConstants";

type MarkerPosition = {
  latitude: number;
  longitude: number;
} | null;

const GOONG_API_KEY = "Rbn6B9ATYJdi23CqzCa5aGWpLp1nxE9wdpeESNgp";

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 10.76391,
    longitude: 106.68217,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [address, setAddress] = useState("");
  const [marker, setMarker] = useState<MarkerPosition>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Function to fetch address suggestions based on input
  const fetchAddressSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://rsapi.goong.io/Place/AutoComplete?input=${encodeURIComponent(input)}&api_key=${GOONG_API_KEY}`
      );
      const predictions = response.data.predictions;

      // Update suggestions
      const suggestionList = predictions.map((item: any) => item.description);
      setSuggestions(suggestionList);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch suggestions.");
    }
  };

  // Function to handle when user selects a suggestion
  const handleSuggestionSelect = async (selectedAddress: string) => {
    setAddress(selectedAddress);
    setSuggestions([]);

    try {
      const response = await axios.get(
        `https://rsapi.goong.io/Geocode?address=${encodeURIComponent(selectedAddress)}&api_key=${GOONG_API_KEY}`
      );

      const result = response.data.results[0];

      if (result) {
        const { lat, lng } = result.geometry.location;

        // Update map region to the selected address
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // Set a marker at the selected address
        setMarker({
          latitude: lat,
          longitude: lng,
        });
      } else {
        Alert.alert("Address not found", "Please try a different search term.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong while selecting the address.");
    }
  };

  return (
    <View className="flex-1">
      {/* Search Input */}
      <View className="z-[1] bg-white p-3 grid grid-cols-4 gap-2">
        <View className="col-span-3 relative">
          <TextInput
            style={{ flex: 1 }}
            className="p-4 text-lg border border-gray-300 rounded-lg" // Increased padding and text size
            placeholder="Nhập địa chỉ"
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              fetchAddressSuggestions(text);
            }}
          />
          {address.length > 0 && (
            <TouchableOpacity
              onPress={() => setAddress("")}
              className="absolute right-3 top-3"
            >
              <CircleX color={`hsl(${mutedForground})`} />
            </TouchableOpacity>
          )}
        </View>
        <View className="col-span-1">
          <Button mode="contained" buttonColor={mainBlue} textColor="white">
            Chọn
          </Button>
        </View>
      </View>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionSelect(item)}>
              <Text className="p-2 border-b border-gray-300">{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          className="absolute z-10 bg-white w-full top-20 max-h-48 rounded-lg shadow"
        />
      )}

      {/* Goong Map */}
      <MapView style={styles.map} region={region}>
        <UrlTile
          urlTemplate={`https://tile.goong.io/assets/goong_map_web/{z}/{x}/{y}.png?api_key=${GOONG_API_KEY}`}
          maximumZ={19}
        />

        {/* Marker for the selected location */}
        {marker && (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title="Selected Location"
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
