// signalRService.ts
import * as signalR from "@microsoft/signalr";

// Khai báo type
interface Product {
  id: number;
  name: string;
  price: number;
}

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (
  onProductUpdate: (newProduct: Product) => void
): Promise<signalR.HubConnection | null> => {
  // Connect BE
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://your-backend-url/producthub") // Backend URL
    .withAutomaticReconnect()
    .build();

  try {
    await connection.start();
    console.log("SignalR connected");

    // Cập nhật dữ liệu
    connection.on("ReceiveProductUpdate", (newProduct: Product) => {
      onProductUpdate(newProduct);
    });
  } catch (err) {
    console.error("SignalR connection error:", err);
  }

  return connection;
};

// Tắt connection
export const stopSignalRConnection = async (): Promise<void> => {
  if (connection) {
    await connection.stop();
  }
};
