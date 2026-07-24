"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const updatePreference = () => setEnabled(!reducedMotion.matches);

    updatePreference();
    reducedMotion.addEventListener("change", updatePreference);

    return () => reducedMotion.removeEventListener("change", updatePreference);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.075,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        anchors: {
          duration: 1.2,
          easing: (value) => 1 - Math.pow(1 - value, 4),
        },
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
