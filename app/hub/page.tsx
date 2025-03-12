"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Home, LogOut, Menu, X, Sun, Moon, Settings, User, CreditCard, Bell, Shield, HelpCircle, ChevronRight, FileText, Package, ShoppingBag, Users, Grid, Database, Image, Video, Layers, Star, Download, BookOpen, Search, List, Folder } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function HubPage() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode for the UI
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeSettingsTab, setActiveSettingsTab] = useState('profile')
  const [activeFilter, setActiveFilter] = useState('all') // Add missing state variable for filters

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true);
    
    // Initialize dark mode from localStorage or system preference
    const savedMode = localStorage.getItem("hubDarkMode");
    if (savedMode !== null) {
      setIsDarkMode(savedMode === "true");
    }
    
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)
    
    return () => clearTimeout(timer)
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

  // Save dark mode preference to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("hubDarkMode", isDarkMode.toString());
    }
  }, [isDarkMode, mounted]);

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("hubDarkMode", (!isDarkMode).toString());
    // Also toggle next-themes theme for components that use it
    setTheme(isDarkMode ? "light" : "dark");
  };

  // Style objects based on dark/light mode
  const uiColors = {
    bg: isDarkMode ? "bg-black" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-900",
    border: isDarkMode ? "border-zinc-800" : "border-gray-200",
    buttonBg: isDarkMode ? "bg-zinc-900" : "bg-gray-100",
    buttonHover: isDarkMode ? "hover:bg-zinc-800" : "hover:bg-gray-200",
    iconColor: isDarkMode ? "text-gray-400" : "text-gray-500",
    iconHover: isDarkMode ? "hover:text-white" : "hover:text-black",
    cardBg: isDarkMode ? "bg-zinc-900" : "bg-white",
    cardBorder: isDarkMode ? "border-zinc-800" : "border-gray-200",
    inputBg: isDarkMode ? "bg-zinc-900" : "bg-gray-100",
    inputBorder: isDarkMode ? "border-zinc-800" : "border-gray-300",
    highlight: isDarkMode ? "bg-zinc-900" : "bg-gray-50",
    listHover: isDarkMode ? "hover:bg-zinc-900" : "hover:bg-gray-100",
    sidebarBg: isDarkMode ? "bg-black" : "bg-white",
    activeIcon: isDarkMode ? "text-yellow-400" : "text-black",
    activeBg: isDarkMode ? "bg-zinc-900" : "bg-gray-100",
    tooltipBg: isDarkMode ? "bg-black" : "bg-black",
    tooltipText: "text-white",
    tooltipBorder: isDarkMode ? "border border-zinc-800" : "border border-black",
    tableHeaderBg: isDarkMode ? "bg-zinc-900" : "bg-gray-100",
    tableRowHover: isDarkMode ? "hover:bg-zinc-900/50" : "hover:bg-gray-50",
    tableRowBorder: isDarkMode ? "border-b border-zinc-800" : "border-b border-gray-200",
    tableCellBg: isDarkMode ? "bg-black" : "bg-white",
  };

  // Sidebar navigation items
  const sidebarItems = [
    { icon: <Home size={20} />, label: "HOME", href: "/hub" },
  ];

  // Get current path to determine active link
  const [currentPath, setCurrentPath] = useState("/hub");
  
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // View mode state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className={`page-wrapper ${uiColors.bg} ${uiColors.text} min-h-screen flex`}>
      {/* Industrial Sidebar Navigation */}
      <aside 
        className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed left-0 top-0 bottom-0 z-40 h-screen w-[70px] ${uiColors.sidebarBg} border-r ${uiColors.border} transition-transform duration-300 ease-in-out flex flex-col justify-between`}
        style={{
          backgroundImage: isDarkMode ? 
            'linear-gradient(rgba(0, 0, 0, 0.97), rgba(0, 0, 0, 0.97)), url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23333333\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")' : 
            'linear-gradient(rgba(255, 255, 255, 0.97), rgba(255, 255, 255, 0.97)), url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
        }}
      >
        {/* Top section with logo and navigation icons */}
        <div>
          <div className="p-4 border-b border-zinc-800 flex justify-center">
            <div className="w-10 h-10 flex items-center justify-center border border-yellow-400">
              <span className="text-yellow-400 font-bold text-2xl tracking-tighter">K</span>
            </div>
          </div>
          
          <nav className="py-8">
            <ul className="space-y-8">
              {sidebarItems.map((item, index) => {
                const isActive = currentPath === item.href;
                return (
                  <li key={index} className="flex justify-center relative group">
                    {isActive && (
                      <>
                        <div className="absolute left-0 w-1 h-8 bg-yellow-400"></div>
                        <div className="absolute -right-1 w-1 h-8 bg-yellow-400"></div>
                      </>
                    )}
                    <Link 
                      href={item.href}
                      className={`p-3 ${isActive ? uiColors.activeBg : ''} transition-all duration-200 flex items-center justify-center group-hover:scale-110 border border-transparent group-hover:border-zinc-800`}
                      title={item.label}
                    >
                      <span className={`${isActive ? uiColors.activeIcon : uiColors.iconColor} transition-colors duration-200 group-hover:text-yellow-400`}>
                        {item.icon}
                      </span>
                    </Link>
                    
                    {/* Industrial Tooltip */}
                    <div className={`absolute left-full ml-2 px-3 py-1.5 ${uiColors.tooltipBg} ${uiColors.tooltipText} text-[10px] tracking-wider font-bold ${uiColors.tooltipBorder} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap`}>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-400 mr-1.5"></span>
                        {item.label}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        {/* Bottom section with theme toggle, settings, and user profile */}
        <div className="mb-8 space-y-6 border-t border-zinc-800 pt-6">
          <div className="flex justify-center relative group">
            <button 
              onClick={toggleTheme}
              className={`p-3 transition-all duration-200 group-hover:scale-110 border border-transparent group-hover:border-zinc-800`}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDarkMode ? 
                <Sun size={20} className={`${uiColors.iconColor} transition-transform duration-300 group-hover:text-yellow-400 group-hover:rotate-45`} /> : 
                <Moon size={20} className={`${uiColors.iconColor} transition-transform duration-300 group-hover:text-yellow-400 group-hover:rotate-12`} />
              }
            </button>
            
            {/* Industrial Tooltip */}
            <div className={`absolute left-full ml-2 px-3 py-1.5 ${uiColors.tooltipBg} ${uiColors.tooltipText} text-[10px] tracking-wider font-bold ${uiColors.tooltipBorder} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap`}>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 mr-1.5"></span>
                {isDarkMode ? "LIGHT MODE" : "DARK MODE"}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center relative group">
            <button 
              id="settings-button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`p-3 transition-all duration-200 group-hover:scale-110 border border-transparent group-hover:border-zinc-800`}
              aria-label="Settings"
              title="Settings"
            >
              <Settings size={20} className={`${uiColors.iconColor} transition-transform duration-300 group-hover:text-yellow-400 group-hover:rotate-90`} />
            </button>
            
            {/* Industrial Tooltip */}
            <div className={`absolute left-full ml-2 px-3 py-1.5 ${uiColors.tooltipBg} ${uiColors.tooltipText} text-[10px] tracking-wider font-bold ${uiColors.tooltipBorder} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap`}>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 mr-1.5"></span>
                SETTINGS
              </div>
            </div>
          </div>
          
          <div className="flex justify-center relative group">
            <Link 
              href="/profile"
              className={`p-3 transition-all duration-200 group-hover:scale-110 relative border border-transparent group-hover:border-zinc-800`}
              title="Profile"
            >
              {session?.user?.image ? (
                <img 
                  src={session.user.image} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-none border border-zinc-800"
                />
              ) : (
                <div className="w-8 h-8 border border-zinc-800 flex items-center justify-center">
                  <User size={16} className={`${uiColors.iconColor} group-hover:text-yellow-400`} />
                </div>
              )}
              <span className="absolute bottom-0 right-1 w-2 h-2 bg-yellow-400"></span>
            </Link>
            
            {/* Industrial Tooltip */}
            <div className={`absolute left-full ml-2 px-3 py-1.5 ${uiColors.tooltipBg} ${uiColors.tooltipText} text-[10px] tracking-wider font-bold ${uiColors.tooltipBorder} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap`}>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 mr-1.5"></span>
                PROFILE
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content - Add padding to account for fixed sidebar */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-[70px]">
        <div className="container mx-auto px-4 py-6">
          {/* Browse Hub Resources Button */}
          <div className="mb-6 border border-zinc-800 p-0">
            <Link 
              href="/hub/resource" 
              className="flex items-center justify-between px-4 py-3 hover:bg-zinc-900 transition-colors"
            >
              <div className="flex items-center">
                <BookOpen size={18} className="mr-2" />
                <span className="font-bold tracking-wide">BROWSE HUB RESOURCES</span>
              </div>
              <ChevronRight size={18} />
            </Link>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search dashboard..."
                className={`w-full border ${uiColors.border} ${uiColors.inputBg} px-3 py-2 pl-10 focus:outline-none focus:border-yellow-400 transition-colors`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex space-x-2">
              <button className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${activeFilter === 'all' ? `bg-yellow-400 text-black` : `border ${uiColors.border} ${uiColors.text}`}`}>
                ALL
              </button>
              <button className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${activeFilter === 'design' ? `bg-yellow-400 text-black` : `border ${uiColors.border} ${uiColors.text}`}`}>
                DESIGN
              </button>
              <button className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${activeFilter === 'code' ? `bg-yellow-400 text-black` : `border ${uiColors.border} ${uiColors.text}`}`}>
                CODE
              </button>
              <button className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${activeFilter === 'media' ? `bg-yellow-400 text-black` : `border ${uiColors.border} ${uiColors.text}`}`}>
                MEDIA
              </button>
              <button className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${activeFilter === 'concepts' ? `bg-yellow-400 text-black` : `border ${uiColors.border} ${uiColors.text}`}`}>
                CONCEPTS
              </button>
            </div>
            
            <div className="flex border border-zinc-800">
              <button 
                className={`p-2 transition-colors ${viewMode === 'grid' ? `bg-yellow-400 text-black` : `${uiColors.bg} ${uiColors.text}`}`}
                onClick={() => setViewMode('grid')}
                aria-label="Grid View"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button 
                className={`p-2 transition-colors ${viewMode === 'list' ? `bg-yellow-400 text-black` : `${uiColors.bg} ${uiColors.text}`}`}
                onClick={() => setViewMode('list')}
                aria-label="List View"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* File System View (List View) */}
          {viewMode === 'list' && (
            <div className="w-full">
              {/* Table Header */}
              <div className={`grid grid-cols-12 ${uiColors.tableHeaderBg} text-xs font-bold uppercase tracking-wider`}>
                <div className="col-span-5 px-4 py-3">NAME</div>
                <div className="col-span-2 px-4 py-3">DATE ADDED</div>
                <div className="col-span-1 px-4 py-3">SIZE</div>
                <div className="col-span-2 px-4 py-3">KIND</div>
                <div className="col-span-2 px-4 py-3">AUTHOR</div>
              </div>
              
              {/* Folder Row */}
              <div className={`grid grid-cols-12 ${uiColors.tableRowBorder} ${uiColors.tableRowHover} cursor-pointer`}>
                <div className="col-span-5 px-4 py-3 flex items-center">
                  <ChevronRight size={16} className="mr-2" />
                  <Folder size={16} className="mr-2 text-gray-400" />
                  <span className="font-medium">DOCUMENTS</span>
                </div>
                <div className="col-span-2 px-4 py-3 text-gray-400">-</div>
                <div className="col-span-1 px-4 py-3 text-gray-400">-</div>
                <div className="col-span-2 px-4 py-3 text-gray-400">Folder</div>
                <div className="col-span-2 px-4 py-3 text-gray-400">-</div>
              </div>
              
              {/* File Rows */}
              <div className={`grid grid-cols-12 ${uiColors.tableRowBorder} ${uiColors.tableRowHover} cursor-pointer`}>
                <div className="col-span-5 px-4 py-3 flex items-center">
                  <div className="w-4 mr-2"></div>
                  <FileText size={16} className="mr-2 text-gray-400" />
                  <span>Hello World</span>
                </div>
                <div className="col-span-2 px-4 py-3 text-gray-400">2024-05-15</div>
                <div className="col-span-1 px-4 py-3 text-gray-400">1.5 KB</div>
                <div className="col-span-2 px-4 py-3 text-gray-400">document</div>
                <div className="col-span-2 px-4 py-3 text-gray-400">KITESTUDIOS Team</div>
              </div>
              
              <div className={`grid grid-cols-12 ${uiColors.tableRowBorder} ${uiColors.tableRowHover} cursor-pointer`}>
                <div className="col-span-5 px-4 py-3 flex items-center">
                  <div className="w-4 mr-2"></div>
                  <FileText size={16} className="mr-2 text-gray-400" />
                  <span>KITESTUDIOS Design System Overview</span>
                </div>
                <div className="col-span-2 px-4 py-3 text-gray-400">2024-04-15</div>
                <div className="col-span-1 px-4 py-3 text-gray-400">4.2 MB</div>
                <div className="col-span-2 px-4 py-3 text-gray-400">document</div>
                <div className="col-span-2 px-4 py-3 text-gray-400">Thomas Kite</div>
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Welcome message */}
              {showWelcome && (
                <div className={`mb-8 p-6 ${uiColors.highlight} ${uiColors.text} border ${uiColors.border} col-span-full`}>
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

              {/* Document Cards */}
              <div className={`border ${uiColors.border} p-6 flex flex-col h-full cursor-pointer`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <FileText size={16} className="text-gray-400 mr-2" />
                    <span className="text-xs font-bold uppercase">document</span>
                  </div>
                  <div className="text-xs opacity-70">2024-05-15</div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">Hello World</h3>
                <p className="text-sm mb-4 flex-grow opacity-80">A simple Hello World document created in the Hub Dashboard.</p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 border ${uiColors.border}`}>documentation</span>
                    <span className={`text-xs px-2 py-1 border ${uiColors.border}`}>example</span>
                  </div>
                  
                  <div className={`flex items-center mt-3 pt-3 border-t ${uiColors.border}`}>
                    <User size={14} className="mr-2" />
                    <span className="text-xs font-medium">KITESTUDIOS Team</span>
                  </div>
                </div>
              </div>

              <div className={`border ${uiColors.border} p-6 flex flex-col h-full cursor-pointer`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <FileText size={16} className="text-gray-400 mr-2" />
                    <span className="text-xs font-bold uppercase">document</span>
                  </div>
                  <div className="text-xs opacity-70">2024-04-15</div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">KITESTUDIOS Design System Overview</h3>
                <p className="text-sm mb-4 flex-grow opacity-80">Comprehensive documentation of our design system including typography, colors, and components.</p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 border ${uiColors.border}`}>design</span>
                    <span className={`text-xs px-2 py-1 border ${uiColors.border}`}>documentation</span>
                  </div>
                  
                  <div className={`flex items-center mt-3 pt-3 border-t ${uiColors.border}`}>
                    <User size={14} className="mr-2" />
                    <span className="text-xs font-medium">Thomas Kite</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 