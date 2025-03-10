"use client"

import { useEffect, useState } from 'react'
import { signIn } from "next-auth/react"
import OffWhiteNav from '@/components/OffWhiteNav'
import { LogIn, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AccessDeniedPage() {
  const [isHovering, setIsHovering] = useState(false)
  
  // Track page view
  useEffect(() => {
    // You could add analytics tracking here
  }, [])
  
  return (
    <div className="page-wrapper">
      <OffWhiteNav />
      <div className="min-h-screen bg-white dark:bg-black off-white-grid flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="border-2 border-black dark:border-white p-8 relative">
              <div className="absolute -top-3 -right-3 bg-[#ffff00] p-1 text-black z-10">
                <span className="text-xs font-bold uppercase">MEMBERS ONLY</span>
              </div>
              
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-black dark:bg-white flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0px 0px 0px rgba(0,0,0,0)",
                      "0px 0px 20px rgba(255,255,0,0.3)",
                      "0px 0px 0px rgba(0,0,0,0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <Lock className="h-8 w-8 text-white dark:text-black" />
                </motion.div>
              </div>
              
              <h1 className="text-2xl font-bold mb-2 text-center industrial-text">RESOURCE HUB</h1>
              <div className="w-12 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
              
              <p className="mb-8 text-center">
                Sign in to access exclusive KITESTUDIOS resources, tools, and content.
              </p>
              
              <motion.button 
                onClick={() => signIn('google', { callbackUrl: '/hub' })}
                className="w-full flex items-center justify-center border-2 border-black dark:border-white px-4 py-3 font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors relative overflow-hidden"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-[#ffff00] dark:bg-[#ffff00]"
                  initial={{ x: "-100%" }}
                  animate={{ x: isHovering ? "0%" : "-100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.2, zIndex: -1 }}
                />
                <LogIn className="mr-2 h-5 w-5" /> SIGN IN WITH GOOGLE
              </motion.button>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <div className="off-white-label px-3 py-1 text-xs font-bold uppercase">
                "KITESTUDIOS MEMBERS AREA"
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 