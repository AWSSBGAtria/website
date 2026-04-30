"use client";

import React from "react";
import { motion } from "framer-motion";
import AsciiSphere from "./ascii-sphere";
import Link from "next/link";

export default function ArtificialHero() {
  return (
    <section className="relative pt-17.5 bg-white border-b border-border overflow-hidden min-h-[90vh] flex flex-col items-stretch">
      <div className="container mx-auto px-8 flex-1 flex flex-col justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 relative z-10"
        >
          <h1 className="text-[10vw] lg:text-[8vw] font-black leading-[0.8] tracking-tighter uppercase text-secondary">
            AWS STUDENT <br /> BUILDER GROUP{" "}
            <span className="text-primary">
              {" "}
              <br /> @ ATRIA
            </span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-12 border-t border-border/50 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-1 text-[0.9rem] font-bold uppercase tracking-widest text-secondary/70"
          >
            <p>Empowering Students</p>
            <p>Atria Institute of Technology</p>
            <p>Bengaluru, India</p>
            <p>Community Driven</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <p className="text-[1rem] lg:text-[1.1rem] font-medium leading-relaxed text-secondary/80 max-w-lg">
              The official AWS Student Builder Group at Atria I.T. Join a
              vibrant community of student developers, cloud enthusiasts, and
              future architects building on the world's most comprehensive cloud
              platform.
            </p>

            <Link
              href={"/whatsapp"}
              target="_blank"
              className="w-fit px-10 py-4 border border-primary text-primary text-[0.8rem] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
            >
              Join the Community ↗
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Sphere Animation on the Right for Large Screens */}
      <div className="hidden xl:flex absolute right-0 top-17.5 bottom-0 w-[40%] items-center justify-center pointer-events-none overflow-hidden opacity-50">
        <AsciiSphere size={600} opacity={0.4} />
      </div>
    </section>
  );
}
