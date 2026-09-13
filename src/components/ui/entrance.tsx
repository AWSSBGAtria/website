import React from "react";

// Shared entrance system: the same compositor-thread line-mask reveal
// and fade-up used by the home hero. Pure CSS keyframes (see globals.css),
// so entrances stay smooth even while canvases render on the main thread.
// Server-safe: no hooks, usable from server and client components.

export function EntranceLines({
  lines,
  className = "",
  baseDelay = 0.05,
  step = 0.12,
}: {
  lines: React.ReactNode[];
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden pb-[0.09em] -mb-[0.09em]"
        >
          <span
            className={`hero-line block whitespace-nowrap ${className}`}
            style={{ animationDelay: `${baseDelay + i * step}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

export function EntranceFade({
  children,
  delay = 0.5,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`hero-fade ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
