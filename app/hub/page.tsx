"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Home, LogOut, Menu, X, Sun, Moon, Settings, User, CreditCard, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react"
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
  };

  return (
    <div className={`page-wrapper ${uiColors.bg} ${uiColors.text}`}>
      {/* App-like header */}
      <header className={`fixed top-0 left-0 right-0 z-40 ${uiColors.bg} ${uiColors.text} border-b ${uiColors.border}`}>
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Left section with logo or name */}
          <div className="flex items-center">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className={`mr-4 p-2 rounded-full ${uiColors.buttonHover} ${uiColors.iconColor} ${uiColors.iconHover}`}
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <span className="text-xl font-semibold">Kite Hub</span>
          </div>

          {/* Right section with theme toggle and profile */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${uiColors.buttonHover} ${uiColors.iconColor} ${uiColors.iconHover}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              id="settings-button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`p-2 rounded-full ${uiColors.buttonHover} ${uiColors.iconColor} ${uiColors.iconHover}`}
              aria-label="Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-24 pb-12">
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