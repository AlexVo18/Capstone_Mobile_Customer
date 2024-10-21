import { StyleSheet, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { Rotate3D } from "lucide-react-native";

const SplashLoading = () => {
  // Init biến chạy từ value 1
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animateIcon = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2, // Tăng kích thước
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Giảm kích thước
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animateIcon()); // Lặp lại animation animation
    };
    animateIcon();
  }, [scaleValue]);

  return (
    <View
      className="bg-blue-700 flex justify-center items-center"
      style={styles.container}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Rotate3D color={"white"} size={120} />
      </Animated.View>
    </View>
  );
};

export default SplashLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
