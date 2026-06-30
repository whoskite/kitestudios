"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import { portfolioItems, projectsList, MediaItem } from "@/lib/portfolio-data";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import Footer from "@/components/Footer";

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
        rootMargin: "250px",
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
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/30 dark:bg-zinc-900/30 backdrop-blur-sm animate-pulse min-h-[220px]">
          <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-neutral-800 dark:border-t-neutral-100 animate-spin" />
        </div>
      )}
    </div>
  );
}

function ProjectClientContent({ project }: { project: string }) {
  const searchParams = useSearchParams();
  const filter = (searchParams.get("filter") as "photo" | "video" | "all") || "all";
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(18);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Pagination count

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

  // Filter projects by active category (photos/videos) for the nav bar tags
  const visibleProjects = projectsList.filter((p) => {
    if (filter === "all") return true;
    return portfolioItems.some((item) => item.project === p && item.type === filter);
  });

  // Filter items specifically for this project
  const projectItems = portfolioItems.filter((item) => item.project === project);

  const filteredItems = projectItems.filter((item) => {
    return filter === "all" || item.type === filter;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);

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

  // Reset page count helper

  // Rolling Adjacent Filmstrip Window (centered on active index)
  const getAdjacentThumbs = () => {
    if (activeIndex === -1 || filteredItems.length === 0) return [];
    const range = 4; // Show 4 previous and 4 next items
    const thumbs = [];
    for (let i = -range; i <= range; i++) {
      const idx = (((activeIndex + i) % filteredItems.length) + filteredItems.length) % filteredItems.length;
      thumbs.push({ item: filteredItems[idx], originalIndex: i });
    }
    return thumbs;
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-all duration-300 flex flex-col justify-between selection:bg-sky-500/20">
      <MinimalNav
        projectFilter={project}
        projects={visibleProjects}
      />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        {/* Project Header Title */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-xs font-sans font-semibold tracking-widest text-zinc-400 hover:text-sky-400 uppercase transition-colors"
          >
            ← Back to Archives
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase mt-2 font-sans">
            {project}
          </h1>
          <p className="text-xs font-sans text-zinc-400 tracking-wider mt-1 font-semibold font-light">
            PROJECT ARCHIVE • {filteredItems.length} {filteredItems.length === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              No Assets Found
            </span>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs font-light">
              No matching assets were found in this specific selection. Try resetting filters.
            </p>
            <Link
              href={`/project/${slugify(project)}`}
              className="mt-6 px-4 py-2 border border-neutral-300 dark:border-neutral-800 text-xs tracking-wider uppercase font-mono hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
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
                    <div className="relative overflow-hidden bg-slate-50 border border-zinc-200 shadow-sm rounded-md hover:shadow-md transition-shadow duration-300">
                      <LazyMedia item={item} />

                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/35 transition-colors z-10">
                          <div className="border border-white/40 p-3 bg-black/40 backdrop-blur-sm rounded-full text-white transform group-hover:scale-105 transition-transform duration-300">
                            <Play className="h-5 w-5 fill-white" />
                          </div>
                        </div>
                      )}

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

      <Footer />

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setActiveItem(null)}
            />

            <motion.div
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="relative max-w-4xl w-full bg-neutral-950 border border-neutral-900 text-white shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
            >
              <div className="absolute top-4 right-4 z-40 flex items-center space-x-3">
                <button
                  onClick={() => setActiveItem(null)}
                  className="border border-white/20 p-2 bg-black/60 hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
                  aria-label="Close view"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
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
  );
}

export default function ProjectClient({ project }: { project: string }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-neutral-800 dark:border-t-neutral-100 animate-spin" />
      </div>
    }>
      <ProjectClientContent project={project} />
    </Suspense>
  );
}
