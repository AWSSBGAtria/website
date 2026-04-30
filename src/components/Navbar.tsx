"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Team", href: "/team" },
  ];

  const socials = [
    { name: "Instagram", icon: FaInstagram, href: "/instagram" },
    { name: "LinkedIn", icon: FaLinkedin, href: "/linkedin" },
    { name: "GitHub", icon: FaGithub, href: "/github" },
    { name: "WhatsApp", icon: FaWhatsapp, href: "/whatsapp" },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-100">
      <div className="h-17.5 flex justify-between items-stretch bg-white border-b border-border relative z-50">
        <div className="flex items-stretch">
          <div className="w-17.5 flex items-center justify-center border-r border-border">
            <Link
              href="/"
              className="flex items-center justify-center w-full h-full text-primary hover:scale-110 transition-transform"
            >
              <Image
                src="/Program_Icon.svg"
                width={28}
                height={28}
                alt={"Program Icon"}
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-stretch">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-8 flex items-center text-[0.7rem] font-bold uppercase tracking-[0.2em] border-r border-border transition-colors ${pathname === link.href ? "text-primary bg-slate-50" : "text-secondary/60 hover:text-primary hover:bg-slate-50"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-stretch">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-17.5 flex items-center justify-center border-l border-border text-secondary hover:text-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            href="/join"
            target="_blank"
            className="bg-primary text-white px-6 md:px-10 flex items-center text-[0.6rem] md:text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-indigo-700 transition-colors border-l border-border md:border-l-0"
          >
            Join The Club ↗
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-17.5 left-0 w-full bg-white border-b border-border shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-8 py-6 flex items-center justify-between border-b border-border/50 last:border-b-0 transition-colors ${pathname === link.href ? "bg-slate-50 text-primary" : "text-secondary/60 active:bg-slate-100"}`}
                >
                  <span className="text-[0.8rem] font-black uppercase tracking-[0.3em]">
                    {link.name}
                  </span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${pathname === link.href ? "bg-primary" : "bg-transparent"}`}
                  />
                </Link>
              ))}
              <div className="p-8 bg-slate-50 flex flex-col gap-4">
                <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-secondary/40">
                  Connect With Us
                </span>
                <div className="flex gap-4">
                  {socials.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      className="w-12 h-12 border border-border bg-white flex items-center justify-center text-secondary/60 hover:text-primary transition-all rounded-sm shadow-sm"
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
