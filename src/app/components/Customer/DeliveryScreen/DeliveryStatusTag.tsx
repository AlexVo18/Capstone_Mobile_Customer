import { Text, View } from "react-native";
import React from "react";
import { cn } from "~/src/app/utils/cn";

interface Props {
  status: string;
}

const DeliveryStatusTag = ({ status }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "created":
        return "bg-yellow-400";
      case "delivering":
        return "bg-blue-700";
      case "completed":
        return "bg-emerald-500";
      case "processedafterfailure":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };
  return (
    <View
      className={cn(
        `p-1 rounded-2xl px-2 py-1 absolute bottom-0 -right-[20px] ${status.toLowerCase() === "processedafterfailure" && "w-32"}`,
        getStatusColor(status)
      )}
    >
      <Text className="text-center text-sm text-white">
        {status.toLowerCase() === "created"
          ? "Mới"
          : status.toLowerCase() === "delivering"
            ? "Đang giao"
            : status.toLowerCase() === "completed"
              ? "Hoàn thành"
              : status.toLowerCase() === "processedafterfailure"
                ? "Đã xử lý lại"
                : "Thất bại"}
      </Text>
    </View>
  );
};

export default DeliveryStatusTag;
