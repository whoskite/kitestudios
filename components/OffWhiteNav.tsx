"use client"

import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, LogIn, LogOut, User, Lock, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function OffWhiteNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session, status } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll event to change nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Menu items
  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "MANIFESTO", href: "/#manifesto" },
    { label: "BUILD", href: "/#build" },
    { 
      label: "HUB", 
      href: "/hub",
      protected: true
    },
    // { label: "CONTACT", href: "#contact" },
  ]

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        staggerDirection: 1,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  }

  // Handle login/logout
  const handleAuth = async () => {
    if (status === 'authenticated') {
      await signOut({ callbackUrl: '/' })
    } else {
      try {
        console.log("Attempting to sign in with Google...");
        // Use redirect: true to ensure a full page redirect
        await signIn('google', { 
          callbackUrl: '/',
          redirect: true
        });
      } catch (error) {
        console.error("Sign-in error:", error);
        // If there's an error, redirect to the auth help page
        window.location.href = '/auth-help';
      }
    }
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm' : 'py-4'}`}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="industrial-text text-2xl font-bold">
            "KITESTUDIOS"
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-bold hover:text-[#ffff00] transition-colors flex items-center"
              >
                {item.label}
                {item.protected && status !== 'authenticated' && (
                  <Lock className="ml-1 h-3 w-3" />
                )}
              </Link>
            ))}
            
            {/* Auth Button */}
            <button
              onClick={handleAuth}
              className="flex items-center space-x-2 border-2 border-black dark:border-white px-3 py-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              {status === 'authenticated' ? (
                <>
                  <div className="flex items-center">
                    {session?.user?.image && (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || 'User'} 
                        className="w-5 h-5 rounded-full mr-2"
                      />
                    )}
                    <span className="text-xs font-bold mr-2 hidden lg:inline">
                      {session.user.name?.split(' ')[0]}
                    </span>
                    <LogOut className="h-4 w-4" />
                  </div>
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-1" />
                  <span className="text-xs font-bold">LOGIN</span>
                </>
              )}
            </button>
            
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="border-2 border-black dark:border-white p-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-black border-l-2 border-black dark:border-white md:hidden"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex flex-col h-full p-8">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {menuItems.map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  href={item.href}
                  className="text-xl font-bold hover:text-[#ffff00] transition-colors flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  {item.protected && status !== 'authenticated' && (
                    <Lock className="ml-2 h-4 w-4" />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Mobile Auth Button */}
            <motion.div variants={itemVariants}>
              <button
                onClick={handleAuth}
                className="flex items-center space-x-2 border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                {status === 'authenticated' ? (
                  <>
                    <div className="flex items-center">
                      {session?.user?.image && (
                        <img 
                          src={session.user.image} 
                          alt={session.user.name || 'User'} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      )}
                      <span className="font-bold mr-2">
                        {session.user.name}
                      </span>
                      <LogOut className="h-4 w-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    <span className="font-bold">LOGIN WITH GOOGLE</span>
                  </>
                )}
              </button>
            </motion.div>
            
            {/* Mobile Theme Toggle */}
            {mounted && (
              <motion.div variants={itemVariants} className="flex justify-start">
                <button
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      <span className="font-bold">LIGHT MODE</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      <span className="font-bold">DARK MODE</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>

          <div className="mt-auto">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 KITESTUDIOS
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  )
} 