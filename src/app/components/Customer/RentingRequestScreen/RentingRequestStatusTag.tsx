import { Text, View } from "react-native";
import React from "react";
import { cn } from "~/src/app/utils/cn";

interface Props {
  status: string;
}

const RentingRequestStatusTag = ({ status }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "shipped":
        return "bg-lime-600";
      case "unpaid":
        return "bg-yellow-400";
      case "signed":
        return "bg-blue-700";
      default:
        return "bg-red-600";
    }
  };
  return (
    <View
      className={cn(
        `p-1 rounded-2xl px-2 py-1 absolute bottom-0 -right-[20px] w-fit`,
        getStatusColor(status)
      )}
    >
      <Text className="text-center text-sm text-white">
        {status.toLowerCase() === "shipped"
          ? "Đã giao"
          : status.toLowerCase() === "unpaid"
            ? "Chưa trả cọc"
            : status.toLowerCase() === "signed"
              ? "Đã ký"
              : "Đã hủy"}
      </Text>
    </View>
  );
};

export default RentingRequestStatusTag;
