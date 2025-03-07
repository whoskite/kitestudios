"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Construction, 
  Code, 
  Pencil, 
  Eye, 
  MessageCircle, 
  Clock, 
  ArrowUpRight,
  GitBranch,
  Hammer,
  Lightbulb
} from 'lucide-react'

export default function BuildInPublic() {
  const [activeProject, setActiveProject] = useState(0)
  
  const projects = [
    {
      title: "FUNQUOTES",
      status: "IN PROGRESS",
      completion: 75,
      lastUpdate: "TODAY",
      description: "A modern quote generator app that delivers inspirational, funny, and thought-provoking quotes with GIF integration, powered by AI and enhanced with social sharing capabilities.",
      updates: [
        {
          date: "MARCH 6, 2025",
          title: "CATEGORIES QUOTES UI DESIGN UPDATE",
          content: "Refreshed the user interface for quote categories with improved visual hierarchy and interaction patterns."
        },
        {
          date: "FEBRUARY 14, 2025",
          title: "COMMUNITY'S FIRST OFFICIAL EVENT",
          content: "Launched the first official community event centered around /funquotes, engaging users in collaborative quote creation."
        },
        {
          date: "DECEMBER 2024",
          title: "STARTED BUILDING FUNQUOTES",
          content: "Initiated development of the FunQuotes project, establishing the foundation for the quote generation platform."
        }
      ],
      tags: ["NEXT.JS", "FIREBASE", "FARCASTER"],
      icon: <MessageCircle size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "SNAP RENAME",
      status: "LAUNCHED",
      completion: 100,
      lastUpdate: "LAST MONTH",
      description: "A powerful bulk file renaming application designed to streamline workflow for photographers, designers, and content creators with intuitive batch processing capabilities.",
      updates: [
        {
          date: "FEBRUARY 2025",
          title: "LAUNCHED BULK FILE RENAMER APPLICATION",
          content: "Successfully released the Snap Rename application, providing users with a robust solution for efficiently organizing and renaming large collections of files."
        }
      ],
      tags: ["DESKTOP APP", "PRODUCTIVITY", "FILE MANAGEMENT"],
      icon: <Eye size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "CRYPTO JUNKIES V2",
      status: "UPCOMING",
      completion: 10,
      lastUpdate: "RECENTLY",
      description: "The next evolution of the Crypto Junkies platform, featuring enhanced trading tools, community features, and real-time market analytics for cryptocurrency enthusiasts.",
      updates: [
        {
          date: "APRIL 2025",
          title: "WEB APPLICATION",
          content: "Planning and initial architecture for the comprehensive web application that will serve as the central hub for the Crypto Junkies community."
        }
      ],
      tags: ["CRYPTO", "WEB3", "TRADING"],
      icon: <GitBranch size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "DON THE DOG",
      status: "EARLY STAGE",
      completion: 40,
      lastUpdate: "YESTERDAY",
      description: "A playful crypto project featuring a lovable canine mascot, offering unique tokenomics and community-driven development with a focus on accessibility.",
      updates: [
        {
          date: "MARCH 5, 2025",
          title: "INTEGRATED SWAP TOKEN FEATURE",
          content: "Successfully implemented token swapping functionality, allowing users to easily exchange Don tokens with other cryptocurrencies."
        }
      ],
      tags: ["CRYPTO", "WEB3", "DEFI"],
      icon: <Code size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "GALLERY 82",
      status: "ACTIVE",
      completion: 25,
      lastUpdate: "4 DAYS AGO",
      description: "A high-end streetwear brand by gLYF, blending contemporary fashion with artistic expression through limited edition collections and cultural collaborations.",
      updates: [
        {
          date: "MARCH 12, 2025",
          title: "SMELL THE FLOWERS COLLECTION DROP",
          content: "Successfully launched our spring-themed streetwear collection featuring floral motifs and sustainable materials across a range of premium garments."
        },
        {
          date: "FEBRUARY 25, 2025",
          title: "FIRST BRANDED PHOTOSHOOT",
          content: "Completed the inaugural Gallery 82 branded photoshoot, establishing our visual identity and showcasing our distinctive streetwear aesthetic."
        }
      ],
      tags: ["FASHION", "STREETWEAR", "GLYF"],
      icon: <Hammer size={24} className="text-black dark:text-[#ffff00]" />
    }
  ]
  
  const insights = [
    {
      title: "EMBRACE IMPERFECTION",
      content: "Building in public means showing the messy middle. The unfinished work often sparks the most valuable conversations.",
      icon: <Lightbulb size={20} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "DOCUMENT EVERYTHING",
      content: "The process is as valuable as the outcome. Capture your thinking, iterations, and decision points along the way.",
      icon: <Pencil size={20} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "INVITE COLLABORATION",
      content: "Open building creates opportunities for unexpected collaborations. Be open to input that might redirect your work.",
      icon: <GitBranch size={20} className="text-black dark:text-[#ffff00]" />
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-black off-white-stripes">
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
            BUILD IN PUBLIC
          </motion.h2>
          
          <motion.div 
            className="w-full h-0.5 bg-black dark:bg-white mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          
          <div className="absolute -top-6 -left-3 bg-[#ffff00] px-2 py-1 text-black text-xs font-bold">
            "PROCESS EXPOSED"
          </div>
          
          <motion.p 
            className="text-lg max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            At KITESTUDIOS, we believe in the power of building in the open. Here, we share our works-in-progress, document our process, and invite conversation around our creative journey.
          </motion.p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project List - Left Column */}
          <div className="lg:col-span-1">
            <div className="border-2 border-black dark:border-white p-4 mb-6">
              <h3 className="industrial-text text-xl mb-4 off-white-quote">ACTIVE BUILDS</h3>
              
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className={`border-2 p-3 relative cursor-pointer transition-all duration-300 ${
                      activeProject === index 
                        ? 'border-[#ffff00] bg-white dark:bg-black' 
                        : 'border-black dark:border-white bg-transparent'
                    }`}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveProject(index)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm mb-1">{project.title}</h4>
                        <div className="flex items-center text-xs">
                          <Clock size={12} className="mr-1" />
                          <span>{project.lastUpdate}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 text-xs ${
                        project.status === "IN PROGRESS" 
                          ? "bg-[#ffff00] text-black" 
                          : project.status === "EARLY STAGE"
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "border border-black dark:border-white"
                      }`}>
                        {project.status}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-3 h-1 w-full bg-gray-200 dark:bg-gray-700">
                      <div 
                        className="h-1 bg-black dark:bg-white" 
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                    
                    {activeProject === index && (
                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#ffff00] flex items-center justify-center text-black">
                        →
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Insights Panel */}
            <div className="border-2 border-black dark:border-white p-4">
              <h3 className="industrial-text text-xl mb-4 off-white-quote">INSIGHTS</h3>
              
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    className="border-l-4 border-[#ffff00] pl-3 py-1"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center mb-1">
                      {insight.icon}
                      <h4 className="font-bold text-sm ml-2">{insight.title}</h4>
                    </div>
                    <p className="text-xs">{insight.content}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Project Details - Right Column */}
          <div className="lg:col-span-2">
            <motion.div 
              className="border-2 border-black dark:border-white relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Project Header */}
              <div className="p-6 border-b-2 border-black dark:border-white relative">
                <div className="absolute -top-3 -left-3 bg-white dark:bg-black p-1">
                  {projects[activeProject].icon}
                </div>
                
                <h3 className="industrial-text text-2xl mb-2 mt-2">{projects[activeProject].title}</h3>
                <p className="mb-4">{projects[activeProject].description}</p>
                
                <div className="flex flex-wrap">
                  {projects[activeProject].tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Project Updates */}
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <h4 className="text-lg font-bold mr-4">BUILD UPDATES</h4>
                  <div className="h-0.5 bg-black dark:bg-white flex-grow"></div>
                </div>
                
                <div className="space-y-8">
                  {projects[activeProject].updates.map((update, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-8 border-l-2 border-black dark:border-white"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-[#ffff00] flex items-center justify-center rounded-full text-black">
                        <Hammer size={14} />
                      </div>
                      
                      <div className="bg-[#ffff00] text-black text-xs font-bold px-2 py-1 inline-block mb-2">
                        {update.date}
                      </div>
                      
                      <h5 className="font-bold mb-2">{update.title}</h5>
                      <p className="text-sm mb-4">{update.content}</p>
                      
                      <div className="flex space-x-4 text-xs">
                        <button className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          VIEW DETAILS
                        </button>
                        <button className="flex items-center">
                          <MessageCircle size={14} className="mr-1" />
                          DISCUSS
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="p-6 border-t-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-bold mb-1">FOLLOW THIS BUILD</h4>
                    <p className="text-sm">Get updates as this project evolves and join the conversation.</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <button className="bg-[#ffff00] border-2 border-white dark:border-black px-4 py-2 text-black font-bold uppercase tracking-wider flex items-center">
                      SUBSCRIBE
                      <ArrowUpRight size={16} className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 