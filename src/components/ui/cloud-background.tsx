"use client";

import React, { useEffect, useRef } from "react";

export default function CloudBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    let animationFrameId: number;
    let particles: { x: number; y: number; radius: number; speed: number; opacity: number }[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          animationFrameId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          speed: Math.random() * 0.2 + 0.1,
          opacity: Math.random() * 0.1 + 0.05
        });
      }
    };

    const draw = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(79, 70, 229, ${p.opacity})`);
        grad.addColorStop(1, "rgba(79, 70, 229, 0)");
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speed;
        if (p.x - p.radius > canvas.width) {
          p.x = -p.radius;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}
