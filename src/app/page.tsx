"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Target, Users2 } from "lucide-react";
import Link from "next/link";
import { ArtificialHero } from "@/components/ui/artificial-hero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeaturePanel } from "@/components/ui/feature-panel";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { focusAreas, homeEvents } from "@/lib/site-data";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative z-10 w-full">
        <ArtificialHero />
      </div>

      <PageShell className="px-4 pt-12 md:px-6">
          <div className="max-w-5xl mx-auto space-y-12 py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <SectionHeading
                align="center"
                eyebrow="Why This Club"
                title="Built for those who ship."
                description="We focus on real-world AWS workflows, cloud-native engineering, and building a community of proactive builders."
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {focusAreas.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="h-full bg-white border-2 border-[#7c5aed]/10 group transition-all shadow-[6px_6px_0px_0px_rgba(124,90,237,0.02)] hover:shadow-[10px_10px_0px_0px_rgba(124,90,237,0.05)] hover:-translate-y-2">
                    <CardHeader className="pb-4 border-b border-[#7c5aed]/5">
                        <Badge variant="outline" className="w-fit text-[#7c5aed] border-[#7c5aed]/30 font-black mb-4">
                          0{index + 1}
                        </Badge>
                        <CardTitle className="text-xl font-black uppercase text-[#1a1a1b]">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <CardDescription className="text-[#1a1a1b]/60 font-medium leading-relaxed">{item.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center pt-4">
              <Link href="/about" className={buttonVariants({ size: "lg", variant: "default" })}>
                Discover The Story
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
      </PageShell>

      <PageShell className="px-4 py-12 md:px-6 md:py-20">
        <section id="events">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end mb-10">
            <SectionHeading
              eyebrow="Upcoming Sessions"
              title="Join the build."
              description="Join our upcoming workshops and sessions to learn AWS and cloud engineering."
            />
            <Link href="/events" className={buttonVariants({ variant: "secondary" })}>
              <CalendarDays className="h-5 w-5" />
              View All Events
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {homeEvents.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-white border-2 border-[#7c5aed]/10 transition-all shadow-[8px_8px_0px_0px_rgba(124,90,237,0.02)] hover:shadow-[12px_12px_0px_0px_rgba(124,90,237,0.05)] hover:-translate-y-2">
                  <CardHeader className="gap-4 border-none">
                    <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-[#f46ebb] border-[#f46ebb]/30 font-black">{item.date}</Badge>
                        <div className="h-[2px] flex-1 bg-[#7c5aed]/5 ml-4" />
                    </div>
                    <CardTitle className="mt-2 text-[#1a1a1b] group-hover:text-[#7c5aed] transition-all">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex h-full flex-col">
                    <CardDescription className="mb-10 text-[#1a1a1b]/60 font-medium leading-relaxed">{item.description}</CardDescription>
                    <div className="mt-auto flex items-center gap-3 font-[family-name:var(--font-mono)] text-xs font-black uppercase tracking-widest text-[#7c5aed]">
                      Register Now
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </PageShell>
    </div>
  );
}
