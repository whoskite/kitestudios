"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu, ChevronRight } from 'lucide-react'

export default function OffWhiteNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setActiveIndex(-1) // Reset active index when toggling menu
  }

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(-1)
  }

  const menuItems = [
    { label: "HOME", href: "#" },
    { label: "ABOUT", href: "#" },
    { label: "MANIFESTO", href: "#manifesto" },
    { label: "COMMUNITY", href: "#community" },
    { label: "BUILD", href: "#build" },
    { label: "CONTACT", href: "#" },
  ]

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  }

  return (
    <>
      <button 
        onClick={toggleMenu} 
        className="fixed top-6 left-6 md:left-24 z-50 flex items-center justify-center p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-200"
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
            className="fixed inset-0 bg-white dark:bg-black z-40 off-white-grid off-white-caution overflow-auto"
          >
            <div className="absolute top-6 right-6 text-xs font-bold uppercase tracking-wider px-2 py-1 border-2 border-black dark:border-white">
              "NAVIGATION"
            </div>

            <div className="flex flex-col items-center justify-center min-h-full py-20">
              <motion.nav 
                className="flex flex-col items-center w-full px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="w-full max-w-md my-2 md:my-3"
                    variants={itemVariants}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <a
                      href={item.href}
                      className={`industrial-text text-3xl md:text-4xl lg:text-5xl relative group flex items-center justify-between w-full p-3 border-2 ${activeIndex === index ? 'border-[#ffff00]' : 'border-transparent hover:border-black dark:hover:border-white'} transition-all duration-200`}
                      onClick={toggleMenu}
                    >
                      <div className="flex items-center">
                        <motion.div 
                          className={`w-2 h-2 mr-3 ${activeIndex === index ? 'bg-[#ffff00]' : 'bg-black dark:bg-white'}`}
                          animate={{ 
                            scale: activeIndex === index ? [1, 1.2, 1] : 1
                          }}
                          transition={{ 
                            duration: 0.5, 
                            repeat: activeIndex === index ? Infinity : 0,
                            repeatType: "reverse"
                          }}
                        />
                        <span className="off-white-quote">{item.label}</span>
                      </div>
                      
                      <motion.div
                        animate={{ 
                          x: activeIndex === index ? [0, 5, 0] : 0,
                          opacity: activeIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <ChevronRight size={20} className={activeIndex === index ? "text-[#ffff00]" : ""} />
                      </motion.div>
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </motion.div>
                ))}
              </motion.nav>
              
              <motion.div 
                className="absolute bottom-6 left-0 right-0 flex justify-between px-6 border-t-2 border-black dark:border-white pt-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-xs font-bold uppercase tracking-wider">
                  "KITESTUDIOS"
                </div>
                <div className="text-xs font-bold uppercase tracking-wider">
                  "EST. 2024"
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 