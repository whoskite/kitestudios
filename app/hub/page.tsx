"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Home, LogOut, Menu, X, Sun, Moon, Settings, User, CreditCard, Bell, Shield, HelpCircle } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import LinkHub from "@/components/LinkHub"

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

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // Also update the global theme for consistency
    setTheme(!isDarkMode ? 'dark' : 'light')
  }

  // Define UI colors based on dark mode
  const uiColors = {
    bg: isDarkMode ? 'bg-black' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-black',
    border: isDarkMode ? 'border-white/20' : 'border-black/20',
    hoverBg: isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10',
    activeBg: isDarkMode ? 'bg-white/10' : 'bg-black/10',
  }

  return (
    <div className={`page-wrapper ${uiColors.bg} ${uiColors.text}`}>
      {/* App-like header */}
      <header className={`fixed top-0 left-0 right-0 z-40 ${uiColors.bg} ${uiColors.text} border-b ${uiColors.border}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Menu button */}
            <div className="flex items-center">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 ${uiColors.hoverBg} transition-colors`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              
              <h1 className="text-xl font-bold ml-4">HUB DASHBOARD</h1>
            </div>
            
            {/* Right side - User info and actions */}
            <div className="flex items-center space-x-3">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className={`p-2 ${uiColors.hoverBg} transition-colors`}
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              
              {/* Settings Button */}
              <button
                id="settings-button"
                onClick={() => setSettingsOpen(!settingsOpen)}
                className={`p-2 ${settingsOpen ? uiColors.activeBg : uiColors.hoverBg} transition-colors relative`}
                aria-label="Settings"
              >
                <Settings size={18} />
              </button>
              
              {session?.user && (
                <div className="flex items-center">
                  {session.user.image && (
                    <img 
                      src={session.user.image} 
                      alt={session.user.name || 'User'} 
                      className={`w-8 h-8 rounded-full border ${uiColors.border}`}
                    />
                  )}
                  <span className="ml-2 font-bold hidden md:inline">
                    {session.user.name?.split(' ')[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Settings Panel */}
      {settingsOpen && (
        <div 
          id="settings-panel"
          className={`fixed top-16 right-4 z-50 ${uiColors.bg} border ${uiColors.border} shadow-lg w-80 md:w-96`}
        >
          <div className={`flex border-b ${uiColors.border}`}>
            <button 
              className={`flex-1 py-3 font-bold text-sm ${activeSettingsTab === 'profile' ? `${uiColors.activeBg} border-b-2 border-[#ffff00]` : ''}`}
              onClick={() => setActiveSettingsTab('profile')}
            >
              PROFILE
            </button>
            <button 
              className={`flex-1 py-3 font-bold text-sm ${activeSettingsTab === 'billing' ? `${uiColors.activeBg} border-b-2 border-[#ffff00]` : ''}`}
              onClick={() => setActiveSettingsTab('billing')}
            >
              BILLING
            </button>
            <button 
              className={`flex-1 py-3 font-bold text-sm ${activeSettingsTab === 'settings' ? `${uiColors.activeBg} border-b-2 border-[#ffff00]` : ''}`}
              onClick={() => setActiveSettingsTab('settings')}
            >
              SETTINGS
            </button>
          </div>
          
          <div className="p-4">
            {activeSettingsTab === 'profile' && (
              <div>
                <h3 className="text-lg font-bold mb-4">User Profile</h3>
                
                {session?.user && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 mb-6">
                      {session.user.image ? (
                        <img 
                          src={session.user.image} 
                          alt={session.user.name || 'User'} 
                          className={`w-16 h-16 rounded-full border ${uiColors.border}`}
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-full border ${uiColors.border} flex items-center justify-center`}>
                          <User size={32} />
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold">{session.user.name}</h4>
                        <p className="text-sm opacity-70">{session.user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-bold mb-1">Display Name</label>
                        <input 
                          type="text" 
                          defaultValue={session.user.name || ''} 
                          className={`w-full border ${uiColors.border} bg-transparent p-2`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold mb-1">Email</label>
                        <input 
                          type="email" 
                          defaultValue={session.user.email || ''} 
                          className={`w-full border ${uiColors.border} bg-transparent p-2`}
                          disabled
                        />
                        <p className="text-xs mt-1 opacity-70">Email cannot be changed</p>
                      </div>
                      
                      <button className={`mt-4 border ${uiColors.border} px-4 py-2 font-bold text-sm ${uiColors.hoverBg}`}>
                        SAVE CHANGES
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeSettingsTab === 'billing' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Billing Information</h3>
                
                <div className="space-y-4">
                  <div className={`p-4 border ${uiColors.border} flex items-center justify-between`}>
                    <div>
                      <h4 className="font-bold">Free Plan</h4>
                      <p className="text-sm opacity-70">Basic access to Hub Dashboard</p>
                    </div>
                    <span className="text-[#ffff00] font-bold">ACTIVE</span>
                  </div>
                  
                  <div className={`p-4 border ${uiColors.border}`}>
                    <h4 className="font-bold mb-2">Upgrade to Pro</h4>
                    <p className="text-sm mb-3">Get unlimited access to all features and resources</p>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Unlimited resources
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Priority support
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span> Advanced analytics
                      </li>
                    </ul>
                    <button className={`bg-[#ffff00] text-black px-4 py-2 font-bold text-sm w-full`}>
                      UPGRADE NOW - $9.99/MONTH
                    </button>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">Payment Methods</h4>
                    <div className={`p-4 border ${uiColors.border} flex items-center`}>
                      <CreditCard className="mr-3" />
                      <span className="opacity-70">No payment methods added</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSettingsTab === 'settings' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Account Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold mb-2">Notifications</h4>
                    <div className={`p-3 border ${uiColors.border} flex items-center justify-between opacity-50`}>
                      <div className="flex items-center">
                        <Bell size={16} className="mr-2" />
                        <span>Email notifications</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs mr-2">Coming soon</span>
                        <label className="relative inline-flex items-center cursor-not-allowed">
                          <input type="checkbox" className="sr-only peer" disabled />
                          <div className={`w-9 h-5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all`}></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">Security</h4>
                    <div className={`p-3 border ${uiColors.border} flex items-center justify-between opacity-50`}>
                      <div className="flex items-center">
                        <Shield size={16} className="mr-2" />
                        <span>Two-factor authentication</span>
                      </div>
                      <span className="text-xs">Coming soon</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2">Help & Support</h4>
                    <Link 
                      href="/#contact"
                      className={`p-3 border ${uiColors.border} flex items-center ${uiColors.hoverBg} transition-colors block`}
                      onClick={() => setSettingsOpen(false)}
                    >
                      <HelpCircle size={16} className="mr-2" />
                      <span>Contact us</span>
                    </Link>
                  </div>
                  
                  <button 
                    onClick={() => window.location.href = '/api/auth/signout'}
                    className={`mt-4 border border-red-500 text-red-500 px-4 py-2 font-bold text-sm w-full hover:bg-red-500 hover:text-white transition-colors`}
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Side menu - slides in when menuOpen is true */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 ${uiColors.bg} ${uiColors.text} transform transition-transform duration-300 z-50 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`flex flex-col h-full border-r ${uiColors.border}`}>
          {/* Navigation Header */}
          <div className={`p-4 border-b ${uiColors.border}`}>
            <span className="font-bold">MENU</span>
          </div>
          
          {/* Navigation Items */}
          <div className="flex-1 p-4">
            <ul className="space-y-6">
              <li>
                <Link 
                  href="/"
                  className="font-bold text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  "HOME"
                </Link>
              </li>
              <li>
                <Link 
                  href="/#manifesto"
                  className="font-bold text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  "MANIFESTO"
                </Link>
              </li>
              <li>
                <Link 
                  href="/#build"
                  className="font-bold text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  "BUILD"
                </Link>
              </li>
              <li>
                <span 
                  className="font-bold text-lg text-[#ffff00]"
                >
                  "HUB"
                </span>
              </li>
            </ul>
          </div>
          
          {/* Footer */}
          <div className={`p-4 border-t ${uiColors.border}`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="font-bold text-sm mb-2 md:mb-0">"KITESTUDIOS"</div>
              <div className="flex flex-wrap gap-4 text-xs">
                <a href="https://instagram.com/kitestudios6" target="_blank" rel="noopener noreferrer" className={`uppercase hover:opacity-70`}>
                  INSTAGRAM
                </a>
                <a href="http://twitter.com/tomykite" target="_blank" rel="noopener noreferrer" className={`uppercase hover:opacity-70`}>
                  TWITTER
                </a>
                <a href="https://warpcast.com/kitestudios" target="_blank" rel="noopener noreferrer" className={`uppercase hover:opacity-70`}>
                  WARPCAST
                </a>
                <a href="https://warpcast.com/~/channel/funquotes" target="_blank" rel="noopener noreferrer" className={`uppercase hover:opacity-70`}>
                  FUNQUOTES <span className="text-[10px]">(COMMUNITY)</span>
                </a>
              </div>
              <div className="font-bold text-sm mt-2 md:mt-0">"EST. 2024"</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay to close menu when clicking outside */}
      {menuOpen && (
        <div 
          className={`fixed inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/20'} z-40`}
          onClick={() => setMenuOpen(false)}
        />
      )}
      
      {/* Welcome Message */}
      {showWelcome && session?.user && (
        <div className={`fixed top-20 right-6 z-50 ${uiColors.bg} border ${uiColors.border} ${uiColors.text} p-4 shadow-lg max-w-xs`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold mb-1">Welcome, {session.user.name?.split(' ')[0]}</p>
              <p className="text-sm">You now have access to the Hub Dashboard.</p>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className={`ml-2 ${uiColors.text} hover:opacity-70`}
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      {/* Main content area with top padding to account for fixed header */}
      <div className={`min-h-screen pt-16 ${uiColors.bg} ${uiColors.text}`}>
        {/* Link Hub Component - Pass the dark mode state */}
        <LinkHub isDarkMode={isDarkMode} />
      </div>
    </div>
  )
} 