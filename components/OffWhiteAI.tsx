"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Terminal, Zap } from "lucide-react";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    content: "SYSTEM INITIALIZED. HOW MAY I ASSIST YOU TODAY?",
    isUser: false,
    timestamp: new Date(),
  },
];

export default function OffWhiteAI() {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    "DESIGN SYNTHESIS COMPLETE. RECOMMENDATION READY.",
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI typing
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence data-oid="7pjes:o">
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
              data-oid="l1k:wty"
            />

            {/* Chat interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-md h-[70vh] max-h-[500px] border-2 border-black dark:border-white bg-white dark:bg-black z-20 flex flex-col scan-line"
              data-oid="douef2:"
            >
              {/* Corner decorations */}
              <div
                className="absolute -top-3 -left-3 w-3 h-3 bg-[#ffff00]"
                data-oid="d1yj7sv"
              ></div>
              <div
                className="absolute -top-3 -right-3 w-3 h-3 bg-[#ffff00]"
                data-oid="v2h8p-p"
              ></div>
              <div
                className="absolute -bottom-3 -left-3 w-3 h-3 bg-[#ffff00]"
                data-oid="h4cd9mz"
              ></div>
              <div
                className="absolute -bottom-3 -right-3 w-3 h-3 bg-[#ffff00]"
                data-oid="m6_iqec"
              ></div>

              {/* Chat Header */}
              <div
                className="p-3 border-b-2 border-black dark:border-white flex justify-between items-center"
                data-oid=".l.2b2t"
              >
                <div className="flex items-center" data-oid="5qysb4-">
                  <Terminal size={16} className="mr-2" data-oid="_07ib5:" />
                  <div className="industrial-text text-sm" data-oid="fejedne">
                    "KITESTUDIOS AI"
                  </div>
                </div>
                <div className="flex items-center space-x-3" data-oid="sxj4vqg">
                  <div className="ai-badge" data-oid="o03cnd3">
                    <span className="ai-badge-text text-xs" data-oid="5tkrhop">
                      ACTIVE
                    </span>
                  </div>
                  <button
                    onClick={closeChat}
                    className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-sm"
                    aria-label="Close chat"
                    data-oid="b:8xn23"
                  >
                    <X size={16} data-oid="lz3_3gt" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div
                className="flex-1 p-3 overflow-y-auto off-white-grid future-grid"
                data-oid="hkb6pj:"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-3 ${message.isUser ? "ml-auto" : "mr-auto"} max-w-[85%]`}
                    data-oid="ag2cmim"
                  >
                    <div
                      className={`p-2 border relative ${
                        message.isUser
                          ? "border-black dark:border-white bg-white dark:bg-black"
                          : "border-black dark:border-white bg-[#ffff00] text-black terminal-text"
                      }`}
                      data-oid="_0piub:"
                    >
                      <div
                        className={message.isUser ? "" : "ai-blink"}
                        data-oid="bmuy_j1"
                      >
                        {message.content}
                      </div>

                      {/* Corner marker for AI messages */}
                      {!message.isUser && (
                        <div
                          className="absolute -top-2 -left-2 w-2 h-2 bg-[#ffff00]"
                          data-oid="w24_l8c"
                        ></div>
                      )}

                      {/* Corner marker for user messages */}
                      {message.isUser && (
                        <div
                          className="absolute -bottom-2 -right-2 w-2 h-2 border border-black dark:border-white bg-white dark:bg-black"
                          data-oid="px_j-ut"
                        ></div>
                      )}
                    </div>
                    <div
                      className="text-xs opacity-50 mt-1 flex"
                      data-oid="m8.z62:"
                    >
                      {message.isUser ? (
                        <span className="ml-auto" data-oid="oo:lw..">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      ) : (
                        <span data-oid="3nf5ogm">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="mb-3 mr-auto max-w-[85%]" data-oid="3pnjrbi">
                    <div
                      className="p-2 border border-black dark:border-white bg-[#ffff00] text-black terminal-text"
                      data-oid=".cef.ay"
                    >
                      <div className="flex space-x-1" data-oid="ojzilvh">
                        <span className="animate-pulse" data-oid="6fe7isi">
                          •
                        </span>
                        <span
                          className="animate-pulse delay-75"
                          data-oid="bppp382"
                        >
                          •
                        </span>
                        <span
                          className="animate-pulse delay-150"
                          data-oid="t79cbo-"
                        >
                          •
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} data-oid="ib7kbdz" />
              </div>

              {/* Chat Input */}
              <form
                onSubmit={handleSubmit}
                className="border-t-2 border-black dark:border-white p-3 flex items-center"
                data-oid="0wpa2eh"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="TYPE MESSAGE..."
                  className="flex-1 bg-transparent border-none outline-none placeholder:text-black/30 dark:placeholder:text-white/30 terminal-text"
                  data-oid="ca23nzu"
                />

                <button
                  type="submit"
                  className="ml-2 text-black dark:text-white"
                  disabled={inputValue.trim() === ""}
                  data-oid="gf1xfxd"
                >
                  <Send
                    size={16}
                    className={inputValue.trim() !== "" ? "text-[#ffff00]" : ""}
                    data-oid="fz9d3a1"
                  />
                </button>
              </form>

              {/* Info Bar */}
              <div
                className="p-2 border-t-2 border-black dark:border-white flex justify-between items-center text-xs"
                data-oid="hy.ppr-"
              >
                <div className="flex items-center" data-oid="p-7-r_m">
                  <Zap
                    size={12}
                    className="mr-1 text-[#ffff00]"
                    data-oid="e5kqzgz"
                  />

                  <span className="uppercase" data-oid="fx1.79w">
                    "KITESTUDIOS × AI"
                  </span>
                </div>
                <div className="text-right uppercase" data-oid="tvwjzgn">
                  "V2.4"
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
