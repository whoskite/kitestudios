"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Lock, LogIn, MessageSquare } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatAssistant() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm Garu, your KITESTUDIOS assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Garu's profile image URL - using the image from the user's query
  const garuProfileImage = "/Garu Profile Image.png"; // Updated to match the filename from the user's query

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim() || !session) return;

    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare conversation history for the API
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Call the chat API with conversation history
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          conversationHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage = {
        role: "assistant" as const,
        content: data.response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Add error message
      const errorMessage = {
        role: "assistant" as const,
        content:
          "I'm sorry, I couldn't process your request. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle login
  const handleLogin = () => {
    signIn("google", { callbackUrl: window.location.href });
  };

  // Render bot avatar - now with Garu's profile image
  const BotAvatar = () => (
    <div
      className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0"
      data-oid="t6z2-j_"
    >
      <img
        src={garuProfileImage}
        alt="Garu"
        className="h-full w-full object-cover"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.src =
            "https://via.placeholder.com/200x200.png?text=GARU";
        }}
        data-oid="z7-iayk"
      />
    </div>
  );

  // Render user avatar
  const UserAvatar = () => {
    if (!session?.user?.image) {
      return (
        <div
          className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 ml-2 flex-shrink-0"
          data-oid="5qsd.dw"
        />
      );
    }

    return (
      <div
        className="h-8 w-8 rounded-full overflow-hidden ml-2 flex-shrink-0 bg-white"
        data-oid="e3m:6cs"
      >
        <div className="h-full w-full relative" data-oid="gc5p_p:">
          <img
            src={session.user.image}
            alt={session.user.name || "User"}
            className="h-full w-full object-cover absolute inset-0"
            data-oid="ox9_fb5"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Chat button - hidden when chat is open */}
      <AnimatePresence data-oid="uyq9eck">
        {!isOpen && (
          <motion.button
            className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg overflow-hidden ${
              session ? "" : "cursor-not-allowed"
            }`}
            onClick={() => session && setIsOpen(true)}
            whileHover={session ? { scale: 1.1 } : {}}
            whileTap={session ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            data-oid="-_7d2e1"
          >
            {/* Always show Garu's profile image */}
            <img
              src={garuProfileImage}
              alt="Garu"
              className={`h-full w-full object-cover ${!session ? "opacity-70" : ""}`}
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src =
                  "https://via.placeholder.com/200x200.png?text=GARU";
              }}
              data-oid="j11i5gx"
            />

            {/* Lock overlay for non-authenticated users */}
            {!session && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                data-oid="cgsbc-0"
              >
                <Lock className="h-8 w-8 text-white" data-oid="s.46rvn" />
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Login tooltip for non-authenticated users */}
      {!session && !isOpen && (
        <motion.div
          className="fixed bottom-24 right-6 z-50 bg-black text-white p-4 rounded-lg shadow-lg max-w-xs"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          data-oid="io1h__x"
        >
          <div className="flex items-start justify-between" data-oid="9lwbjjz">
            <div data-oid="ldmpx.q">
              <p className="text-sm font-bold mb-1" data-oid=":k7bx4-">
                Garu AI Assistant
              </p>
              <p className="text-xs mb-2" data-oid="op068ze">
                Sign in to chat with our AI assistant
              </p>
              <button
                onClick={handleLogin}
                className="text-xs bg-[#ffff00] text-black px-4 py-1.5 rounded-sm font-bold flex items-center"
                data-oid="u-8tm08"
              >
                <LogIn className="h-3 w-3 mr-1" data-oid="dn5nihf" /> LOGIN
              </button>
            </div>
            <button
              onClick={() =>
                (document.cookie =
                  "hideChatTooltip=true; max-age=86400; path=/")
              }
              className="text-white opacity-70 hover:opacity-100"
              data-oid="30-gj-t"
            >
              <X className="h-4 w-4" data-oid="hw6sjqn" />
            </button>
          </div>
          <div
            className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-4 h-4 bg-black"
            data-oid="rrgnb3x"
          ></div>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence data-oid="-2ocb26">
        {isOpen && session && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-96 bg-white dark:bg-black border-2 border-black dark:border-white shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            data-oid="r.6b1bl"
          >
            {/* Chat header - with Garu's name */}
            <div
              className="border-b-2 border-black dark:border-white p-3 flex justify-between items-center"
              data-oid="yebmat3"
            >
              <h3 className="font-bold" data-oid="mj1uo5l">
                GARU AI ASSISTANT
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 p-1 rounded-full"
                data-oid="8mebta3"
              >
                <X className="h-5 w-5" data-oid="ajdav8t" />
              </button>
            </div>

            {/* Chat messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              data-oid="211:qpx"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  data-oid="2c6vsa."
                >
                  {message.role === "assistant" && (
                    <BotAvatar data-oid="f3--3hz" />
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                    data-oid="s-l5f:-"
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && <UserAvatar data-oid="11vx6jr" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start" data-oid="81id_3s">
                  <BotAvatar data-oid="bm2kfpg" />
                  <div
                    className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
                    data-oid="8e35qke"
                  >
                    <div className="flex space-x-2" data-oid="-imx1g1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                        data-oid="sqpmjsv"
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                        data-oid="ap-xwcz"
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                        data-oid="8j89yeh"
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} data-oid=":au3.vb" />
            </div>

            {/* Chat input */}
            <div
              className="border-t-2 border-black dark:border-white p-3"
              data-oid="c7-2x::"
            >
              <div className="flex items-center" data-oid="3yzv5z0">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent border-2 border-black dark:border-white p-2 focus:outline-none"
                  data-oid="gbjf7y4"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className={`ml-2 p-2 ${
                    input.trim()
                      ? "bg-black dark:bg-white text-white dark:text-black"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  }`}
                  data-oid="v597tkf"
                >
                  <Send className="h-5 w-5" data-oid="sjo_t_5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
