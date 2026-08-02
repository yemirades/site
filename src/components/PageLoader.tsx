"use client";

import { useEffect, useState } from "react";

const MINIMUM_DURATION = 1450;
const EXIT_DELAY = 180;
const EXIT_DURATION = 720;

export function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const previousOverflow = document.body.style.overflow;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let pageReady = document.readyState === "complete";
    let animationFrame = 0;
    let exitTimer = 0;
    let removeTimer = 0;
    let lastProgress = -1;

    document.body.style.overflow = "hidden";

    const markReady = () => {
      pageReady = true;
    };

    const finish = () => {
      exitTimer = window.setTimeout(() => {
        setExiting(true);
        document.body.style.overflow = previousOverflow;
        removeTimer = window.setTimeout(
          () => setVisible(false),
          prefersReducedMotion ? 20 : EXIT_DURATION,
        );
      }, prefersReducedMotion ? 20 : EXIT_DELAY);
    };

    const update = (now: number) => {
      const elapsed = now - startedAt;
      const duration = prefersReducedMotion ? 120 : MINIMUM_DURATION;
      const waitingProgress = Math.min(92, (elapsed / duration) * 92);
      const readyProgress = Math.min(100, (elapsed / duration) * 100);
      const nextProgress = Math.floor(pageReady ? readyProgress : waitingProgress);

      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }

      if (nextProgress >= 100) {
        finish();
        return;
      }

      animationFrame = window.requestAnimationFrame(update);
    };

    window.addEventListener("load", markReady, { once: true });
    animationFrame = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("load", markReady);
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="page-loader"
      data-exiting={exiting}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress}%`}
    >
      <div className="page-loader__topline">
        <span>yemirades.com</span>
        <span>portfolio / 2026</span>
      </div>

      <div className="page-loader__progress" aria-hidden="true">
        <span>{String(progress).padStart(2, "0")}</span>
        <span className="page-loader__percent">%</span>
      </div>

      <div className="page-loader__track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
}
