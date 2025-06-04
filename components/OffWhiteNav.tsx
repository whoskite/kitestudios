"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, LogIn, LogOut, User, Lock, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function OffWhiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll event to change nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Menu items
  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "MANIFESTO", href: "/#manifesto" },
    { label: "BUILD", href: "/#build" },
    {
      label: "HUB",
      href: "/hub",
      protected: true,
    },
    // { label: "CONTACT", href: "#contact" },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: 1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  // Handle login/logout
  const handleAuth = async () => {
    if (status === "authenticated") {
      await signOut({ callbackUrl: "/" });
    } else {
      try {
        console.log("Attempting to sign in with Google...");
        // Use redirect: true to ensure a full page redirect
        await signIn("google", {
          callbackUrl: "/",
          redirect: true,
        });
      } catch (error) {
        console.error("Sign-in error:", error);
        // If there's an error, redirect to the auth help page
        window.location.href = "/auth-help";
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm" : "py-4"}`}
      data-oid="l.a6va-"
    >
      <div className="container mx-auto px-6 md:px-12" data-oid="6-qtaiu">
        <div className="flex justify-between items-center" data-oid="g8wva4n">
          {/* Logo */}
          <Link
            href="/"
            className="industrial-text text-2xl font-bold"
            data-oid="z.-2pdz"
          >
            "KITESTUDIOS"
          </Link>

          {/* Desktop Menu */}
          <div
            className="hidden md:flex items-center space-x-8"
            data-oid="uzdctb:"
          >
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-bold hover:text-[#ffff00] transition-colors flex items-center"
                data-oid="-cmnx:e"
              >
                {item.label}
                {item.protected && status !== "authenticated" && (
                  <Lock className="ml-1 h-3 w-3" data-oid="l1q.r81" />
                )}
              </Link>
            ))}

            {/* Auth Button */}
            <button
              onClick={handleAuth}
              className="flex items-center space-x-2 border-2 border-black dark:border-white px-3 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              data-oid="qsif_rx"
            >
              {status === "authenticated" ? (
                <>
                  <div className="flex items-center" data-oid="42m8dm9">
                    {session?.user?.image && (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-5 h-5 rounded-full mr-2"
                        data-oid="vy0qbs6"
                      />
                    )}
                    <span
                      className="text-xs font-bold mr-2 hidden lg:inline"
                      data-oid="9bo3iz2"
                    >
                      {session.user.name?.split(" ")[0]}
                    </span>
                    <LogOut className="h-4 w-4" data-oid="yw3:m21" />
                  </div>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-1" data-oid="3_8a3iy" />
                  <span className="text-xs font-bold" data-oid="qp36bq:">
                    LOGIN
                  </span>
                </>
              )}
            </button>

            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="border-2 border-black dark:border-white p-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                aria-label="Toggle theme"
                data-oid="gps6nq5"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" data-oid=".spwb_l" />
                ) : (
                  <Moon className="h-4 w-4" data-oid="984f3pj" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            data-oid="u5swmew"
          >
            {isOpen ? (
              <X className="h-6 w-6" data-oid="b-ihamm" />
            ) : (
              <Menu className="h-6 w-6" data-oid="_go:_6o" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-black border-l-2 border-black dark:border-white md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        data-oid="va:xedo"
      >
        <div className="flex flex-col h-full p-8" data-oid="bbp3km0">
          <div className="flex justify-end mb-8" data-oid=":_kl1gk">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              data-oid="_nfd3xk"
            >
              <X className="h-6 w-6" data-oid="mpjuwdt" />
            </button>
          </div>

          <div className="flex flex-col space-y-6" data-oid="8iv8mv.">
            {menuItems.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                data-oid="i_pq08i"
              >
                <Link
                  href={item.href}
                  className="text-xl font-bold hover:text-[#ffff00] transition-colors flex items-center"
                  onClick={() => setIsOpen(false)}
                  data-oid="m:lm6ym"
                >
                  {item.label}
                  {item.protected && status !== "authenticated" && (
                    <Lock className="ml-2 h-4 w-4" data-oid="cpx3l15" />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Auth Button */}
            <motion.div variants={itemVariants} data-oid="2fb:xum">
              <button
                onClick={handleAuth}
                className="flex items-center space-x-2 border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                data-oid="ca14vqg"
              >
                {status === "authenticated" ? (
                  <>
                    <div className="flex items-center" data-oid="nkd9kkr">
                      {session?.user?.image && (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-6 h-6 rounded-full mr-2"
                          data-oid="85z55v0"
                        />
                      )}
                      <span className="font-bold mr-2" data-oid="3_hk:7-">
                        {session.user.name}
                      </span>
                      <LogOut className="h-4 w-4" data-oid="ctnmyb1" />
                    </div>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" data-oid="ybglu9c" />
                    <span className="font-bold" data-oid="ir.650u">
                      LOGIN WITH GOOGLE
                    </span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Mobile Theme Toggle */}
            {mounted && (
              <motion.div
                variants={itemVariants}
                className="flex justify-start"
                data-oid="8.auz8f"
              >
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  data-oid="ssaoul3"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" data-oid="qpc2z-8" />
                      <span className="font-bold" data-oid="zlmv0c2">
                        LIGHT MODE
                      </span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" data-oid="i0tao.p" />
                      <span className="font-bold" data-oid="qkgk1je">
                        DARK MODE
                      </span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>

          <div className="mt-auto" data-oid="48c9s.:">
            <div
              className="text-sm text-gray-500 dark:text-gray-400"
              data-oid="f18wq3s"
            >
              © 2024 KITESTUDIOS
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
