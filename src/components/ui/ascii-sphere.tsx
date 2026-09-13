"use client";

import React, { useEffect, useRef } from "react";

interface AsciiSphereProps {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
}

export default function AsciiSphere({ 
  className = "", 
  size = 600, 
  color = "#4F46E5",
  opacity = 0.5 
}: AsciiSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<{x: number, y: number, z: number, age: number}[]>([]);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!canvas || !frontCanvas) return;
    const ctx = canvas.getContext("2d");
    const frontCtx = frontCanvas.getContext("2d");
    if (!ctx || !frontCtx) return;

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

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      frontCanvas.width = parent.clientWidth;
      frontCanvas.height = parent.clientHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    function render() {
      if (!isVisible) return;

      const width = canvas?.width || size;
      const height = canvas?.height || size;
      const centerX = width / 2;
      const centerY = height / 2;

      timeRef.current += 0.01;
      ctx?.clearRect(0, 0, width, height);
      frontCtx?.clearRect(0, 0, width, height);

      // ASCII Sphere Logic
      if (ctx) {
        const sphereRadius = Math.min(width, height) * 0.26;
        const spacing = 12;
        const cols = Math.floor(width / spacing);
        const rows = Math.floor(height / spacing);

        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const rotation = timeRef.current * 0.5;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const x = (i - cols / 2) * spacing + centerX;
            const y = (j - rows / 2) * spacing + centerY;
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < sphereRadius) {
              const z = Math.sqrt(Math.max(0, sphereRadius * sphereRadius - dx * dx - dy * dy));
              const rotZ = dx * Math.sin(rotation) + z * Math.cos(rotation);
              const brightness = (rotZ + sphereRadius) / (sphereRadius * 2);

              if (rotZ > -sphereRadius * 0.4) {
                const charIndex = Math.floor(brightness * (density.length - 1));
                const char = density[charIndex];
                const alpha = Math.max(0.1, brightness * 0.6);
                ctx.fillStyle = color;
                ctx.globalAlpha = alpha;
                ctx.fillText(char, x, y);
                ctx.globalAlpha = 1.0;
              }
            }
          }
        }
      }

      // Orbit Logic (Paper Plane)
      const orbitSpeed = 1.2;
      const t = timeRef.current * orbitSpeed;
      const angleZ = 45 * (Math.PI / 180);
      const angleX = -35 * (Math.PI / 180);
      const orbitRx = Math.min(width * 0.45, size * 0.4);
      const orbitRz = orbitRx * 0.35;

      const base_x = Math.cos(t) * orbitRx;
      const base_z = Math.sin(t) * orbitRz;
      const y1 = -base_z * Math.sin(angleX);
      const z1 = base_z * Math.cos(angleX);
      const x2 = base_x * Math.cos(angleZ) - y1 * Math.sin(angleZ);
      const y2 = base_x * Math.sin(angleZ) + y1 * Math.cos(angleZ);
      
      const screenX = centerX + x2;
      const screenY = centerY + y2;
      const depth = z1;

      const t_next = t + 0.05;
      const nx = Math.cos(t_next) * orbitRx;
      const nz = Math.sin(t_next) * orbitRz;
      const ny1 = -nz * Math.sin(angleX);
      const nx2 = nx * Math.cos(angleZ) - ny1 * Math.sin(angleZ);
      const ny2 = nx * Math.sin(angleZ) + ny1 * Math.cos(angleZ);
      const angle2D = Math.atan2((centerY + ny2) - screenY, (centerX + nx2) - screenX);

      const sphereRadius = Math.min(width, height) * 0.26;
      const isOccluded = (x: number, y: number, z: number) => {
        if (z > 0) return false;
        const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        return dist < sphereRadius;
      };

      if (Math.floor(timeRef.current * 60) % 3 === 0) {
        trailRef.current.push({ x: screenX, y: screenY, z: depth, age: 0 });
      }
      trailRef.current.forEach(dot => { dot.age += 0.016; });
      trailRef.current = trailRef.current.filter(dot => dot.age < 1.5);

      trailRef.current.forEach((dot) => {
        if (isOccluded(dot.x, dot.y, dot.z)) return;
        const targetCtx = dot.z > 0 ? frontCtx : ctx;
        if (targetCtx) {
          const fade = Math.max(0, 1 - dot.age / 1.5);
          targetCtx.globalAlpha = fade * 0.8;
          targetCtx.fillStyle = color;
          targetCtx.beginPath();
          targetCtx.arc(dot.x, dot.y, 2 * fade, 0, Math.PI * 2);
          targetCtx.fill();
          targetCtx.globalAlpha = 1.0;
        }
      });

      if (!isOccluded(screenX, screenY, depth)) {
        const planeCtx = depth > 0 ? frontCtx : ctx;
        if (planeCtx) {
          planeCtx.save();
          planeCtx.translate(screenX, screenY);
          planeCtx.rotate(angle2D);
          const scale = 1 + (depth / orbitRz) * 0.3;
          planeCtx.scale(scale, scale);
          planeCtx.lineWidth = 1.5;
          planeCtx.strokeStyle = color;
          
          planeCtx.beginPath();
          planeCtx.moveTo(15, 0);
          planeCtx.lineTo(-10, 8);
          planeCtx.lineTo(-5, 0);
          planeCtx.closePath();
          planeCtx.stroke();
          
          planeCtx.beginPath();
          planeCtx.moveTo(15, 0);
          planeCtx.lineTo(-10, -8);
          planeCtx.lineTo(-5, 0);
          planeCtx.closePath();
          planeCtx.stroke();
          
          planeCtx.restore();
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
  }, [color, size]);

  return (
    <div className={`relative w-full h-full ${className}`} style={{ opacity }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <canvas ref={frontCanvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
