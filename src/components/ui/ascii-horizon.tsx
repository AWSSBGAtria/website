"use client";

import React, { useEffect, useRef } from "react";

interface AsciiHorizonProps {
  className?: string;
  color?: string;
  opacity?: number;
  bands?: number;
}

// Drifting ASCII strata: layered sine bands drawn as glyphs.
// Deliberately cheap (~cols x bands fillText calls per frame) so it
// never competes with UI transitions on the main thread.
export default function AsciiHorizon({
  className = "",
  color = "#4F46E5",
  opacity = 0.6,
  bands = 8,
}: AsciiHorizonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(Math.random() * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    const density = " .:-=+*#%@";

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          frameRef.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    function render() {
      if (!isVisible) return;

      const width = canvas?.width || 800;
      const height = canvas?.height || 600;
      const centerY = height / 2;

      timeRef.current += 0.012;
      const t = timeRef.current;
      ctx?.clearRect(0, 0, width, height);

      if (ctx) {
        const cell = 14;
        const cols = Math.floor(width / cell);
        const rowGap = Math.min(34, height / (bands + 2));
        const amp = rowGap * 0.55;

        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let k = 0; k < bands; k++) {
          const speed = 0.5 + k * 0.09;
          const phase = k * 1.7;
          const baseY = centerY + (k - (bands - 1) / 2) * rowGap;

          for (let i = 0; i < cols; i++) {
            const x = i * cell + cell / 2;
            const wave =
              Math.sin(x * 0.018 + t * speed + phase) * amp +
              Math.sin(x * 0.043 - t * speed * 0.6 + phase * 2) * amp * 0.35;
            const slope = Math.cos(x * 0.018 + t * speed + phase);
            const depth = 1 - Math.abs(k - (bands - 1) / 2) / bands;
            const level = Math.min(
              density.length - 1,
              Math.floor(
                (Math.abs(slope) * 0.6 + depth * 0.4) * density.length,
              ),
            );

            ctx.fillStyle = color;
            ctx.globalAlpha = 0.15 + depth * 0.55;
            ctx.fillText(density[level], x, baseY + wave);
            ctx.globalAlpha = 1.0;
          }
        }
      }

      frameRef.current = requestAnimationFrame(render);
    }

    render();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [color, bands]);

  return (
    <div className={`relative w-full h-full ${className}`} style={{ opacity }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
