"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowLeft, Loader2 } from "lucide-react";
import MinimalNav from "@/components/MinimalNav";

function BookNowContent() {
  const searchParams = useSearchParams();
  const tier = searchParams.get("tier");
  const addons = searchParams.get("addons");
  const estimate = searchParams.get("estimate");

  const [isLoading, setIsLoading] = useState(true);
  const [copiedFooter, setCopiedFooter] = useState(false);
  const [copiedSelection, setCopiedSelection] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tomy@kitestudios.net");
    setCopiedFooter(true);
    setTimeout(() => setCopiedFooter(false), 2000);
  };

  const getFormattedSelection = () => {
    return `Selected Tier: ${tier || "None"}\nAdd-ons: ${addons || "None"}\nEstimated Investment: ${estimate || "None"}`;
  };

  const handleCopySelection = () => {
    navigator.clipboard.writeText(getFormattedSelection());
    setCopiedSelection(true);
    setTimeout(() => setCopiedSelection(false), 2000);
  };

  const getAirtableUrl = () => {
    const baseUrl = "https://airtable.com/embed/app0UQJClDt3k3Ezh/pag45HVBCge2EGyRq/form";
    if (!tier && !addons && !estimate) return baseUrl;

    const params = [];
    if (tier) {
      params.push(`prefill_Package=${encodeURIComponent(tier)}`);
      params.push(`prefill_Tier=${encodeURIComponent(tier)}`);
      params.push(`prefill_Selected+Package=${encodeURIComponent(tier)}`);
    }
    if (addons) {
      params.push(`prefill_Addons=${encodeURIComponent(addons)}`);
      params.push(`prefill_Add-ons=${encodeURIComponent(addons)}`);
    }
    if (estimate) {
      params.push(`prefill_Budget=${encodeURIComponent(estimate)}`);
      params.push(`prefill_Estimate=${encodeURIComponent(estimate)}`);
    }
    
    // Build a compiled summary and prefill into message/notes fields
    const summary = `Selected Tier: ${tier}\nAdd-ons: ${addons}\nEst. Budget: ${estimate}`;
    params.push(`prefill_Message=${encodeURIComponent(summary)}`);
    params.push(`prefill_Project+Details=${encodeURIComponent(summary)}`);
    params.push(`prefill_Project+Description=${encodeURIComponent(summary)}`);
    params.push(`prefill_Notes=${encodeURIComponent(summary)}`);

    return `${baseUrl}?${params.join("&")}`;
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
            href="/pricing"
            className="group flex items-center gap-2 text-xs tracking-widest font-mono text-zinc-400 hover:text-black dark:hover:text-white uppercase transition-colors"
          >
            <ArrowLeft className="h-3 w-3 transform group-hover:-translate-x-1 transition-transform" />
            Back to pricing
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

        {/* Selected Package Summary Card */}
        {tier && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="w-full mb-8 p-5 border border-black dark:border-white bg-neutral-50 dark:bg-zinc-950 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
          >
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 dark:text-zinc-500 block">
                [ Selected Inquiry Configuration ]
              </span>
              <h3 className="text-lg font-light tracking-wide uppercase">
                {tier}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                Add-ons: {addons}
              </p>
              <p className="text-xs font-mono font-bold uppercase">
                Estimated Range: {estimate}
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handleCopySelection}
                className="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-zinc-200 text-xs font-mono tracking-widest uppercase transition-all rounded-sm font-bold flex items-center justify-center gap-1.5"
              >
                {copiedSelection ? "[ COPIED! ]" : "[ COPY SELECTION ]"}
              </button>
              <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono text-center sm:text-right uppercase tracking-wider">
                Paste in form details below
              </span>
            </div>
          </motion.div>
        )}

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full mb-12 p-8 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/30 dark:bg-neutral-950/10 rounded-md"
        >
          <div className="text-center sm:text-left mb-6">
            <span className="text-xs font-mono tracking-widest text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-sm uppercase font-bold">
              THE WORKFLOW
            </span>
            <h2 className="text-2xl font-light tracking-wide uppercase mt-4">
              How It Works
            </h2>
            <p className="text-xs font-mono text-zinc-400 uppercase mt-1">KITESTUDIOS Production Process</p>
          </div>
          
          <div className="space-y-6 relative">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 shrink-0 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-xs">1</div>
                <div className="w-px h-full bg-neutral-200 dark:bg-neutral-800 mt-2"></div>
              </div>
              <div className="pb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">Step 1 — Discovery Call <span className="font-light normal-case tracking-normal text-zinc-400">(Free, 15-20 min)</span></h3>
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We learn about your vision, event details, or music release. You tell us what you need, we tell you what's possible. No pressure, no obligation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 shrink-0 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-xs">2</div>
                <div className="w-px h-full bg-neutral-200 dark:bg-neutral-800 mt-2"></div>
              </div>
              <div className="pb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">Step 2 — Proposal & Booking</h3>
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We send a custom proposal with the right package for your needs. Once you approve, we lock in your date with a signed agreement and deposit (50% upfront).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 shrink-0 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-xs">3</div>
                <div className="w-px h-full bg-neutral-200 dark:bg-neutral-800 mt-2"></div>
              </div>
              <div className="pb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">Step 3 — Pre-Production</h3>
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We handle the planning — shot lists, location scouting, creative direction, scheduling. For events, we confirm logistics. For music videos, we build a mood board and shot list together.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 shrink-0 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-xs">4</div>
                <div className="w-px h-full bg-neutral-200 dark:bg-neutral-800 mt-2"></div>
              </div>
              <div className="pb-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">Step 4 — Production Day</h3>
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We show up, do what we do, and capture everything. Professional gear, professional energy, zero stress on your end.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 shrink-0 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-xs">5</div>
              </div>
              <div className="pb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1">Step 5 — Delivery & Revisions</h3>
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  You receive your first draft within the turnaround window. Review, send feedback, and we revise until it's right. Final files delivered in high-res, ready to post or publish.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

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
                <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase animate-pulse">
                  Loading secure form...
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Responsive Airtable Embed Iframe */}
          <iframe
            className="airtable-embed w-full min-h-[650px] sm:min-h-[700px] md:min-h-[750px] rounded-md transition-opacity duration-500 ease-in-out"
            src={getAirtableUrl()}
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
            <span className="text-xs tracking-wider font-mono uppercase font-light">
              © 2026 KITESTUDIOS • PORTFOLIO
            </span>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-12 font-medium tracking-widest text-xs uppercase">
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
            <span className="block text-xs tracking-widest uppercase mb-1 opacity-80">
              WORK ENQUIRIES
            </span>
            <button
              onClick={handleCopyEmail}
              className="font-bold text-neutral-600 dark:text-neutral-300 hover:text-[#ffff00] transition-colors text-xs flex items-center justify-center md:justify-end gap-2 uppercase"
            >
              TOMY@KITESTUDIOS.NET
              <span className="text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-500 px-1 py-0.5 border border-neutral-200 dark:border-neutral-800">
                {copiedFooter ? "COPIED" : "COPY"}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function BookNowPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-neutral-400 dark:text-neutral-600" />
        </div>
      }
    >
      <BookNowContent />
    </Suspense>
  );
}
