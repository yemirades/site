"use client";

import { useEffect, useRef } from "react";

type TrailPoint = {
  x: number;
  y: number;
  life: number;
};

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!canvas || !finePointer.matches || reducedMotion.matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let points: TrailPoint[] = [];
    let lastX = -100;
    let lastY = -100;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const addPoint = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      const steps = Math.max(1, Math.ceil(distance / 10));

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        points.push({
          x: lastX < 0 ? event.clientX : lastX + (event.clientX - lastX) * progress,
          y: lastY < 0 ? event.clientY : lastY + (event.clientY - lastY) * progress,
          life: 1,
        });
      }

      lastX = event.clientX;
      lastY = event.clientY;
      points = points.slice(-54);
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points = points
        .map((point) => ({ ...point, life: point.life - 0.035 }))
        .filter((point) => point.life > 0);

      points.forEach((point) => {
        context.beginPath();
        context.fillStyle = `rgba(255, 97, 53, ${point.life * 0.34})`;
        context.arc(point.x, point.y, 3 + point.life * 8, 0, Math.PI * 2);
        context.fill();
      });

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", addPoint, { passive: true });
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", addPoint);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-cursor-trail
      className="pointer-events-none fixed inset-0 z-[70]"
    />
  );
}
