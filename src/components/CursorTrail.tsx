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
      const steps = Math.max(1, Math.ceil(distance / 6));

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
      points = points.slice(-80);
    };

    const resetPointer = () => {
      lastX = -100;
      lastY = -100;
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      points = points
        .map((point) => ({ ...point, life: point.life - 0.028 }))
        .filter((point) => point.life > 0);

      context.lineCap = "round";
      context.lineJoin = "round";

      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const current = points[index];
        const life = Math.min(previous.life, current.life);
        const midpointX = (previous.x + current.x) / 2;
        const midpointY = (previous.y + current.y) / 2;

        context.beginPath();
        context.moveTo(previous.x, previous.y);
        context.quadraticCurveTo(
          midpointX,
          midpointY,
          current.x,
          current.y,
        );
        context.strokeStyle = `rgba(255, 255, 255, ${life * 0.86})`;
        context.lineWidth = 0.55 + life * 0.9;
        context.stroke();
      }

      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", addPoint, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", addPoint);
      document.documentElement.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-cursor-trail
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-difference"
    />
  );
}
