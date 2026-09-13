"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";
import React from "react";
import { teams } from "@/lib/site-data";
import AsciiDiamond from "@/components/ui/ascii-diamond";
import { EntranceFade, EntranceLines } from "@/components/ui/entrance";

type SocialPlatform = "github" | "linkedin" | "twitter" | "mail" | "instagram";

type TeamMember = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  socials: Partial<Record<SocialPlatform, string>>;
};

type TeamGroups = Record<string, TeamMember[]>;

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const socialIcons: Record<SocialPlatform, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  twitter: <Twitter className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
};

const teamGlows: Record<string, string> = {
  leader:
    "radial-gradient(circle at 50% 42%, transparent 0%, rgba(79,70,229,0.22) 55%, rgba(79,70,229,0.22) 100%)",
  core: "radial-gradient(circle at 50% 42%, transparent 0%, rgba(202,162,39,0.25) 55%, rgba(202,162,39,0.25) 100%)",
  technical:
    "radial-gradient(circle at 50% 42%, transparent 0%, rgba(37,99,235,0.22) 55%, rgba(37,99,235,0.22) 100%)",
  media:
    "radial-gradient(circle at 50% 42%, transparent 0%, rgba(236,72,153,0.22) 55%, rgba(236,72,153,0.22) 100%)",
  operations:
    "radial-gradient(circle at 50% 42%, transparent 0%, rgba(22,163,74,0.22) 55%, rgba(22,163,74,0.22) 100%)",
  events:
    "radial-gradient(circle at 50% 42%, transparent 0%, rgba(249,115,22,0.25) 55%, rgba(249,115,22,0.25) 100%)",
};

const teamGlowFallback =
  "radial-gradient(circle at 50% 42%, transparent 0%, rgba(100,116,139,0.20) 55%, rgba(100,116,139,0.20) 100%)";

const getSocialUrl = (platform: SocialPlatform, username: string) => {
  if (!username || username === "#") return "#";
  switch (platform) {
    case "github":
      return `https://github.com/${username}`;
    case "linkedin":
      return `https://www.linkedin.com/in/${username}`;
    case "twitter":
      return `https://x.com/${username}`;
    case "instagram":
      return `https://www.instagram.com/${username}`;
    case "mail":
      return `mailto:${username}`;
    default:
      return username;
  }
};

function MemberCard({
  member,
  category,
  index,
}: {
  member: TeamMember;
  category: string;
  index: number;
}) {
  const glow = teamGlows[category.toLowerCase()] ?? teamGlowFallback;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={revealVariants}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div
        className="aspect-4/5 border border-border overflow-hidden relative mb-8"
        style={{ background: glow }}
      >
        <img
          src={
            member.image ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member.name)}`
          }
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 relative"
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 border border-border text-[0.6rem] font-black uppercase tracking-widest">
          {category}
        </div>
      </div>
      <h3 className="text-2xl font-black tracking-tighter text-secondary mb-1 uppercase leading-none">
        {member.name}
      </h3>
      <p className="text-[0.7rem] font-bold uppercase tracking-widest text-secondary/70 mb-6">
        {member.role}
      </p>

      <div className="flex gap-3">
        {Object.entries(member.socials).map(([platform, username]) => (
          <a
            key={platform}
            href={getSocialUrl(platform as SocialPlatform, username ?? "")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}'s ${platform}`}
            className="w-8 h-8 border border-border flex items-center justify-center text-secondary/60 hover:bg-secondary hover:text-white hover:border-secondary transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {socialIcons[platform as SocialPlatform]}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const { Leader, ...rest } = teams as TeamGroups;
  const leader = Leader?.[0];

  return (
    <div className="bg-white min-h-screen pt-17.5">
      {/* Header Section */}
      <section className="py-20 border-b border-border overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.15)_0%,transparent_70%)] pointer-events-none -z-10" />
        <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-1/3 opacity-50 pointer-events-none items-center justify-center">
          <AsciiDiamond size={400} />
        </div>
        <div className="container px-8 mx-auto relative z-10">
          <EntranceFade delay={0}>
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
              The Core Team
            </span>
          </EntranceFade>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-secondary mb-8">
            <EntranceLines
              baseDelay={0.08}
              lines={["The builders", "behind the", "community."]}
            />
          </h1>
          <EntranceFade delay={0.45}>
            <p className="text-xl text-secondary/70 font-medium leading-relaxed max-w-2xl">
              Meet the dedicated students working to build the best tech
              community at Atria Institute of Technology.
            </p>
          </EntranceFade>
        </div>
      </section>

      {/* Leader Section */}
      {leader && (
        <section className="py-24 lg:py-32 border-b border-border bg-slate-50/30">
          <div className="container px-8 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="max-w-md mx-auto lg:max-w-none w-full"
              >
                <div
                  className="aspect-4/5 border border-border overflow-hidden relative"
                  style={{ background: teamGlows.leader }}
                >
                  <img
                    src={
                      leader.image ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(leader.name)}`
                    }
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 relative"
                  />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
              >
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary mb-4 block">
                  Leader / President / Club Head
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter text-secondary mb-6 leading-none uppercase">
                  {leader.name}
                </h2>
                <p className="text-[0.8rem] font-black uppercase tracking-widest text-secondary/60 mb-8">
                  {leader.role}
                </p>
                <p className="text-base sm:text-lg text-secondary/70 font-medium leading-relaxed mb-12 max-w-lg">
                  {leader.bio}
                </p>
                <div className="flex gap-4">
                  {Object.entries(leader.socials).map(
                    ([platform, username]) => (
                      <a
                        key={platform}
                        href={getSocialUrl(
                          platform as SocialPlatform,
                          username ?? "",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${leader.name}'s ${platform}`}
                        className="w-12 h-12 border border-border flex items-center justify-center text-secondary/60 hover:bg-secondary hover:text-white hover:border-secondary transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {socialIcons[platform as SocialPlatform]}
                      </a>
                    ),
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Other Teams */}
      {Object.entries(rest).map(
        ([category, members]: [string, TeamMember[]]) => (
          <section
            key={category}
            className="py-32 border-b border-border last:border-b-0"
          >
            <div className="container px-8 mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="mb-20"
              >
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-secondary uppercase leading-none">
                  {category}
                  {category !== "Core" ? " Wing" : ""}
                </h2>
              </motion.div>

              <div className="flex overflow-x-auto pb-8 -mx-8 px-8 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:pb-0 md:mx-0 md:px-0 scrollbar-hide">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="min-w-[80vw] md:min-w-0 snap-center pr-8 md:pr-0"
                  >
                    <MemberCard
                      member={member}
                      category={category}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ),
      )}
    </div>
  );
}
