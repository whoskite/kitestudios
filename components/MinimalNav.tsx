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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all duration-300 shadow-sm">
      {/* Top Main Navigation Bar */}
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <a
          href="/"
          className="text-lg font-semibold tracking-[0.25em] text-zinc-900 hover:text-zinc-700 transition-colors uppercase font-sans"
        >
          KITESTUDIOS
        </a>

        {/* Media Type filters and Event Link (Desktop only) */}
        <div className="hidden sm:flex items-center space-x-2">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs font-semibold tracking-widest uppercase mr-2 sm:mr-4 border-r border-zinc-200 pr-2 sm:pr-4">
            <Link 
              href="/" 
              className={`px-3 py-1.5 transition-all duration-200 ${
                isHomeOrProject
                  ? "text-accent border-b-2 border-accent font-semibold"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              HOME
            </Link>
          </div>
          <Link
            href="/events"
            className="text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-1.5"
          >
            EVENT GALLERY
          </Link>
          <Link
            href="/pricing"
            className="text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-zinc-900 transition-colors px-3 py-1.5"
          >
            PRICING
          </Link>
        </div>

        {/* Action Controls (Desktop only) */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Book Now Button */}
          <a
            href="/book"
            className="px-4 py-2 bg-accent text-accent-foreground hover:bg-accent/90 text-xs tracking-widest font-sans font-semibold transition-all uppercase rounded-md shadow-sm"
          >
            Book Now
          </a>
        </div>

        {/* Hamburger Toggle Button (Mobile only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex sm:hidden p-2 text-zinc-500 hover:text-zinc-950 transition-colors"
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
            className="sm:hidden w-full bg-white border-t border-zinc-200 overflow-hidden shadow-inner"
          >
            <div className="px-6 py-8 flex flex-col space-y-6">
              {/* Navigation inside mobile menu */}
              <div className="flex flex-col space-y-3">
                <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                  Pages
                </span>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium tracking-[0.15em] uppercase transition-colors text-zinc-500 hover:text-zinc-900"
                >
                  HOME
                </Link>
                <Link
                  href="/events"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium tracking-[0.15em] uppercase transition-colors text-zinc-500 hover:text-zinc-900"
                >
                  EVENT GALLERY
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium tracking-[0.15em] uppercase transition-colors text-zinc-500 hover:text-zinc-900"
                >
                  PRICING
                </Link>
              </div>

              {/* Action Controls inside mobile menu */}
              <div className="border-t border-zinc-200 pt-6 flex flex-col space-y-4">
                <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                  Work Enquiries
                </span>
                
                {/* Book Now Button */}
                <a
                  href="/book"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-xs tracking-widest font-sans font-bold text-accent hover:text-accent/80 uppercase py-1 transition-colors"
                >
                  [ Book Now ]
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand/Client/Project Scrollable Pill Filter Bar */}
      {projects && projectFilter && (
        <div className="border-t border-zinc-200 py-3 bg-zinc-50/80 overflow-x-auto scrollbar-none scroll-smooth">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center space-x-2.5 text-[11px] tracking-[0.15em] uppercase font-sans justify-start md:justify-center overflow-x-auto scrollbar-none">
            <Link
              href="/"
              className={`px-3 py-1.5 border transition-all duration-300 rounded-md ${
                projectFilter === "all"
                  ? "bg-accent text-accent-foreground border-accent font-semibold shadow-sm"
                  : "bg-transparent text-zinc-500 border-zinc-200 hover:text-zinc-900 hover:border-zinc-400"
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
                    ? "bg-accent text-accent-foreground border-accent font-semibold shadow-sm"
                    : "bg-transparent text-zinc-500 border-zinc-200 hover:text-zinc-900 hover:border-zinc-400"
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
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 h-[73px] shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between max-w-7xl">
          <div className="text-lg font-semibold tracking-[0.25em] text-zinc-900 uppercase font-sans">
            KITESTUDIOS
          </div>
          <div className="w-24 h-4 bg-zinc-100 animate-pulse rounded" />
        </div>
      </header>
    }>
      <MinimalNavContent {...props} />
    </Suspense>
  );
}
