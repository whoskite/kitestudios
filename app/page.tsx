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
  Sparkles,
} from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import IntroAnimation from "@/components/IntroAnimation";
import { portfolioItems, projectsList, MediaItem } from "@/lib/portfolio-data";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";

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

function FeaturedReelCard({ reel }: { reel: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const posterUrl = reel.coverImage
    ? urlFor(reel.coverImage).width(400).height(711).fit("crop").url()
    : undefined;

  return (
    <Link
      href={`/reels?reel=${reel._id}`}
      className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-xl cursor-pointer group transition-all duration-500 hover:scale-[1.01] hover:border-sky-500/30 hover:shadow-sky-500/5 flex flex-col justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none z-10" />

      {/* Info */}
      <div className="relative z-20 p-5 space-y-1.5 pointer-events-none text-left">
        <span className="text-[8px] font-mono tracking-widest text-sky-400 uppercase font-semibold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900/30 w-fit block">
          {reel.category ? (reel.category.charAt(0).toUpperCase() + reel.category.slice(1)) : "Reel"}
        </span>
        <h3 className="text-xs font-bold text-white tracking-tight uppercase line-clamp-1">
          {reel.title}
        </h3>
      </div>

      <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-zinc-950/85 backdrop-blur-sm border border-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="h-3 w-3 text-sky-400 fill-sky-400/20 translate-x-0.5" />
      </div>
    </Link>
  );
}

function HorizontalVideoCard({ video, onClick }: { video: MediaItem; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const posterUrl = video.videoUrl && (video as any).coverImage
    ? urlFor((video as any).coverImage).width(640).height(360).fit("crop").url()
    : undefined;

  return (
    <div
      onClick={onClick}
      className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-xl cursor-pointer group transition-all duration-500 hover:scale-[1.01] hover:border-sky-500/30 hover:shadow-sky-500/5 flex flex-col justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent pointer-events-none z-10" />

      {/* Info */}
      <div className="relative z-20 p-5 space-y-1 pointer-events-none text-left">
        <span className="text-[8px] font-mono tracking-widest text-sky-400 uppercase font-semibold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900/30 w-fit block">
          {video.category}
        </span>
        <h3 className="text-xs font-bold text-white tracking-tight uppercase line-clamp-1">
          {video.title}
        </h3>
        <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-wider">
          {video.project}
        </p>
      </div>

      <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-zinc-950/85 backdrop-blur-sm border border-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="h-3 w-3 text-sky-400 fill-sky-400/20 translate-x-0.5" />
      </div>
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
  const [featuredReels, setFeaturedReels] = useState<any[]>([]);
  const [homepageVideos, setHomepageVideos] = useState<MediaItem[]>([]);
  const [lightboxContext, setLightboxContext] = useState<MediaItem[]>([]);

  // Fetch featured reels and horizontal videos client-side on mount
  useEffect(() => {
    client
      .fetch(
        `*[_type == "reel" && disabled != true] | order(order asc, _createdAt desc)[0..2] {
          _id,
          title,
          category,
          description,
          "videoUrl": videoFile.asset->url,
          coverImage,
          "project": coalesce(project->name, "KITESTUDIOS")
        }`
      )
      .then((data) => {
        setFeaturedReels(data || []);
      })
      .catch((err) => {
        console.error("Error fetching featured reels:", err);
      });

    client
      .fetch(
        `*[_type == "portfolioVideo" && disabled != true] | order(order asc, _createdAt desc) {
          _id,
          title,
          "project": coalesce(project->name, "KITESTUDIOS"),
          category,
          description,
          "videoUrl": videoFile.asset->url,
          coverImage
        }`
      )
      .then((data: any[]) => {
        const mappedVideos: MediaItem[] = (data || []).map((v) => ({
          id: v._id,
          type: "video",
          title: v.title,
          category: v.category || "Videography",
          project: v.project || "KITESTUDIOS",
          src: v.videoUrl,
          videoUrl: v.videoUrl,
          metadata: {
            camera: "",
            lens: "",
            aperture: "",
            shutter: "",
            iso: "",
            location: v.project || "",
            date: ""
          }
        }));
        setHomepageVideos(mappedVideos);
      })
      .catch((err) => {
        console.error("Error fetching homepage videos:", err);
      });
  }, []);

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

  // Section 03 Display: Filter for local photo assets only
  const photoItems = portfolioItems.filter((item) => item.type === "photo");
  const visibleItems = photoItems.slice(0, visibleCount);

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
    ? lightboxContext.findIndex((item) => item.id === activeItem.id)
    : -1;

  const handleNext = () => {
    if (activeIndex === -1 || lightboxContext.length === 0) return;
    const nextIndex = (activeIndex + 1) % lightboxContext.length;
    setActiveItem(lightboxContext[nextIndex]);
  };

  const handlePrev = () => {
    if (activeIndex === -1 || lightboxContext.length === 0) return;
    const prevIndex = (activeIndex - 1 + lightboxContext.length) % lightboxContext.length;
    setActiveItem(lightboxContext[prevIndex]);
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
  }, [activeItem, activeIndex, lightboxContext]);

  // Rolling Adjacent Filmstrip Window (centered on active index)
  const getAdjacentThumbs = () => {
    if (activeIndex === -1 || lightboxContext.length === 0) return [];
    const range = 4; // Show 4 previous and 4 next items
    const thumbs = [];
    for (let i = -range; i <= range; i++) {
      const idx = (activeIndex + i + lightboxContext.length) % lightboxContext.length;
      thumbs.push({ item: lightboxContext[idx], originalIndex: idx });
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

      <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-all duration-300 flex flex-col justify-between selection:bg-sky-500/20">
        <MinimalNav />

        {/* Corporate Hero Section with Background Video Loop */}
        <div className="relative w-full overflow-hidden border-b border-zinc-900/60 py-24 sm:py-36 flex flex-col items-center justify-center text-center px-6 min-h-[60vh] bg-zinc-950/80">
          {/* Background Vimeo Video Container */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <iframe
              src="https://player.vimeo.com/video/1205970612?background=1&autoplay=1&loop=1&muted=1&autopause=0&badge=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen"
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 aspect-video object-cover scale-[1.35] opacity-25"
              title="KITESTUDIOS Showreel Loop"
            />
            {/* Cinematic Gradients & Dark Overlays to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/80 z-10" />
            <div className="absolute inset-0 bg-zinc-950/40 z-10" />
          </div>

          {/* Hero Content on top of background video */}
          <div className="relative z-20 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans uppercase">
              Visual Partner <br /> for Scaling Brands
            </h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto font-sans">
              We collaborate closely with marketers, brand directors, and entrepreneurs to produce cinematic video campaigns, high-impact digital content, and commercial photography built to engage audiences and drive results.
            </p>
          </div>
        </div>



      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl space-y-24">
        
        {/* Featured Reels Section */}
        {featuredReels.length > 0 && (
          <section className="space-y-8 pb-12 border-b border-zinc-900/60">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block mb-1">
                  01 / Social Content
                </span>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                  Featured Reels
                </h2>
              </div>
              <Link
                href="/reels"
                className="text-xs font-mono font-semibold tracking-widest text-zinc-400 hover:text-sky-400 uppercase transition-colors flex items-center gap-1 group"
              >
                View All Reels <span className="text-sky-400 transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {featuredReels.map((reel) => (
                <FeaturedReelCard key={reel._id} reel={reel} />
              ))}
            </div>
          </section>
        )}

        {/* Section 02 / Videos */}
        {homepageVideos.length > 0 && (
          <section className="space-y-8 pb-12 border-b border-zinc-900/60">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block mb-1">
                  02 / Videos
                </span>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                  Videos
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {homepageVideos.map((video) => (
                <HorizontalVideoCard
                  key={video.id}
                  video={video}
                  onClick={() => {
                    setActiveItem(video);
                    setLightboxContext(homepageVideos);
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 03 / Photography */}
        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-sky-400 uppercase block mb-1">
                03 / Photography
              </span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                Photography
              </h2>
            </div>
          </div>

          {photoItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <span className="text-xs uppercase font-sans tracking-widest text-zinc-400 mb-2">
                No Archives Found
              </span>
              <p className="text-zinc-500 text-sm max-w-xs font-light font-sans">
                No matching assets were found in this specific selection. Try resetting filters.
              </p>
              <Link
                href="/"
                className="mt-6 px-4 py-2 border border-zinc-800 text-xs tracking-wider uppercase font-sans font-semibold rounded-md hover:bg-zinc-900 text-zinc-400 bg-zinc-950 transition-colors"
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
                      onClick={() => {
                        setActiveItem(item);
                        setLightboxContext(photoItems);
                      }}
                    >
                      {/* Media Container - Borderless minimal frame */}
                      <div className="relative overflow-hidden bg-zinc-900/40 border border-zinc-900 shadow-xl rounded-md hover:shadow-2xl transition-all duration-300">
                        <LazyMedia item={item} />

                        {/* Project Tag */}
                        <Link
                          href={`/project/${slugify(item.project)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 left-3 bg-zinc-950/90 text-zinc-300 hover:bg-sky-500 hover:text-zinc-950 transition-all border border-zinc-900 shadow-md px-2.5 py-1 text-[10px] font-sans tracking-widest uppercase font-bold z-10 rounded-md"
                        >
                          {item.project}
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* See More Button */}
              {photoItems.length > visibleCount && (
                <div className="flex justify-center mt-12 mb-8">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="px-8 py-3.5 border border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all font-sans font-semibold tracking-wider text-xs uppercase rounded-md shadow-lg bg-zinc-900/60 cursor-pointer"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {/* Agency Profile / Who We Serve Section */}
      <section className="border-t border-b border-zinc-900 bg-zinc-900/10 py-16 sm:py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Column 1 & 2: Who We Are */}
          <div className="lg:col-span-2 space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-sky-400 uppercase block font-sans">
              01 / AGENCY PROFILE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans leading-tight">
              Who We Are
            </h2>
            <p className="text-zinc-400 leading-relaxed font-sans text-sm sm:text-base max-w-2xl font-light">
              KITESTUDIOS is a premium video production company and full-service creative agency. We partner closely with marketers, brand directors, and entrepreneurs to produce cinematic videos, high-performance content, and professional commercial photography built to engage audiences and elevate brand presence.
            </p>
          </div>

          {/* Column 3: Who We Serve */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold tracking-[0.25em] text-sky-400 uppercase block font-sans">
              02 / WHO WE SERVE
            </span>
            <div className="space-y-4 font-sans">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-sky-950/50 border border-sky-900/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Startups</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-0.5 font-light">
                    Establishing trust and visual identity with cinematic keynotes, founder origin stories, and product demos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-sky-950/50 border border-sky-900/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">E-commerce Companies</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-0.5 font-light">
                    Driving conversion and scaling ads with scroll-stopping product highlights and campaign assets.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-sky-950/50 border border-sky-900/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Mid-Sized Companies</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mt-0.5 font-light">
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
            className="sm:hidden fixed bottom-6 right-6 z-40 p-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-lg text-white cursor-pointer hover:bg-zinc-850 transition-colors"
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border border-zinc-800 border-t-sky-500 animate-spin" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
