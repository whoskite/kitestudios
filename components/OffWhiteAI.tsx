"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Terminal, Zap } from 'lucide-react'

interface Message {
  id: number
  content: string
  isUser: boolean
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "SYSTEM INITIALIZED. HOW MAY I ASSIST YOU TODAY?",
    isUser: false,
    timestamp: new Date()
  }
]

export default function OffWhiteAI() {
  const [isOpen, setIsOpen] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const closeChat = () => {
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate AI responses
  const aiResponses = [
    "PROCESSING REQUEST. PLEASE WAIT...",
    "ANALYZING DATA PATTERNS...",
    "DESIGN INSPIRATION FOUND IN KITESTUDIOS ARCHIVES.",
    "MINIMALIST APPROACH RECOMMENDED BASED ON BRAND GUIDELINES.",
    "CALCULATIONS COMPLETE. IMPLEMENTING INDUSTRIAL DESIGN PATTERNS.",
    "SYSTEM SUGGESTS ADDING QUOTATION MARKS FOR AUTHENTICITY.",
    "AI MODELS PREDICT THIS DESIGN WILL PERFORM 37% BETTER THAN BASELINE.",
    "ANALYZING DESIGN TRENDS FROM 2024-2027...",
    "DESIGN SYNTHESIS COMPLETE. RECOMMENDATION READY."
  ]

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    if (inputValue.trim() === "") return
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    
    // Simulate AI typing
    setIsTyping(true)
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 z-10"
              onClick={closeChat}
            />
            
            {/* Chat interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md h-[70vh] max-h-[500px] border-2 border-black dark:border-white bg-white dark:bg-black z-20 flex flex-col scan-line"
            >
              {/* Corner decorations */}
              <div className="absolute -top-3 -left-3 w-3 h-3 bg-[#ffff00]"></div>
              <div className="absolute -top-3 -right-3 w-3 h-3 bg-[#ffff00]"></div>
              <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-[#ffff00]"></div>
              <div className="absolute -bottom-3 -right-3 w-3 h-3 bg-[#ffff00]"></div>
              
              {/* Chat Header */}
              <div className="p-3 border-b-2 border-black dark:border-white flex justify-between items-center">
                <div className="flex items-center">
                  <Terminal size={16} className="mr-2" />
                  <div className="industrial-text text-sm">"KITESTUDIOS AI"</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="ai-badge">
                    <span className="ai-badge-text text-xs">ACTIVE</span>
                  </div>
                  <button 
                    onClick={closeChat}
                    className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm" 
                    aria-label="Close chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              
              {/* Messages Container */}
              <div className="flex-1 p-3 overflow-y-auto off-white-grid future-grid">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`mb-3 ${message.isUser ? 'ml-auto' : 'mr-auto'} max-w-[85%]`}
                  >
                    <div 
                      className={`p-2 border relative ${
                        message.isUser 
                          ? 'border-black dark:border-white bg-white dark:bg-black' 
                          : 'border-black dark:border-white bg-[#ffff00] text-black terminal-text'
                      }`}
                    >
                      <div className={message.isUser ? '' : 'ai-blink'}>
                        {message.content}
                      </div>
                      
                      {/* Corner marker for AI messages */}
                      {!message.isUser && (
                        <div className="absolute -top-2 -left-2 w-2 h-2 bg-[#ffff00]"></div>
                      )}
                      
                      {/* Corner marker for user messages */}
                      {message.isUser && (
                        <div className="absolute -bottom-2 -right-2 w-2 h-2 border border-black dark:border-white bg-white dark:bg-black"></div>
                      )}
                    </div>
                    <div className="text-xs opacity-50 mt-1 flex">
                      {message.isUser ? (
                        <span className="ml-auto">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      ) : (
                        <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="mb-3 mr-auto max-w-[85%]">
                    <div className="p-2 border border-black dark:border-white bg-[#ffff00] text-black terminal-text">
                      <div className="flex space-x-1">
                        <span className="animate-pulse">•</span>
                        <span className="animate-pulse delay-75">•</span>
                        <span className="animate-pulse delay-150">•</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="border-t-2 border-black dark:border-white p-3 flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="TYPE MESSAGE..."
                  className="flex-1 bg-transparent border-none outline-none placeholder:text-black/30 dark:placeholder:text-white/30 terminal-text"
                />
                <button 
                  type="submit" 
                  className="ml-2 text-black dark:text-white"
                  disabled={inputValue.trim() === ""}
                >
                  <Send size={16} className={inputValue.trim() !== "" ? "text-[#ffff00]" : ""} />
                </button>
              </form>
              
              {/* Info Bar */}
              <div className="p-2 border-t-2 border-black dark:border-white flex justify-between items-center text-xs">
                <div className="flex items-center">
                  <Zap size={12} className="mr-1 text-[#ffff00]" />
                  <span className="uppercase">"KITESTUDIOS × AI"</span>
                </div>
                <div className="text-right uppercase">"V2.4"</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
} 