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
  Check,
  Instagram,
  ArrowRight,
  Video
} from "lucide-react";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getEmbedUrl, getYouTubeThumbnail, getVimeoId } from "@/lib/video-utils";

export interface VideoType {
  _id: string;
  title: string;
  category?: string;
  description?: string;
  videoUrl: string;
  externalVideoUrl?: string;
  coverImage: any;
  project?: string;
}

const CATEGORY_MAP: Record<string, string> = {
  corporate: "Corporate / Brand Film",
  medspa: "Medspa / Skincare",
  fashion: "Fashion / Commercial",
  product: "Product Showcase",
  event: "Event Highlights",
  fitness: "Fitness / Health",
  lifestyle: "Lifestyle / Documentary",
};

interface VideosClientProps {
  videos: VideoType[];
}

function VideoCard({ video, onClick }: { video: VideoType; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && !video.externalVideoUrl) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, video.externalVideoUrl]);

  const ytThumb = getYouTubeThumbnail(video.externalVideoUrl);
  const [vimeoThumb, setVimeoThumb] = useState<string | null>(null);
  const vimeoId = !ytThumb ? getVimeoId(video.externalVideoUrl) : null;

  useEffect(() => {
    if (!vimeoId) return;
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}&width=640`)
      .then((r) => r.json())
      .then((d) => { if (d.thumbnail_url) setVimeoThumb(d.thumbnail_url); })
      .catch(() => {});
  }, [vimeoId]);

  const posterUrl = video.coverImage
    ? urlFor(video.coverImage).width(640).height(360).fit("crop").url()
    : ytThumb || vimeoThumb || undefined;

  const copyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?video=${video._id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-xl cursor-pointer group transition-all duration-500 hover:scale-[1.01] hover:border-sky-500/30 hover:shadow-sky-500/5 flex flex-col justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {video.externalVideoUrl ? (
        posterUrl ? (
          <img
            src={posterUrl}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <Play className="w-8 h-8 text-white/20" />
          </div>
        )
      ) : (
        <video
          ref={videoRef}
          src={posterUrl ? video.videoUrl : `${video.videoUrl}#t=0.001`}
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent pointer-events-none z-10" />

      {/* Share Trigger */}
      <button
        onClick={copyLink}
        className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-zinc-950/70 backdrop-blur-md border border-zinc-800/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:border-sky-500/40 hover:bg-zinc-900 text-zinc-300 hover:text-sky-400"
        title="Copy link"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
      </button>

      {/* Info overlay */}
      <div className="relative z-20 p-6 space-y-1.5 pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase font-semibold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900/30 w-fit block">
          {CATEGORY_MAP[video.category || ""] || video.category || "Showcase"}
        </span>
        <h3 className="text-sm font-bold text-white tracking-tight uppercase line-clamp-1">
          {video.title}
        </h3>
        <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-semibold">
          {video.project || "KITESTUDIOS"}
        </p>
      </div>

      <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="h-4 w-4 text-sky-400 fill-sky-400/20 translate-x-0.5" />
      </div>
    </div>
  );
}

export default function VideosClient({ videos }: VideosClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const categories = [
    { label: "All Cinema", value: "all" },
    ...Array.from(new Set(videos.map((v) => v.category).filter(Boolean))).map((cat) => {
      const displayLabel = CATEGORY_MAP[cat as string] || (cat ? cat.charAt(0).toUpperCase() + cat.slice(1) : "");
      return { label: displayLabel, value: cat as string };
    }),
  ];

  const filteredVideos = videos.filter((video) => {
    if (selectedCategory === "all") return true;
    return video.category === selectedCategory;
  });

  useEffect(() => {
    const videoId = searchParams.get("video");
    if (videoId) {
      const idx = filteredVideos.findIndex((v) => v._id === videoId);
      if (idx !== -1) {
        setActiveVideoIndex(idx);
      } else {
        const entireIdx = videos.findIndex((v) => v._id === videoId);
        if (entireIdx !== -1) {
          setSelectedCategory("all");
          setActiveVideoIndex(entireIdx);
        }
      }
    }
  }, [searchParams, videos]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeVideoIndex === null) return;
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateVideo("prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateVideo("next");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideoIndex, filteredVideos]);

  useEffect(() => {
    if (activeVideoIndex !== null && modalVideoRef.current) {
      if (isPlaying) {
        modalVideoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        modalVideoRef.current.pause();
      }
    }
  }, [activeVideoIndex, isPlaying]);

  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
  }, [activeVideoIndex]);

  const closeModal = () => {
    setActiveVideoIndex(null);
    setIsPlaying(false);
    const params = new URLSearchParams(window.location.search);
    params.delete("video");
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
      if (dur > 0) setProgress((current / dur) * 100);
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

  const navigateVideo = (direction: "next" | "prev") => {
    if (activeVideoIndex === null || filteredVideos.length <= 1) return;
    let newIndex = activeVideoIndex;
    if (direction === "next") {
      newIndex = (activeVideoIndex + 1) % filteredVideos.length;
    } else {
      newIndex = (activeVideoIndex - 1 + filteredVideos.length) % filteredVideos.length;
    }
    const nextVideo = filteredVideos[newIndex];
    setActiveVideoIndex(newIndex);
    const params = new URLSearchParams(window.location.search);
    params.set("video", nextVideo._id);
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
  };

  const copyShareLink = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}${window.location.pathname}?video=${videoId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(videoId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const activeVideo = activeVideoIndex !== null ? filteredVideos[activeVideoIndex] : null;

  return (
    <div className="space-y-16">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-zinc-900 pb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setSelectedCategory(cat.value);
              setActiveVideoIndex(null);
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

      {/* Main Grid */}
      {filteredVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-zinc-900 bg-zinc-950/40 rounded-2xl">
          <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 mb-2">
            No Videos Found
          </span>
          <p className="text-zinc-400 text-sm max-w-xs font-light">
            There are currently no widescreen videos uploaded for this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredVideos.map((video, idx) => (
            <VideoCard
              key={video._id}
              video={video}
              onClick={() => {
                setActiveVideoIndex(idx);
                const params = new URLSearchParams(window.location.search);
                params.set("video", video._id);
                router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
              }}
            />
          ))}
        </div>
      )}

      {/* Cinematic Theater Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-hidden"
            onClick={closeModal}
          >
            {/* Keyboard Shortcuts */}
            <div className="hidden xl:flex absolute bottom-8 left-8 flex-col gap-1.5 text-zinc-500 text-[10px] font-mono border border-zinc-900 bg-zinc-950/50 p-4 rounded-xl">
              <span className="font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-1.5 mb-1.5">Keyboard Shortcuts</span>
              <span className="flex justify-between gap-6"><span>Space</span> <span className="text-zinc-400 font-bold">Play / Pause</span></span>
              <span className="flex justify-between gap-6"><span>← / →</span> <span className="text-zinc-400 font-bold">Prev / Next Video</span></span>
              <span className="flex justify-between gap-6"><span>Esc</span> <span className="text-zinc-400 font-bold">Close Theater</span></span>
            </div>

            {/* Left Nav Arrow */}
            {filteredVideos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateVideo("prev");
                }}
                className="hidden md:flex absolute left-8 lg:left-16 w-14 h-14 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white items-center justify-center transition-all duration-300 hover:scale-105 hover:border-sky-500/50 cursor-pointer shadow-xl"
              >
                <ChevronLeft className="h-6 w-6 text-sky-400" />
              </button>
            )}

            {/* Cinema Frame Mockup Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative max-w-5xl w-full aspect-video rounded-3xl border border-zinc-900 bg-black overflow-hidden shadow-2xl flex flex-col justify-end"
              onClick={(e) => e.stopPropagation()}
            >
              {activeVideo.externalVideoUrl ? (
                (() => {
                  const embedUrl = getEmbedUrl(activeVideo.externalVideoUrl);
                  if (embedUrl) {
                    return (
                      <iframe
                        src={embedUrl}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-0"
                      />
                    );
                  }
                  return (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-zinc-950 font-mono text-zinc-500 text-xs">
                      Video source unavailable
                    </div>
                  );
                })()
              ) : (
                <video
                  ref={modalVideoRef}
                  src={activeVideo.videoUrl}
                  loop
                  autoPlay
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  className="absolute inset-0 w-full h-full object-cover cursor-pointer z-10"
                />
              )}

              {/* Gradient overlay - only when custom controls show */}
              {!activeVideo.externalVideoUrl && (
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none z-20" />
              )}

              {/* Close and Share Bar */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-850 hover:border-zinc-750 flex items-center justify-center text-white hover:text-sky-400 transition-colors"
                  title="Close player"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => copyShareLink(activeVideo._id, e)}
                    className="w-10 h-10 rounded-full bg-zinc-950/60 backdrop-blur-md border border-zinc-850 hover:border-zinc-750 flex items-center justify-center text-white hover:text-sky-400 transition-colors"
                    title="Copy Share Link"
                  >
                    {copiedId === activeVideo._id ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Share2 className="h-4 w-4" />
                    )}
                  </button>

                  {!activeVideo.externalVideoUrl && (
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
                  )}
                </div>
              </div>

              {/* Native video controls HUD (not for YouTube/Vimeo iframes which have their own controls) */}
              {!activeVideo.externalVideoUrl && (
                <>
                  {/* Play HUD Overlay Pulse */}
                  <div onClick={togglePlay} className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer">
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

                  {/* bottom HUD panel */}
                  <div className="p-6 pb-8 space-y-4 z-30 text-left">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono tracking-widest text-sky-400 uppercase font-semibold bg-sky-950/60 border border-sky-900/30 px-2 py-0.5 rounded w-fit block">
                        {CATEGORY_MAP[activeVideo.category || ""] || activeVideo.category || "Showcase"}
                      </span>
                      <h2 className="text-base font-extrabold text-white tracking-tight uppercase leading-snug">
                        {activeVideo.title}
                      </h2>
                      <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-semibold">
                        {activeVideo.project || "KITESTUDIOS"}
                      </p>
                      {activeVideo.description && (
                        <p className="text-xs text-zinc-300 font-light leading-relaxed max-h-20 overflow-y-auto pr-1">
                          {activeVideo.description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div
                        ref={progressBarRef}
                        onClick={handleTimelineClick}
                        className="relative h-1.5 w-full bg-zinc-850 hover:bg-zinc-800 rounded-full cursor-pointer overflow-hidden transition-colors"
                      >
                        <div
                          className="h-full bg-sky-500 rounded-full transition-all duration-100 ease-out"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Right Nav Arrow */}
            {filteredVideos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateVideo("next");
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
