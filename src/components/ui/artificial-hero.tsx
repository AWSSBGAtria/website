"use client";

import React from "react";
import { motion } from "framer-motion";
import AsciiSphere from "./ascii-sphere";
import Link from "next/link";

export default function ArtificialHero() {
  return (
    <section className="relative pt-17.5 bg-white border-b border-border overflow-hidden min-h-[85vh] flex flex-col items-stretch">
      <div className="container mx-auto px-8 flex-1 flex flex-col justify-center py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 lg:mb-20 relative z-10 max-w-4xl"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] font-black leading-[0.88] tracking-tighter uppercase text-secondary">
            AWS STUDENT <br className="hidden sm:inline" />
            BUILDER GROUP{" "}
            <span className="text-primary block sm:inline">
              <br className="hidden sm:inline" /> @ ATRIA
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start pt-8 lg:pt-12 border-t border-border/50 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-1 text-xs sm:text-sm md:text-[0.9rem] font-bold uppercase tracking-widest text-secondary/70"
          >
            <p>Empowering Students</p>
            <p>Atria Institute of Technology</p>
            <p>Bengaluru, India</p>
            <p className="text-primary font-extrabold">Community Driven</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-6 sm:gap-8"
          >
            <p className="text-base sm:text-lg lg:text-[1.1rem] font-medium leading-relaxed text-secondary/80 max-w-lg">
              The official AWS Student Builder Group at Atria I.T. Join a
              vibrant community of student developers, cloud enthusiasts, and
              future architects building on the world&apos;s most comprehensive
              cloud platform.
            </p>

            <Link
              href={"/whatsapp"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit px-8 sm:px-10 py-3.5 sm:py-4 border-2 border-primary text-primary text-xs sm:text-[0.8rem] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none"
            >
              Join the Community ↗
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Sphere Animation on the Right for Medium-Large Screens */}
      <div className="hidden lg:flex absolute right-0 top-17.5 bottom-0 w-[45%] xl:w-[40%] items-center justify-center pointer-events-none overflow-hidden opacity-40 xl:opacity-50">
        <AsciiSphere size={600} opacity={0.4} />
      </div>
    </section>
  );
}
