"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'

interface AIChatButtonProps {
  agentName: string;
  agentImageSrc: string;
}

export default function AIChatButton({ agentName, agentImageSrc }: AIChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Button - Only visible when chat is closed */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#ffff00] shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-black">
              <img 
                src={agentImageSrc} 
                alt={`${agentName} AI Assistant`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Industrial Off-White Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="absolute bottom-0 right-0 w-[340px] max-w-[95vw]"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header with industrial design */}
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none flex items-center p-3 relative">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-black dark:border-white mr-2 flex-shrink-0">
                <img 
                  src={agentImageSrc} 
                  alt={agentName} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm uppercase tracking-wider">{agentName}</p>
                <p className="text-xs uppercase">AI Assistant</p>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="w-6 h-6 flex items-center justify-center hover:text-[#ffff00] transition-colors"
              >
                <X size={16} />
              </button>
              <div className="absolute -top-2 -left-2 bg-[#ffff00] px-1 text-black text-xs font-bold">
                "CHAT"
              </div>
            </div>
            
            {/* Message area with industrial styling */}
            <div className="bg-white dark:bg-black border-l-2 border-r-2 border-black dark:border-white p-4 h-[200px] overflow-y-auto off-white-stripes">
              <div className="flex items-start mb-4">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-black dark:border-white mr-2 flex-shrink-0">
                  <img 
                    src={agentImageSrc} 
                    alt={agentName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="border-2 border-black dark:border-white py-2 px-3 max-w-[calc(100%-40px)]">
                  <p className="text-sm">Hello! I'm {agentName}, your AI assistant. How can I help you today?</p>
                </div>
              </div>
            </div>
            
            {/* Input area with industrial styling */}
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="w-full py-2 px-3 pr-10 border-2 border-black dark:border-white bg-transparent focus:outline-none focus:ring-1 focus:ring-[#ffff00] text-sm"
                />
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-[#ffff00] flex items-center justify-center border-2 border-black hover:bg-opacity-80 transition-colors"
                >
                  <Send size={14} className="text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 