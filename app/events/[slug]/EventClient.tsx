"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
} from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

function LazyMedia({ image }: { image: any }) {
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
        <img
          src={urlFor(image).width(800).url()}
          alt="Event Photo"
          className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/30 dark:bg-zinc-900/30 backdrop-blur-sm animate-pulse min-h-[220px]">
          <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-neutral-800 dark:border-t-neutral-100 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default function EventClient({ event }: { event: any }) {
  const photos = event.photos || [];
  const [activeItem, setActiveItem] = useState<any | null>(null);
  const [copiedFooter, setCopiedFooter] = useState(false);
  const [visibleCount, setVisibleCount] = useState(18);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  const visibleItems = photos.slice(0, visibleCount);

  const activeIndex = activeItem
    ? photos.findIndex((item: any) => item._key === activeItem._key)
    : -1;

  const handleNext = () => {
    if (activeIndex === -1) return;
    const nextIndex = (activeIndex + 1) % photos.length;
    setActiveItem(photos[nextIndex]);
  };

  const handlePrev = () => {
    if (activeIndex === -1) return;
    const prevIndex = (activeIndex - 1 + photos.length) % photos.length;
    setActiveItem(photos[prevIndex]);
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
  }, [activeItem, activeIndex, photos]);

  // Infinite Scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && photos.length > visibleCount) {
          setVisibleCount((prev) => prev + 18);
        }
      },
      {
        rootMargin: "400px",
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [photos.length, visibleCount]);

  // Rolling Adjacent Filmstrip Window (centered on active index)
  const getAdjacentThumbs = () => {
    if (activeIndex === -1 || photos.length === 0) return [];
    const range = 4;
    const thumbs = [];
    for (let i = -range; i <= range; i++) {
      const idx = (((activeIndex + i) % photos.length) + photos.length) % photos.length;
      thumbs.push({ item: photos[idx], originalIndex: i });
    }
    return thumbs;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tomy@kitestudios.net");
    setCopiedFooter(true);
    setTimeout(() => setCopiedFooter(false), 2000);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeItem) return;
    
    const imageUrl = urlFor(activeItem).url();
    
    // Fire Meta Pixel custom event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "PhotoDownloaded", { photoUrl: imageUrl });
    }

    try {
      // Fetch the image natively so we can force a download prompt
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `kitestudios-event-${activeItem._key}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback: just open in new tab
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex flex-col justify-between selection:bg-neutral-200 dark:selection:bg-neutral-800">
      <MinimalNav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        {/* Project Header Title */}
        <div className="mb-12">
          <Link
            href="/events"
            className="text-[10px] font-mono tracking-widest text-zinc-400 hover:text-black dark:hover:text-white uppercase transition-colors"
          >
            ← Back to Events
          </Link>
          <h1 className="text-3xl sm:text-4xl font-light tracking-wider uppercase mt-2">
            {event.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs font-mono text-zinc-400 dark:text-zinc-500 tracking-widest mt-2 uppercase">
            <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            {event.location && (
              <>
                <span className="hidden sm:inline">•</span>
                <span>{event.location}</span>
              </>
            )}
            <span className="hidden sm:inline">•</span>
            <span>{photos.length} {photos.length === 1 ? "PHOTO" : "PHOTOS"}</span>
          </div>
          {event.description && (
            <p className="mt-6 text-sm font-light leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400">
              {event.description}
            </p>
          )}
        </div>

        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              No Photos Found
            </span>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs font-light">
              This event gallery doesn't have any photos uploaded yet.
            </p>
          </div>
        ) : (
          <>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-12">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((item: any, index: number) => (
                  <motion.div
                    key={item._key}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
                    className="group break-inside-avoid relative cursor-pointer flex flex-col bg-transparent mb-6 sm:mb-12"
                    onClick={() => setActiveItem(item)}
                  >
                    <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-900 shadow-sm">
                      <LazyMedia image={item} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {photos.length > visibleCount && (
              <div ref={loadMoreRef} className="flex justify-center mt-16 py-8">
                <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-700 border-t-neutral-800 dark:border-t-neutral-100 animate-spin opacity-50" />
              </div>
            )}
          </>
        )}
      </main>

      <footer className="w-full border-t border-neutral-100 dark:border-neutral-900 py-16 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-neutral-400 dark:text-neutral-500 text-xs">
          <div className="text-center md:text-left">
            <span className="font-light tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase block mb-1">
              KITESTUDIOS
            </span>
            <span className="text-[10px] tracking-wider font-mono uppercase font-light">
              © 2026 TOMY KITE • PORTFOLIO
            </span>
          </div>

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
                  onClick={handleDownload}
                  className="border border-white/20 p-2 bg-black/60 hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
                  aria-label="Download high-res photo"
                  title="Download High-Res Photo"
                >
                  <Download className="h-4.5 w-4.5" />
                </button>
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

                <img
                  src={urlFor(activeItem).url()}
                  alt="Event Fullscreen Photo"
                  className="object-contain w-full h-full max-h-[75vh]"
                />
              </div>

              <div className="bg-neutral-950 border-t border-neutral-900 px-6 py-4 flex items-center justify-center overflow-hidden">
                <div className="flex items-center space-x-3 overflow-x-auto scrollbar-none max-w-full">
                  {getAdjacentThumbs().map(({ item, originalIndex }) => {
                    const isActive = item._key === activeItem._key;
                    return (
                      <button
                        key={`thumb-${item._key}-${originalIndex}`}
                        onClick={() => setActiveItem(item)}
                        className={`relative h-10 sm:h-12 aspect-[3/2] overflow-hidden border transition-all duration-300 shrink-0 ${
                          isActive
                            ? "border-white scale-105 shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                            : "border-neutral-800 opacity-35 hover:opacity-85 hover:border-neutral-600"
                        }`}
                      >
                        <img
                          src={urlFor(item).width(300).url()}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
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
