import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Sử dụng cho việc thêm className vào 1 component đã tạo sẵn
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
