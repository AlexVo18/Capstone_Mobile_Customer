import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  type: any;
  message: any;
  isVisible: any;
  onHide: any;
  title?: any;
}
const CustomToast = ({ type, message, isVisible, onHide, title }: Props) => {
  const [visible, setVisible] = useState(isVisible);
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        hideToast();
      }, 3000);
    }
  }, [isVisible]);

  const hideToast = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (onHide) onHide();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toast,
        type === "success"
          ? styles.success
          : type === "error"
            ? styles.error
            : styles.info, // Adding the info style conditionally
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.iconContainer}>
        {type === "success" ? (
          <MaterialIcons name="check-circle" size={24} color="#fff" />
        ) : type === "error" ? (
          <MaterialIcons name="error" size={24} color="#fff" />
        ) : (
          <MaterialIcons name="info" size={24} color="#fff" /> // Icon for info type
        )}
      </View>
      <View style={{marginRight: 20}}>
        {title && (
          <View>
            <Text
              style={styles.toastTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>
        )}
        <View>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  toast: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 1000,
    width: 300,
  },
  success: {
    backgroundColor: "#4CAF50",
  },
  error: {
    backgroundColor: "#F44336",
  },
  info: {
    backgroundColor: "#2196F3",
  },
  iconContainer: {
    marginRight: 10,
  },
  toastText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  toastTitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
