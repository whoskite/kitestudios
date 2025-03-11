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
    activeTab: isDarkMode ? "border-b-2 border-[#4945ff] text-white" : "border-b-2 border-[#4945ff] text-black",
    inactiveTab: isDarkMode ? "text-gray-400" : "text-gray-500",
  };

  // Sidebar navigation items
  const sidebarItems = [
    { icon: <Home size={20} />, label: "Dashboard", href: "/hub" },
    { icon: <Package size={20} />, label: "Plugins", href: "/hub/plugins", count: "225" },
    { icon: <Users size={20} />, label: "Providers", href: "/hub/providers", count: "21" },
    { icon: <Database size={20} />, label: "Content Types", href: "/hub/content-types" },
    { icon: <Layers size={20} />, label: "Components", href: "/hub/components" },
    { icon: <Image size={20} />, label: "Media Library", href: "/hub/media" },
    { icon: <FileText size={20} />, label: "Documentation", href: "/hub/docs" },
    { icon: <Star size={20} />, label: "Favorites", href: "/hub/favorites" },
    { icon: <Download size={20} />, label: "Downloads", href: "/hub/downloads" },
  ];

  const [activeTab, setActiveTab] = useState('plugins');

  return (
    <div className={`page-wrapper ${uiColors.bg} ${uiColors.text} min-h-screen flex`}>
      {/* Sidebar Navigation */}
      <aside 
        className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-30 h-screen w-64 ${uiColors.sidebarBg} ${uiColors.text} border-r ${uiColors.border} transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        <div className={`p-4 border-b ${uiColors.border}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Marketplace</h2>
            <button 
              onClick={() => setMenuOpen(false)}
              className={`md:hidden p-2 rounded-full ${uiColors.buttonHover} ${uiColors.iconColor} ${uiColors.iconHover}`}
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm opacity-70 mb-3">Get more out of Strapi</p>
          
          <button className="w-full bg-[#4945ff] hover:bg-[#3832d8] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
            Submit plugin
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-700">
          <button 
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'plugins' ? uiColors.activeTab : uiColors.inactiveTab}`}
            onClick={() => setActiveTab('plugins')}
          >
            PLUGINS (225)
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === 'providers' ? uiColors.activeTab : uiColors.inactiveTab}`}
            onClick={() => setActiveTab('providers')}
          >
            PROVIDERS (21)
          </button>
        </div>
        
        {/* Search and Sort */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full py-2 px-3 pl-9 rounded ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border ${uiColors.border}`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center">
            <button className={`flex items-center text-xs ${uiColors.text} border ${uiColors.border} rounded px-2 py-1`}>
              <span>Sort by alphabetical order</span>
              <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <button className={`flex items-center ml-2 text-xs ${uiColors.text} border ${uiColors.border} rounded px-2 py-1`}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="ml-1">Filters</span>
            </button>
          </div>
        </div>
        
        {/* Plugin Cards */}
        <div className="p-4 space-y-4">
          {activeTab === 'plugins' && (
            <>
              <div className={`p-4 rounded border ${uiColors.border} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-orange-200 rounded flex items-center justify-center mr-3">
                    <span className="text-orange-600 font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="font-medium">@nexide/strapi-provider-bunny</h3>
                    <p className="text-xs text-gray-400">Bunny.net provider for Strapi</p>
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs ml-1">5</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span className="text-xs ml-1">42</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-4 rounded border ${uiColors.border} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-purple-200 rounded flex items-center justify-center mr-3">
                    <span className="text-purple-600 font-bold">U</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Advanced UUID</h3>
                    <p className="text-xs text-gray-400">Custom UUID plugin for Strapi</p>
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs ml-1">19</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                    <span className="text-xs ml-1">1556</span>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'providers' && (
            <div className={`p-4 rounded border ${uiColors.border} ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-blue-200 rounded flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">P</span>
                </div>
                <div>
                  <h3 className="font-medium">Provider Example</h3>
                  <p className="text-xs text-gray-400">Example provider for Strapi</p>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs ml-1">3</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span className="text-xs ml-1">5</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* App-like header */}
        <header className={`fixed top-0 left-0 right-0 z-40 ${uiColors.bg} ${uiColors.text} border-b ${uiColors.border}`}>
          <div className="px-4 h-16 flex items-center justify-between">
            {/* Left section with logo or name */}
            <div className="flex items-center">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className={`md:hidden mr-4 p-2 rounded-full ${uiColors.buttonHover} ${uiColors.iconColor} ${uiColors.iconHover}`}
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