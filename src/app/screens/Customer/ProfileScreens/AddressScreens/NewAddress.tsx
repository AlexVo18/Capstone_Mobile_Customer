import { StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import MapLibreGL, { Logger } from "@maplibre/maplibre-react-native";

MapLibreGL.setAccessToken(null);
const NewAddress = () => {
  const mapStyleURL =
    "https://tiles.goong.io/assets/goong_map_web.json?api_key=ezmMzOjP5avaIKTm0fOJXWxykZCmGxjb6aRrfFVF";
  const camera = useRef(null);

  // Chặn spam log từ mapbox
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

  return (
    <View style={styles.page}>
      <MapLibreGL.MapView
        style={styles.map}
        logoEnabled={false}
        styleURL={mapStyleURL}
        zoomEnabled={true}
      >
        <MapLibreGL.Camera
          centerCoordinate={[106.7048655, 10.7713563]}
          ref={camera}
          zoomLevel={15.5}
        />
      </MapLibreGL.MapView>
    </View>
  );
};

export default NewAddress;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  map: {
    flex: 1,
    alignSelf: "stretch",
  },
});
