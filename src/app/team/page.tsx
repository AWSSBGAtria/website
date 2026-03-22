"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { teams } from "@/lib/site-data";

export default function TeamPage() {
  return (
    <PageShell>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <SectionHeading
            eyebrow="Personnel Roster"
            title="The people pushing the club forward."
            description="Our team of dedicated students working to build the best cloud community."
          />
        </motion.div>

        {Object.entries(teams).map(([category, members]) => (
          <div key={category} className="mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 flex w-full items-center justify-center gap-6"
            >
              <div className="h-1 flex-1 bg-[#7c5aed]/20" />
              <h2 className="shrink-0 font-[family-name:var(--font-display)] text-center text-4xl font-black uppercase leading-none tracking-tight text-[#1a1a1b]">
                {category}
              </h2>
              <div className="h-1 flex-1 bg-[#7c5aed]/20" />
            </motion.div>

            <div className="flex flex-wrap items-stretch justify-center gap-8 md:gap-12">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className={`group relative w-full ${category === "Captain" ? "max-w-[280px]" : "max-w-[280px] sm:max-w-[300px]"}`}
                >
                  <Card className="h-full flex flex-col bg-white border-2 border-[#7c5aed]/5 shadow-[10px_10px_0px_0px_rgba(124,90,237,0.03)] transition-all overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_0px_rgba(124,90,237,0.05)] group-hover:border-[#7c5aed]/20">
                    <div className="w-full aspect-square bg-[#fbfcfd] shrink-0 border-b-2 border-[#7c5aed]/5 overflow-hidden flex items-center justify-center relative">
                      <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.name)}`}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader className="items-center pb-2 pt-8">
                      <Badge variant="outline" className="mb-3 text-[#7c5aed] border-[#7c5aed]/30 font-black">{category}</Badge>
                      <CardTitle className="text-center text-xl font-bold group-hover:text-[#7c5aed] transition-colors">{member.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col items-center pb-8 pt-2">
                      <p className="mb-8 font-[family-name:var(--font-mono)] text-xs font-black uppercase tracking-widest text-[#1a1a1b]/40 text-center line-clamp-2">
                        {member.role}
                      </p>

                      <div className="mt-auto flex flex-wrap items-center justify-center gap-3">
                        {Object.entries(member.socials).map(([platform, link]) => {
                          const icons: Record<string, React.ReactNode> = {
                            github: <Github className="h-4 w-4" />,
                            linkedin: <Linkedin className="h-4 w-4" />,
                            twitter: <Twitter className="h-4 w-4" />,
                            mail: <Mail className="h-4 w-4" />,
                          };
                          return (
                            <a
                              key={platform}
                              href={link as string}
                              className="flex h-10 w-10 items-center justify-center border-2 border-[#7c5aed]/10 bg-white text-[#1a1a1b]/60 transition-all hover:bg-[#7c5aed] hover:text-white hover:-translate-y-1 shadow-[3px_3px_0px_0px_rgba(124,90,237,0.04)] hover:shadow-none rounded-full"
                            >
                              {icons[platform]}
                            </a>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
    </PageShell>
  );
}
