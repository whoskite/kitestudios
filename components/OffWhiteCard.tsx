"use client"

import { motion } from 'framer-motion'

interface OffWhiteCardProps {
  title: string
  description: string
  category: string
  image: string
}

export default function OffWhiteCard({ title, description, category, image }: OffWhiteCardProps) {
  return (
    <motion.div 
      className="relative w-full max-w-sm border-2 border-black dark:border-white bg-white dark:bg-black"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Category Label */}
      <div className="absolute -top-3 -left-3 bg-[#ffff00] text-black px-2 py-1 text-xs font-bold z-10">
        {category}
      </div>
      
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 off-white-stripes" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover relative z-10"
        />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white dark:bg-black opacity-70 flex items-center justify-center">
          <span className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
            "PRODUCT IMAGE"
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 border-t-2 border-black dark:border-white">
        <h3 className="industrial-text text-xl mb-2 off-white-quote">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <button className="off-white-button text-xs">
            VIEW DETAILS
          </button>
          <div className="off-white-label">
            NEW
          </div>
        </div>
      </div>
      
      {/* Bottom Label */}
      <div className="absolute -bottom-3 -right-3 bg-white dark:bg-black border-2 border-black dark:border-white text-xs font-bold px-2 py-1">
        "AUTHENTIC"
      </div>
    </motion.div>
  )
} 