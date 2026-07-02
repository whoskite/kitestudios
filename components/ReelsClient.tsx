"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Copy,
  Check,
  PhoneCall,
  Instagram,
  ArrowRight,
  Video
} from "lucide-react";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export interface ReelType {
  _id: string;
  title: string;
  category?: string;
  description?: string;
  videoUrl: string;
  coverImage: any;
}

const CATEGORY_MAP: Record<string, string> = {
  corporate: "Corporate / Brand",
  medspa: "Medspa / Wellness",
  fashion: "Fashion / Commercial",
  product: "Product Showcase",
  event: "Event Highlights",
  fitness: "Fitness",
  lifestyle: "Lifestyle",
  "howto-food": "How-To & Food",
};

interface ReelsClientProps {
  reels: ReelType[];
}

export default function ReelsClient({ reels }: ReelsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Player state
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Get unique list of categories from the uploaded reels
  const categories = [
    { label: "All Work", value: "all" },
    ...Array.from(new Set(reels.map((r) => r.category).filter(Boolean))).map((cat) => {
      const displayLabel = CATEGORY_MAP[cat as string] || (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "");
      return { label: displayLabel, value: cat as string };
    }),
  ];

  // Filter reels based on selection
  const filteredReels = reels.filter((reel) => {
    if (selectedCategory === "all") return true;
    return reel.category === selectedCategory;
  });

  // Handle deep-linked reel on mount or searchParams change
  useEffect(() => {
    const reelId = searchParams.get("reel");
    if (reelId) {
      const idx = filteredReels.findIndex((r) => r._id === reelId);
      if (idx !== -1) {
        setActiveReelIndex(idx);
      } else {
        // If it's not in the filtered list, check the entire reels list
        const entireIdx = reels.findIndex((r) => r._id === reelId);
        if (entireIdx !== -1) {
          setSelectedCategory("all");
          setActiveReelIndex(entireIdx);
        }
      }
    }
  }, [searchParams, reels]);

  // Handle keyboard events when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateReel("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateReel("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeReelIndex, filteredReels]);

  // Adjust play/pause state when active reel changes or play state changes
  useEffect(() => {
    if (activeReelIndex !== null && modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.play().catch(() => {
          // Autoplay block safety
          setIsPlaying(false);
        });
      } else {
        modalVideoRef.current.pause();
      }
    }
  }, [activeReelIndex, isPlaying]);

  // Reset progress and set play state to true when switching reels
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
  }, [activeReelIndex]);

  const closeModal = () => {
    setActiveReelIndex(null);
    setIsPlaying(false);
    // Remove query param without refreshing the page
    const params = new URLSearchParams(window.location.search);
    params.delete("reel");
    const newRelativePathQuery = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
    router.replace(newRelativePathQuery, { scroll: false });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      const current = modalVideoRef.current.currentTime;
      const dur = modalVideoRef.current.duration || 0;
      setCurrentTime(current);
      setDuration(dur);
      if (dur > 0) {
        setProgress((current / dur) * 100);
      }
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalVideoRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clickTime = pos * duration;
    modalVideoRef.current.currentTime = clickTime;
    setCurrentTime(clickTime);
    setProgress(pos * 100);
  };

  const navigateReel = (direction: "next" | "prev") => {
    if (activeReelIndex === null || filteredReels.length <= 1) return;

    let newIndex = activeReelIndex;
    if (direction === "next") {
      newIndex = (activeReelIndex + 1) % filteredReels.length;
    } else {
      newIndex = (activeReelIndex - 1 + filteredReels.length) % filteredReels.length;
    }

    const nextReel = filteredReels[newIndex];
    setActiveReelIndex(newIndex);

    // Update query parameter
    const params = new URLSearchParams(window.location.search);
    params.set("reel", nextReel._id);
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  const copyShareLink = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?reel=${reelId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(reelId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const activeReel = activeReelIndex !== null ? filteredReels[activeReelIndex] : null;

  return (
    <div className="space-y-16">
      {/* Dynamic Category Navigation pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-zinc-900 pb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setSelectedCategory(cat.value);
              setActiveReelIndex(null); // Close active if filtered
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
              selectedCategory === cat.value
                ? "bg-sky-500 text-zinc-950 border-sky-500 shadow-lg shadow-sky-500/10 scale-105"
                : "bg-zinc-900/50 text-zinc-400 border-zinc-800/80 hover:text-white hover:border-zinc-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid containing 9:16 vertical cards */}
      {filteredReels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-zinc-900 bg-zinc-950/40 rounded-2xl">
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">
            No Reels Found
          </span>
          <p className="text-zinc-400 text-sm max-w-xs font-light">
            There are currently no vertical video reels uploaded for this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredReels.map((reel, idx) => (
            <div key={reel._id} className="relative group">
              <ReelCard
                reel={reel}
                onClick={() => {
                  setActiveReelIndex(idx);
                  // Update URL parameter
                  const params = new URLSearchParams(window.location.search);
                  params.set("reel", reel._id);
                  router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
                }}
              />
              {/* Floating Quick Share Button on Card */}
              <button
                onClick={(e) => copyShareLink(reel._id, e)}
                className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-zinc-950/70 backdrop-blur-md border border-zinc-800/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-sky-500/40 hover:bg-zinc-900 text-zinc-300 hover:text-sky-400"
                title="Copy share link"
              >
                {copiedId === reel._id ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Immersive Mobile-Frame Video Player Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-hidden"
            onClick={closeModal}
          >
            {/* Keyboard instructions (Desktop only) */}
            <div className="hidden xl:flex absolute bottom-8 left-8 flex-col gap-1.5 text-zinc-500 text-[10px] font-mono border border-zinc-900 bg-zinc-950/50 p-4 rounded-xl">
              <span className="font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-1.5 mb-1.5">Keyboard Shortcuts</span>
              <span className="flex justify-between gap-6"><span>Space</span> <span className="text-zinc-400 font-bold">Play / Pause</span></span>
              <span className="flex justify-between gap-6"><span>← / →</span> <span className="text-zinc-400 font-bold">Prev / Next Reel</span></span>
              <span className="flex justify-between gap-6"><span>Esc</span> <span className="text-zinc-400 font-bold">Close Player</span></span>
            </div>

            {/* Previous Reel Navigation Button (Floating Left, Desktop only) */}
            {filteredReels.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateReel("prev");
                }}
                className="hidden md:flex absolute left-8 lg:left-16 w-14 h-14 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white items-center justify-center transition-all duration-300 hover:scale-105 hover:border-sky-500/50 cursor-pointer shadow-xl"
              >
                <ChevronLeft className="h-6 w-6 text-sky-400" />
              </button>
            )}

            {/* Immersive Phone Frame Mockup Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-[390px] w-full aspect-[9/16] rounded-[48px] border-[8px] border-zinc-800 bg-black overflow-hidden shadow-2xl flex flex-col justify-end"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Phone Dynamic Island Speaker Element */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-28 h-5 rounded-full bg-zinc-950 z-30 border border-zinc-900 flex items-center justify-center">
                <div className="w-10 h-1 rounded-full bg-zinc-800" />
              </div>

              {/* Video Element */}
              <video
                ref={modalVideoRef}
                src={activeReel.videoUrl}
                loop
                autoPlay
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full object-cover cursor-pointer z-10"
              />

              {/* Dark Gradient Overlay for legible UI */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none z-20" />

              {/* Player Top Controls */}
              <div className="absolute top-12 left-0 right-0 px-6 flex items-center justify-between z-30">
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-850 hover:border-zinc-750 flex items-center justify-center text-white hover:text-sky-400 transition-colors"
                  title="Close player"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => copyShareLink(activeReel._id, e)}
                    className="w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-850 hover:border-zinc-750 flex items-center justify-center text-white hover:text-sky-400 transition-colors"
                    title="Copy Link to Reel"
                  >
                    {copiedId === activeReel._id ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-850 hover:border-zinc-750 flex items-center justify-center text-white hover:text-sky-400 transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 text-rose-400" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-sky-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Central Play/Pause State Pulse Indicator */}
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
              >
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="w-16 h-16 rounded-full bg-zinc-950/70 backdrop-blur-md border border-zinc-800 flex items-center justify-center shadow-xl z-30"
                    >
                      <Play className="h-7 w-7 text-sky-400 fill-sky-400/20 translate-x-0.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swipe / Navigation Indicator for Mobile */}
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-3 flex justify-between pointer-events-none md:hidden z-30">
                {filteredReels.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateReel("prev");
                      }}
                      className="pointer-events-auto w-8 h-8 rounded-full bg-zinc-950/60 backdrop-blur-sm border border-zinc-905 flex items-center justify-center text-white"
                    >
                      <ChevronLeft className="h-4 w-4 text-sky-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateReel("next");
                      }}
                      className="pointer-events-auto w-8 h-8 rounded-full bg-zinc-950/60 backdrop-blur-sm border border-zinc-905 flex items-center justify-center text-white"
                    >
                      <ChevronRight className="h-4 w-4 text-sky-400" />
                    </button>
                  </>
                )}
              </div>

              {/* Player Bottom Content Panel */}
              <div className="p-6 pb-8 space-y-4 z-30 text-left">
                {/* Reel Metadata */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase font-semibold bg-sky-950/60 border border-sky-900/30 px-2 py-0.5 rounded w-fit block">
                    {CATEGORY_MAP[activeReel.category || ""] || activeReel.category || "Showcase"}
                  </span>
                  <h2 className="text-base font-extrabold text-white tracking-tight uppercase leading-snug">
                    {activeReel.title}
                  </h2>
                  {activeReel.description && (
                    <p className="text-xs text-zinc-300 font-light leading-relaxed max-h-20 overflow-y-auto pr-1">
                      {activeReel.description}
                    </p>
                  )}
                </div>

                {/* Progress bar and time indicators */}
                <div className="space-y-2">
                  {/* Timeline track */}
                  <div
                    ref={progressBarRef}
                    onClick={handleTimelineClick}
                    className="h-1 w-full bg-zinc-800 rounded-full cursor-pointer relative group/timeline"
                  >
                    {/* Buffered or Active fill */}
                    <div
                      className="h-full bg-sky-500 rounded-full relative"
                      style={{ width: `${progress}%` }}
                    >
                      {/* Timeline handle */}
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white opacity-0 group-hover/timeline:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Time indicators */}
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Reel Navigation Button (Floating Right, Desktop only) */}
            {filteredReels.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateReel("next");
                }}
                className="hidden md:flex absolute right-8 lg:right-16 w-14 h-14 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white items-center justify-center transition-all duration-300 hover:scale-105 hover:border-sky-500/50 cursor-pointer shadow-xl"
              >
                <ChevronRight className="h-6 w-6 text-sky-400" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inner component for rendering individual reel card item
function ReelCard({ reel, onClick }: { reel: ReelType; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch((err) => {
          console.warn("Autoplay preview block:", err);
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const posterUrl = reel.coverImage
    ? urlFor(reel.coverImage).width(500).height(889).fit("crop").url()
    : undefined;

  return (
    <div
      className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-xl cursor-pointer group transition-all duration-500 hover:scale-[1.01] hover:border-sky-500/30 hover:shadow-sky-500/5 flex flex-col justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Video element - preloaded to show first frame as cover if no coverImage is set */}
      <video
        ref={videoRef}
        src={posterUrl ? reel.videoUrl : `${reel.videoUrl}#t=0.001`}
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterUrl}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      />

      {/* Subtle overlay styling */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none z-10" />

      {/* Information Overlay */}
      <div className="relative z-20 p-6 space-y-2 pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase font-semibold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900/30 w-fit block">
          {CATEGORY_MAP[reel.category || ""] || reel.category || "Showcase"}
        </span>
        <h3 className="text-sm font-bold text-white tracking-tight uppercase line-clamp-1">
          {reel.title}
        </h3>
        {reel.description && (
          <p className="text-[11px] text-zinc-400 font-light line-clamp-2 leading-relaxed">
            {reel.description}
          </p>
        )}
      </div>

      {/* Hover Play Button Overlay */}
      <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="h-4 w-4 text-sky-400 fill-sky-400/20 translate-x-0.5" />
      </div>
    </div>
  );
}
