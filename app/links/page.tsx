"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Grid,
  Calendar,
  Instagram,
  Mail,
  ArrowUpRight,
  Sun,
  Moon,
  Camera,
} from "lucide-react";

export default function LinksPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    {
      title: "Lust In Stereo Photos",
      description: "Download event photos from Los Globos.",
      url: "/events/lust-in-stereo-los-globos",
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
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white transition-all duration-500 flex flex-col justify-between selection:bg-neutral-200 dark:selection:bg-neutral-800 font-sans antialiased relative overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-neutral-100/40 dark:bg-zinc-950/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-neutral-100/40 dark:bg-zinc-950/10 blur-[120px] pointer-events-none" />

      {/* Quick Theme Toggle Header */}
      <header className="w-full max-w-xl mx-auto px-6 pt-8 flex justify-between items-center z-10">
        <a 
          href="/" 
          className="text-xs font-light tracking-[0.3em] uppercase hover:opacity-75 transition-opacity font-mono"
        >
          [ KITESTUDIOS ]
        </a>
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 border border-neutral-100 dark:border-zinc-900 rounded-full hover:bg-neutral-50 dark:hover:bg-zinc-900/50 hover:border-black dark:hover:border-white transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        )}
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
            className="relative w-20 h-20 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 shadow-md mb-5 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200/0 via-neutral-200/50 to-neutral-200/0 dark:from-zinc-900/0 dark:via-zinc-800/20 dark:to-zinc-900/0 animate-[spin_8s_linear_infinite]" />
            <Camera className="h-7 w-7 text-neutral-400 dark:text-neutral-600 z-10 transform group-hover:scale-110 transition-transform duration-500" />
          </motion.div>

          {/* Profile Name & Subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl font-light tracking-[0.15em] uppercase mb-2"
          >
            Tomy Kite
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase font-medium"
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
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
                    : "bg-neutral-50/40 hover:bg-neutral-50 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/60 border-neutral-100 dark:border-zinc-900/60 hover:border-black dark:hover:border-white"
                }`}
              >
                {/* Highlight Pulse Outline */}
                {isHighlight && (
                  <div className="absolute inset-0 border border-black dark:border-white rounded-lg animate-ping opacity-25 scale-102 pointer-events-none" />
                )}

                {/* Left Side: Icon & Content */}
                <div className="flex items-center space-x-4 z-10">
                  <div
                    className={`p-2.5 rounded-sm border shrink-0 ${
                      isHighlight
                        ? "border-neutral-800 dark:border-neutral-200 bg-neutral-900 dark:bg-neutral-100"
                        : "border-neutral-200 dark:border-zinc-800/80 bg-white dark:bg-neutral-950"
                    }`}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <span className={`block text-xs font-semibold tracking-wider uppercase mb-0.5`}>
                      {link.title}
                    </span>
                    <span
                      className={`block text-xs font-light ${
                        isHighlight
                          ? "text-neutral-300 dark:text-neutral-600"
                          : "text-neutral-400 dark:text-neutral-500"
                      }`}
                    >
                      {link.description}
                    </span>
                  </div>
                </div>

                {/* Right Side: Accent Tag or Arrow */}
                <div className="flex items-center space-x-2 z-10 shrink-0">
                  {isHighlight && (
                    <span className="hidden sm:inline bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black border border-neutral-800 dark:border-neutral-200 px-2 py-0.5 text-xs font-mono font-bold tracking-widest uppercase rounded-sm">
                      ACTIVE
                    </span>
                  )}
                  <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-8 text-center z-10 border-t border-neutral-50 dark:border-zinc-950">
        <p className="text-xs font-mono tracking-widest text-neutral-400 dark:text-neutral-600 uppercase">
          © 2026 KITESTUDIOS • PORTFOLIO
        </p>
      </footer>
    </div>
  );
}
