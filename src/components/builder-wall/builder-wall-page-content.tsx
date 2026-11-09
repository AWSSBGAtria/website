"use client";

import { ArrowUpRight, Folder } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

type BuilderWallEvent = {
  id: string;
  name: string;
  date: string;
  source: "Meetup" | "Custom";
  posts: string[];
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export function BuilderWallPageContent({
  events,
}: {
  events: BuilderWallEvent[];
}) {
  const reduceMotion = useReducedMotion();
  const totalPosts = events.reduce((total, event) => total + event.posts.length, 0);
  const enter = (delay = 0) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.7, delay, ease: easeOut },
        };

  return (
    <div className="min-h-screen bg-white pt-17.5">
      <section className="relative overflow-hidden border-b border-border py-20 lg:py-28">
        <motion.div
          aria-hidden="true"
          className="absolute -right-20 -top-24 h-96 w-96 rounded-full border border-primary/10 lg:right-[8%]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8, rotate: -18 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: easeOut }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -right-4 top-0 h-72 w-72 rounded-full border border-primary/10 lg:right-[12%]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: easeOut }}
        />
        <div className="container relative mx-auto px-6 sm:px-8">
          <motion.div {...enter()}>
            <span className="mb-5 block text-[0.7rem] font-bold uppercase tracking-[0.3em] text-primary">
              AWS Student Builder Group · Atria
            </span>
            <h1 className="max-w-5xl text-6xl font-black leading-[0.88] tracking-tighter text-secondary sm:text-7xl lg:text-8xl">
              The Builder
              <br />
              Wall<span className="text-primary">.</span>
            </h1>
          </motion.div>
          <motion.div
            {...enter(0.12)}
            className="mt-8 flex flex-col justify-between gap-8 sm:flex-row sm:items-end"
          >
            <p className="max-w-xl text-lg font-medium leading-relaxed text-secondary/65 sm:text-xl">
              The community, through your eyes. Moments, lessons, and builds
              captured by the people who were there.
            </p>
            <div className="shrink-0 border-l-2 border-primary pl-4">
              <span className="block text-3xl font-black tracking-tight text-secondary">
                {totalPosts.toString().padStart(2, "0")}
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary/50">
                Community posts
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-6 sm:px-8">
          <motion.div
            {...enter()}
            className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-5"
          >
            <div>
              <span className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">
                Shared by our builders
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-secondary sm:text-4xl">
                Event directories
              </h2>
            </div>
            <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary/45 sm:block">
              {events.length.toString().padStart(2, "0")} directories
            </span>
          </motion.div>

          {events.length ? (
            <div className="divide-y divide-border border-y border-border">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  {...enter(Math.min(index * 0.045, 0.27))}
                >
                  <Link
                    href={`/builder-wall/${event.id}`}
                    className="group flex items-center gap-4 py-6 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-6 sm:py-7"
                  >
                    <span className="w-8 shrink-0 font-mono text-xs text-primary/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Folder
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.8}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-xl font-black uppercase leading-tight tracking-tight text-secondary transition-colors group-hover:text-primary sm:text-2xl">
                        {event.name}
                      </span>
                      <span className="mt-1 block text-[0.58rem] font-bold uppercase tracking-[0.16em] text-secondary/40">
                        {event.source} event
                      </span>
                    </span>
                    <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.16em] text-secondary/45 sm:block">
                      {event.date}
                    </span>
                    <span className="min-w-20 text-right text-xs font-semibold text-secondary/55">
                      {event.posts.length} {event.posts.length === 1 ? "post" : "posts"}
                    </span>
                    <span aria-hidden="true" className="text-xl text-primary transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              {...enter()}
              className="border border-dashed border-border px-6 py-16 text-center sm:py-24"
            >
              <Folder
                className="mx-auto mb-5 h-8 w-8 text-primary/60"
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-black uppercase tracking-tight text-secondary">
                No Meetup events found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-secondary/55">
                When events are available in the Meetup catalog, their
                directories will appear here.
              </p>
            </motion.div>
          )}

          <motion.p
            {...enter(0.1)}
            className="mt-10 border-t border-border pt-6 text-sm font-medium leading-relaxed text-secondary/60"
          >
            Can’t find your post? We’ve got you covered. Email us at{" "}
            <a
              href="mailto:leader@awsatria.tech"
              className="font-bold text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              leader@awsatria.tech
            </a>{" "}
            with your post link!
          </motion.p>
        </div>
      </section>
    </div>
  );
}
