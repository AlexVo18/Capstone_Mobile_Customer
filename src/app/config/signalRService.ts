// signalRService.ts
import * as signalR from "@microsoft/signalr";

// Khai báo type

let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (
  url: string
): Promise<signalR.HubConnection | null> => {
  // Connect BE
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`https://khang.systems/${url}`) // Backend URL
    .withAutomaticReconnect()
    .build();

  await connection.start();
  console.log("SignalR connected");

  return connection;
};

// Tắt connection
export const stopSignalRConnection = async (): Promise<void> => {
  if (connection) {
    await connection.stop();
  }
};
