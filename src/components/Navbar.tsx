"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 z-50 w-full border-b border-[#7c5aed]/10 bg-white/70 py-2 backdrop-blur-xl"
      >
        <div className="flex w-full items-center justify-between px-8 md:px-12">
          <Link href="/" className="flex items-center">
            <img
              src="/Purple.png"
              alt="AWS Cloud Club Logo"
              className="h-16 w-16 object-contain transition-transform hover:scale-110"
            />
          </Link>


          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-1 font-[family-name:var(--font-mono)] text-[12px] font-black uppercase tracking-wider transition-all",
                      pathname === link.href
                        ? "text-[#7c5aed]"
                        : "text-[#1a1a1b]/60 hover:text-[#7c5aed]"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/events" className={buttonVariants({ size: "sm" })}>
              {/* <Sparkles className="h-4 w-4" /> */}
              Join The Club
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center border-2 border-[#7c5aed]/10 bg-white text-[#1a1a1b]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 border-2 border-[#7c5aed]/10 bg-white/95 p-6 backdrop-blur-xl md:hidden shadow-2xl"
          >
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block border-2 border-[#7c5aed]/5 px-4 py-4 font-[family-name:var(--font-mono)] text-sm font-black uppercase tracking-widest transition-colors",
                      pathname === link.href
                        ? "bg-[#7c5aed] text-white"
                        : "text-[#1a1a1b]/70 hover:bg-[#7c5aed]/5"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/events"
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({ className: "w-full" })}
                >
                  {/* <Sparkles className="h-4 w-4" /> */}
                  Join The Club
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
