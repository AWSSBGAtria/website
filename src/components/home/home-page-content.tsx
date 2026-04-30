"use client";

import React from "react";
import { motion } from "framer-motion";
import ArtificialHero from "@/components/ui/artificial-hero";
import AsciiSphere from "@/components/ui/ascii-sphere";
import CloudBackground from "@/components/ui/cloud-background";
import NetworkGrid from "@/components/ui/network-grid";
import AsciiCodeRain from "@/components/ui/ascii-code-rain";
import Image from "next/image";
import Link from "next/link";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export function HomePageContent() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <ArtificialHero />

      {/* Community Mission Section */}
      <section className="relative bg-secondary py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <CloudBackground />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-80 pointer-events-none flex items-center justify-center">
          <RotatingEarth width={500} height={500} />
        </div>
        <div className="container relative z-10 px-8 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-6 block">
              Our Mission
            </span>
            <h2 className="text-[6vw] lg:text-[4vw] font-black leading-[1.1] tracking-tighter text-white uppercase mb-4">
              Building the <br /> cloud talent <br /> of{" "}
              <span className="text-primary">tomorrow</span>.
            </h2>
            {/* <h3 className="text-[5vw] lg:text-[3vw] font-black leading-[1.1] tracking-tighter text-primary uppercase">
              AWS Student Builder Group <br /> Atria Institute
            </h3> */}
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <NetworkGrid />
        </div>
        <div className="container px-8 mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="mb-20"
          >
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-secondary">
              A community where <br /> curiosity meets <br />{" "}
              <span className="text-primary">capability</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {/* Card 1: 3D Cylinder */}
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="aspect-square bg-slate-100 rounded-xl md:rounded-4xl flex items-center justify-center p-3 md:p-12"
            >
              <div className="w-full h-full bg-primary rounded-lg md:rounded-2xl shadow-[0_10px_30px_rgba(79,70,229,0.2)] md:shadow-[0_20px_50px_rgba(79,70,229,0.3)] transform -rotate-3 flex items-center justify-center text-white font-black text-xs md:text-2xl">
                <Image
                  src="/AWS.svg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-6 h-6 md:w-24 md:h-24"
                />
              </div>
            </motion.div>

            {/* Card 2: Team Photo */}
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="aspect-square bg-slate-200 rounded-xl md:rounded-4xl overflow-hidden group"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Community"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* Card 3: Code Icon */}
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="aspect-square bg-primary rounded-xl md:rounded-4xl flex items-center justify-center p-3 md:p-12 shadow-[0_20px_40px_rgba(79,70,229,0.1)] md:shadow-[0_20px_40px_rgba(79,70,229,0.2)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 md:w-24 md:h-24"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </motion.div>

            {/* Card 4: Code Rain */}
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="aspect-square bg-slate-50 rounded-xl md:rounded-4xl border border-border flex items-center justify-center overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-20">
                <AsciiCodeRain />
              </div>
              <div className="relative z-10 text-primary font-black uppercase tracking-widest md:tracking-widest text-[0.4rem] md:text-xs text-center px-1">
                Deployment
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Be with your people Section */}
      <section className="py-24 bg-white border-t border-border">
        <div className="container px-8 mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square bg-slate-50 rounded-[3rem] border border-border overflow-hidden relative group"
          >
            <div className="absolute inset-0 z-0">
              <AsciiSphere size={500} opacity={0.6} />
            </div>
            <div className="absolute inset-0 z-10 bg-linear-to-t from-white/20 to-transparent pointer-events-none" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <div className="mb-12">
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
                Our Culture
              </span>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-secondary mb-6 leading-none">
                Be with your people
              </h2>
              <p className="text-lg text-secondary/60 font-medium leading-relaxed max-w-lg">
                Connect with fellow student developers who are passionate about
                the cloud. Share ideas, collaborate on projects, and grow
                together in a supportive environment designed for builders.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/50">
              <div>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-2 block">
                  Monthly
                </span>
                <p className="text-3xl font-black tracking-tighter text-secondary">
                  MEETUPS
                </p>
              </div>
              <div>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-2 block">
                  Hands-on
                </span>
                <p className="text-3xl font-black tracking-tighter text-secondary">
                  WORKSHOPS
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <NetworkGrid />
        </div>
        <div className="container px-8 mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <h2 className="text-[5vw] font-black tracking-tighter leading-none mb-12 uppercase">
              Ready to <br /> start building?
            </h2>
            <Link
              href={"/join"}
              target={"_blank"}
              className="px-16 py-6 bg-white text-primary font-black uppercase tracking-widest text-lg hover:bg-slate-100 transition-colors"
            >
              Become a Member Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
