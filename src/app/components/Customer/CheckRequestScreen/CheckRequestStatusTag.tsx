import { Text, View } from "react-native";
import React from "react";
import { cn } from "~/src/app/utils/cn";

interface Props {
  status: string;
}

const CheckRequestStatusTag = ({ status }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "notsigned":
        return "bg-yellow-400";
      case "signed":
        return "bg-sky-600";
      case "shipping":
        return "bg-blue-700";
      case "renting":
        return "bg-lime-600";
      case "completed":
        return "bg-emerald-500";
      case "inspectionpending":
        return "bg-yellow-400";
      case "inspectioninprogress":
        return "bg-blue-700";
      case "awaitingrefundinvoice":
        return "bg-lime-600";
      default:
        return "bg-red-600";
    }
  };
  return (
    <View
      className={cn(
        `p-1 rounded-2xl px-2 py-1 absolute bottom-0 -right-[20px]`,
        getStatusColor(status)
      )}
    >
      <Text className="text-center text-sm text-white">
        {status.toLowerCase() === "notsigned"
          ? "Chưa ký"
          : status.toLowerCase() === "signed"
            ? "Đã ký"
            : status.toLowerCase() === "shipping"
              ? "Đang giao"
              : status.toLowerCase() === "renting"
                ? "Đang được thuê"
                : status.toLowerCase() === "completed"
                  ? "Đã hoàn tất"
                  : status.toLowerCase() === "inspectionpending"
                    ? "Đợi kiểm tra"
                    : status.toLowerCase() === "inspectioninprogress"
                      ? "Đang kiểm tra"
                      : status.toLowerCase() === "awaitingrefundinvoice"
                        ? "Đợi hoàn tiền"
                        : "Đã hủy"}
      </Text>
    </View>
  );
};

export default CheckRequestStatusTag;
