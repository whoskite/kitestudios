"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";
import MinimalNav from "@/components/MinimalNav";

export default function BookNowPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [copiedFooter, setCopiedFooter] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tomy@kitestudios.net");
    setCopiedFooter(true);
    setTimeout(() => setCopiedFooter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex flex-col justify-between selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* Sleek Navigation - no filters passed */}
      <MinimalNav />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-4xl flex flex-col items-center">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full mb-8 flex justify-start"
        >
          <a
            href="/"
            className="group flex items-center gap-2 text-[10px] tracking-widest font-mono text-zinc-400 hover:text-black dark:hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="h-3 w-3 transform group-hover:-translate-x-1 transition-transform" />
            Back to archives
          </a>
        </motion.div>

        {/* Hero Title & Description */}
        <div className="text-center mb-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <span className="p-1 border border-black dark:border-white rounded-sm text-black dark:text-white">
              <Calendar className="h-4.5 w-4.5" />
            </span>
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
              Session Inquiry
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-light tracking-[0.1em] uppercase mb-4 font-sans"
          >
            Book Now
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-500 dark:text-neutral-400 text-sm font-light leading-relaxed max-w-lg mx-auto"
          >
            Let's collaborate. Fill out the secure form below with your project details, timeline, and goals to request a session with Tomy Kite.
          </motion.p>
        </div>

        {/* Airtable Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative w-full bg-neutral-50 dark:bg-zinc-950 border border-neutral-100 dark:border-zinc-900 rounded-lg overflow-hidden shadow-2xl p-1 min-h-[600px] flex items-center justify-center"
        >
          {/* Immersive Loader Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4 z-20"
              >
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400 dark:text-neutral-600" />
                <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase animate-pulse">
                  Loading secure form...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Responsive Airtable Embed Iframe */}
          <iframe
            className="airtable-embed w-full min-h-[650px] sm:min-h-[700px] md:min-h-[750px] rounded-md transition-opacity duration-500 ease-in-out"
            src="https://airtable.com/embed/app0UQJClDt3k3Ezh/pag45HVBCge2EGyRq/form"
            frameBorder="0"
            onLoad={() => setIsLoading(false)}
            style={{
              background: "transparent",
              border: "none",
              opacity: isLoading ? 0 : 1,
            }}
            width="100%"
          />
        </motion.div>
      </main>

      {/* Sleek Minimal Sign-off Footer */}
      <footer className="w-full border-t border-neutral-100 dark:border-neutral-900 py-16 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-neutral-400 dark:text-neutral-500 text-xs">
          {/* Copyright signature */}
          <div className="text-center md:text-left">
            <span className="font-light tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase block mb-1">
              KITESTUDIOS
            </span>
            <span className="text-[10px] tracking-wider font-mono uppercase font-light">
              © 2026 TOMY KITE • PORTFOLIO
            </span>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-12 font-medium tracking-widest text-[10px] uppercase">
            <a
              href="https://instagram.com/kitestudios6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="mailto:tomy@kitestudios.net"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              EMAIL
            </a>
          </div>

          {/* Inquiry / Mail */}
          <div className="text-center md:text-right font-mono">
            <span className="block text-[8px] tracking-widest uppercase mb-1 opacity-80">
              WORK ENQUIRIES
            </span>
            <button
              onClick={handleCopyEmail}
              className="font-bold text-neutral-600 dark:text-neutral-300 hover:text-[#ffff00] transition-colors text-[11px] flex items-center justify-center md:justify-end gap-2 uppercase"
            >
              TOMY@KITESTUDIOS.NET
              <span className="text-[8px] bg-neutral-100 dark:bg-neutral-900 text-neutral-500 px-1 py-0.5 border border-neutral-200 dark:border-neutral-800">
                {copiedFooter ? "COPIED" : "COPY"}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
