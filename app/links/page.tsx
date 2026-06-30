"use client";

import { motion } from "framer-motion";
import {
  Grid,
  Calendar,
  Mail,
  ArrowUpRight,
  Camera,
} from "lucide-react";

export default function LinksPage() {
  const links = [
    {
      title: "Kaitlin's Graduation Party Photos",
      description: "Download event photos from Kaitlin's Graduation Party.",
      url: "/events/kaitlin-graduation-party",
      icon: <Camera className="h-5 w-5" />,
      highlight: true,
    },
    {
      title: "See Our Work",
      description: "Visual portfolio, photography & motion pictures.",
      url: "/",
      icon: <Grid className="h-5 w-5" />,
      highlight: false,
    },
    {
      title: "Book A Session",
      description: "Secure your slot & request session inquiries.",
      url: "/book",
      icon: <Calendar className="h-5 w-5" />,
      highlight: false,
    },
    {
      title: "Email Tomy",
      description: "Direct collaboration, business & press enquiries.",
      url: "mailto:tomy@kitestudios.net",
      icon: <Mail className="h-5 w-5" />,
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 transition-all duration-500 flex flex-col justify-between selection:bg-sky-100 font-sans antialiased relative overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-slate-50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-slate-50 blur-[120px] pointer-events-none" />

      {/* Clean Brand Header */}
      <header className="w-full max-w-xl mx-auto px-6 pt-8 flex justify-between items-center z-10">
        <a 
          href="/" 
          className="text-xs font-semibold tracking-[0.3em] uppercase hover:opacity-75 transition-opacity font-sans text-zinc-900"
        >
          KITESTUDIOS
        </a>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-xl mx-auto px-6 py-12 flex flex-col items-center justify-center z-10">
        
        {/* Profile Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          
          {/* Animated Avatar Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-20 h-20 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 shadow-md mb-5 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200/0 via-zinc-200/50 to-zinc-200/0 animate-[spin_8s_linear_infinite]" />
            <img
              src="/KITESTUDIOS_ICON.png"
              alt="Tomy Kite"
              className="w-full h-full object-cover z-10 transform group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Profile Name & Subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-semibold tracking-[0.1em] uppercase mb-2 text-zinc-900"
          >
            Tomy Kite
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-mono tracking-[0.25em] text-zinc-500 uppercase font-semibold"
          >
            Creative Platform • Production Studio
          </motion.p>
        </div>

        {/* Links Navigation Group */}
        <div className="w-full flex flex-col space-y-4">
          {links.map((link, index) => {
            const isHighlight = link.highlight;
            const isExternal = link.url.startsWith("http") || link.url.startsWith("mailto");
            return (
              <motion.a
                key={link.title}
                href={link.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                className={`group relative w-full p-4.5 rounded-lg border text-left flex items-center justify-between transition-all duration-300 overflow-hidden ${
                  isHighlight
                    ? "bg-accent text-accent-foreground border-accent shadow-[0_4px_12px_rgba(2,132,199,0.15)] hover:bg-accent/90"
                    : "bg-slate-50/50 hover:bg-slate-50 border-zinc-200 hover:border-accent hover:shadow-sm"
                }`}
              >
                {/* Highlight Pulse Outline */}
                {isHighlight && (
                  <div className="absolute inset-0 border border-accent rounded-lg animate-ping opacity-25 scale-102 pointer-events-none" />
                )}

                {/* Left Side: Icon & Content */}
                <div className="flex items-center space-x-4 z-10">
                  <div
                    className={`p-2.5 rounded-md border shrink-0 ${
                      isHighlight
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-zinc-200 bg-white text-zinc-700"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <span className="block text-xs font-semibold tracking-wider uppercase mb-0.5">
                      {link.title}
                    </span>
                    <span
                      className={`block text-[11px] font-normal ${
                        isHighlight
                          ? "text-sky-100"
                          : "text-zinc-500"
                      }`}
                    >
                      {link.description}
                    </span>
                  </div>
                </div>

                {/* Right Side: Accent Tag or Arrow */}
                <div className="flex items-center space-x-2 z-10 shrink-0">
                  {isHighlight && (
                    <span className="hidden sm:inline bg-white/20 text-white border border-white/20 px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-sm">
                      ACTIVE
                    </span>
                  )}
                  <ArrowUpRight className={`h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isHighlight
                      ? "text-sky-100 group-hover:text-white"
                      : "text-zinc-400 group-hover:text-accent"
                  }`} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-8 text-center z-10 border-t border-zinc-100 bg-zinc-50/50">
        <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          © 2026 KITESTUDIOS • PORTFOLIO
        </p>
      </footer>
    </div>
  );
}
