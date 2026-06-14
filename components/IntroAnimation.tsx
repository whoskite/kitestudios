"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, ShieldAlert } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [step, setStep] = useState<"loading" | "title" | "montage" | "resolve" | "exit">("loading");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeNicheText, setActiveNicheText] = useState("");
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];

  const videoSources = [
    "/Portfolio/TDM/Redroom.mp4",
    "/Portfolio/Genki Prints/Event/comiccon_recap.mp4",
    "/Portfolio/GLYF STUDIO/Video/glyfstudio_documentary.mp4",
    "/Portfolio/Quinceanera/kitestudios6_1552332668_1997433444191352927_3895010458.mp4",
    "/Portfolio/TOANDME/TEST.mp4",
  ];

  const nicheLabels = [
    "[ 01 / COMMERCIAL BRANDING ]",
    "[ 02 / LIVE EVENTS COVERAGE ]",
    "[ 03 / ECOMMERCE PRODUCTION ]",
    "[ 04 / CINEMATIC STORYTELLING ]",
    "[ 05 / DIGITAL ARCHIVES ]",
  ];

  useEffect(() => {
    // Attempt to play all videos in background (muted) so they are buffered and ready
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.muted = true;
        ref.current.play().catch(() => {
          // Autoplay policy blocker (safe to ignore as they will play when active)
        });
      }
    });

    // Timeline Sequence
    // Step 1: Loading Screen (0s - 1.2s)
    const t1 = setTimeout(() => {
      setStep("title");
    }, 1200);

    // Step 2: Title Card (1.2s - 2.8s)
    const t2 = setTimeout(() => {
      setStep("montage");
    }, 2800);

    // Step 3: Montage duration and video cuts (2.8s - 5.0s)
    // We have 5 videos, each gets 440ms
    const t3 = setTimeout(() => {
      setStep("resolve");
    }, 5000);

    // Step 4: Resolve & Exit (5.0s - 6.2s)
    const t4 = setTimeout(() => {
      setStep("exit");
    }, 6200);

    // Final clean up and callback
    const t5 = setTimeout(() => {
      onComplete();
    }, 6700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Interval timer for the montage steps
  useEffect(() => {
    if (step !== "montage") return;

    let currentIndex = 0;
    setActiveVideoIndex(0);
    setActiveNicheText(nicheLabels[0]);

    // Unmute the active video if user unmuted
    if (!isMuted && videoRefs[0].current) {
      videoRefs[0].current.muted = false;
    }

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < videoSources.length) {
        // Mute previous
        const prevRef = videoRefs[currentIndex - 1];
        if (prevRef.current) prevRef.current.muted = true;

        // Play and unmute current (if unmuted globally)
        const currRef = videoRefs[currentIndex];
        if (currRef.current) {
          currRef.current.currentTime = 0;
          currRef.current.muted = isMuted;
          currRef.current.play().catch(() => {});
        }

        setActiveVideoIndex(currentIndex);
        setActiveNicheText(nicheLabels[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 440); // speed of cuts (440ms per flash)

    return () => {
      clearInterval(interval);
    };
  }, [step, isMuted]);

  const handleSkip = () => {
    // Mute all videos before skip
    videoRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.muted = true;
        ref.current.pause();
      }
    });
    setStep("exit");
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    // Apply to current active video
    const activeRef = videoRefs[activeVideoIndex];
    if (activeRef.current) {
      activeRef.current.muted = nextMute;
    }
  };

  return (
    <AnimatePresence>
      {step !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none"
        >
          {/* Subtle Ambient Vignette Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none z-10" />

          {/* Background Video Elements (All rendered and playing to avoid lag) */}
          <div className="absolute inset-0 w-full h-full bg-black z-0 overflow-hidden">
            {videoSources.map((src, index) => (
              <video
                key={src}
                ref={videoRefs[index]}
                src={src}
                loop
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
                  step === "montage" && activeVideoIndex === index ? "opacity-60" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Strobe Color Overlay for glitch aesthetic */}
          {step === "montage" && (
            <motion.div
              animate={{ opacity: [0.1, 0, 0.15, 0] }}
              transition={{ repeat: Infinity, duration: 0.12 }}
              className="absolute inset-0 bg-white mix-blend-difference pointer-events-none z-10"
            />
          )}

          {/* Top Panel */}
          <div className="w-full flex justify-between items-center relative z-20">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">
                KITESTUDIOS LIVE MONOTOR
              </span>
            </div>
            
            {/* Audio Toggle (Only shown during montage or title) */}
            {(step === "title" || step === "montage") && (
              <button
                onClick={toggleMute}
                className="p-2 border border-zinc-800 hover:border-zinc-500 rounded-full text-zinc-400 hover:text-white transition-colors"
                title={isMuted ? "Unmute Intro" : "Mute Intro"}
              >
                {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>

          {/* Center Panel (Stages of Animation) */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative z-20 flex-1">
            <AnimatePresence mode="wait">
              {/* Step 1: LOADING */}
              {step === "loading" && (
                <motion.div
                  key="loading-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 font-mono text-xs text-zinc-500 uppercase tracking-[0.2em]"
                >
                  <p className="animate-pulse">Loading System Archives...</p>
                  <div className="w-32 h-[1px] bg-zinc-800 mx-auto relative overflow-hidden">
                    <motion.div
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="absolute top-0 bottom-0 w-12 bg-white"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: TITLE */}
              {step === "title" && (
                <motion.div
                  key="title-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <motion.h1
                    initial={{ letterSpacing: "0.2em" }}
                    animate={{ letterSpacing: "0.6em" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-3xl sm:text-6xl font-light uppercase text-white tracking-[0.5em] leading-none"
                  >
                    KITESTUDIOS
                  </motion.h1>
                  <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
                    Creative Production Studio & Visual Directory
                  </p>
                </motion.div>
              )}

              {/* Step 3: MONTAGE */}
              {step === "montage" && (
                <motion.div
                  key="montage-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <motion.div
                    key={activeNicheText}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-2"
                  >
                    <span className="px-3 py-1 border border-white/20 bg-black/40 backdrop-blur-md rounded-sm text-xs font-mono tracking-widest text-white uppercase inline-block">
                      {activeNicheText}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-mono uppercase font-bold tracking-tight text-white drop-shadow-md">
                      DIRECTOR CUT
                    </h2>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: RESOLVE */}
              {step === "resolve" && (
                <motion.div
                  key="resolve-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl sm:text-7xl font-light uppercase text-white tracking-[0.4em] leading-none">
                    ENTER KITESTUDIOS
                  </h1>
                  <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                    EST. 2016 // LONG BEACH, CALIFORNIA
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Panel */}
          <div className="w-full flex justify-between items-end relative z-20">
            <div className="text-[9px] font-mono tracking-widest text-zinc-650 dark:text-zinc-500 text-left hidden sm:block">
              RESOLVE // 4K CINEMA CODEC<br />
              SYS.STATUS // STABLE
            </div>

            {/* Skip Button */}
            <button
              onClick={handleSkip}
              className="px-5 py-2 border border-zinc-800 hover:border-white text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-white rounded-sm transition-all duration-300 bg-black/40 backdrop-blur-sm"
            >
              [ Skip Intro ]
            </button>

            <div className="text-[9px] font-mono tracking-widest text-zinc-650 dark:text-zinc-500 text-right">
              VOL.CTRL // AUTO.MUTED<br />
              ©25.KITE.STUDIOS
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
