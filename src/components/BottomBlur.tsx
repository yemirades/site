"use client";

import { useEffect, useState } from "react";

export function BottomBlur() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      threshold: 0.01,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`bottom-blur backdrop-blur-[14px] transition-opacity duration-300 max-sm:backdrop-blur-[11px] ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
      aria-hidden="true"
    />
  );
}
