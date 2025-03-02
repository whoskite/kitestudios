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
      title: "TYPOGRAPHY SYSTEM",
      status: "IN PROGRESS",
      completion: 65,
      lastUpdate: "3 DAYS AGO",
      description: "Creating a modular typography system with industrial influences and variable font technology.",
      updates: [
        {
          date: "MAY 12, 2024",
          title: "VARIABLE FONT PROTOTYPE",
          content: "Completed the first variable axis for weight. Working on width variations next."
        },
        {
          date: "MAY 8, 2024",
          title: "INITIAL SKETCHES",
          content: "Exploring industrial-inspired letterforms with geometric constraints."
        }
      ],
      tags: ["TYPOGRAPHY", "DESIGN SYSTEM", "VARIABLE FONTS"],
      icon: <Pencil size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "INTERACTIVE GRID SYSTEM",
      status: "EARLY STAGE",
      completion: 30,
      lastUpdate: "YESTERDAY",
      description: "Developing a responsive grid system that reacts to user interaction and content density.",
      updates: [
        {
          date: "MAY 15, 2024",
          title: "INTERACTION PROTOTYPES",
          content: "Built first interactive prototype with hover states and content-aware adjustments."
        },
        {
          date: "MAY 10, 2024",
          title: "CONCEPT DEVELOPMENT",
          content: "Researching existing grid systems and identifying opportunities for innovation."
        }
      ],
      tags: ["FRONTEND", "INTERACTION", "CSS GRID"],
      icon: <Code size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "MODULAR DESIGN TOOLKIT",
      status: "PLANNING",
      completion: 15,
      lastUpdate: "1 WEEK AGO",
      description: "Building a comprehensive toolkit of modular design components for rapid prototyping.",
      updates: [
        {
          date: "MAY 5, 2024",
          title: "COMPONENT INVENTORY",
          content: "Cataloging essential components and establishing naming conventions."
        },
        {
          date: "MAY 1, 2024",
          title: "RESEARCH PHASE",
          content: "Analyzing existing design systems and identifying gaps to address."
        }
      ],
      tags: ["DESIGN SYSTEM", "COMPONENTS", "DOCUMENTATION"],
      icon: <Construction size={24} className="text-black dark:text-[#ffff00]" />
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
        
        {/* Join the Build Section */}
        <motion.div 
          className="mt-20 border-t-2 border-black dark:border-white pt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="industrial-text text-2xl mb-4 off-white-quote">START YOUR OWN BUILD</h3>
          <p className="max-w-2xl mx-auto mb-8">
            Ready to share your creative process with the world? Join KITESTUDIOS and document your journey from concept to completion.
          </p>
          
          <div className="bg-[#ffff00] inline-block">
            <button className="border-2 border-black px-8 py-3 text-black font-bold uppercase tracking-wider transform -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition-transform">
              Begin Building
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 