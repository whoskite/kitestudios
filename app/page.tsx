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
import Footer from "@/components/Footer";
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
  const [visibleCount, setVisibleCount] = useState(18);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  // Intro animation is disabled for now to avoid confusion
  useEffect(() => {
    setShowIntro(false);
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
            The Dedicated Visual Production Partner for Scaling Brands
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 font-normal leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
            We collaborate closely with marketers, brand directors, and entrepreneurs to produce cinematic video campaigns, high-impact digital content, and commercial photography built to engage audiences and drive results.
          </p>
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

      {/* Agency Profile / Who We Serve Section */}
      <section className="border-t border-b border-zinc-200 bg-slate-50/30 py-16 sm:py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Column 1 & 2: Who We Are */}
          <div className="lg:col-span-2 space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-accent uppercase block font-sans">
              01 / AGENCY PROFILE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-sans leading-tight">
              Who We Are
            </h2>
            <p className="text-zinc-650 leading-relaxed font-sans text-sm sm:text-base max-w-2xl">
              KITESTUDIOS is a premium video production company and full-service creative agency. We partner closely with marketers, brand directors, and entrepreneurs to produce cinematic videos, high-performance content, and professional commercial photography built to engage audiences and elevate brand presence.
            </p>
          </div>

          {/* Column 3: Who We Serve */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-accent uppercase block font-sans">
              02 / WHO WE SERVE
            </span>
            <div className="space-y-4 font-sans">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">Startups</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">
                    Establishing trust and visual identity with cinematic keynotes, founder origin stories, and product demos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">E-commerce Companies</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">
                    Driving conversion and scaling ads with scroll-stopping product highlights and campaign assets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-wider">Mid-Sized Companies</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mt-0.5">
                    Streamlining communications with internal training videos, company town halls, and recruitment content.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />

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
