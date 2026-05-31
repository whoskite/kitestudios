"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Copy, Check, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

interface MinimalNavProps {
  filter?: "all" | "photo" | "video";
  setFilter?: (filter: "all" | "photo" | "video") => void;
  projectFilter?: string;
  setProjectFilter?: (project: string) => void;
  projects?: readonly string[];
}

export default function MinimalNav({
  filter,
  setFilter,
  projectFilter,
  setProjectFilter,
  projects,
}: MinimalNavProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tomy@kitestudios.net");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 transition-all duration-300">
      {/* Top Main Navigation Bar */}
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <a
          href="/"
          className="text-lg font-light tracking-[0.25em] uppercase hover:opacity-70 transition-opacity font-sans"
        >
          KITESTUDIOS
        </a>

        {/* Media Type filters (Desktop only) */}
        {filter && setFilter && (
          <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs font-medium tracking-widest uppercase">
            {(["all", "photo", "video"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1.5 transition-all duration-200 ${
                  filter === type
                    ? "text-black dark:text-white border-b-2 border-black dark:border-white font-semibold"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {type === "all" ? "ALL WORK" : type === "photo" ? "PHOTOS" : "VIDEOS"}
              </button>
            ))}
          </div>
        )}

        {/* Action Controls (Desktop only) */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Book Now Button */}
          <a
            href="/book"
            className="px-3.5 py-1.5 border border-black dark:border-white text-[10px] tracking-widest font-mono font-bold text-black hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-all uppercase rounded-sm"
          >
            Book Now
          </a>

          {/* Email Quick Copy */}
          <button
            onClick={handleCopyEmail}
            className="group flex items-center space-x-2 text-[10px] tracking-widest font-mono text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
            title="Copy email to clipboard"
          >
            <span>TOMY@KITESTUDIOS.NET</span>
            {copied ? (
              <Check className="h-3 w-3 text-green-500 animate-scale" />
            ) : (
              <Copy className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Hamburger Toggle Button (Mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex sm:hidden p-2 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
          aria-label="Toggle Mobile Menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Slide-down Hamburger Menu Drawer (Mobile only) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="sm:hidden w-full bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {/* Media Type filters inside mobile menu */}
              {filter && setFilter && (
                <div className="flex flex-col space-y-3">
                  <span className="text-[8px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    Select Category
                  </span>
                  {(["all", "photo", "video"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setFilter(type);
                        setIsOpen(false);
                      }}
                      className={`text-left text-lg font-light tracking-[0.15em] uppercase transition-colors ${
                        filter === type
                          ? "text-black dark:text-white font-medium"
                          : "text-zinc-400 dark:text-zinc-500 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {type === "all" ? "ALL WORK" : type === "photo" ? "PHOTOS" : "VIDEOS"}
                    </button>
                  ))}
                </div>
              )}

              {/* Action Controls inside mobile menu */}
              <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6 flex flex-col space-y-4">
                <span className="text-[8px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  Work Enquiries
                </span>
                
                {/* Book Now Button */}
                <a
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-xs tracking-widest font-mono font-bold text-black dark:text-white uppercase py-1"
                >
                  [ Book Now ]
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center space-x-2 text-xs tracking-widest font-mono text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  <span>TOMY@KITESTUDIOS.NET</span>
                  {copied ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3 opacity-60" />
                  )}
                </button>

                {/* Theme Toggle in mobile menu */}
                {mounted && (
                  <button
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors text-[10px] tracking-widest uppercase font-mono pt-2"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="h-4 w-4" />
                        <span>LIGHT MODE</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-4 w-4" />
                        <span>DARK MODE</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand/Client/Project Scrollable Pill Filter Bar */}
      {projects && projectFilter && setProjectFilter && (
        <div className="border-t border-zinc-100 dark:border-zinc-900 py-2.5 bg-zinc-50/50 dark:bg-neutral-950/20 overflow-x-auto scrollbar-none scroll-smooth">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center space-x-2.5 text-[9px] tracking-[0.15em] uppercase font-mono justify-start md:justify-center overflow-x-auto scrollbar-none">
            <button
              onClick={() => setProjectFilter("all")}
              className={`px-3 py-1 border transition-all duration-300 ${
                projectFilter === "all"
                  ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold"
                  : "bg-transparent text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800/80 hover:text-black dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600"
              }`}
            >
              ALL ARCHIVES
            </button>
            {projects.map((project) => (
              <button
                key={project}
                onClick={() => setProjectFilter(project)}
                className={`px-3 py-1 border whitespace-nowrap transition-all duration-300 ${
                  projectFilter === project
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white font-bold"
                    : "bg-transparent text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800/80 hover:text-black dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600"
                }`}
              >
                {project}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
