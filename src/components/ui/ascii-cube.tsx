"use client";

import React, { useEffect, useRef } from "react";

interface AsciiCubeProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export default function AsciiCube({
  className = "",
  size = 600,
  color = "#4F46E5",
  opacity = 1,
}: AsciiCubeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const generateCube = (step: number) => {
      const pts: any[] = [];
      const add = (
        x: number,
        y: number,
        z: number,
        nx: number,
        ny: number,
        nz: number,
      ) => {
        const lx = nx + x * 0.6;
        const ly = ny + y * 0.6;
        const lz = nz + z * 0.6;
        const len = Math.sqrt(lx * lx + ly * ly + lz * lz);
        pts.push({ x, y, z, nx: lx / len, ny: ly / len, nz: lz / len });
      };
      for (let u = -1; u <= 1; u += step) {
        for (let v = -1; v <= 1; v += step) {
          add(u, v, 1, 0, 0, 1);
          add(u, v, -1, 0, 0, -1);
          add(u, 1, v, 0, 1, 0);
          add(u, -1, v, 0, -1, 0);
          add(1, u, v, 1, 0, 0);
          add(-1, u, v, -1, 0, 0);
        }
      }
      return pts;
    };
    const pts = generateCube(0.06);

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
      const width = canvas?.width || size;
      const height = canvas?.height || size;

      timeRef.current += 0.015;
      ctx?.clearRect(0, 0, width, height);

      if (ctx) {
        const spacing = 12;
        const cols = Math.floor(width / spacing);
        const rows = Math.floor(height / spacing);

        const zBuffer = new Float32Array(cols * rows).fill(-Infinity);
        const charBuffer = new Array(cols * rows).fill(" ");
        const lumBuffer = new Float32Array(cols * rows).fill(0);

        const t = timeRef.current;
        const cosA = Math.cos(t * 0.7),
          sinA = Math.sin(t * 0.7);
        const cosB = Math.cos(t * 0.5),
          sinB = Math.sin(t * 0.5);

        const scale = Math.min(cols, rows) * 1.3;

        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];

          let xy = cosA * p.y - sinA * p.z;
          let xz = sinA * p.y + cosA * p.z;

          let xx = cosB * p.x - sinB * xy;
          let yy = sinB * p.x + cosB * xy;
          let zz = xz;

          let ny1 = cosA * p.ny - sinA * p.nz;
          let nz1 = sinA * p.ny + cosA * p.nz;

          let nx2 = cosB * p.nx - sinB * ny1;
          let ny2 = sinB * p.nx + cosB * ny1;
          let nz2 = nz1;

          const K2 = 4.5;
          const zinv = 1 / (zz + K2);

          const px = Math.floor(cols / 2 + xx * scale * zinv);
          const py = Math.floor(rows / 2 + yy * scale * zinv);

          if (px >= 0 && px < cols && py >= 0 && py < rows) {
            const idx = px + py * cols;
            if (zinv > zBuffer[idx]) {
              zBuffer[idx] = zinv;
              const L = -nz2;
              lumBuffer[idx] = L;
              if (L > -0.2) {
                const charIdx = Math.floor(
                  ((L + 0.2) / 1.2) * (density.length - 1),
                );
                charBuffer[idx] =
                  density[Math.max(0, Math.min(density.length - 1, charIdx))];
              } else {
                charBuffer[idx] = " ";
              }
            }
          }
        }

        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const idx = i + j * cols;
            const c = charBuffer[idx];
            if (c !== " ") {
              const L = lumBuffer[idx];
              const alpha = Math.max(0.15, (L + 0.2) / 1.2);
              ctx.fillStyle = color;
              ctx.globalAlpha = alpha;
              ctx.fillText(
                c,
                i * spacing + spacing / 2,
                j * spacing + spacing / 2,
              );
            }
          }
        }
        ctx.globalAlpha = 1.0;
      }

      frameRef.current = requestAnimationFrame(render);
    }

    render();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [color, size]);

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
