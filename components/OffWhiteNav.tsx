"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'

export default function OffWhiteNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    { label: "HOME", href: "#" },
    { label: "ABOUT", href: "#" },
    { label: "MANIFESTO", href: "#manifesto" },
    { label: "COMMUNITY", href: "#community" },
    { label: "BUILD", href: "#build" },
    { label: "CONTACT", href: "#" },
  ]

  return (
    <>
      <button 
        onClick={toggleMenu} 
        className="fixed top-6 left-24 z-50 flex items-center justify-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="text-xs font-bold uppercase tracking-wider mr-2">MENU</span>
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-black z-40 off-white-grid off-white-caution"
          >
            <div className="absolute top-6 right-6 text-xs font-bold uppercase tracking-wider">
              "NAVIGATION"
            </div>

            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="industrial-text text-4xl md:text-5xl my-4 relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    onClick={toggleMenu}
                  >
                    <span className="off-white-quote">{item.label}</span>
                    <motion.div 
                      className="absolute -left-4 top-1/2 w-2 h-2 bg-[#ffff00]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + 0.1 * index }}
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-current"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </nav>
              
              <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6">
                <div className="text-xs font-bold uppercase tracking-wider">
                  "KITESTUDIOS"
                </div>
                <div className="text-xs font-bold uppercase tracking-wider">
                  "EST. 2024"
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 