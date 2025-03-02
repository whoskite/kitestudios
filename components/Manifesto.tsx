"use client"

import { motion } from 'framer-motion'
import { Quote, Zap, Layers, Users, Lightbulb, Clock } from 'lucide-react'

export default function Manifesto() {
  const manifestoPoints = [
    {
      title: "BUILD WITHOUT BOUNDARIES",
      description: "We reject artificial limits on creativity. Every idea deserves exploration, every concept deserves form.",
      icon: <Zap size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "CREATION AS CONVERSATION",
      description: "We build to communicate, to challenge, to question. Every project is a statement in an ongoing dialogue.",
      icon: <Quote size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "EMBRACE THE PROCESS",
      description: "The journey of creation holds as much value as the finished product. We document, share, and celebrate our processes.",
      icon: <Layers size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "COLLECTIVE GROWTH",
      description: "Individual creativity flourishes in community. We learn from each other, challenge each other, and evolve together.",
      icon: <Users size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "IDEAS OVER EGO",
      description: "We prioritize the strength of ideas over personal recognition. The best concept wins, regardless of its source.",
      icon: <Lightbulb size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "PERPETUAL ITERATION",
      description: "Nothing is ever truly finished. We continuously refine, reimagine, and rebuild based on new insights.",
      icon: <Clock size={24} className="text-black dark:text-[#ffff00]" />
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-black off-white-grid">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 relative">
          <motion.h2 
            className="industrial-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6 off-white-quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            MANIFESTO
          </motion.h2>
          
          <motion.div 
            className="w-full h-0.5 bg-black dark:bg-white mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          <div className="absolute -top-6 -left-3 bg-[#ffff00] px-2 py-1 text-black text-xs font-bold">
            "STUDIO PHILOSOPHY"
          </div>
          
          <motion.p 
            className="text-lg max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            KITESTUDIOS exists to transform ideas into reality. Founded by Tomy "KITE" Lim as a home for boundless creativity, we've evolved into a community of builders, thinkers, and makers united by the drive to create with purpose.
          </motion.p>
        </div>
        
        {/* Manifesto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {manifestoPoints.map((point, index) => (
            <motion.div 
              key={index}
              className="border-2 border-black dark:border-white p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-3 -left-3 bg-white dark:bg-black p-1">
                {point.icon}
              </div>
              
              <div className="absolute -top-3 right-3 bg-black dark:bg-white text-white dark:text-black px-1 text-xs">
                {`0${index + 1}`}
              </div>
              
              <h3 className="industrial-text text-xl mb-4 mt-4">{point.title}</h3>
              <p className="text-sm">{point.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-16 border-t-2 border-black dark:border-white pt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="industrial-text text-2xl mb-4 off-white-quote">JOIN THE MOVEMENT</h3>
          <p className="max-w-2xl mx-auto mb-8">
            KITESTUDIOS isn't just a platform—it's a mindset, a commitment to bringing ideas to life without compromise. Whether you're a builder, a dreamer, or somewhere in between, there's a place for you here.
          </p>
          
          <div className="bg-[#ffff00] inline-block">
            <button className="border-2 border-black px-8 py-3 text-black font-bold uppercase tracking-wider transform -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition-transform">
              Become Part of KITESTUDIOS
            </button>
          </div>
        </motion.div>
        
        {/* Footer Quote */}
        <div className="mt-24 text-center">
          <motion.div 
            className="terminal-text max-w-lg mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            "IN A WORLD FULL OF CRITICS, BE THE ONE WHO BUILDS."
          </motion.div>
          <div className="text-xs mt-2">— TOMY "KITE" LIM, FOUNDER</div>
        </div>
      </div>
    </section>
  )
} 