import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { CircleAlert } from "lucide-react-native";
import { mainBlue } from "../../constants/cssConstants";

interface Props {
  chosen: string | undefined;
  setChosen: React.Dispatch<React.SetStateAction<string | undefined>>;
  onPress: () => void;
  type: "RentingRequest" | "Invoice" | "MachineCheck";
  isLoading: boolean;
}

const CancelModal = ({
  chosen,
  setChosen,
  onPress,
  isLoading,
  type,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={chosen !== undefined}
      onRequestClose={() => {
        setChosen(undefined);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <CircleAlert color={"#dc2626"} size={60} />
          </View>
          <View className="pt-4">
            <Text className="text-center font-bold text-xl">
              Bạn có chắc chắn chưa ?
            </Text>
          </View>
          <View className="pb-4 pt-1">
            <Text className="text-center text-muted-foreground">
              Việc này sẽ tiếp tục với quá trình hủy{" "}
              {type === "RentingRequest"
                ? "đơn thuê"
                : type === "Invoice"
                  ? "ticket sửa chữa"
                  : type === "MachineCheck"
                    ? "yêu cầu sửa chữa"
                    : ""}{" "}
              của bạn và sẽ không thay đổi được
            </Text>
          </View>

          <View className="flex flex-col gap-2 w-full">
            {isLoading ? (
              <TouchableOpacity
                style={[styles.buttonStyle, styles.disableButtonColor]}
                disabled
              >
                {isLoading ? (
                  <ActivityIndicator color={"#6b7280"} size={"small"} />
                ) : (
                  <Text className="text-lg text-center text-gray-500 font-semibold">
                    Đồng ý
                  </Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.buttonStyle, styles.buttonColor]}
                disabled={isLoading}
                onPress={() => {
                  onPress();
                  setChosen(undefined);
                }}
              >
                {isLoading ? (
                  <ActivityIndicator color={"#6b7280"} size={"small"} />
                ) : (
                  <Text className="text-lg text-center text-white font-semibold">
                    Đồng ý
                  </Text>
                )}
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.buttonStyle, styles.cancelColor]}
              onPress={() => setChosen(undefined)}
              disabled={isLoading}
            >
              <Text className="text-center text-lg text-white font-semibold">
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CancelModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  cancelColor: {
    backgroundColor: "#d1d5db",
  },
  buttonColor: {
    backgroundColor: "#dc2626",
  },
  disableButtonColor: {
    backgroundColor: "#d1d5db",
  },
  outlineButtonColor: {
    borderColor: "#dc2626",
    borderWidth: 1,
  },
  buttonStyle: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 300,
    alignItems: "center",
  },
});
