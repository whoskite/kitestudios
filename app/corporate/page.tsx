"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Video, HelpCircle, Check, Play, ChevronDown, Sparkles, Trophy, Clock, BadgeAlert } from "lucide-react";
import CorporateQuiz from "@/components/CorporateQuiz";

export default function CorporateLandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scrollToQuiz = () => {
    const element = document.getElementById("application-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "Why are you producing these corporate films at zero cost?",
      a: "Our studio is launching a new Case-Study Cohort focusing on high-growth B2B and SaaS brands. Rather than pitch you our services cold, we prefer to invest our own crew, cinema packages, and post-production suites to prove our capability. If you love the result, we can discuss ongoing content partnerships—but there is absolutely no contractual obligation."
    },
    {
      q: "How much executive and staff time is required?",
      a: "Practically none. We understand that corporate environments are fast-paced and distraction-free. We conduct all pre-production alignment and story-boarding virtually. On production day, we only require a tight 2-hour shoot window on-location, causing zero disruption to your daily operations."
    },
    {
      q: "What about corporate security, NDA, and compliance?",
      a: "We work regularly with high-security tech firms, financial institutions, and medical centers. We sign standard corporate NDAs prior to pre-production. Our crew is trained in office compliance, ensuring sensitive screens, whiteboard diagrams, and proprietary documents remain strictly out of frame."
    },
    {
      q: "Do we need to hire actors or script writers?",
      a: "No. Our team handles the entire scripting, structure, and narrative outline based on a short 15-minute briefing. We shoot authentic founder profiles, executive summaries, or brand stories. You don't need professional actors; we capture your team looking natural and authoritative."
    },
    {
      q: "Who owns the final completed film?",
      a: "Your organization receives full, perpetual ownership and royalty-free commercial distribution rights. You can deploy it across LinkedIn, company websites, paid campaigns, client pitches, and investor decks forever."
    },
    {
      q: "How does the vetting selection process work?",
      a: "Once you submit the application form below, our creative board reviews your website, team scale, and marketing goals. If qualified, our director Tomy will reach out within 48 business hours to schedule a brief 15-minute introductory call to lock in the shoot details."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-sky-500/20 font-sans relative overflow-hidden">
      
      {/* Subtle Glowing Background Accents */}
      <div className="absolute top-[-10%] left-[20%] w-[50%] aspect-square rounded-full bg-sky-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[45%] aspect-square rounded-full bg-indigo-500/5 blur-[140px] pointer-events-none" />

      {/* Header (Clean, Conversion-Focused, No Outbound Links) */}
      <header className="w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center font-bold text-zinc-950 text-sm">
              K
            </div>
            <span className="text-xs font-semibold tracking-[0.25em] text-zinc-300">
              KITESTUDIOS <span className="text-[10px] text-sky-400 tracking-wider">/ CINEMA</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-400">
              Q3 EXECUTIVE COHORT OPEN
            </span>
          </div>
        </div>
      </header>

      {/* Announcement Alert Banner */}
      <div className="w-full bg-sky-950/30 border-b border-sky-900/30 py-2.5 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-2 text-xs font-mono text-sky-400">
          <BadgeAlert className="h-4 w-4 animate-bounce" />
          <span>PILOT OPPORTUNITY: Only 3 Sponsored Slots Available For Q3 Cohort</span>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-5xl relative z-10 space-y-32">
        
        {/* HERO SECTION (THE HOOK) */}
        <section className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-zinc-900/60 text-zinc-400 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold">
            <Sparkles className="h-3 w-3 text-sky-400" />
            EXECUTIVE BRAND FILM COHORT
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.1] text-white">
            Stop Wasting Marketing Budgets On <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400 italic">
              Stale, Lifeless
            </span> Corporate Videos
          </h1>
          
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto">
            We are selecting 3 high-growth corporate brands to receive a fully sponsored, cinema-grade Brand Film or Executive Profile. Establish market authority, earn trust, and accelerate conversions. <span className="font-semibold text-zinc-200">100% Sponsor Co-Invested (Zero Upfront Production Cost).</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 w-full max-w-md mx-auto">
            <button
              onClick={scrollToQuiz}
              className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-zinc-950 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg shadow-sky-500/10 flex items-center justify-center gap-2 w-full cursor-pointer animate-pulse"
            >
              Apply For Sponsor Placement
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-[10px] font-mono text-zinc-500 pt-2">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-sky-500" /> NDA COMPLIANT</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-sky-500" /> 2-HOUR SHOOT BLOCK</span>
            <span className="flex items-center gap-1.5"><Trophy className="h-3.5 w-3.5 text-sky-500" /> FULL RIGHTS INCLUDED</span>
          </div>
        </section>

        {/* CINEMATIC BRIEFING (VSL SECTION) */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block mb-1">
              [ COHORT BRIEFING ]
            </span>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
              Vetting Parameters & Offer Value Exchange
            </h2>
          </div>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl group">
            {/* Ambient background glow underneath video player */}
            <div className="absolute inset-0 bg-sky-500/5 blur-xl group-hover:bg-sky-500/10 transition-all duration-500 pointer-events-none" />
            <iframe
              src="https://player.vimeo.com/video/1205970612?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              className="absolute inset-0 w-full h-full rounded-2xl z-10"
              title="Cohort Briefing Video"
            />
          </div>

          <div className="flex justify-center w-full max-w-md mx-auto pt-4">
            <button
              onClick={scrollToQuiz}
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2 w-full cursor-pointer"
            >
              Apply For Sponsor Placement
            </button>
          </div>
        </section>

        {/* COMPARISON / WHY US (THE STORY) */}
        <section className="space-y-12 border-t border-zinc-900 pt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block">
              [ THE CORE GAP ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              Why Corporate Video is Broken
            </h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Most corporate videos feel stale, clinical, and fail to build emotional connection. Our cinema system is built to drive audience trust and market authority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Broken Traditional Model */}
            <div className="p-8 border border-zinc-900 bg-zinc-950/40 rounded-2xl space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-rose-500 uppercase bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 w-fit block">
                Traditional Production
              </span>
              <h3 className="text-lg font-bold uppercase tracking-wide text-zinc-200">
                Slow, Boring & Bloated
              </h3>
              <ul className="space-y-3.5 text-xs text-zinc-400 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Excessive Budgets:</strong> Pricing starts at $20,000+ upfront with heavy retainers before any camera rolls.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Stale Presentation:</strong> Generic talking heads, monotone scripts, and flat visual staging that bores prospects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Operational Chaos:</strong> Multiple production days that disrupt executive schedules and daily operations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span><strong>Extended Timelines:</strong> Takes 3 to 6 months of corporate committee approvals and edit rounds to deliver.</span>
                </li>
              </ul>
            </div>

            {/* The Kitestudios System */}
            <div className="p-8 border border-sky-950 bg-sky-950/10 rounded-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-sky-500/10 text-sky-400 border-l border-b border-sky-900/40 px-3 py-1 font-mono text-[9px] uppercase tracking-widest font-semibold rounded-bl-lg">
                Our System
              </div>
              <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 w-fit block">
                Executive Cohort
              </span>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white">
                Cinematic, Fast & High-Converting
              </h3>
              <ul className="space-y-3.5 text-xs text-zinc-300 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-bold">✓</span>
                  <span><strong>$0 Upfront Co-Investment:</strong> We cover all hard costs of crew, scripting, and filming for selected brands.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-bold">✓</span>
                  <span><strong>Cinema Package:</strong> Shot on premium full-frame mirrorless camera packages with prime lenses to ensure a cinematic look.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-bold">✓</span>
                  <span><strong>Zero Disruption Shoot:</strong> Strict 2-hour shoot block on-location. No staff delays, no schedule disruption.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-bold">✓</span>
                  <span><strong>Speedy Execution:</strong> Fully edited, graded, and formatted assets delivered inside 14 business days.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* THE VALUE STACK (THE OFFER) */}
        <section className="space-y-12 border-t border-zinc-900 pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block">
              [ THE STACK ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              The Executive Film Package
            </h2>
            <p className="text-xs text-zinc-400 font-light">
              Here is everything we will script, film, and deliver to your brand when accepted into the cohort.
            </p>
          </div>

          <div className="max-w-2xl mx-auto border border-zinc-800 bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl">
            {/* Item 1 */}
            <div className="p-5 border-b border-zinc-900 flex justify-between items-center gap-4 bg-zinc-900/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Video className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">Cinematic Brand Film / Executive Profile</h4>
                  <p className="text-[11px] text-zinc-400 font-light">Full-scale concept, scripting, multi-angle cinema shoot and audio master.</p>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-500 font-semibold shrink-0">$7,000 VALUE</span>
            </div>

            {/* Item 2 */}
            <div className="p-5 border-b border-zinc-900 flex justify-between items-center gap-4 bg-zinc-900/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">Content Strategy & Narrative Blueprint</h4>
                  <p className="text-[11px] text-zinc-400 font-light">Competitor visual audit and tailored script alignment session.</p>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-500 font-semibold shrink-0">$1,000 VALUE</span>
            </div>

            {/* Item 3 */}
            <div className="p-5 border-b border-zinc-900 flex justify-between items-center gap-4 bg-zinc-900/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Play className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">2x Social Media Cutdowns & Custom Hooks</h4>
                  <p className="text-[11px] text-zinc-400 font-light">Short-form vertical/horizontal edits optimized for LinkedIn & ads.</p>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-500 font-semibold shrink-0">$2,000 VALUE</span>
            </div>

            {/* Item 4 */}
            <div className="p-5 border-b border-zinc-900 flex justify-between items-center gap-4 bg-zinc-900/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wide">Unlimited Commercial Licensing Rights</h4>
                  <p className="text-[11px] text-zinc-400 font-light">Unlimited corporate, paid media, and presentation usage rights.</p>
                </div>
              </div>
              <span className="text-xs font-mono text-sky-400 font-semibold shrink-0">INCLUDED</span>
            </div>

            {/* Stack Total */}
            <div className="p-6 bg-zinc-900/60 border-b border-zinc-800 flex justify-between items-center">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-medium">TOTAL RETAIL VALUE:</span>
              <span className="text-sm font-mono text-zinc-400 line-through font-bold">$10,000.00</span>
            </div>

            <div className="p-8 bg-sky-950/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase block font-semibold mb-0.5">COHORT CO-INVESTMENT</span>
                <span className="text-3xl font-extrabold text-white uppercase tracking-tight">$0 UPFRONT</span>
                <p className="text-[11px] text-zinc-400 mt-1 font-light max-w-sm">Exchange Value: Granted in return for a detailed case-study approval and client video review.</p>
              </div>
              <button
                onClick={scrollToQuiz}
                className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-zinc-950 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg shadow-sky-500/15"
              >
                SECURE AN ELIGIBILITY REVIEW
              </button>
            </div>
          </div>
        </section>

        {/* APPLICATION INTAKE FORM (THE SQUEEZE) */}
        <section id="application-form" className="space-y-12 border-t border-zinc-900 pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block">
              [ COHORT SCREENING ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              Application for Cohort Screening
            </h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Complete the vetting steps below. Our corporate curation board reviews all submissions within 48 business hours to verify target eligibility.
            </p>
          </div>

          <CorporateQuiz />
        </section>

        {/* OBJECTION HANDLING (FAQ) */}
        <section className="space-y-12 border-t border-zinc-900 pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block">
              [ INTEL BRIEFING ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
              Frequently Queried Objections
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-zinc-900 bg-zinc-950/40 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 text-sm font-semibold text-white uppercase tracking-wide hover:bg-zinc-900/20"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-zinc-500 transition-transform duration-300 shrink-0 ${
                        isExpanded ? "rotate-180 text-sky-400" : ""
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 text-xs text-zinc-400 font-light leading-relaxed border-t border-zinc-900/60 pt-4 bg-zinc-900/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-12 text-center text-xs text-zinc-500 font-light relative z-10">
        <div className="container mx-auto px-6 max-w-5xl space-y-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center font-bold text-zinc-400 text-xs">
              K
            </div>
            <span className="font-mono tracking-widest text-zinc-400 uppercase">KITESTUDIOS CORPORATION</span>
          </div>
          <p className="max-w-md mx-auto text-[10px] text-zinc-650 leading-relaxed">
            Kitestudios operates under strict compliance standards. All prospective client vetting, NDAs, and corporate authorizations must clear pre-production checks before filming begins.
          </p>
          <div className="flex justify-center gap-4 text-[10px] text-zinc-600 font-mono">
            <span>© {new Date().getFullYear()} KITESTUDIOS. ALL RIGHTS RESERVED.</span>
            <span>•</span>
            <span>PRIVACY COMPLIANCE</span>
            <span>•</span>
            <span>NDA TEMPLATE</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
