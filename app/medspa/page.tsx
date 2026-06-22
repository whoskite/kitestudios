"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Zap,
  Award,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import MedspaQuiz from "@/components/MedspaQuiz";

export default function MedspaLandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const scrollToQuiz = () => {
    const element = document.getElementById("qualification-quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "Why is the production offered at zero cost?",
      a: "Our agency is creating a localized, highly curated case study portfolio showcasing cinematic video systems inside elite medical spas. Rather than pitch you services upfront, we invest our own resources to prove the conversion power of high-end visual walkthroughs. If you enjoy the results, we can discuss ongoing campaigns, but there is no obligation."
    },
    {
      q: "How much time will my team need to invest in this?",
      a: "Minimal. We respect your clinic's schedule. Aside from a 15-minute creative alignment call to approve the shot list, our crew does all the heavy lifting. On production day, we only require a tight 1-to-2 hour block on-site, causing zero disruption to your active patient appointments."
    },
    {
      q: "Do we get to request edits before the final video is delivered?",
      a: "Yes, absolutely. We want this asset to represent your clinical prestige perfectly. You receive two full rounds of collaborative revisions to request adjustments to the music, pacing, or scene selections before we export the final high-resolution files."
    },
    {
      q: "Do we need to hire professional actors or models?",
      a: "Not at all. The goal is to capture the authentic, serene ambiance of your space. We can film the walkthrough empty (focusing on interior design and technology), feature your active staff, or provide release forms if you would like to invite a few loyal patients to participate."
    },
    {
      q: "What if we want to bypass the curation board and start production immediately?",
      a: "If you do not want to wait for the curation selection process, you can commission a Direct Premium Production. This guarantees immediate shoot booking and unlocks our full-scale deliverables (including multiple social ad hooks, provider profile video clips, and clinical treatment spotlights). You can inquire about a custom proposal by reaching out directly to tomy@kitestudios.net."
    },
    {
      q: "How does the 'Zero Patient Disruption' guarantee work?",
      a: "We recognize that clinic hours are valuable. We conduct all pre-production, scripting, and shot list approvals virtually. On the shoot day, our team utilizes a highly optimized, compact lighting and cinema camera setup to capture clinic walkthroughs and provider profiles in a tight 1-to-2 hour block, ensuring no patient appointments are delayed or disrupted."
    },
    {
      q: "What are your HIPAA & Patient Privacy protocols?",
      a: "Patient confidentiality is our absolute priority. We do not film active treatment sessions or patients' faces without pre-approved, signed model release agreements. Our crew is trained in HIPAA-minded media production, ensuring treatment charts, screens, and personal identifiers remain strictly out of frame."
    },
    {
      q: "Who owns the final video asset?",
      a: "Your clinic owns the completed cinematic asset with unlimited, royalty-free commercial distribution rights. You can display it on your website, email campaigns, landing pages, and social media channels indefinitely."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF7] text-[#2E2C29] transition-all duration-300 flex flex-col justify-between selection:bg-[#C5A880]/20 font-sans-medspa">
      
      {/* Static Luxury Header (No Outbound Links) */}
      <header className="w-full bg-[#FDFCF7]/90 backdrop-blur-md border-b border-[#EBE8E2] transition-all duration-300">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#C5A880] flex items-center justify-center font-serif-luxury text-sm font-semibold text-[#C5A880]">
              K
            </div>
            <span className="text-sm font-serif-luxury font-medium tracking-[0.2em] text-[#C5A880]">
              KITESTUDIOS
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
              Active Cohort Curation
            </span>
          </div>
        </div>
      </header>

      {/* Subtle warm blurs */}
      <div className="absolute top-[8%] left-[10%] w-[35%] aspect-square rounded-full bg-[#C5A880]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[35%] aspect-square rounded-full bg-[#E8DCC4]/5 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-5xl relative z-10 space-y-28">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto pt-6">
          <div className="flex items-center gap-2 px-3.5 py-1 border border-[#C5A880]/40 bg-[#C5A880]/5 text-[#C5A880] rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold">
            <AlertCircle className="h-3.5 w-3.5" />
            3 Slots Open & Accepting Applications
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold tracking-wide uppercase leading-[1.15] text-[#2E2C29]">
            Claim your Medspa <br className="hidden sm:inline" />
            <span className="italic font-bold text-[#C5A880]">Film Trial </span>          </h1>
          
          <p className="text-sm sm:text-base text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
            Build patient trust instantly. We script, film, and edit a tailored visual walkthrough for your platform completely on our dime. Eligible local clinics pay nothing upfront.
          </p>

          <div className="flex justify-center pt-2 w-full max-w-xs">
            <button
              onClick={scrollToQuiz}
              className="px-8 py-3.5 bg-stone-900 text-white hover:bg-stone-850 font-mono font-semibold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full animate-pulse"
            >
              Claim Your Trial Shoot
            </button>
          </div>
        </section>

        {/* CINEMATIC VSL PLAYER */}
        <section id="vsl-video" className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block mb-1">
              [ DIRECT BRIEFING ]
            </span>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-semibold uppercase tracking-wider text-stone-850">
              Curation Criterias & Offer Details
            </h2>
          </div>

          {/* Premium Vimeo Video Embed Container */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#EBE8E2] bg-black shadow-2xl">
            <iframe
              src="https://player.vimeo.com/video/1202862874?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              className="absolute inset-0 w-full h-full rounded-2xl"
              title="VSL Briefing"
            />
          </div>

          {/* Mirrored Call-To-Action for VSL Video Section */}
          <div className="flex justify-center w-full max-w-xs mx-auto pt-2">
            <button
              onClick={scrollToQuiz}
              className="px-8 py-3.5 bg-stone-900 text-white hover:bg-stone-850 font-mono font-semibold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer w-full animate-pulse"
            >
              Claim Your Trial Shoot
            </button>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 px-2">
            <span />
            <span />
          </div>
        </section>

        {/* TRUST / WHY US SECTION */}
        <section className="space-y-12 border-t border-[#EBE8E2] pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block">
              [ CINEMA STANDARDS ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-semibold uppercase text-stone-850">
              Trusted Clinical Production
            </h2>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We shoot medical spa walkthroughs under strict professional parameters to guarantee patient privacy and elite brand positioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Badge 1 */}
            <div className="p-6 border border-[#EBE8E2] bg-white/50 rounded-xl space-y-4 shadow-sm hover:border-[#C5A880] transition-colors duration-300">
              <div className="p-3 bg-[#C5A880]/10 rounded-xl text-[#C5A880] w-fit">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif-luxury font-bold uppercase tracking-wider text-stone-800">
                HIPAA-Minded Protocols
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                We strictly respect patient privacy. No active patients, medical charts, or screens are captured without pre-signed consent releases. The crew maintains absolute confidentiality.
              </p>
            </div>

            {/* Badge 2 */}
            <div className="p-6 border border-[#EBE8E2] bg-white/50 rounded-xl space-y-4 shadow-sm hover:border-[#C5A880] transition-colors duration-300">
              <div className="p-3 bg-[#C5A880]/10 rounded-xl text-[#C5A880] w-fit">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif-luxury font-bold uppercase tracking-wider text-stone-800">
                Zero Patient Disruption
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Our lightweight, professional setup is designed for clean, silent execution. We map shot lists beforehand to film walkthroughs and provider segments in a fast 1-2 hour shoot block.
              </p>
            </div>

            {/* Badge 3 */}
            <div className="p-6 border border-[#EBE8E2] bg-white/50 rounded-xl space-y-4 shadow-sm hover:border-[#C5A880] transition-colors duration-300">
              <div className="p-3 bg-[#C5A880]/10 rounded-xl text-[#C5A880] w-fit">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-serif-luxury font-bold uppercase tracking-wider text-stone-800">
                Visual Authority Curation
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                We structure every scene to highlight the premium, serene ambiance of your clinic and the expertise of your providers, establishing your business as the elite aesthetic destination in your local market.
              </p>
            </div>
          </div>
        </section>

        {/* THREE OPEN CURATION SLOTS */}
        <section className="space-y-8 border-t border-[#EBE8E2] pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block">
              [ PROGRAM CAPACITY ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-semibold uppercase text-stone-850">
              Curation Slots Available
            </h2>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We are capping this cohort at exactly 3 clinic trials to dedicate individual production time to each asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Slot 1 */}
            <div className="p-6 border border-[#C5A880]/30 bg-[#C5A880]/5 rounded-xl space-y-4 flex flex-col justify-between shadow-[0_0_15px_rgba(197,168,128,0.06)]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono tracking-wider text-[#C5A880]">SLOT 01</span>
                  <span className="text-[9px] font-mono bg-amber-500/15 text-amber-750 px-2 py-0.5 rounded font-semibold uppercase">
                    APPLICATION PENDING
                  </span>
                </div>
                <h3 className="text-base font-serif-luxury font-bold uppercase tracking-wider text-stone-850">
                  Aesthetic Clinic Slot
                </h3>
                <p className="text-xs text-stone-500 font-light">
                  Accepting local applications. Fill out the eligibility form below to apply.
                </p>
              </div>
              <div className="border-t border-[#C5A880]/20 pt-3 text-[10px] font-mono text-[#C5A880]/80">
                STATUS: CREATIVE REVIEW
              </div>
            </div>

            {/* Slot 2 */}
            <div className="p-6 border border-[#C5A880]/30 bg-[#C5A880]/5 rounded-xl space-y-4 flex flex-col justify-between shadow-[0_0_15px_rgba(197,168,128,0.06)]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono tracking-wider text-[#C5A880]">SLOT 02</span>
                  <span className="text-[9px] font-mono bg-[#C5A880]/20 text-[#C5A880] px-2 py-0.5 rounded font-medium uppercase animate-pulse">
                    OPEN
                  </span>
                </div>
                <h3 className="text-base font-serif-luxury font-bold uppercase tracking-wider text-stone-850">
                  Aesthetic Clinic Slot
                </h3>
                <p className="text-xs text-stone-500 font-light">
                  Accepting local applications. Fill out the eligibility form below to apply.
                </p>
              </div>
              <div className="border-t border-[#C5A880]/20 pt-3 text-[10px] font-mono text-[#C5A880]">
                STATUS: ACCEPTING INTAKE
              </div>
            </div>

            {/* Slot 3 */}
            <div className="p-6 border border-[#C5A880]/30 bg-[#C5A880]/5 rounded-xl space-y-4 flex flex-col justify-between shadow-[0_0_15px_rgba(197,168,128,0.06)]">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono tracking-wider text-[#C5A880]">SLOT 03</span>
                  <span className="text-[9px] font-mono bg-[#C5A880]/20 text-[#C5A880] px-2 py-0.5 rounded font-medium uppercase animate-pulse">
                    OPEN
                  </span>
                </div>
                <h3 className="text-base font-serif-luxury font-bold uppercase tracking-wider text-stone-850">
                  Aesthetic Clinic Slot
                </h3>
                <p className="text-xs text-stone-500 font-light">
                  Accepting local applications. Fill out the eligibility form below to apply.
                </p>
              </div>
              <div className="border-t border-[#C5A880]/20 pt-3 text-[10px] font-mono text-[#C5A880]">
                STATUS: ACCEPTING INTAKE
              </div>
            </div>
          </div>
        </section>

        {/* SPATIAL AMBIANCE GALLERY */}
        <section className="space-y-8 border-t border-[#EBE8E2] pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block">
              [ VISUAL STANDARDS ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-semibold uppercase text-stone-850">
              Spatial Ambiance Curation
            </h2>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We capture the pristine clinical aesthetics and serene patient environments that define high-caliber local medical spas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Lobby */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#EBE8E2] bg-stone-100 group shadow-sm">
              <img
                src="/images/medspa/lobby.png"
                alt="Minimalist MedSpa Reception Lobby"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase">AMBIENCE & LOBBY</span>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mt-0.5">Serene Reception Lounge</h4>
              </div>
            </div>

            {/* Treatment Room */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#EBE8E2] bg-stone-100 group shadow-sm">
              <img
                src="/images/medspa/treatment.png"
                alt="Clinical MedSpa Treatment Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase">CLINICAL PRECISION</span>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mt-0.5">Pristine Treatment Suites</h4>
              </div>
            </div>

            {/* Skincare Editorial */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#EBE8E2] bg-stone-100 group shadow-sm">
              <img
                src="/images/medspa/skincare.png"
                alt="Luxury Cosmetics & Skincare Textures"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase">PRODUCT PRESTIGE</span>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mt-0.5">Skincare & Product Editorial</h4>
              </div>
            </div>
          </div>
        </section>

        {/* QUALIFYING QUIZ CONTAINER */}
        <section id="qualification-quiz" className="scroll-mt-12 space-y-8 border-t border-[#EBE8E2] pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block">
              [ CLINIC FILTER ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-semibold uppercase text-stone-850">
              Curation Screening Questionnaire
            </h2>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Verify eligibility for the cinematic trial program. Approved submissions instantly unlock prefilled intake registration.
            </p>
          </div>

          <MedspaQuiz />
        </section>

        {/* PREVIEW OF CINEMATIC SPECIMENS */}
        <section className="space-y-8 border-t border-[#EBE8E2] pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase block">
              [ PREVIOUS SPECIMENS ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-semibold uppercase text-stone-850">
              Cinematic Production Caliber
            </h2>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Explore short looping previews of our branding campaigns and lifestyle captures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Spec 1 */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] border border-[#EBE8E2] bg-neutral-900 group shadow-sm">
              <video
                loop
                muted
                autoPlay
                playsInline
                poster="/images/placeholder-thumb.jpg"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              >
                <source src="/Portfolio/GLYF STUDIO/Video/glyfstudio_documentary.webm" type="video/webm" />
                <source src="/Portfolio/GLYF STUDIO/Video/glyfstudio_documentary.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase">BRAND DOCUMENTARY</span>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mt-0.5">Cinematic Brand Storytelling</h4>
              </div>
            </div>

            {/* Spec 2 */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] border border-[#EBE8E2] bg-neutral-900 group shadow-sm">
              <video
                loop
                muted
                autoPlay
                playsInline
                poster="/images/placeholder-thumb.jpg"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              >
                <source src="/Portfolio/TOANDME/TEST.webm" type="video/webm" />
                <source src="/Portfolio/TOANDME/TEST.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase">AESTHETIC REALISM</span>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mt-0.5">Cinematic Textures & Walkthroughs</h4>
              </div>
            </div>

            {/* Spec 3 */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] border border-[#EBE8E2] bg-neutral-900 group shadow-sm">
              <video
                loop
                muted
                autoPlay
                playsInline
                poster="/images/placeholder-thumb.jpg"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              >
                <source src="/Portfolio/Genki Prints/Event/comiccon_recap.webm" type="video/webm" />
                <source src="/Portfolio/Genki Prints/Event/comiccon_recap.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[9px] font-mono text-[#C5A880] uppercase">DYNAMIC MOTION</span>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mt-0.5">Stabilized Gimbal Walkthroughs</h4>
              </div>
            </div>
          </div>
        </section>

        {/* CLINIC FAQS SECTION */}
        <section className="max-w-3xl mx-auto border-t border-[#EBE8E2] pt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block mb-1">
              [ FAQS ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-semibold uppercase text-stone-850">
              Curation & Criterias FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-[#EBE8E2] pb-4 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 font-medium hover:text-[#C5A880] transition-colors"
                  >
                    <span className="text-xs sm:text-sm uppercase tracking-wider font-light text-stone-800 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-[#C5A880] shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-stone-400 shrink-0 transform transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-stone-900" : ""
                    }`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm leading-relaxed text-stone-500 font-light mt-2 pl-6 pr-6">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* Static Footer with no outside links */}
      <footer className="w-full border-t border-[#EBE8E2] py-16 bg-[#FCFAF7] mt-16 transition-colors">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-stone-400 text-xs">
          <div className="text-center md:text-left">
            <span className="font-serif-luxury tracking-[0.2em] text-[#C5A880] uppercase block mb-1">
              KITESTUDIOS
            </span>
            <span className="text-xs tracking-wider uppercase font-light">
              © 2026 KITESTUDIOS • CINEMATIC PORTFOLIO CURATION
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
