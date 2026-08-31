"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Award,
  AlertCircle,
  HelpCircle,
  Camera,
  Layers,
  Flame,
  ArrowRight,
  Info,
  X,
  Maximize2,
  Truck,
  Zap,
} from "lucide-react";
import ProductPhotographyQuiz from "@/components/ProductPhotographyQuiz";

export default function ProductPhotographyLandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<number | null>(null);

  const scrollToQuiz = () => {
    const element = document.getElementById("qualification-quiz");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const faqs = [
    {
      q: "How do we ship product samples to your Los Angeles studio?",
      a: "We accept secure sample deliveries from UPS, FedEx, USPS, and other major couriers. Deliveries are accepted Monday through Friday during standard business hours. Once you submit the onboarding form, we will provide our secure studio shipping address in Los Angeles, CA. If you would like your samples returned after the shoot, please include a pre-paid return shipping label inside the shipment."
    },
    {
      q: "What is your typical turnaround time? Can we get photos in 24 hours?",
      a: "Yes. We offer an expedited turnaround service where you can receive your completed, high-resolution product photos in as little as 24 hours after the samples arrive at our studio. Standard turnaround for fully styled hero editorials and clean catalog shots is 10 to 14 business days."
    },
    {
      q: "What camera gear and lenses do you use?",
      a: "We capture all product media using medium-format digital systems, including the 100MP Hasselblad X2D and the 150MP Phase One XF, paired with high-performance prime macro lenses. This ensures incredible resolution, dynamic range, and color accuracy for print packaging, online storefronts, or digital ad campaigns."
    },
    {
      q: "Do we get to approve the creative direction and shot list?",
      a: "Absolutely. Prior to production day, we hold a 15-minute creative alignment call to review your brand styling guidelines, color palette preferences, and target angles. We build a collaborative shot list specifying backgrounds, props, and styling layouts."
    },
    {
      q: "Who owns the commercial rights to the final photographs?",
      a: "Your brand receives full, perpetual ownership and royalty-free commercial distribution rights for all completed visual assets. You are free to use them on your Shopify store, Amazon listings, email newsletters, paid campaigns, and physical marketing material indefinitely."
    },
    {
      q: "Do you sign Non-Disclosure Agreements (NDAs)?",
      a: "Yes. We respect intellectual property and pre-market confidentiality. We are happy to sign standard corporate NDAs prior to receiving physical product samples to ensure your designs remain confidential."
    }
  ];

  const portfolioGallery = [
    {
      src: "/Portfolio/Ecommerce/0d1f7b25-872c-4763-8ed0-c6d7ecd427f3_rw_1920.jpg",
      title: "Luxury Cosmetics Editorial",
      category: "Skincare / Beauty",
      camera: "Phase One XF 150MP",
      lens: "Schneider Kreuznach 80mm",
      settings: "f/8.0 • 1/125s • ISO 50",
    },
    {
      src: "/Portfolio/Ecommerce/34f9863e-c1a4-4866-9493-9f47ea5d063d_rw_1920.jpg",
      title: "Minimal Botanical Styling",
      category: "Cosmetics / Skincare",
      camera: "Phase One XF 150MP",
      lens: "Schneider Kreuznach 80mm",
      settings: "f/8.0 • 1/125s • ISO 50",
    },
    {
      src: "/Portfolio/Ecommerce/4737399a-2610-4883-b262-062813e7abea_rw_1920.jpg",
      title: "Clean Skincare Flatlay",
      category: "Cosmetics / E-commerce",
      camera: "Phase One XF 150MP",
      lens: "Schneider Kreuznach 80mm",
      settings: "f/8.0 • 1/125s • ISO 50",
    },
    {
      src: "/Portfolio/Products/3bdef4d5e19ecc0d7e5f74c9_rw_1920.jpg",
      title: "Premium Denim Detail",
      category: "Apparel / Textiles",
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5",
      settings: "f/8.0 • 1/125s • ISO 64",
    },
    {
      src: "/Portfolio/Products/4e258022a09102117577c468_rw_1920.jpg",
      title: "Textured Leather Close-up",
      category: "Accessories / Leather",
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5",
      settings: "f/8.0 • 1/125s • ISO 64",
    },
    {
      src: "/Portfolio/Products/518d0d2471c414178e5d65ee_rw_1920.jpg",
      title: "Apparel Stitching Detail",
      category: "Apparel / Denim",
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5",
      settings: "f/8.0 • 1/125s • ISO 64",
    },
    {
      src: "/Portfolio/Products/950fcf2e-ae7c-40c6-afc6-2fc2e4e1797c_rw_1920.jpg",
      title: "Minimalist Geometry Shot",
      category: "Studio / Products",
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5",
      settings: "f/8.0 • 1/125s • ISO 64",
    },
    {
      src: "/Portfolio/Products/96e464de25a3566d9fb0d107_rw_1920.jpg",
      title: "Apparel Texture Angle",
      category: "Apparel / Fabrics",
      camera: "Hasselblad X2D 100C",
      lens: "XCD 90mm f/2.5",
      settings: "f/8.0 • 1/125s • ISO 64",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-zinc-100 flex flex-col justify-between selection:bg-amber-500/20 font-sans relative overflow-hidden">
      
      {/* Subtle Glowing Background Accents */}
      <div className="absolute top-[-10%] left-[20%] w-[50%] aspect-square rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[45%] aspect-square rounded-full bg-yellow-600/5 blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="w-full bg-[#0B0B0C]/80 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center font-bold text-zinc-950 text-sm">
              K
            </div>
            <span className="text-xs font-semibold tracking-[0.25em] text-zinc-300">
              KITESTUDIOS <span className="text-[10px] text-amber-400 tracking-wider">/ PHOTO</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-400">
              STUDIO BOOKINGS ACTIVE
            </span>
          </div>
        </div>
      </header>

      {/* Announcement Alert Banner */}
      <div className="w-full bg-amber-950/20 border-b border-amber-900/30 py-2.5 px-4 text-center">
        <div className="container mx-auto flex items-center justify-center gap-2 text-xs font-mono text-amber-400">
          <AlertCircle className="h-4 w-4" />
          <span>BOOKING Q3 & Q4 CREATIVE CAMPAIGNS • LIMITED MONTHLY CAPACITY</span>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-5xl relative z-10 space-y-32">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-2 text-[10px] font-mono tracking-wider uppercase font-semibold">
            <span className="flex items-center gap-1.5 px-3 py-1 border border-zinc-800 bg-zinc-900/60 text-zinc-300 rounded-full">
              <Camera className="h-3.5 w-3.5 text-amber-500" />
              COMMERCIAL PRODUCT STUDIO
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 border border-amber-950/40 bg-amber-950/20 text-amber-400 rounded-full">
              <Zap className="h-3.5 w-3.5 animate-pulse" />
              24HR Turnaround Available
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.15] text-white">
            Stop Losing Store Conversions To <br className="hidden sm:inline" /> Flat, Low-Quality <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 italic">
              Product Photos
            </span>
          </h1>
          
          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-3xl mx-auto">
            We produce high-end, medium-format product photography starting at just <strong className="text-white font-semibold">$20/image</strong>. Deliver samples via UPS, FedEx, or USPS and receive your polished commercial photos in as little as <strong className="text-white font-semibold">24 hours</strong>.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 w-full max-w-md mx-auto">
            <button
              onClick={scrollToQuiz}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer w-full"
            >
              Check Studio Availability <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* LOGO BANNER SECTION */}
        <section className="py-8 border-t border-b border-zinc-900 bg-zinc-950/30 -mx-4 sm:-mx-6 px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
              Compatible Media Standards for Major Storefronts & Social Channels
            </span>
            
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 hover:opacity-90 transition-opacity duration-350 py-2">
              
              {/* Shopify */}
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white select-none">
                <svg className="h-4 w-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.8 8.8c-.4-.4-.9-.8-1.5-1.1v-2c0-.5-.4-.9-.9-.9s-.9.4-.9.9v1.2c-.6-.2-1.2-.3-1.8-.3h-.9V3.5c0-.8-.7-1.5-1.5-1.5H9.7c-.8 0-1.5.7-1.5 1.5v3.1h-.9c-.6 0-1.2.1-1.8.3V5.6c0-.5-.4-.9-.9-.9s-.9.4-.9.9v2c-.6.3-1.1.7-1.5 1.1C1.5 9.6.9 10.7.9 12c0 2.2 1.8 4 4 4h.8v4.5c0 .8.7 1.5 1.5 1.5h9.7c.8 0 1.5-.7 1.5-1.5V16h.8c2.2 0 4-1.8 4-4 0-1.3-.6-2.4-1.4-3.2zm-9.1-5.3h4.6v3.1H9.7V3.5zm7.2 17H7.2V16h9.7v4.5zm2.2-6.5c0 1.2-1 2.2-2.2 2.2h-.8v-4.5c0-.8-.7-1.5-1.5-1.5H8.7c-.8 0-1.5.7-1.5 1.5v4.5h-.8c-1.2 0-2.2-1-2.2-2.2 0-.8.4-1.5.9-1.9.3-.2.7-.4 1.1-.5V11c0 .5.4.9.9.9s.9-.4.9-.9v-.8c.6.2 1.2.3 1.8.3h4.6c.6 0 1.2-.1 1.8-.3V11c0 .5.4.9.9.9s.9-.4.9-.9V9.5c.4.1.8.3 1.1.5.5.4.9 1.1.9 1.9z"/>
                </svg>
                <span>Shopify</span>
              </div>

              {/* Amazon */}
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white select-none">
                <svg className="h-4 w-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm3.3 12.8c-.8.6-2 .9-3.3.9-1.5 0-2.8-.4-3.5-1.1-.3-.3-.2-.7.2-1 .4-.3 1-.1 1.3.1.5.4 1.3.6 2 .6 1 0 1.8-.2 2.2-.6.4-.3.9-.3 1.2 0 .3.3.3.8-.1 1.2zM17 11.2c-.4.5-1 .5-1.5.2L12 9.5 8.5 11.4c-.5.3-1 .2-1.4-.2-.4-.4-.3-1 .2-1.3l4-2.2c.4-.2.9-.2 1.4 0l4 2.2c.5.3.6.9.3 1.3z"/>
                </svg>
                <span>Amazon</span>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white select-none">
                <svg className="h-4 w-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                <span>Instagram</span>
              </div>

              {/* TikTok */}
              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-white select-none">
                <svg className="h-4 w-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.02-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 2.03-.76 4.14-2.22 5.58-1.58 1.56-3.88 2.37-6.11 2.33-2.23-.04-4.51-.95-5.94-2.68-1.53-1.85-2.07-4.47-1.49-6.84.51-2.1 1.89-3.99 3.82-4.87 1.53-.7 3.25-.87 4.88-.47v4.19c-.83-.24-1.74-.2-2.54.18-.78.37-1.4 1.09-1.63 1.93-.32 1.1-.06 2.37.7 3.21.72.8 1.84 1.21 2.92 1.15 1.09-.06 2.14-.66 2.67-1.61.42-.75.5-1.63.47-2.48-.03-3.41-.01-6.82-.02-10.23.01-.13 0-.27.01-.4 1-.01 2.01-.01 3.01-.02-.01-.09-.01-.18-.01-.27z"/>
                </svg>
                <span>TikTok</span>
              </div>

              {/* Etsy */}
              <div className="flex items-center gap-1 text-xs font-semibold tracking-wider text-white select-none">
                <span className="text-amber-500 font-serif italic text-base mr-0.5 font-bold">E</span>
                <span>Etsy</span>
              </div>

            </div>
          </div>
        </section>

        {/* PORTFOLIO IMAGES GRID SECTION */}
        <section className="space-y-12 border-t border-zinc-900 pt-20">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase block">
              [ STUDIO WORK ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">
              Studio Portfolio
            </h2>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Explore authentic high-resolution specimens captured with our 100MP Hasselblad and 150MP Phase One medium format configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {portfolioGallery.map((item, idx) => (
              <div 
                key={idx} 
                className="relative rounded-xl overflow-hidden aspect-[3/4] border border-zinc-900 bg-zinc-900 group flex flex-col justify-end cursor-pointer"
                onClick={() => setActiveLightbox(idx)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0 z-0 opacity-80 group-hover:opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
                <div className="relative z-20 p-4 space-y-1 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[8px] font-mono text-amber-400 tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 w-fit block">
                    {item.camera}
                  </span>
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider mt-1">{item.title}</h4>
                  <p className="text-[9px] text-zinc-400 font-light leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-0.5">{item.category}</p>
                </div>
                <div className="absolute top-3 right-3 p-1.5 bg-black/50 border border-zinc-800 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-3 w-3 text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LIGHTBOX COMPONENT */}
        <AnimatePresence>
          {activeLightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4"
              onClick={() => setActiveLightbox(null)}
            >
              <button 
                className="absolute top-6 right-6 p-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                onClick={() => setActiveLightbox(null)}
              >
                <X className="h-5 w-5" />
              </button>
              
              <div 
                className="max-w-4xl w-full flex flex-col md:flex-row gap-6 items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-[3/4] max-h-[80vh] w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex-1">
                  <img
                    src={portfolioGallery[activeLightbox].src}
                    alt={portfolioGallery[activeLightbox].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-left space-y-4 max-w-sm flex-1">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {portfolioGallery[activeLightbox].category}
                  </span>
                  <h3 className="text-2xl font-bold uppercase text-white tracking-wide">{portfolioGallery[activeLightbox].title}</h3>
                  
                  <div className="border-t border-zinc-900 pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Camera className="h-4 w-4 text-amber-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider leading-none">Capture Hardware</p>
                        <p className="text-zinc-250 mt-0.5 leading-tight">{portfolioGallery[activeLightbox].camera}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <Layers className="h-4 w-4 text-amber-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider leading-none">Optics & Lens Configuration</p>
                        <p className="text-zinc-250 mt-0.5 leading-tight">{portfolioGallery[activeLightbox].lens}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <Info className="h-4 w-4 text-amber-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider leading-none">Exposure Parameters</p>
                        <p className="text-zinc-250 mt-0.5 leading-tight font-mono">{portfolioGallery[activeLightbox].settings}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CAMPAIGN DELIVERABLES SECTION */}
        <section className="space-y-12 border-t border-zinc-900 pt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase block">
              [ PRICING & LOGISTICS ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">
              Studio Deliverables & Pricing
            </h2>
            <p className="text-xs sm:text-sm text-zinc-350 font-light leading-relaxed">
              We compile highly tailored creative assets starting at just <strong className="text-white font-semibold">$20/image</strong> for e-commerce catalog shots and <strong className="text-white font-semibold">$50/image</strong> for styled hero editorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="p-8 border border-zinc-950 bg-zinc-950/50 rounded-2xl flex flex-col justify-between shadow-sm hover:border-amber-500/20 transition-colors duration-300 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    PRICING FROM $50/IMAGE
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    HERO EDITORIALS
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  Styled Hero Shots
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Highly styled editorial photography featuring your product on curated backgrounds (stone, textured surface, wood), accented with botanical highlights or props.
                </p>
                <div className="border-t border-zinc-900 pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <Truck className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Courier delivery accepted from UPS, FedEx, & USPS.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <Zap className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Expedited 24-hour image delivery options available.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 border border-zinc-950 bg-zinc-950/50 rounded-2xl flex flex-col justify-between shadow-sm hover:border-amber-500/20 transition-colors duration-300 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    PRICING FROM $20/IMAGE
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    STOREFRONT ESSENTIALS
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  Clean E-Commerce Shots
                </h3>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Crisp, high-fidelity product catalog shots on solid white or minimal light grey backgrounds. Optimized specifically for Shopify, Amazon, Instagram, TikTok, and Etsy listings.
                </p>
                <div className="border-t border-zinc-900 pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>Standard high-fidelity formats matching Amazon & Shopify guidelines.</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <Award className="h-4 w-4 text-amber-500 shrink-0" />
                    <span>100% royalty-free commercial distribution licenses included.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUALIFYING QUIZ & COHORT CAPACITY */}
        <section id="qualification-quiz" className="scroll-mt-12 space-y-12 border-t border-zinc-900 pt-20">
          <div className="pt-10 max-w-xl mx-auto text-center space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase block">
              [ ONBOARDING INTAKE ]
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white">
              Studio Booking Intake
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Tell us about your product parameters and visual guidelines below. Vetted brands will be routed to schedule a direct creative review call.
            </p>
          </div>

          <ProductPhotographyQuiz />
        </section>

        {/* FAQs SECTION */}
        <section className="max-w-3xl mx-auto border-t border-zinc-900 pt-20">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase block mb-1">
              [ FAQS ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white">
              Creative Production FAQs
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
                    className="w-full flex justify-between items-center text-left py-2 font-medium hover:text-amber-400 transition-colors"
                  >
                    <span className="text-xs sm:text-sm uppercase tracking-wider font-light text-zinc-200 flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-amber-500 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-zinc-550 shrink-0 transform transition-transform duration-300 ${
                      isExpanded ? "rotate-180 text-zinc-100" : ""
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
                        <p className="text-xs sm:text-sm leading-relaxed text-zinc-400 font-light mt-2 pl-6 pr-6">
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

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-16 bg-[#070708] mt-16 transition-colors">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500 text-xs">
          <div className="text-center md:text-left">
            <span className="font-bold tracking-[0.2em] text-amber-500 uppercase block mb-1">
              KITESTUDIOS
            </span>
            <span className="text-xs tracking-wider uppercase font-light">
              © 2026 KITESTUDIOS • COMMERCIAL PRODUCT PHOTOGRAPHY
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
