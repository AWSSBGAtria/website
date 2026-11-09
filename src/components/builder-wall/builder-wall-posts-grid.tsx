"use client";

import { ArrowLeft, ArrowUpRight, Linkedin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { getLinkedInEmbedUrl } from "@/lib/linkedin-embed";
import type { BuilderWallPost } from "@/lib/builder-wall-data";

type BuilderWallPostsGridProps = {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  sourceLabel: string;
  sourceUrl?: string;
  posts: BuilderWallPost[];
};

const easeOut = [0.16, 1, 0.3, 1] as const;

export function BuilderWallPostsGrid({
  eventId,
  eventTitle,
  eventDate,
  sourceLabel,
  sourceUrl,
  posts,
}: BuilderWallPostsGridProps) {
  const reduceMotion = useReducedMotion();
  const orderedPosts = posts
    .map((post, originalIndex) => ({
      postUrl: post.url,
      originalIndex,
      embedUrl: post.previewOnly ? null : getLinkedInEmbedUrl(post.url),
    }))
    .sort((a, b) => Number(!a.embedUrl) - Number(!b.embedUrl));
  return (
    <div className="min-h-screen bg-white pt-17.5">
      <section className="border-b border-border py-12 sm:py-16">
        <div className="container mx-auto px-6 sm:px-8">
          <Link
            href="/builder-wall"
            className="mb-10 inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-secondary/55 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All events
          </Link>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-4xl">
              <span className="mb-4 block text-[0.65rem] font-bold uppercase tracking-[0.25em] text-primary">
                The Builder Wall / Event directory
              </span>
              <h1 className="text-4xl font-black uppercase leading-[0.95] tracking-tighter text-secondary sm:text-5xl lg:text-6xl">
                {eventTitle}
              </h1>
            </div>
            <div className="shrink-0 border-l-2 border-primary pl-4">
              <span className="block text-xl font-black tracking-tight text-secondary">
                {posts.length.toString().padStart(2, "0")}
              </span>
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-secondary/50">
                Community posts
              </span>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-secondary/50">
            <span>{eventDate}</span>
            <span className="hidden h-1 w-1 rounded-full bg-primary/50 sm:block" />
            <span>{sourceLabel} · {eventId}</span>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                {sourceLabel} details <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="mb-7 flex flex-col justify-between gap-3 border-b border-border pb-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-1 block text-[0.62rem] font-bold uppercase tracking-[0.22em] text-primary">
                Shared by our builders
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-secondary sm:text-3xl">
                Community posts
              </h2>
            </div>
            <p className="max-w-lg text-xs leading-relaxed text-secondary/50">
              Public post author and content details are displayed by LinkedIn
              inside each embed.
            </p>
          </div>

          {posts.length ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:gap-6">
              {orderedPosts.map(({ postUrl, embedUrl, originalIndex }, index) => {
                return (
                  <motion.article
                    key={`${eventId}-${originalIndex}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24), ease: easeOut }}
                    className="min-w-0 border border-border bg-white"
                  >
                    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                      <span className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.17em] text-secondary/55">
                        <Linkedin className="h-4 w-4 text-primary" />
                        LinkedIn post {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-primary hover:underline"
                      >
                        Original post <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                      {embedUrl ? (
                      <div className="relative aspect-[4/5] w-full">
                        <iframe
                          src={embedUrl}
                          title={`LinkedIn post ${index + 1} for ${eventTitle}`}
                          loading="lazy"
                          allowFullScreen
                          scrolling="no"
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="absolute inset-0 h-full w-full border-0 bg-white"
                        />
                      </div>
                    ) : (
                      <div className="flex min-h-52 flex-col items-center justify-center bg-slate-50/70 px-5 py-8 text-center">
                        <Linkedin className="mb-3 h-6 w-6 text-primary" />
                        <p className="text-sm font-bold text-secondary">
                          This preview could not be rendered.
                        </p>
                        <p className="mt-1 max-w-xs text-xs leading-relaxed text-secondary/55">
                          The post may not be publicly embeddable. You can still
                          view it on LinkedIn.
                        </p>
                        <a
                          href={postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-3 text-[0.62rem] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-primary/90"
                        >
                            View this post on LinkedIn <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    )}
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="border border-dashed border-border px-6 py-16 text-center sm:py-24">
              <Linkedin className="mx-auto mb-5 h-8 w-8 text-primary/60" strokeWidth={1.5} />
              <h3 className="text-xl font-black uppercase tracking-tight text-secondary">
                No posts added yet
              </h3>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
