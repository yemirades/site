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

  const [hours = "", minutes = ""] = time.split(":");

  return (
    <span className="tabular-nums" aria-label={time || undefined}>
      {time ? (
        <>
          {hours}
          <span aria-hidden="true" className="clock-colon">
            :
          </span>
          {minutes}
        </>
      ) : (
        <span aria-hidden="true">&nbsp;</span>
      )}
    </span>
  );
}
