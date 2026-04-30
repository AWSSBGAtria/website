import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen w-full bg-white geometric-grid">
      {/* Abstract Background Blocks on Edges aligned to 60px grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <div
          className="bg-block bg-block-pink w-45 h-45 absolute"
          style={{ top: "180px", left: "calc(50% - 840px)", opacity: 0.1 }}
        />
        <div
          className="bg-block bg-block-blue w-60 h-60 absolute"
          style={{ top: "120px", left: "calc(50% + 540px)", opacity: 0.12 }}
        />

        <div
          className="bg-block bg-block-purple w-45 h-45 absolute"
          style={{ top: "600px", left: "calc(50% + 720px)", opacity: 0.15 }}
        />
        <div
          className="bg-block bg-block-blue w-45 h-45 absolute"
          style={{ top: "480px", left: "calc(50% - 780px)", opacity: 0.1 }}
        />

        <div
          className="bg-block bg-block-purple w-30 h-30 absolute"
          style={{ top: "960px", left: "calc(50% + 660px)", opacity: 0.12 }}
        />
        <div
          className="bg-block bg-block-pink w-60 h-60 absolute"
          style={{ top: "1200px", left: "calc(50% + 420px)", opacity: 0.1 }}
        />
      </div>

      {/* Solid Focused Center */}
      <div
        className={cn(
          "relative z-10 mx-auto max-w-360 min-h-screen content-center px-8 md:px-16 lg:px-24 pb-20 pt-32 md:pb-32 md:pt-40",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
