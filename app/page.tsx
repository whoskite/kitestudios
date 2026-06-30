"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Info,
  X,
  Play,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import IntroAnimation from "@/components/IntroAnimation";
import { portfolioItems, projectsList, MediaItem } from "@/lib/portfolio-data";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

function LazyMedia({ item }: { item: MediaItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "250px", // Pre-fetch media slightly before viewport entry
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-neutral-50 dark:bg-neutral-900/60 min-h-[220px]">
      {isInView ? (
        item.type === "photo" ? (
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <video
            src={item.src}
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          />
        )
      ) : (
        /* Premium Minimal Loader State */
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/30 dark:bg-zinc-900/30 backdrop-blur-sm animate-pulse min-h-[220px]">
          <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-neutral-800 dark:border-t-neutral-100 animate-spin" />
        </div>
      )}
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const filter = (searchParams.get("filter") as "photo" | "video" | "all") || "all";
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [showMetadata, setShowMetadata] = useState(true);
  const [copiedFooter, setCopiedFooter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(18);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Session-based gate to only run the intro animation once per session
    const hasSeenIntro = sessionStorage.getItem("hasSeenKitestudiosIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  // Filter projects by active category (photos/videos) for the nav bar tags
  const visibleProjects = projectsList.filter((project) => {
    if (filter === "all") return true;
    return portfolioItems.some((item) => item.project === project && item.type === filter);
  });

  // Combine filters
  const filteredItems = portfolioItems.filter((item) => {
    return filter === "all" || item.type === filter;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);

  // Reset pagination when filter updates
  useEffect(() => {
    setVisibleCount(18);
  }, [filter]);

  // Monitor scroll height to show/hide "Back to Top" trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeIndex = activeItem
    ? filteredItems.findIndex((item) => item.id === activeItem.id)
    : -1;

  const handleNext = () => {
    if (activeIndex === -1) return;
    const nextIndex = (activeIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (activeIndex === -1) return;
    const prevIndex = (activeIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "Escape") {
        setActiveItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, activeIndex, filteredItems]);

  // Rolling Adjacent Filmstrip Window (centered on active index)
  const getAdjacentThumbs = () => {
    if (activeIndex === -1) return [];
    const range = 4; // Show 4 previous and 4 next items
    const thumbs = [];
    for (let i = -range; i <= range; i++) {
      const idx = (activeIndex + i + filteredItems.length) % filteredItems.length;
      thumbs.push({ item: filteredItems[idx], originalIndex: idx });
    }
    return thumbs;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tomy@kitestudios.net");
    setCopiedFooter(true);
    setTimeout(() => setCopiedFooter(false), 2000);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation
            onComplete={() => {
              setShowIntro(false);
              sessionStorage.setItem("hasSeenKitestudiosIntro", "true");
            }}
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white text-zinc-900 transition-all duration-300 flex flex-col justify-between selection:bg-sky-100">
        {/* Sleek Navigation passing double filter controls */}
        <MinimalNav
          projectFilter="all"
          projects={visibleProjects}
        />

        {/* Corporate Hero Section */}
        <div className="max-w-4xl mx-auto text-center mt-16 mb-20 px-6">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight font-sans">
            Cinematic Video Production for Events, Training, and Brands
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 font-normal leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
            We script, film, and edit high-impact corporate event coverage, internal training platforms, and strategic brand documentaries. Professional media assets built to drive engagement and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 font-sans font-semibold tracking-wider text-xs uppercase rounded-md shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Book Corporate Consultation
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 border border-zinc-200 text-zinc-700 hover:bg-slate-50 transition-all duration-300 font-sans font-semibold tracking-wider text-xs uppercase rounded-md shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              View Investment Options
            </Link>
          </div>
        </div>

      {/* Main Content Area - Landing directly into visual archives */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="text-xs uppercase font-sans tracking-widest text-zinc-400 mb-2">
              No Archives Found
            </span>
            <p className="text-zinc-500 text-sm max-w-xs font-light font-sans">
              No matching assets were found in this specific selection. Try resetting filters.
            </p>
            <Link
              href="/"
              className="mt-6 px-4 py-2 border border-zinc-200 text-xs tracking-wider uppercase font-sans font-semibold rounded-md hover:bg-zinc-50 text-zinc-600 transition-colors"
            >
              Reset Filters
            </Link>
          </div>
        ) : (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-12">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
                    className="group break-inside-avoid relative cursor-pointer flex flex-col bg-transparent mb-6 sm:mb-12"
                    onClick={() => setActiveItem(item)}
                  >
                    {/* Media Container - Borderless minimal frame */}
                    <div className="relative overflow-hidden bg-slate-50 border border-zinc-200 shadow-sm rounded-md hover:shadow-md transition-shadow duration-300">
                      <LazyMedia item={item} />

                      {/* Play overlay for video posts */}
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/35 transition-colors z-10">
                          <div className="border border-white/40 p-3 bg-black/40 backdrop-blur-sm rounded-full text-white transform group-hover:scale-105 transition-transform duration-300">
                            <Play className="h-5 w-5 fill-white" />
                          </div>
                        </div>
                      )}

                      {/* Project Tag */}
                      <Link
                        href={`/project/${slugify(item.project)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 left-3 bg-white/95 text-zinc-800 hover:bg-accent hover:text-white transition-all shadow-sm px-2.5 py-1 text-[10px] font-sans tracking-widest uppercase font-bold z-10 rounded-md"
                      >
                        {item.project}
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* See More Button */}
            {filteredItems.length > visibleCount && (
              <div className="flex justify-center mt-12 mb-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-8 py-3.5 border border-zinc-200 hover:border-zinc-800 text-zinc-700 hover:text-zinc-900 transition-all font-sans font-semibold tracking-wider text-xs uppercase rounded-md shadow-sm bg-white cursor-pointer"
                >
                  See More
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Sleek Minimal Sign-off Footer */}
      <footer className="w-full border-t border-zinc-200 py-16 bg-slate-50/50 mt-16">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500 text-xs">
          {/* Copyright signature */}
          <div className="text-center md:text-left">
            <span className="font-semibold tracking-[0.2em] text-zinc-900 uppercase block mb-1 font-sans">
              KITESTUDIOS
            </span>
            <span className="text-xs tracking-wider font-mono uppercase font-light">
              © 2026 KITESTUDIOS • PORTFOLIO
            </span>
            <button
              onClick={() => {
                sessionStorage.removeItem("hasSeenKitestudiosIntro");
                setShowIntro(true);
              }}
              className="text-[10px] tracking-widest font-sans uppercase text-zinc-500 hover:text-accent mt-2 block transition-colors underline decoration-dotted"
            >
              [ Replay Intro Film ]
            </button>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-12 font-medium tracking-widest text-xs uppercase">
            <a
              href="https://instagram.com/kitestudios6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent text-zinc-650 transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="mailto:tomy@kitestudios.net"
              className="hover:text-accent text-zinc-650 transition-colors"
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
              className="font-bold text-zinc-700 hover:text-accent transition-colors text-xs flex items-center justify-center md:justify-end gap-2 uppercase"
            >
              TOMY@KITESTUDIOS.NET
              <span className="text-xs bg-white text-zinc-500 px-1 py-0.5 border border-zinc-200 rounded-sm shadow-sm ml-2">
                {copiedFooter ? "COPIED" : "COPY"}
              </span>
            </button>
          </div>
        </div>
      </footer>

      {/* Gorgeous Immersive Lightbox & Theater Video Overlays */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            {/* Click outside target */}
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setActiveItem(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-900 text-white shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
            >
              {/* Controls bar */}
              <div className="absolute top-4 right-4 z-40 flex items-center space-x-3">
                {/* Close Button */}
                <button
                  onClick={() => setActiveItem(null)}
                  className="border border-white/20 p-2 bg-black/60 hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
                  aria-label="Close view"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Media viewer panel */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
                {/* Left Arrow overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/60 hover:bg-white hover:text-black border border-white/10 hover:border-white transition-all cursor-pointer rounded-full text-white"
                  aria-label="Previous asset"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Right Arrow overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/60 hover:bg-white hover:text-black border border-white/10 hover:border-white transition-all cursor-pointer rounded-full text-white"
                  aria-label="Next asset"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {activeItem.type === "photo" ? (
                  <img
                    src={activeItem.src}
                    alt={activeItem.title}
                    className="object-contain w-full h-full max-h-[75vh]"
                  />
                ) : (
                  <div className="relative w-full h-full aspect-video">
                    {activeItem.videoUrl ? (
                      <video
                        src={activeItem.videoUrl}
                        controls
                        autoPlay
                        loop
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs uppercase opacity-75">
                        Video source unavailable
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dynamic Filmstrip preview row */}
              <div className="bg-neutral-950 border-t border-neutral-900 px-6 py-4 flex items-center justify-center overflow-hidden">
                <div className="flex items-center space-x-3 overflow-x-auto scrollbar-none max-w-full">
                  {getAdjacentThumbs().map(({ item, originalIndex }) => {
                    const isActive = item.id === activeItem.id;
                    return (
                      <button
                        key={`thumb-${item.id}-${originalIndex}`}
                        onClick={() => setActiveItem(item)}
                        className={`relative h-10 sm:h-12 aspect-[3/2] overflow-hidden border transition-all duration-300 shrink-0 ${
                          isActive
                            ? "border-white scale-105 shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                            : "border-neutral-800 opacity-35 hover:opacity-85 hover:border-neutral-600"
                        }`}
                      >
                        {item.type === "photo" ? (
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={item.src}
                            muted
                            className="w-full h-full object-cover"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button (Mobile only) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={scrollToTop}
            className="sm:hidden fixed bottom-6 right-6 z-40 p-3 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg text-black dark:text-white cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-neutral-800 dark:border-t-neutral-100 animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
