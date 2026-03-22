"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { events } from "@/lib/site-data";

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageShell>
        <div className="mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SectionHeading
              eyebrow="Timeline Execution"
              title="A cleaner calendar for workshops and build nights."
              description="Explore upcoming sessions with a polished, minimalist layout."
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20 max-w-xl"
        >
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
              <Search className="h-5 w-5 text-[#7c5aed]" />
            </div>
            <Input
              type="text"
              className="pl-14 h-14 border-2 border-[#7c5aed]/10 bg-white shadow-[6px_6px_0px_0px_rgba(124,90,237,0.05)] focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-[4px_4px_0px_0px_rgba(124,90,237,0.1)] transition-all font-medium text-[#1a1a1b]"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group block"
              >
                <Card className="h-full flex flex-col bg-white border-2 border-[#7c5aed]/5 shadow-[10px_10px_0px_0px_rgba(124,90,237,0.03)] transition-all overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[14px_14px_0px_0px_rgba(124,90,237,0.06)] group-hover:border-[#7c5aed]/20">
                  <div className="w-full aspect-[2/1] bg-[#f5f7f9] border-b-2 border-[#7c5aed]/10 relative group-hover:border-[#7c5aed]/20 overflow-hidden">
                    <img src={`https://placehold.co/800x400/7c5aed/ffffff?text=${encodeURIComponent(event.title)}`} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <CardHeader className="gap-4 pb-4 px-5 pt-6 border-b border-[#7c5aed]/10">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <Badge variant="outline" className="text-[#f46ebb] border-[#f46ebb]/30 font-black">{event.type}</Badge>
                      <p className="font-[family-name:var(--font-mono)] text-xs font-black uppercase tracking-widest text-[#1a1a1b]/40">
                        {event.date} / {event.time}
                      </p>
                    </div>
                    <CardTitle className="text-3xl group-hover:text-[#7c5aed] transition-colors">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 px-5 pb-5 flex flex-col flex-1">
                    <p className="text-[#1a1a1b]/70 font-medium mb-6 line-clamp-2">
                       {event.description}
                    </p>
                    <div className="mb-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#1a1a1b]/60">
                      <MapPin className="h-4 w-4 text-[#7c5aed]" />
                      {event.location}
                    </div>
                    <div className="mt-auto pt-6">
                      <a href={event.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 font-[family-name:var(--font-mono)] text-sm font-black uppercase tracking-widest text-white bg-[#7c5aed] hover:bg-[#6c48e8] py-4 px-6 border-2 border-[#1a1a1b] shadow-[4px_4px_0px_0px_#1a1a1b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all hover:shadow-none w-full">
                        RSVP on Meetup
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="border-2 border-[#7c5aed]/10 p-20 text-center font-[family-name:var(--font-mono)] text-sm font-black uppercase tracking-widest bg-white/50 md:col-span-2 shadow-inner">
              No events found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
    </PageShell>
  );
}
