"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Quote {
  quote: string
  author: string
}

// Animation variants for text reveal
const quoteVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 1.8,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
}

export default function RandomQuote() {
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        // Add a slight delay for a more noticeable animation
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const response = await fetch('/quotes.json')
        const quotes = await response.json()
        
        // Select a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length)
        setQuote(quotes[randomIndex])
      } catch (error) {
        console.error('Error fetching quote:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRandomQuote()
  }, [])

  if (loading) {
    return (
      <div className="h-6 w-64 mt-8 relative overflow-hidden">
        <motion.div 
          className="h-full bg-gray-200 dark:bg-gray-700 rounded absolute inset-0"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            width: ["30%", "100%", "30%"],
            x: ["0%", "70%", "0%"],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    )
  }

  if (!quote) {
    return null
  }

  // Split the quote into words for word-by-word animation
  const words = quote.quote.split(" ")

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="text-center mt-8 max-w-md px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          ease: [0.2, 0.65, 0.3, 0.9],
        }}
      >
        <div className="text-gray-700 dark:text-gray-300 italic">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={quoteVariants}
              className="inline-block mx-0.5"
            >
              {word}
            </motion.span>
          ))}
        </div>
        <motion.p 
          className="text-gray-500 dark:text-gray-400 text-sm mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
        >
          — {quote.author}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
} 