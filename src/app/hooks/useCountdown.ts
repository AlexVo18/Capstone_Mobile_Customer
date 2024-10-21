import { useEffect, useState } from "react";

export default function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  useEffect(() => {
    // Dừng countdown
    if (secondsLeft <= 0) return;
    // Trừ tgian trong countdown
    const timeout = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  // Tạo countdown
  function start(seconds: number) {
    setSecondsLeft(seconds);
  }
  return { secondsLeft, start };
}
