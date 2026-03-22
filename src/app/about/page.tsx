"use client";

import { motion } from "framer-motion";
import { Cloud, Target, Users, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FeaturePanel } from "@/components/ui/feature-panel";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { focusAreas } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <PageShell>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <SectionHeading
            eyebrow="Core Directives"
            title="A student-led cloud community built around practice."
            description="AWS Cloud Club at Atria is for students who want hands-on cloud work, sharper technical foundations, and a space to build with others."
          />
        </motion.div>

        <div className="mb-32 grid grid-cols-1 gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-white border-2 border-[#7c5aed]/5 shadow-[12px_12px_0px_0px_rgba(124,90,237,0.04)]">
              <CardHeader className="border-b border-[#7c5aed]/10 pb-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center border-2 border-[#7c5aed]/20 bg-[#7c5aed]/5 text-[#7c5aed]">
                    <Target className="h-7 w-7" />
                </div>
                <CardTitle className="text-4xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <p className="text-lg font-medium leading-relaxed text-[#1a1a1b]/80">
                    To cultivate a community of cloud-native builders who actively shape the future of technology by mastering Amazon Web Services and participating in the global developer ecosystem.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full bg-white border-2 border-[#7c5aed]/5 shadow-[12px_12px_0px_0px_rgba(124,90,237,0.04)]">
              <CardHeader className="border-b border-[#7c5aed]/10 pb-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center border-2 border-[#7c5aed]/20 bg-[#7c5aed]/5 text-[#7c5aed]">
                    <Users className="h-7 w-7" />
                </div>
                <CardTitle className="text-4xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <p className="text-lg font-medium leading-relaxed text-[#1a1a1b]/80">
                    Equip students with the practical skills, industry certifications, and hands-on project experience necessary to thrive in the competitive cloud computing landscape.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative geometric-block p-10 md:p-16 overflow-hidden bg-white/50 border-2 border-[#7c5aed]/10 shadow-[20px_20px_0px_0px_rgba(124,90,237,0.03)]"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#f46ebb]/5 via-transparent to-[#2074d5]/5 pointer-events-none" />
          
          <div className="relative z-10">
            <SectionHeading
              eyebrow="What We Do"
              title="Programs that turn curiosity into output."
              description="Every part of the club is structured to move students from interest to skill, then from skill to real projects."
            />

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                { icon: Cloud, title: "Workshops & Training", description: focusAreas[0].description },
                { icon: Zap, title: "Hackathons & Projects", description: focusAreas[1].description },
                { icon: Target, title: "AWS Certifications", description: focusAreas[2].description },
              ].map((item) => (
                <FeaturePanel key={item.title} icon={item.icon} title={item.title} description={item.description} className="bg-white/80" />
              ))}
            </div>
          </div>
        </motion.div>
    </PageShell>
  );
}
