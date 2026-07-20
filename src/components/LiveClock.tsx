"use client";

import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Almaty",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000 * 10);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}
