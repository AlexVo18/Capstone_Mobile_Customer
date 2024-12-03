export function formatVND(amount: number) {
  if (amount != null) {
    const formattedAmount = amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    });

    return formattedAmount;
  }
  return "";
}
