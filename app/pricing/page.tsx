"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Building,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mail,
  CalendarCheck,
  MessageSquare,
  Layers,
  Send
} from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function PricingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const services = [
    {
      num: "01",
      niche: "events",
      title: "Event Production & Live Coverage",
      headline: "Capturing key corporate moments with cinematic precision.",
      description: "High-fidelity, multi-angle coverage tailored for corporate events, annual conferences, panel presentations, and keynote summits.",
      capabilities: [
        "Solo & Multi-Operator setups",
        "4K Multi-angle cinematic logs & camera arrays",
        "Professional synced audio acquisition & lavalier mixes",
        "Social-ready vertical reels and highlights",
        "High-resolution clean edited photo catalogs",
        "Commercial usage rights & full delivery"
      ],
      investment: "Custom Quoted per Event Scale",
      bookingUrl: "/book?tier=Event+Production"
    },
    {
      num: "02",
      niche: "commercial",
      title: "Commercial Branding & Storytelling",
      headline: "Translating brand vision into premium corporate assets.",
      description: "Cinematic brand anthems, culture showcases, property walkthroughs, and custom recruitment assets built to establish market authority.",
      capabilities: [
        "Pre-production storyboards, scripts, and target alignment",
        "Core brand storytelling mini-documentaries",
        "Premium corporate interviews & founder profiles",
        "Multi-platform horizontal and vertical optimization",
        "Full commercial advertising rights & licensing",
        "Ongoing monthly content partner options"
      ],
      investment: "Custom Quoted per Creative Brief",
      bookingUrl: "/book?tier=Commercial+Branding"
    },
    {
      num: "03",
      niche: "ecommerce",
      title: "Ecommerce & Hybrid Production",
      headline: "High-performance product campaigns built to scale.",
      description: "Color-accurate studio catalog sets, styled lifestyle listings, and hybrid assets designed to boost conversion rates and engagement.",
      capabilities: [
        "Standardized e-commerce listing photos & product video loops",
        "ASMR texture highlights, unboxing, and macro captures",
        "Premium lifestyle styling and active campaign reels",
        "High-intent vertical video ad creatives",
        "Monthly content refresh packages for paid campaigns",
        "Full product shipment & logistics support"
      ],
      investment: "Custom Quoted per Asset Volume",
      bookingUrl: "/book?tier=Ecommerce+Production"
    }
  ];

  const faqs = [
    {
      q: "How does the pricing work if my project crosses multiple categories?",
      a: "No problem at all. We often blend services—for example, shooting product listings (Ecommerce) alongside a brand documentary (Commercial). Get in touch via the booking form, and we'll construct a custom proposal mapped directly to your specific launch or event requirements."
    },
    {
      q: "Why do you recommend a second shooter for photo and video coverage?",
      a: "Switching settings back and forth on a single camera causes operators to miss spontaneous moments. Having two operators ensures one is 100% focused on capturing high-res photos while the other captures motion, guaranteeing premium quality in both formats."
    },
    {
      q: "What is your typical turnaround time?",
      a: "Turnaround times vary by scope. Event highlight photos and reels are typically delivered within 5–7 business days, while larger commercial campaigns and custom e-commerce libraries take 10–21 days. Rush delivery (48-hour turnaround) is available as a custom add-on."
    },
    {
      q: "Do you offer monthly retainers for ongoing content?",
      a: "Yes. Our retainer programs are designed for brands and local businesses that need fresh assets every 30 days. Retainers lock in a dedicated shoot block each month and provide a steady stream of social content, product refreshes, or ad creatives at a discounted rate."
    }
  ];

  // FAQ schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-all duration-300 flex flex-col justify-between selection:bg-sky-500/20">
      <MinimalNav />

      {/* Subtle modern blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] aspect-square rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[35%] aspect-square rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-7xl relative z-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        {/* Back navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-xs font-sans font-semibold tracking-widest text-zinc-400 hover:text-sky-400 uppercase transition-colors"
          >
            ← Back Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-20 text-left">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sky-400 block mb-3">
            [ SERVICES & INVESTMENT ]
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase mb-6 leading-tight text-white font-sans">
            Production Directory
          </h1>
          <p className="text-xs font-semibold text-zinc-450 uppercase tracking-widest mb-4">
            Paramount, CA — Serving LA County
          </p>
          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl">
            A decade of specialized visual storytelling. We operate across three core creative pillars, partnering with corporate brands to deliver fully tailored, project-based video and photographic solutions.
          </p>
        </div>

        {/* Services Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {services.map((svc) => (
            <motion.div
              key={svc.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: parseInt(svc.num) * 0.1 }}
              className="group flex flex-col justify-between p-8 border border-zinc-900 bg-zinc-900/40 hover:border-sky-500/40 hover:shadow-xl hover:bg-zinc-900/60 transition-all duration-350 rounded-md relative"
            >
              <div>
                {/* Custom Indicator */}
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-semibold tracking-widest text-zinc-500 font-mono">
                    [ {svc.num} / {svc.niche.toUpperCase()} ]
                  </span>
                  {svc.niche === "events" && <Camera className="h-4 w-4 text-zinc-500 group-hover:text-sky-400 transition-colors" />}
                  {svc.niche === "commercial" && <Building className="h-4 w-4 text-zinc-500 group-hover:text-sky-400 transition-colors" />}
                  {svc.niche === "ecommerce" && <Sparkles className="h-4 w-4 text-zinc-500 group-hover:text-sky-400 transition-colors" />}
                </div>

                <h2 className="text-xl font-bold tracking-wide uppercase mb-3 text-white font-sans">
                  {svc.title}
                </h2>
                
                <p className="text-xs font-semibold tracking-wider text-sky-400/90 uppercase mb-4 font-sans">
                  {svc.headline}
                </p>
                
                <p className="text-sm font-normal leading-relaxed text-zinc-400 mb-8 border-b border-zinc-900 pb-6 font-sans font-light">
                  {svc.description}
                </p>

                {/* Capabilities list */}
                <div className="space-y-4 mb-8">
                  <span className="block text-xs font-semibold tracking-widest uppercase text-zinc-550">
                    Capabilities:
                  </span>
                  <ul className="space-y-2.5">
                    {svc.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed font-light text-zinc-400 font-sans">
                        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-sky-400 animate-pulse" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Investment & CTA */}
              <div className="border-t border-zinc-900 pt-6 mt-8">
                <div className="mb-4">
                  <span className="block text-[10px] font-semibold tracking-widest uppercase text-zinc-500 mb-1">
                    PRICING MODEL
                  </span>
                  <span className="text-sm font-sans font-bold text-white">
                    {svc.investment}
                  </span>
                </div>
                <Link
                  href={svc.bookingUrl}
                  className="w-full py-2.5 bg-sky-500 text-zinc-950 hover:bg-sky-600 text-center text-xs font-sans tracking-widest uppercase rounded-md transition-all duration-300 block font-bold shadow-lg shadow-sky-500/10"
                >
                  Request Briefing
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Workflow steps */}
        <div className="mb-24 relative border-t border-zinc-900 pt-20">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-sky-400 block mb-2">
              [ THE PIPELINE ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white font-sans">
              Production Workflow
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "Discovery Briefing",
                desc: "We align on target platforms, references, styling, and deliverables via email or a 15-minute creative call."
              },
              {
                num: "02",
                title: "Custom Proposal",
                desc: "We send a transparent budget deck detailing crew size, shot list, timelines, and rights options. 50% deposit secures the dates."
              },
              {
                num: "03",
                title: "Production Day",
                desc: "Equipped with professional cinema lines and custom lighting setups, we capture all scheduled assets efficiently on set."
              },
              {
                num: "04",
                title: "Final Delivery",
                desc: "Selects are graded in DaVinci Resolve or Capture One. Two rounds of feedback are included to polish cuts before asset launch."
              }
            ].map((step, idx) => (
              <div key={step.num} className="space-y-4">
                <div className="text-2xl font-semibold text-sky-400 border-b border-zinc-900 pb-3 font-mono">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed font-sans">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24 border-t border-zinc-900 pt-20">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase block mb-2">
              [ CLIENT VERDICTS ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white font-sans">
              Creative Proof
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 border border-zinc-900 bg-zinc-900/40 flex flex-col justify-between rounded-md">
              <p className="text-xs sm:text-sm font-light italic leading-relaxed text-zinc-400 mb-8 font-sans">
                &ldquo;KITESTUDIOS absolutely crushed our event coverage. The dual photo and video team was invisible on set but captured every single key moment with styling that felt cinematic and premium. The final assets completely elevated our branding.&rdquo;
              </p>
              <div>
                <span className="block text-xs font-semibold tracking-widest uppercase text-white font-sans">
                  DJ TJ
                </span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-zinc-500 mt-1">
                  Event Manager & DJ
                </span>
              </div>
            </div>

            <div className="p-8 border border-zinc-900 bg-zinc-900/40 flex flex-col justify-between rounded-md">
              <p className="text-xs sm:text-sm font-light italic leading-relaxed text-zinc-400 mb-8 font-sans">
                &ldquo;We booked the premium coverage for our wedding reception and the dual photo/video team was absolutely phenomenal. Every detail, from the ceremony to the party, was captured with cinematic styling. Best investment we made.&rdquo;
              </p>
              <div>
                <span className="block text-xs font-semibold tracking-widest uppercase text-white font-sans">
                  Tony
                </span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-zinc-500 mt-1">
                  Electrical Engineer
                </span>
              </div>
            </div>

            <div className="p-8 border border-zinc-900 bg-zinc-900/40 flex flex-col justify-between rounded-md">
              <p className="text-xs sm:text-sm font-light italic leading-relaxed text-zinc-400 mb-8 font-sans">
                &ldquo;The lookbook campaign assets we shot with KITESTUDIOS completely transformed our brand presence. The photos look incredible on our Shopify storefront, and the vertical social cuts generated huge engagement on our launch.&rdquo;
              </p>
              <div>
                <span className="block text-xs font-semibold tracking-widest uppercase text-white font-sans">
                  Glyf
                </span>
                <span className="block text-[10px] font-sans tracking-widest uppercase text-zinc-500 mt-1">
                  Founder, Glyf Studio
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-24 border-t border-zinc-900 pt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase block mb-2">
              [ FAQ ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white font-sans">
              Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-b border-zinc-900 pb-4 transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 font-semibold hover:text-sky-400 transition-colors"
                  >
                    <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-zinc-300 hover:text-white font-sans">
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-zinc-500 shrink-0 transform transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-sky-400" : ""
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
                        <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-light mt-2 pr-6 font-sans">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-20 border-t border-zinc-900 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase mb-6 text-white font-sans">
            Want to learn more?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto mb-8 font-light font-sans">
            Let’s discuss your upcoming project requirements. Connect with us to get a custom quotation tailored to your target audience.
          </p>
          <div className="flex justify-center">
            <Link
              href="/book"
              className="px-10 py-3.5 bg-sky-500 text-zinc-950 hover:bg-sky-600 border border-sky-500 transition-all text-xs font-sans font-bold tracking-widest uppercase rounded-md shadow-lg shadow-sky-500/10 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
