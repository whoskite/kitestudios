"use client";

import { Suspense, useState } from "react";
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
    
    const summary = `Selected Tier: ${tier}\nAdd-ons: ${addons}\nEst. Budget: ${estimate}`;
    params.push(`prefill_Message=${encodeURIComponent(summary)}`);
    params.push(`prefill_Project+Details=${encodeURIComponent(summary)}`);
    params.push(`prefill_Project+Description=${encodeURIComponent(summary)}`);
    params.push(`prefill_Notes=${encodeURIComponent(summary)}`);

    return `${baseUrl}?${params.join("&")}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex flex-col justify-between selection:bg-neutral-200 dark:selection:bg-neutral-800">
      <MinimalNav />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-7xl relative z-10">
        
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

        {/* Split-Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-4">
          
          {/* Left Column: Context & Workflow (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8 text-left order-2 lg:order-1">
            
            {/* Hero Title & Description */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-3"
              >
                <span className="p-1 border border-black dark:border-white rounded-sm text-black dark:text-white">
                  <Calendar className="h-4 w-4" />
                </span>
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500">
                  Session Inquiry
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl font-light tracking-[0.05em] uppercase mb-4 text-black dark:text-white font-sans"
              >
                Book Now
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-neutral-500 dark:text-neutral-400 text-sm font-light leading-relaxed max-w-md"
              >
                Let's collaborate. Fill out the secure form to request a session with Tomy Kite. We will review your project details and respond within 24 hours to schedule a creative briefing.
              </motion.p>
            </div>

            {/* Selected Package Summary Card */}
            {tier && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="p-5 border border-black dark:border-white bg-neutral-50 dark:bg-zinc-950 rounded-sm flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-between items-start sm:items-center lg:items-start xl:items-center gap-4"
              >
                <div className="space-y-1.5 text-left">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-455 dark:text-zinc-500 block">
                    [ Selected Configuration ]
                  </span>
                  <h3 className="text-base font-light tracking-wide uppercase text-black dark:text-white">
                    {tier}
                  </h3>
                  {addons && addons !== "None" && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                      Add-ons: {addons}
                    </p>
                  )}
                  <p className="text-xs font-mono font-bold uppercase text-black dark:text-white">
                    Estimated Range: {estimate}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5 w-full sm:w-auto lg:w-full xl:w-auto shrink-0">
                  <button
                    onClick={handleCopySelection}
                    className="px-4 py-2 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-zinc-200 text-xs font-mono tracking-widest uppercase transition-all rounded-sm font-bold flex items-center justify-center gap-1.5"
                  >
                    {copiedSelection ? "[ COPIED! ]" : "[ COPY DETAILS ]"}
                  </button>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono text-center sm:text-right lg:text-left xl:text-right uppercase tracking-wider">
                    Paste in form details
                  </span>
                </div>
              </motion.div>
            )}

            {/* How It Works Section (Compact Roadmap) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 border border-neutral-100 dark:border-zinc-900/60 bg-zinc-50/20 dark:bg-neutral-950/10 rounded-sm"
            >
              <div className="mb-6">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-850 px-2 py-0.5 rounded-sm uppercase font-bold">
                  THE WORKFLOW
                </span>
                <h2 className="text-lg font-light tracking-wide uppercase mt-4 text-black dark:text-white">
                  What Happens Next?
                </h2>
              </div>
              
              <div className="space-y-5 relative">
                {[
                  { step: "1", title: "Discovery Call", desc: "A brief, free 15-minute briefing to align on your creative references, distribution, and target styling." },
                  { step: "2", title: "Proposal & Booking", desc: "We compile a structured budget deck. A signed production agreement and 50% deposit locks in your shoot dates." },
                  { step: "3", title: "Pre-Production", desc: "We construct shot lists, scout locations, secure crew resources, and confirm final timelines." },
                  { step: "4", title: "Delivery & Revisions", desc: "Assets are delivered in an online review gallery. We complete two rounds of consolidated revisions before launch." }
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <div className="w-6 h-6 shrink-0 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-mono text-xs font-bold">
                      {s.step}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white mb-0.5">
                        {s.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Airtable Booking Form (Priority action) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full bg-neutral-50 dark:bg-zinc-950 border border-neutral-100 dark:border-zinc-900 rounded-sm overflow-hidden shadow-xl p-1 min-h-[650px] sm:min-h-[700px] md:min-h-[750px] flex items-center justify-center"
            >
              {/* Immersive Loader Overlay */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-neutral-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4 z-20"
                  >
                    <Loader2 className="h-6 w-6 animate-spin text-neutral-400 dark:text-neutral-600" />
                    <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-500 uppercase animate-pulse">
                      Loading secure form...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Airtable Embed Iframe */}
              <iframe
                className="airtable-embed w-full min-h-[650px] sm:min-h-[700px] md:min-h-[750px] rounded-sm transition-opacity duration-500 ease-in-out"
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
          </div>

        </div>
      </main>

      {/* Sleek Minimal Footer */}
      <footer className="w-full border-t border-neutral-100 dark:border-neutral-900 py-16 bg-transparent mt-12">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-neutral-400 dark:text-neutral-500 text-xs">
          <div className="text-center md:text-left">
            <span className="font-light tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase block mb-1">
              KITESTUDIOS
            </span>
            <span className="text-xs tracking-wider font-mono uppercase font-light">
              © 2026 KITESTUDIOS • PORTFOLIO
            </span>
          </div>

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

          <div className="text-center md:text-right font-mono">
            <span className="block text-xs tracking-widest uppercase mb-1 opacity-80">
              WORK ENQUIRIES
            </span>
            <button
              onClick={handleCopyEmail}
              className="font-bold text-zinc-650 dark:text-zinc-350 hover:text-black dark:hover:text-white transition-colors text-xs flex items-center justify-center md:justify-end gap-2 uppercase"
            >
              TOMY@KITESTUDIOS.NET
              <span className="text-[10px] bg-neutral-100 dark:bg-neutral-900 text-neutral-500 px-1.5 py-0.5 border border-neutral-200 dark:border-neutral-800">
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
