"use client";

import { motion } from "framer-motion";
import { Cloud, Target, Users, Zap } from "lucide-react";
import React from "react";
import AsciiCube from "@/components/ui/ascii-cube";
import AsciiSphere from "@/components/ui/ascii-sphere";
import NetworkGrid from "@/components/ui/network-grid";

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-17.5">
      {/* Header Section */}
      <section className="py-20 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15)_0%,transparent_70%)] pointer-events-none -z-10" />
        <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
          <NetworkGrid />
        </div>
        <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/3 opacity-50 pointer-events-none items-center justify-center">
          <AsciiCube size={400} />
        </div>
        <div className="container px-8 mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
          >
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
              Our Philosophy
            </span>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-secondary mb-8">
              Community built <br /> around <br /> practice.
            </h1>
            <p className="text-xl text-secondary/60 font-medium leading-relaxed max-w-2xl">
              AWS Student Builder Group at Atria is for students who want
              hands-on cloud work, sharper technical foundations, and a space to
              build with others.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision/Mission Section */}
      <section className="py-32 border-b border-border bg-slate-50/30">
        <div className="container px-8 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="p-12 bg-white border border-border group"
            >
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center mb-8 border border-border group-hover:border-primary transition-colors">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-secondary mb-6 uppercase">
                Our Vision
              </h2>
              <p className="text-lg text-secondary/60 font-medium leading-relaxed">
                To cultivate a community of cloud-native builders who actively
                shape the future of technology by mastering Amazon Web Services
                and participating in the global developer ecosystem.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              transition={{ delay: 0.1 }}
              className="p-12 bg-white border border-border group"
            >
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center mb-8 border border-border group-hover:border-primary transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl font-black tracking-tighter text-secondary mb-6 uppercase">
                Our Mission
              </h2>
              <p className="text-lg text-secondary/60 font-medium leading-relaxed">
                Equip students with the practical skills, industry
                certifications, and hands-on project experience necessary to
                thrive in the competitive cloud computing landscape.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-32 border-b border-border relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-10 pointer-events-none">
          <AsciiSphere size={500} />
        </div>
        <div className="container px-8 mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="mb-20"
          >
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
              What We Do
            </span>
            <h2 className="text-5xl lg:text-7xl font-black tracking-tighter text-secondary leading-none uppercase mb-8">
              Programs that turn <br /> curiosity into <br /> output.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Cloud,
                title: "Workshops",
                desc: "Interactive training sessions covering AWS fundamentals to advanced serverless architectures.",
              },
              {
                icon: Zap,
                title: "Projects",
                desc: "Collaborative building sessions where members work on real-world cloud applications.",
              },
              {
                icon: Target,
                title: "Certifications",
                desc: "Structured study groups and resources to help members achieve AWS Cloud Practitioner and Solutions Architect certifications.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-6"
              >
                <div className="text-primary">
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black tracking-tighter text-secondary uppercase leading-none">
                  {item.title}
                </h3>
                <p className="text-secondary/60 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
