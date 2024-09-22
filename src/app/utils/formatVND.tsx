export function formatVND(amount: number) {
  if (amount || amount === 0)
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
}
