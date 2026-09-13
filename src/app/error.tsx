"use client";

import { useEffect } from "react";
import Link from "next/link";
import { EntranceFade, EntranceLines } from "@/components/ui/entrance";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-white min-h-screen pt-17.5 flex flex-col">
      <section className="relative flex-1 flex flex-col justify-center overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[-20%] right-[-10%] w-[52rem] h-[52rem]"
            style={{
              background:
                "radial-gradient(circle, rgba(79,70,229,0.10) 0%, transparent 65%)",
            }}
          />
        </div>
        <div className="container mx-auto px-8 py-24 relative z-10">
          <p className="font-black tracking-tighter leading-none text-secondary text-[28vw] sm:text-[10rem] lg:text-[14rem]">
            500
          </p>
          <h1 className="font-black uppercase text-secondary tracking-tighter leading-[0.9] text-5xl sm:text-7xl mt-4 mb-8">
            <EntranceLines lines={["Something", "broke."]} />
          </h1>
          <EntranceFade delay={0.4}>
            <p className="text-base sm:text-lg font-medium leading-relaxed text-secondary/70 max-w-lg">
              An unexpected error stopped this page. Try again, or head back
              home and keep building with us.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center gap-2 w-fit px-8 sm:px-10 py-3.5 sm:py-4 bg-primary text-white text-xs sm:text-[0.8rem] font-bold uppercase tracking-widest hover:bg-secondary transition-all active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none"
              >
                Try again
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 w-fit px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-primary text-primary text-xs sm:text-[0.8rem] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-[0.98] focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none"
              >
                Back to home
              </Link>
            </div>
          </EntranceFade>
        </div>
      </section>
    </div>
  );
}
