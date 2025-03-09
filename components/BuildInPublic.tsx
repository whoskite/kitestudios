"use client"

import { useState, useEffect, useRef } from 'react'
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
  Lightbulb,
  FlaskConical
} from 'lucide-react'

// Define interfaces for our data structures
interface UpdateImage {
  src: string;
  alt: string;
}

interface PostItNote {
  content: string;
  color: string;
  rotation: number;
  image?: string;
}

interface ProjectUpdate {
  date: string;
  title: string;
  content: string;
  detailedContent?: string;
  images?: UpdateImage[];
  postItNotes?: PostItNote[];
}

interface Project {
  title: string;
  status: string;
  completion: number;
  description: string;
  url?: {
    main?: string;
    app?: string;
  };
  farcaster?: string;
  updates: ProjectUpdate[];
  tags: string[];
  icon: JSX.Element;
}

// Helper function to calculate the relative time for lastUpdate
const getLastUpdateText = (dateString: string): string => {
  // Handle special case for "Currently building"
  if (dateString === "Currently building") {
    return "ONGOING";
  }
  
  // Parse the date string
  let date: Date | undefined;
  const currentYear = new Date().getFullYear();
  
  // Handle different date formats
  if (dateString.includes(",")) {
    // Format: "MONTH DAY, YEAR"
    date = new Date(dateString);
  } else if (dateString.includes(" ")) {
    // Format: "MONTH YEAR" or "MONTH DAY"
    const parts = dateString.split(" ");
    if (parts.length === 2) {
      if (isNaN(parseInt(parts[1]))) {
        // It's "MONTH YEAR"
        date = new Date(`${parts[0]} 1, ${parts[1]}`);
      } else {
        // It's "MONTH DAY"
        date = new Date(`${parts[0]} ${parts[1]}, ${currentYear}`);
      }
    }
  } else {
    // Unknown format, return as is
    return dateString;
  }
  
  // Check if date is valid
  if (!date || isNaN(date.getTime())) {
    return dateString;
  }
  
  // Check if date is in the future
  const now = new Date();
  if (date > now) {
    return "BUILDING";
  }
  
  // Calculate the difference in days
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Format the relative time
  if (diffDays === 0) {
    return "TODAY";
  } else if (diffDays === 1) {
    return "YESTERDAY";
  } else if (diffDays < 7) {
    return `${diffDays} DAYS AGO`;
  } else if (diffDays < 30) {
    return "LAST WEEK";
  } else if (diffDays < 60) {
    return "LAST MONTH";
  } else {
    return "OLDER";
  }
};

export default function BuildInPublic() {
  const [activeProject, setActiveProject] = useState(0)
  const [selectedUpdate, setSelectedUpdate] = useState<{projectIndex: number, updateIndex: number} | null>(null)
  const [randomizedPositions, setRandomizedPositions] = useState<any[]>([])
  const [draggedPositions, setDraggedPositions] = useState<any[]>([])
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Update container dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }
    
    // Initial update
    updateDimensions()
    
    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions)
  }, [selectedUpdate])
  
  // Randomize positions when the selected update changes
  useEffect(() => {
    if (selectedUpdate && 
        projects[selectedUpdate.projectIndex].title === "GALLERY 82" && 
        projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].title === "SMELL THE FLOWERS COLLECTION DROP") {
      
      // Only generate new positions if we don't already have them
      if (randomizedPositions.length === 0) {
        // Generate new random positions for each post-it note
        const positions = Array.from({ length: projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].postItNotes?.length || 0 }, 
          () => getRandomPosition());
        
        setRandomizedPositions(positions);
      }
      
      // Only reset dragged positions when first opening the modal
      if (draggedPositions.length === 0) {
        setDraggedPositions(Array(projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].postItNotes?.length || 0).fill({ x: 0, y: 0 }));
      }
    } else {
      // Reset positions when closing the modal
      setRandomizedPositions([]);
      setDraggedPositions([]);
    }
  }, [selectedUpdate]);
  
  // Function to update a note's position after dragging
  const updateNotePosition = (index: number, info: any) => {
    // Use container dimensions instead of window dimensions
    const containerWidth = containerDimensions.width || window.innerWidth;
    const containerHeight = containerDimensions.height || window.innerHeight;
    
    // Get the container's bounding rectangle
    const containerRect = containerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    
    // Calculate the new position relative to the container
    const relativeX = info.point.x - containerRect.left;
    const relativeY = info.point.y - containerRect.top;
    
    // Ensure the note stays within visible boundaries (with some padding)
    const padding = 20; // pixels from edge
    const noteWidth = 180; // width of the note
    const noteHeight = 150; // approximate height of the note
    
    // Constrain to container boundaries
    const constrainedX = Math.max(padding, Math.min(containerWidth - noteWidth - padding, relativeX));
    const constrainedY = Math.max(padding, Math.min(containerHeight - noteHeight - padding, relativeY));
    
    // Update the position with absolute coordinates
    const newPositions = [...draggedPositions];
    newPositions[index] = {
      x: constrainedX,
      y: constrainedY,
      absolute: true // Flag to indicate we're using absolute positioning
    };
    
    setDraggedPositions(newPositions);
  };
  
  // Function to get the most recent update date from a project
  const getMostRecentUpdateDate = (updates: ProjectUpdate[]): string => {
    if (!updates || updates.length === 0) return "";
    return updates[0].date;
  };
  
  // Function to shuffle an array (for randomizing post-it notes)
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  // Function to generate random position values for post-it notes
  const getRandomPosition = () => {
    // Generate a truly random position across the entire screen
    const screenSections = [
      // Left side
      { left: `${Math.floor(Math.random() * 20)}%`, top: `${Math.floor(Math.random() * 80)}%` },
      { left: `${Math.floor(Math.random() * 20 + 20)}%`, top: `${Math.floor(Math.random() * 80)}%` },
      
      // Right side
      { right: `${Math.floor(Math.random() * 20)}%`, top: `${Math.floor(Math.random() * 80)}%` },
      { right: `${Math.floor(Math.random() * 20 + 20)}%`, top: `${Math.floor(Math.random() * 80)}%` },
      
      // Top
      { top: `${Math.floor(Math.random() * 20)}%`, left: `${Math.floor(Math.random() * 60 + 20)}%` },
      
      // Bottom
      { bottom: `${Math.floor(Math.random() * 20)}%`, left: `${Math.floor(Math.random() * 60 + 20)}%` }
    ];
    
    return screenSections[Math.floor(Math.random() * screenSections.length)];
  };
  
  const projectsData: Project[] = [
    {
      title: "KITESTUDIOS",
      status: "BUILDING",
      completion: 50,
      description: "The official website and digital presence for KITESTUDIOS, showcasing our projects, philosophy, and creative approach to building in public.",
      url: {
        main: "https://kitestudios.xyz"
      },
      updates: [
        {
          date: "FEBRUARY 27",
          title: "Website Created",
          content: "Launched the initial version of the KITESTUDIOS website, establishing our digital presence and brand identity.",
          detailedContent: `
            <h3 class="text-xl font-bold mb-4">Project Launch Details</h3>
            <p class="mb-4">The KITESTUDIOS website was created as a central hub for all our creative projects and initiatives. The design philosophy centers around industrial aesthetics combined with modern web technologies.</p>
            
            <h4 class="text-lg font-bold mb-2">Technologies Used:</h4>
            <ul class="list-disc pl-5 mb-4">
              <li>Next.js 14 for the framework</li>
              <li>Tailwind CSS for styling</li>
              <li>Framer Motion for animations</li>
              <li>TypeScript for type safety</li>
            </ul>
            
            <h4 class="text-lg font-bold mb-2">Design Principles:</h4>
            <p class="mb-4">The website follows an industrial "off-white" aesthetic inspired by industrial design, technical documentation, and utilitarian interfaces. This approach creates a distinctive visual identity while maintaining excellent usability.</p>
            
            <blockquote class="border-l-4 border-[#ffff00] pl-4 py-2 my-4 italic">
              "We wanted to create a digital space that feels both nostalgic and forward-looking, blending industrial design elements with cutting-edge web technologies."
            </blockquote>
          `,
          images: [
            {
              src: "/placeholder-image-1.jpg",
              alt: "KITESTUDIOS website homepage design"
            },
            {
              src: "/placeholder-image-2.jpg",
              alt: "KITESTUDIOS mobile responsive view"
            }
          ]
        },
        {
          date: "Currently building",
          title: "The Library",
          content: "Currently building The Library section to showcase our collection of resources, inspirations, and creative references."
        }
      ],
      tags: ["WEBSITE", "BRANDING", "DESIGN"],
      icon: <Construction size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "FUNQUOTES",
      status: "ACTIVE",
      completion: 75,
      description: "A modern quote generator app that delivers inspirational, funny, and thought-provoking quotes with GIF integration, powered by AI and enhanced with social sharing capabilities.",
      url: {
        main: "https://funquotes.xyz",
        app: "https://app.funquotes.xyz"
      },
      farcaster: "https://warpcast.com/~/channel/funquotes",
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
      description: "A powerful bulk file renaming application designed to streamline workflow for photographers, designers, and content creators with intuitive batch processing capabilities.",
      url: {
        main: "https://snaprename.vercel.app"
      },
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
      status: "BUILDING",
      completion: 10,
      description: "An immersive community-driven storytelling platform that expands the Crypto Junkie Social Club lore through interactive chapters and community voting on narrative decisions. The project combines web3 elements with collaborative worldbuilding.",
      updates: [
        {
          date: "APRIL 2025",
          title: "WEB APPLICATION",
          content: "Developing an interactive web platform where community members can explore the evolving lore of Crypto Junkies, participate in story decisions, and contribute to the expanding narrative universe."
        }
      ],
      tags: ["STORYTELLING", "COMMUNITY", "WEB3"],
      icon: <FlaskConical size={24} className="text-black dark:text-[#ffff00]" />
    },
    {
      title: "DON THE DOG",
      status: "EARLY STAGE",
      completion: 40,
      description: "A playful crypto project featuring a lovable canine mascot, offering unique tokenomics and community-driven development with a focus on accessibility.",
      url: {
        main: "https://donthedog.vercel.app"
      },
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
      description: "A high-end streetwear brand by gLYF, blending contemporary fashion with artistic expression through limited edition collections and cultural collaborations.",
      url: {
        main: "https://glyfstudio.com"
      },
      updates: [
        {
          date: "MARCH 12, 2025",
          title: "SMELL THE FLOWERS COLLECTION DROP",
          content: "Successfully launched our spring-themed streetwear collection featuring floral motifs and sustainable materials across a range of premium garments.",
          postItNotes: [
            {
              content: "Design inspiration came from Tokyo's cherry blossom season. The pink tones really pop against the black base.",
              color: "#ffcccc", // Light pink
              rotation: -3,
              image: "/placeholder-image-1.jpg"
            },
            {
              content: "Fabric samples arrived late but the quality was worth the wait. 100% organic cotton feels amazing.",
              color: "#ccffcc", // Light green
              rotation: 2
            },
            {
              content: "Production team crushed it! Completed the entire run in just 3 weeks despite supply chain issues.",
              color: "#ffffcc", // Light yellow
              rotation: -2
            },
            {
              content: "Photoshoot location scouting paid off. The botanical garden backdrop perfectly complemented the collection theme.",
              color: "#ccccff", // Light blue
              rotation: 3,
              image: "/placeholder-image-2.jpg"
            },
            {
              content: "Marketing campaign generated 3x more pre-orders than our winter collection. Social engagement up 47%!",
              color: "#ffccff", // Light purple
              rotation: -1
            }
          ]
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
  
  // Add lastUpdate property to each project based on the most recent update
  const projects = projectsData.map(project => ({
    ...project,
    lastUpdate: getLastUpdateText(getMostRecentUpdateDate(project.updates))
  }));
  
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
                
                {projects[activeProject].url && (
                  <div className="mb-4">
                    {projects[activeProject].url.main && (
                      <a 
                        href={projects[activeProject].url.main} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center mr-4 bg-[#ffff00] px-3 py-1 text-black text-sm font-medium hover:bg-opacity-80 transition-colors"
                      >
                        Visit Website <ArrowUpRight size={14} className="ml-1" />
                      </a>
                    )}
                    {projects[activeProject].url.app && (
                      <a 
                        href={projects[activeProject].url.app} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center mr-4 bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-sm font-medium hover:bg-opacity-80 transition-colors"
                      >
                        Open App <ArrowUpRight size={14} className="ml-1" />
                      </a>
                    )}
                    {projects[activeProject].title === "KITESTUDIOS" && (
                      <button 
                        className="inline-flex items-center mr-4 border-2 border-black dark:border-white px-3 py-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                      >
                        ALREADY HERE
                      </button>
                    )}
                    {projects[activeProject].farcaster && (
                      <a 
                        href={projects[activeProject].farcaster} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-purple-600 text-white px-3 py-1 text-sm font-medium hover:bg-opacity-80 transition-colors"
                      >
                        <img 
                          src="/simple-icons--farcaster.svg" 
                          alt="Farcaster" 
                          className="w-4 h-4 mr-2"
                        />
                        Warpcast Community
                      </a>
                    )}
                  </div>
                )}
                
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
                        <button 
                          className="flex items-center hover:text-[#ffff00] transition-colors"
                          onClick={() => setSelectedUpdate({ projectIndex: activeProject, updateIndex: index })}
                        >
                          <Eye size={14} className="mr-1" />
                          VIEW DETAILS
                        </button>
                        <button className="flex items-center hover:text-[#ffff00] transition-colors">
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
      
      {/* Update Details Modal */}
      {selectedUpdate !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          {/* Post-it Notes - Only shown for Gallery 82's Smell the Flowers update */}
          {projects[selectedUpdate.projectIndex].title === "GALLERY 82" && 
           projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].title === "SMELL THE FLOWERS COLLECTION DROP" &&
           projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].postItNotes && (
            <div 
              ref={containerRef}
              className="fixed inset-0 pointer-events-none"
              style={{ 
                padding: '20px',
                overflow: 'hidden'
              }}
            >
              <div className="w-full h-full relative">
                {projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].postItNotes!.map((note, idx) => {
                  const position = randomizedPositions[idx] || getRandomPosition();
                  const isDragged = draggedPositions[idx]?.absolute === true;
                  
                  return (
                    <motion.div
                      key={idx}
                      className="absolute pointer-events-auto"
                      style={{
                        // Use either the original position or just top/left for absolute positioning
                        ...(isDragged ? { top: 0, left: 0 } : position),
                        backgroundColor: note.color,
                        transform: `rotate(${note.rotation}deg)`,
                        padding: '12px',
                        boxShadow: '2px 4px 8px rgba(0,0,0,0.2)',
                        borderRadius: '2px',
                        width: '180px',
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                        zIndex: 60
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        // Use absolute positioning if the note has been dragged
                        x: isDragged ? draggedPositions[idx].x : 0,
                        y: isDragged ? draggedPositions[idx].y : 0
                      }}
                      transition={{ 
                        opacity: { duration: 0.3, delay: idx * 0.1 },
                        x: { type: "spring", stiffness: 500, damping: 50 },
                        y: { type: "spring", stiffness: 500, damping: 50 }
                      }}
                      whileHover={{ scale: 1.05, zIndex: 70, boxShadow: '3px 6px 12px rgba(0,0,0,0.25)' }}
                      drag
                      dragMomentum={false}
                      onDragEnd={(e, info) => updateNotePosition(idx, info)}
                    >
                      {/* Tape effect */}
                      <div 
                        className="absolute w-10 h-3 bg-gray-200 bg-opacity-70"
                        style={{ 
                          top: '-8px', 
                          left: '50%', 
                          transform: 'translateX(-50%) rotate(2deg)',
                          boxShadow: 'inset 0 0 4px rgba(0,0,0,0.1)',
                          borderRadius: '1px'
                        }}
                      ></div>
                      
                      {note.image && (
                        <div className="mb-2 border border-black">
                          <img src={note.image} alt="Note image" className="w-full h-auto" />
                        </div>
                      )}
                      <p className="text-xs text-black" style={{ 
                        fontFamily: "'Caveat', 'Comic Sans MS', cursive", 
                        lineHeight: "1.4",
                        fontSize: "14px"
                      }}>
                        {note.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
          
          <motion.div 
            className="bg-white dark:bg-black border-2 border-black dark:border-white max-w-2xl w-full max-h-[80vh] overflow-y-auto relative z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-6 border-b-2 border-black dark:border-white relative">
              <button 
                className="absolute top-4 right-4 text-black dark:text-white hover:text-[#ffff00] dark:hover:text-[#ffff00] transition-colors"
                onClick={() => setSelectedUpdate(null)}
              >
                ✕
              </button>
              
              <div className="bg-[#ffff00] text-black text-xs font-bold px-2 py-1 inline-block mb-2">
                {projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].date}
              </div>
              
              <h3 className="industrial-text text-2xl mb-4">
                {projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].title}
              </h3>
              
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 bg-white dark:bg-black p-1 border-2 border-black dark:border-white rounded-full mr-2 flex items-center justify-center">
                  {projects[selectedUpdate.projectIndex].icon}
                </div>
                <span className="font-bold">{projects[selectedUpdate.projectIndex].title}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-6">{projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].content}</p>
                
                {/* Additional content that could be added to the update object */}
                {projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].detailedContent && (
                  <div dangerouslySetInnerHTML={{ __html: projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].detailedContent || '' }} />
                )}
                
                {/* Placeholder for when there's no detailed content */}
                {!projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].detailedContent && (
                  <div className="border-l-4 border-[#ffff00] pl-4 py-2 my-4 italic">
                    More detailed information about this update will be available soon.
                  </div>
                )}
              </div>
              
              {/* Images section - could be added to the update object */}
              {projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].images && 
                projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].images!.length > 0 && (
                 <div className="mt-8">
                   <h4 className="text-lg font-bold mb-4">Images</h4>
                   <div className="grid grid-cols-2 gap-4">
                     {projects[selectedUpdate.projectIndex].updates[selectedUpdate.updateIndex].images!.map((image: UpdateImage, idx: number) => (
                       <div key={idx} className="border-2 border-black dark:border-white">
                         <img src={image.src} alt={image.alt} className="w-full h-auto" />
                       </div>
                     ))}
                   </div>
                 </div>
               )}
            </div>
            
            <div className="p-6 border-t-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
              <div className="flex justify-between items-center">
                <button 
                  className="bg-[#ffff00] text-black px-3 py-1 text-sm font-medium hover:bg-opacity-80 transition-colors"
                  onClick={() => setSelectedUpdate(null)}
                >
                  CLOSE
                </button>
                
                <button className="flex items-center text-white dark:text-black hover:text-[#ffff00] dark:hover:text-[#ffff00] transition-colors text-sm">
                  <MessageCircle size={14} className="mr-1" />
                  SHARE FEEDBACK
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
} 