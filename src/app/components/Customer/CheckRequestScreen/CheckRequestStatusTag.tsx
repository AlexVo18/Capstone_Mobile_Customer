import { Text, View } from "react-native";
import React from "react";
import { cn } from "~/src/app/utils/cn";

interface Props {
  status: string;
}

const CheckRequestStatusTag = ({ status }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-muted-foreground";
      case "assigned":
        return "bg-blue-700";
      case "processing":
        return "bg-yellow-400";
      case "completed":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };
  return (
    <View
      className={cn(
        `p-1 rounded-2xl px-2 py-1 absolute bottom-0 -right-[20px] ${status.toLowerCase() === "assigned" && "w-32"}`,
        getStatusColor(status)
      )}
    >
      <Text className="text-center text-sm text-white">
        {status.toLowerCase() === "new"
          ? "Mới"
          : status.toLowerCase() === "assigned"
            ? "Đã cử nhân viên"
            : status.toLowerCase() === "processing"
              ? "Tiến hành"
              : status.toLowerCase() === "completed"
                ? "Hoàn tất"
                : "Đã hủy"}
      </Text>
    </View>
  );
};

export default CheckRequestStatusTag;
