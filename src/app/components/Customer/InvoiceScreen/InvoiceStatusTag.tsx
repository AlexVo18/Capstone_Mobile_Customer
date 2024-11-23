import { Text, View } from "react-native";
import React from "react";
import { cn } from "~/src/app/utils/cn";

interface Props {
  status: string;
}

const InvoiceStatusTag = ({ status }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-700";
      case "paid":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };
  return (
    <View
      className={cn(
        `p-1 rounded-2xl px-2 py-1 absolute bottom-0 -right-[20px] ${status.toLowerCase() === "pending" && "w-32"}`,
        getStatusColor(status)
      )}
    >
      <Text className="text-center text-sm text-white ">
        {status.toLowerCase() === "pending"
          ? "Chưa thanh toán"
          : status.toLowerCase() === "paid"
            ? "Hoàn tất"
            : "Đã hủy"}
      </Text>
    </View>
  );
};

export default InvoiceStatusTag;
