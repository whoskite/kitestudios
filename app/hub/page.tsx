"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Home, LogOut, Menu, X, Sun, Moon, Settings, User, CreditCard, Bell, Shield, HelpCircle, ChevronRight, FileText, Package, ShoppingBag, Users, Grid, Database, Image, Video, Layers, Star, Download } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import LinkHub from "@/components/LinkHub"
import { getHubResources } from "@/lib/strapi"
import { Resource, StrapiData } from "@/types/strapi"
import { Button } from "@/components/ui/button"

// Function to fetch featured resources
async function getFeaturedResources() {
  const resources = await getHubResources({
    filters: {
      featured: {
        $eq: true
      }
    },
    pagination: {
      limit: 3
    }
  });
  
  return resources;
}

export default function HubPage() {
  const { data: session } = useSession()
  const [isFutureMode, setIsFutureMode] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode for the UI
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile')

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
    
    // Initialize dark mode from localStorage or system preference
    const savedMode = localStorage.getItem("hubDarkMode");
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    }
  }, []);

  // Close settings panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const settingsPanel = document.getElementById('settings-panel');
      const settingsButton = document.getElementById('settings-button');
      
      if (settingsPanel && settingsButton && 
          !settingsPanel.contains(event.target as Node) && 
          !settingsButton.contains(event.target as Node)) {
        setSettingsOpen(false);
      }
    };

    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsOpen]);

  // Initialize future mode setting from localStorage
  useEffect(() => {
    // Check localStorage for future mode setting
    const futureSetting = localStorage.getItem("futureMode")
    if (futureSetting !== null) {
      setIsFutureMode(futureSetting === "true")
    }
    
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])

  // Store future mode preference
  useEffect(() => {
    localStorage.setItem("futureMode", isFutureMode.toString())
  }, [isFutureMode])
  
  // Store dark mode preference
  useEffect(() => {
    localStorage.setItem("hubDarkMode", isDarkMode.toString())
  }, [isDarkMode])

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("hubDarkMode", (!isDarkMode).toString());
    // Also toggle next-themes theme for components that use it
    setTheme(isDarkMode ? "light" : "dark");
  };

  // Style objects based on dark/light mode
  const uiColors = {
    bg: isDarkMode ? "bg-gray-900" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-900",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    buttonBg: isDarkMode ? "bg-gray-800" : "bg-gray-100",
    buttonHover: isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
    iconColor: isDarkMode ? "text-gray-400" : "text-gray-500",
    iconHover: isDarkMode ? "hover:text-white" : "hover:text-black",
    cardBg: isDarkMode ? "bg-gray-800" : "bg-white",
    cardBorder: isDarkMode ? "border-gray-700" : "border-gray-200",
    inputBg: isDarkMode ? "bg-gray-800" : "bg-gray-100",
    inputBorder: isDarkMode ? "border-gray-700" : "border-gray-300",
    highlight: isDarkMode ? "bg-indigo-900/30" : "bg-indigo-50",
    listHover: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100",
    sidebarBg: isDarkMode ? "bg-[#1a1b2a]" : "bg-gray-100",
    activeIcon: isDarkMode ? "text-[#4945ff]" : "text-[#4945ff]",
    activeBg: isDarkMode ? "bg-[#1a1b2a]/40" : "bg-gray-200",
  };

  // Sidebar navigation items
  const sidebarItems = [
    { icon: <Home size={20} />, label: "Home", href: "/hub" },
    { icon: <FileText size={20} />, label: "Documents", href: "/hub/docs" },
    { icon: <Image size={20} />, label: "Media", href: "/hub/media" },
    { icon: <Database size={20} />, label: "Data", href: "/hub/data" },
    { icon: <Layers size={20} />, label: "Projects", href: "/hub/projects" },
  ];

  // Get current path to determine active link
  const [currentPath, setCurrentPath] = useState("/hub");
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className={`page-wrapper ${uiColors.bg} ${uiColors.text} min-h-screen flex`}>
      {/* Enhanced Sidebar Navigation */}
      <aside 
        className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed left-0 top-0 bottom-0 z-40 h-screen w-16 ${uiColors.sidebarBg} border-r ${uiColors.border} transition-transform duration-300 ease-in-out flex flex-col justify-between shadow-lg`}
      >
        {/* Top section with menu toggle and navigation icons */}
        <div>
          <div className="p-3 border-b border-gray-700 flex justify-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-full ${uiColors.buttonHover} ${uiColors.iconColor} ${uiColors.iconHover} transition-colors duration-200`}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          
          <nav className="py-6">
            <ul className="space-y-6">
              {sidebarItems.map((item, index) => {
                const isActive = currentPath === item.href;
                return (
                  <li key={index} className="flex justify-center relative">
                    {isActive && (
                      <div className="absolute left-0 w-1 h-8 bg-[#4945ff] rounded-r-md"></div>
                    )}
                    <Link 
                      href={item.href}
                      className={`p-3 rounded-md ${isActive ? uiColors.activeBg : uiColors.listHover} transition-all duration-200 flex items-center justify-center`}
                      title={item.label}
                    >
                      <span className={isActive ? uiColors.activeIcon : uiColors.iconColor}>
                        {item.icon}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        {/* Bottom section with theme toggle, settings, and user profile */}
        <div className="mb-8 space-y-6">
          <div className="flex justify-center">
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-md ${uiColors.listHover} transition-all duration-200 hover:scale-110`}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDarkMode ? 
                <Sun size={20} className={`${uiColors.iconColor} transition-transform duration-300 hover:rotate-45`} /> : 
                <Moon size={20} className={`${uiColors.iconColor} transition-transform duration-300 hover:rotate-12`} />
              }
            </button>
          </div>
          
          <div className="flex justify-center">
            <button 
              id="settings-button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`p-3 rounded-md ${uiColors.listHover} transition-all duration-200 hover:scale-110`}
              aria-label="Settings"
              title="Settings"
            >
              <Settings size={20} className={`${uiColors.iconColor} transition-transform duration-300 hover:rotate-90`} />
            </button>
          </div>
          
          <div className="flex justify-center">
            <Link 
              href="/profile"
              className={`p-3 rounded-md ${uiColors.listHover} transition-all duration-200 hover:scale-110 relative`}
              title="Profile"
            >
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full ring-2 ring-[#4945ff] p-0.5"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#4945ff]/20 flex items-center justify-center ring-2 ring-[#4945ff] p-0.5">
                  <User size={16} className="text-[#4945ff]" />
                </div>
              )}
              <span className="absolute bottom-0 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content - Add padding to account for fixed sidebar */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-16">
        <div className="container mx-auto px-4 py-6">
          {/* Welcome message */}
          {showWelcome && (
            <div className={`mb-8 p-6 rounded-lg ${uiColors.highlight} ${uiColors.text}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome to Kite Studios Hub</h1>
                  <p className="opacity-80">Your central location for all resources and tools.</p>
                </div>
                <button 
                  onClick={() => setShowWelcome(false)}
                  className={`p-1 ${uiColors.iconColor} ${uiColors.iconHover}`}
                  aria-label="Close welcome message"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Link Hub Component - Pass the dark mode state */}
          <LinkHub isDarkMode={isDarkMode} />
          
          {/* Featured Resources Section */}
          <div className="mt-12 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Resources</h2>
              <Button variant="outline" asChild>
                <Link href="/hub/resource" className="flex items-center">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
                <Link href="/hub/resource">
                  <div className="relative h-40 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wider mb-1">
                      Documentation
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      Getting Started with Kite Studios
                    </h3>
                    <p className="text-sm opacity-70 line-clamp-2">
                      Learn how to use the Kite Studios platform with our comprehensive guides.
                    </p>
                  </div>
                </Link>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
                <Link href="/hub/resource">
                  <div className="relative h-40 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wider mb-1">
                      Tutorials
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      Video Production Essentials
                    </h3>
                    <p className="text-sm opacity-70 line-clamp-2">
                      Master the basics of video production with our step-by-step tutorials.
                    </p>
                  </div>
                </Link>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
                <Link href="/hub/resource">
                  <div className="relative h-40 bg-gradient-to-r from-pink-500 to-red-600"></div>
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wider mb-1">
                      Tools
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      Design Resources Collection
                    </h3>
                    <p className="text-sm opacity-70 line-clamp-2">
                      Access our curated collection of design tools and resources.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Featured Resources Component
async function FeaturedResources() {
  const resources = await getFeaturedResources();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {resources.data.length > 0 ? (
        resources.data.map((resource: StrapiData<Resource>) => (
          <div 
            key={resource.id} 
            className="rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg"
          >
            <Link href={`/hub/resource/${resource.id}`}>
              <div className="relative h-40 bg-gradient-to-r from-purple-500 to-indigo-600">
                {resource.attributes.image?.data?.attributes?.url && (
                  <img 
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${resource.attributes.image.data.attributes.url}`}
                    alt={resource.attributes.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-wider mb-1">
                  {resource.attributes.category}
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {resource.attributes.title}
                </h3>
                <p className="text-sm opacity-70 line-clamp-2">
                  {resource.attributes.description.replace(/<[^>]*>/g, '')}
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center py-8">
          <p className="text-muted-foreground">No featured resources available yet.</p>
        </div>
      )}
    </div>
  );
} 