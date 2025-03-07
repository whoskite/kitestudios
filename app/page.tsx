"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, ArrowDown, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import RandomQuote from "@/components/RandomQuote"
import OffWhiteNav from "@/components/OffWhiteNav"
import OffWhiteSection from "@/components/OffWhiteSection"
import OffWhiteAI from "@/components/OffWhiteAI"
import OffWhiteAIShowcase from "@/components/OffWhiteAIShowcase"
import Manifesto from "@/components/Manifesto"
import Community from "@/components/Community"
import BuildInPublic from "@/components/BuildInPublic"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [isFutureMode, setIsFutureMode] = useState(false)

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem("darkMode")
    if (savedMode !== null) {
      setDarkMode(savedMode === "true")
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setDarkMode(prefersDark)
    }

    // Check for future mode setting
    const futureSetting = localStorage.getItem("futureMode")
    if (futureSetting !== null) {
      setIsFutureMode(futureSetting === "true")
    }
  }, [])

  // Update class and localStorage when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode.toString())
  }, [darkMode])

  // Store future mode preference
  useEffect(() => {
    localStorage.setItem("futureMode", isFutureMode.toString())
  }, [isFutureMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleFutureMode = () => {
    setIsFutureMode(!isFutureMode)
  }

  return (
    <div className="page-wrapper">
      {/* Navigation */}
      <OffWhiteNav />
      
      <div className={`min-h-screen bg-white dark:bg-black off-white-caution ${isFutureMode ? 'future-grid' : ''} transition-all duration-300`}>
        {/* Hero Section */}
        <main className={`flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black ${isFutureMode ? 'future-grid scan-line' : 'off-white-stripes'}`}>
          <div className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider">
            c/o 2024
          </div>
          
          <div className="absolute top-6 right-6 flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="border-2 border-black dark:border-white rounded-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-wider">
            "FOR DISPLAY ONLY"
          </div>
          
          <div className="absolute bottom-6 right-6 text-xs font-bold uppercase tracking-wider">
            "WEBSITE"
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <h1 
                className={`industrial-text text-5xl md:text-7xl font-bold tracking-tighter mb-2 relative ${isFutureMode ? 'ai-gradient-text' : ''}`}
                data-text="KITESTUDIOS"
              >
                {isFutureMode ? (
                  <span className="glitch-text" data-text="KITESTUDIOS">"KITESTUDIOS"</span>
                ) : (
                  '"KITESTUDIOS"'
                )}
              </h1>
              <div className={`absolute -top-3 -right-3 text-xs font-bold ${isFutureMode ? 'bg-black dark:bg-white text-[#ffff00]' : 'bg-[#ffff00] text-black'} px-1`}>
                {isFutureMode ? "AI" : "TM"}
              </div>
            </div>
            
            <div className={`w-full max-w-md border-t-2 border-b-2 border-black dark:border-white py-2 my-4 ${isFutureMode ? 'scan-line' : ''}`}>
              <RandomQuote />
            </div>
            
            <motion.div 
              className={`mt-8 text-sm uppercase tracking-wider ${isFutureMode ? 'ai-badge mb-4' : 'off-white-arrow'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {isFutureMode ? (
                <span className="ai-badge-text">ESTABLISHED 2024</span>
              ) : (
                'ESTABLISHED 2024'
              )}
            </motion.div>
            
            {isFutureMode && (
              <motion.div
                className="terminal-text text-xs mt-2 ai-blink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                SYSTEM POWERED BY ARTIFICIAL INTELLIGENCE
              </motion.div>
            )}
            
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 mt-16"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                delay: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <ArrowDown className={`h-6 w-6 ${isFutureMode ? 'text-[#ffff00]' : ''}`} />
            </motion.div>
          </div>
        </main>
        
        <div id="manifesto">
          <Manifesto />
        </div>
        
        {/* Community Section - Disabled */}
        {/* 
        <div id="community">
          <Community />
        </div>
        */}
        
        {/* Build In Public Section */}
        <div id="build">
          <BuildInPublic />
        </div>
        
        {/* AI Showcase Section (only visible in future mode) */}
        {isFutureMode && <OffWhiteAIShowcase 
          title="AI-ENHANCED DESIGN" 
          description="Exploring the intersection of artificial intelligence and industrial design aesthetics."
        />}
        
        {/* Projects Section - Disabled */}
        {/* 
        <div className={isFutureMode ? 'future-grid' : 'off-white-grid'}>
          <OffWhiteSection />
        </div>
        */}
        
        {/* Footer */}
        <footer className={`py-12 border-t-2 border-black dark:border-white ${isFutureMode ? 'future-grid' : ''}`}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-6 md:mb-0">
                <div className={`industrial-text text-2xl mb-2 ${isFutureMode ? 'ai-gradient-text' : ''}`}>
                  {isFutureMode ? (
                    <span className="glitch-text" data-text="KITESTUDIOS">"KITESTUDIOS"</span>
                  ) : (
                    '"KITESTUDIOS"'
                  )}
                </div>
                <div className="text-xs uppercase tracking-wider">
                  © 2024 ALL RIGHTS RESERVED
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <a href="https://instagram.com/kitestudios6" target="_blank" rel="noopener noreferrer" className={`text-xs uppercase tracking-wider ${isFutureMode ? 'ai-badge' : 'off-white-arrow'}`}>
                  {isFutureMode ? <span className="ai-badge-text">INSTAGRAM</span> : 'INSTAGRAM'}
                </a>
                <a href="http://twitter.com/tomykite" target="_blank" rel="noopener noreferrer" className={`text-xs uppercase tracking-wider ${isFutureMode ? 'ai-badge' : 'off-white-arrow'}`}>
                  {isFutureMode ? <span className="ai-badge-text">TWITTER</span> : 'TWITTER'}
                </a>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-black dark:border-white">
              <div className="text-xs uppercase tracking-wider text-center">
                {isFutureMode ? (
                  '"BUILT BY KITESTUDIOS"'
                ) : (
                  '"BUILT BY KITESTUDIOS"'
                )}
              </div>
            </div>
          </div>
        </footer>
        
        {/* AI Chat Assistant (only visible in future mode) */}
        {isFutureMode && <OffWhiteAI />}
      </div>
    </div>
  )
}

