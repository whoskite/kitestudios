"use client";

import { useState, Suspense } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { slugify } from "@/lib/utils";

interface MinimalNavProps {
  filter?: "all" | "photo" | "video";
  setFilter?: (filter: "all" | "photo" | "video") => void;
  projectFilter?: string;
  setProjectFilter?: (project: string) => void;
  projects?: readonly string[];
}

function MinimalNavContent({
  projectFilter,
  projects,
}: MinimalNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Navigation active state
  const isHomeOrProject = pathname === "/" || pathname.startsWith("/project/");

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 transition-all duration-300 shadow-lg shadow-zinc-950/10">
      {/* Top Main Navigation Bar */}
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <a
          href="/"
          className="text-lg font-bold tracking-[0.25em] text-white hover:text-zinc-300 transition-colors uppercase font-sans"
        >
          KITESTUDIOS
        </a>

        {/* Media Type filters and Event Link (Desktop only) */}
        <div className="hidden sm:flex items-center space-x-2">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-semibold tracking-widest uppercase mr-2 sm:mr-4 border-r border-zinc-800 pr-2 sm:pr-4">
            <Link 
              href="/" 
              className={`px-3 py-1.5 transition-all duration-200 ${
                isHomeOrProject
                  ? "text-sky-400 border-b-2 border-sky-400 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              HOME
            </Link>
          </div>
          <Link
            href="/events"
            className="text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
          >
            EVENT GALLERY
          </Link>
          <Link
            href="/pricing"
            className="text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
          >
            PRICING
          </Link>
          <Link
            href="/about"
            className="text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-white transition-colors px-3 py-1.5"
          >
            ABOUT
          </Link>
        </div>

        {/* Action Controls (Desktop only) */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Book Now Button */}
          <a
            href="/book"
            className="px-4 py-2 bg-sky-500 text-zinc-950 hover:bg-sky-600 text-xs tracking-widest font-sans font-bold transition-all uppercase rounded-md shadow-lg shadow-sky-500/10"
          >
            Contact
          </a>
        </div>

        {/* Hamburger Toggle Button (Mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex sm:hidden p-2 text-zinc-400 hover:text-white transition-colors"
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
            className="sm:hidden w-full bg-zinc-950 border-t border-zinc-900 overflow-hidden shadow-inner"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {/* Navigation inside mobile menu */}
              <div className="flex flex-col space-y-3">
                <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                  Pages
                </span>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium tracking-[0.15em] uppercase transition-colors text-zinc-400 hover:text-white"
                >
                  HOME
                </Link>
                <Link
                  href="/events"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium tracking-[0.15em] uppercase transition-colors text-zinc-400 hover:text-white"
                >
                  EVENT GALLERY
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium tracking-[0.15em] uppercase transition-colors text-zinc-400 hover:text-white"
                >
                  PRICING
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium tracking-[0.15em] uppercase transition-colors text-zinc-400 hover:text-white"
                >
                  ABOUT
                </Link>
              </div>

              {/* Action Controls inside mobile menu */}
              <div className="border-t border-zinc-900 pt-6 flex flex-col space-y-4">
                <span className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
                  Work Enquiries
                </span>
                
                {/* Book Now Button */}
                <a
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-xs tracking-widest font-sans font-bold text-sky-400 hover:text-sky-300 uppercase py-1 transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand/Client/Project Scrollable Pill Filter Bar */}
      {projects && projectFilter && (
        <div className="border-t border-zinc-900 py-3 bg-zinc-950/40 overflow-x-auto scrollbar-none scroll-smooth">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center space-x-2.5 text-[11px] tracking-[0.15em] uppercase font-sans justify-start md:justify-center overflow-x-auto scrollbar-none">
            <Link
              href="/"
              className={`px-3 py-1.5 border transition-all duration-300 rounded-md ${
                projectFilter === "all"
                  ? "bg-sky-500 text-zinc-950 border-sky-500 font-semibold shadow-md"
                  : "bg-transparent text-zinc-400 border-zinc-850 hover:text-white hover:border-zinc-700"
              }`}
            >
              ALL ARCHIVES
            </Link>
            {projects.map((project) => (
              <Link
                key={project}
                href={`/project/${slugify(project)}`}
                className={`px-3 py-1.5 border whitespace-nowrap transition-all duration-300 rounded-md ${
                  projectFilter === project
                    ? "bg-sky-500 text-zinc-950 border-sky-500 font-semibold shadow-md"
                    : "bg-transparent text-zinc-400 border-zinc-850 hover:text-white hover:border-zinc-700"
                }`}
              >
                {project}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default function MinimalNav(props: MinimalNavProps) {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 h-[73px] shadow-lg shadow-zinc-950/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-lg font-bold tracking-[0.25em] text-white uppercase font-sans">
            KITESTUDIOS
          </div>
          <div className="w-24 h-4 bg-zinc-900 animate-pulse rounded" />
        </div>
      </header>
    }>
      <MinimalNavContent {...props} />
    </Suspense>
  );
}
