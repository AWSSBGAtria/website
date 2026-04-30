import { FaInstagram, FaLinkedin, FaMeetup, FaGithub, FaWhatsapp } from "react-icons/fa";
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-primary text-white pt-20 md:pt-32 pb-12 overflow-hidden">
      {/* Huge #AWSCloudClubs text */}
      <div className="absolute inset-0 select-none pointer-events-none z-0 overflow-hidden flex items-end justify-center">
        <h2 className="text-[8vw] font-black uppercase tracking-tighter opacity-10 leading-none whitespace-nowrap">
          #AWSStudentBuilders
        </h2>
      </div>

      <div className="container mx-auto relative z-10 px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 sm:mb-20 mb-12">
          <div>
            <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
              AWS Student Builder Group
            </h3>
            <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[0.65rem]">
              Atria Institute of Technology, Bengaluru
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/join" target="_blank" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all rounded-sm group">
              <FaMeetup className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>
            <Link href="/instagram" target="_blank" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all rounded-sm group">
              <FaInstagram className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>
            <Link href="/linkedin" target="_blank" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all rounded-sm group">
              <FaLinkedin className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>
            <Link href="/github" target="_blank" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all rounded-sm group">
              <FaGithub className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>
            <Link href="/whatsapp" target="_blank" className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all rounded-sm group">
              <FaWhatsapp className="w-5 h-5 opacity-50 group-hover:opacity-100" />
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/50">
            © {new Date().getFullYear()} AWS Student Builder Group ATRIA.
          </span>
          {/* <div className="flex gap-8">
            <Link href="#" className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Contact</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
