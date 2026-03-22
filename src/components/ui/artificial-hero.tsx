"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ArtificialHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const grainCanvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<{x: number, y: number, z: number, age: number}[]>([]);
  const frameRef = useRef(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // No cloud interaction
    };

    mouseRef.current.x = window.innerWidth / 2;
    mouseRef.current.y = window.innerHeight / 2;

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const grainCanvas = grainCanvasRef.current;
    if (!canvas || !grainCanvas) return;
    const ctx = canvas.getContext("2d");
    const grainCtx = grainCanvas.getContext("2d");
    if (!ctx || !grainCtx) return;

    const density = " .:-=+*#%@";

    const params = {
      rotation: 0,
      glitchIntensity: 0,
    };

    gsap.to(params, {
      rotation: Math.PI * 2,
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    const onScrollUpdate = (self: { progress: number }) => {
      const progress = self.progress;
      const content = document.getElementById("hero-main-content");
      if (content) {
        content.style.transform = `translateY(${-progress * 100}px)`;
        content.style.opacity = Math.max(0, 1 - progress * 2).toString();
      }
    };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: onScrollUpdate,
    });

    const grainPatternCanvas = document.createElement("canvas");
    grainPatternCanvas.width = 256;
    grainPatternCanvas.height = 256;
    const gPctx = grainPatternCanvas.getContext("2d");
    if (!gPctx) return;
    const grainData = gPctx.createImageData(256, 256);
    for (let i = 0; i < grainData.data.length; i += 4) {
      const val = Math.random() * 255;
      grainData.data[i] = grainData.data[i + 1] = grainData.data[i + 2] = 124;
      grainData.data[i + 3] = val * 0.04;
    }
    gPctx.putImageData(grainData, 0, 0);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      grainCanvas.width = parent.clientWidth;
      grainCanvas.height = parent.clientHeight;
      if (frontCanvasRef.current) {
        frontCanvasRef.current.width = parent.clientWidth;
        frontCanvasRef.current.height = parent.clientHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    function render() {
      timeRef.current += 0.016;
      const width = canvas!.width;
      const height = canvas!.height;

      // Fill entire local canvas, which perfectly matches Solid Center Container boundaries
      ctx!.fillStyle = "#ffffff";
      ctx!.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.26;

      ctx!.font = 'bold 12px "JetBrains Mono", monospace';
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";

      const spacing = 14;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      for (let i = 0; i < cols && i < 120; i++) {
        for (let j = 0; j < rows && j < 80; j++) {
          const x = (i - Math.min(cols, 120) / 2) * spacing + centerX;
          const y = (j - Math.min(rows, 80) / 2) * spacing + centerY;
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius) {
            const z = Math.sqrt(Math.max(0, radius * radius - dx * dx - dy * dy));
            const angle = params.rotation;
            const rotZ = dx * Math.sin(angle) + z * Math.cos(angle);
            const brightness = (rotZ + radius) / (radius * 2);

            if (rotZ > -radius * 0.4) {
              const charIndex = Math.floor(brightness * (density.length - 1));
              const char = density[charIndex];
              const alpha = Math.max(0.15, brightness * 0.7);
              ctx!.fillStyle = `rgba(124, 90, 237, ${alpha})`;
              ctx!.fillText(char, x, y);
            }
          }
        }
      }

      grainCtx!.clearRect(0, 0, width, height);
      grainCtx!.globalAlpha = 0.05;

      for (let x = 0; x < width; x += 256) {
        for (let y = 0; y < height; y += 256) {
          grainCtx!.drawImage(grainPatternCanvas, x, y);
        }
      }

      const frontCanvas = frontCanvasRef.current;
      const frontCtx = frontCanvas?.getContext("2d");
      if (frontCtx) frontCtx.clearRect(0, 0, width, height);

      const orbitSpeed = 1.2;
      const t = timeRef.current * orbitSpeed;
      const angleZ = 45 * (Math.PI / 180);
      const angleX = -35 * (Math.PI / 180);
      const orbitRx = Math.min(width * 0.45, 600);
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
        const last = trailRef.current[trailRef.current.length - 1];
        if (!last || Math.abs(last.x - screenX) > 2 || Math.abs(last.y - screenY) > 2) {
          trailRef.current.push({ x: screenX, y: screenY, z: depth, age: 0 });
        }
      }
      trailRef.current.forEach(dot => { dot.age += 0.016; });
      trailRef.current = trailRef.current.filter(dot => dot.age < 1.5);

      trailRef.current.forEach((dot) => {
        if (isOccluded(dot.x, dot.y, dot.z)) return;
        
        const targetCtx = dot.z > 0 ? frontCtx : ctx;
        if (targetCtx) {
          const fade = Math.max(0, 1 - dot.age / 1.5);
          targetCtx.globalAlpha = fade * 0.8;
          targetCtx.fillStyle = '#7c5aed';
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
          planeCtx.strokeStyle = '#7c5aed';
          
          planeCtx.beginPath();
          planeCtx.moveTo(20, 0);
          planeCtx.lineTo(-15, 12);
          planeCtx.lineTo(-8, 0);
          planeCtx.closePath();
          planeCtx.stroke();
          
          planeCtx.beginPath();
          planeCtx.moveTo(20, 0);
          planeCtx.lineTo(-15, -12);
          planeCtx.lineTo(-8, 0);
          planeCtx.closePath();
          planeCtx.stroke();
          
          planeCtx.beginPath();
          planeCtx.moveTo(20, 0);
          planeCtx.lineTo(-8, 0);
          planeCtx.lineTo(-8, 6);
          planeCtx.closePath();
          planeCtx.stroke();

          planeCtx.restore();
        }
      }

      frameRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-white overflow-hidden geometric-grid">
      {/* Abstract Blocks on Edges aligned to 60px grid */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="bg-block bg-block-pink w-[300px] h-[300px] absolute" style={{ top: "120px", left: "calc(50% - 840px)", opacity: 0.1 }} />
        <div className="bg-block bg-block-purple w-[240px] h-[240px] absolute" style={{ top: "480px", left: "calc(50% + 600px)", opacity: 0.12 }} />
        <div className="bg-block bg-block-blue w-[180px] h-[180px] absolute" style={{ top: "180px", left: "calc(50% + 540px)", opacity: 0.15 }} />
      </div>

      <div className="sticky top-0 h-screen w-full flex justify-center">
        {/* Solid Center Container */}
        <div className="relative w-full max-w-[1440px] min-h-screen bg-white">

            {/* Passive Floating Clouds */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute animate-pulse`}
                        style={{
                            left: `${(i * 37) % 80 + 10}%`,
                            top: `${(i * 23) % 70 + 15}%`,
                            opacity: 0.8,
                            animationDuration: `${4 + (i%3)*2}s`
                        }}
                    >
                        <CloudSvg className={`w-32 h-32 md:w-48 md:h-48 text-[#7c5aed]/20 transition-transform`} />
                    </div>
                ))}
            </div>

          <div
            id="hero-main-content"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
          >
            <div
              id="hero-aws-title"
              className="font-[family-name:var(--font-display)] text-[clamp(4.5rem,20vw,16rem)] font-black text-transparent leading-[0.8] tracking-tighter"
              style={{ WebkitTextStroke: "2.5px #7c5aed" }}
            >
              AWS
            </div>

            <div
              id="hero-title"
              className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,12rem)] font-black text-[#1a1a1b] leading-[0.8] tracking-tighter mt-2 drop-shadow-[0_10px_30px_rgba(124,90,237,0.15)]"
            >
              CLOUD CLUB
            </div>

            <div className="mt-16 flex flex-col items-center gap-6">
              <div className="px-10 py-4 border-2 border-[#7c5aed]/20 bg-white/80 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(124,90,237,0.1)]">
                <p className="font-[family-name:var(--font-mono)] text-[14px] font-black uppercase tracking-[0.5em] text-[#7c5aed]">
                  Atria Institute of Technology
                </p>
              </div>
            </div>
          </div>

          <canvas ref={canvasRef} style={{ position: "absolute", zIndex: 10, inset: 0, width: "100%", height: "100%" }} />
          <canvas ref={frontCanvasRef} style={{ position: "absolute", zIndex: 30, inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
          <canvas
            ref={grainCanvasRef}
            style={{
              position: "absolute",
              zIndex: 40,
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              mixBlendMode: "multiply",
              opacity: 0.08,
            }}
          />
        </div>
      </div>
    </div>
  );
};

function CloudSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 120" fill="none" className={className}>
      <path
        d="M55 93h106c23 0 40-13 40-33 0-18-14-31-33-32-5-20-23-33-46-33-27 0-47 17-51 41C40 38 20 54 20 76c0 10 4 17 10 23 7 6 15 9 25 9Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.1"
      />
    </svg>
  );
}
