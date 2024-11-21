export function formatTime(str: string) {
  // Create a new Date object from the date string
  const date = new Date(str);

  // Get hours, minutes, and seconds
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Return the formatted time
  return `${hours}:${minutes}:${seconds}`;
}
