import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin, FaMeetup } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-[#7c5aed]/10 bg-white px-6 py-10 text-[#1a1a1b] md:px-12">
      <div className="flex flex-1 items-center justify-center py-10 leading-none select-none md:py-16">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,10vw,12rem)] font-black tracking-tighter whitespace-normal text-center break-words uppercase opacity-5 hover:opacity-100 hover:text-[#7c5aed] transition-all duration-700 cursor-default">
          #AWSCloudClubs
        </h1>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 pt-8 border-t border-[#7c5aed]/10 pb-2 text-center text-xs font-black uppercase tracking-widest md:flex-row md:items-end md:text-left">
        <div className="order-2 md:order-1 text-[#1a1a1b]/40">
          <p>&copy; {new Date().getFullYear()} AWS Cloud Club Atria.</p>
          <p className="mt-1">All rights reserved.</p>
        </div>

        <div className="order-1 flex gap-8 md:order-2">
          <Link href="#" className="text-[#1a1a1b]/40 hover:text-[#7c5aed] transition-all hover:-translate-y-1"><FaMeetup className="h-6 w-6" /></Link>
          <Link href="#" className="text-[#1a1a1b]/40 hover:text-[#f46ebb] transition-all hover:-translate-y-1"><FaInstagram className="h-6 w-6" /></Link>
          <Link href="#" className="text-[#1a1a1b]/40 hover:text-[#7c5aed] transition-all hover:-translate-y-1"><FaGithub className="h-6 w-6" /></Link>
          <Link href="#" className="text-[#1a1a1b]/40 hover:text-[#2074d5] transition-all hover:-translate-y-1"><FaLinkedin className="h-6 w-6" /></Link>
        </div>
      </div>
    </footer>
  );
}
