"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X } from "lucide-react";

interface AIChatButtonProps {
  agentName: string;
  agentImageSrc: string;
}

export default function AIChatButton({
  agentName,
  agentImageSrc,
}: AIChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      data-oid="gjq1.kt"
    >
      {/* Chat Button - Only visible when chat is closed */}
      <AnimatePresence data-oid="lqj3blj">
        {!isChatOpen && (
          <motion.button
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#ffff00] shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            data-oid="o6o8txn"
          >
            <div
              className="relative w-full h-full overflow-hidden rounded-full border-2 border-black"
              data-oid=":4.f783"
            >
              <img
                src={agentImageSrc}
                alt={`${agentName} AI Assistant`}
                className="w-full h-full object-cover"
                data-oid="qqjx0-e"
              />

              <div
                className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-black"
                data-oid="2uqxz5a"
              ></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Industrial Off-White Chat Interface */}
      <AnimatePresence data-oid="ia274nv">
        {isChatOpen && (
          <motion.div
            className="absolute bottom-0 right-0 w-[340px] max-w-[95vw]"
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            transition={{ type: "spring", damping: 25 }}
            data-oid="0m.38:."
          >
            {/* Header with industrial design */}
            <div
              className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-none flex items-center p-3 relative"
              data-oid="6t3sgq8"
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-black dark:border-white mr-2 flex-shrink-0"
                data-oid="dol2gdo"
              >
                <img
                  src={agentImageSrc}
                  alt={agentName}
                  className="w-full h-full object-cover"
                  data-oid="24f-:ld"
                />
              </div>
              <div className="flex-1" data-oid="qhr1ggg">
                <p
                  className="font-bold text-sm uppercase tracking-wider"
                  data-oid="hcjtroz"
                >
                  {agentName}
                </p>
                <p className="text-xs uppercase" data-oid="1m.z8y5">
                  AI Assistant
                </p>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="w-6 h-6 flex items-center justify-center hover:text-[#ffff00] transition-colors"
                data-oid="vyt22.1"
              >
                <X size={16} data-oid="9-85jpd" />
              </button>
              <div
                className="absolute -top-2 -left-2 bg-[#ffff00] px-1 text-black text-xs font-bold"
                data-oid="-.e_7kp"
              >
                "CHAT"
              </div>
            </div>

            {/* Message area with industrial styling */}
            <div
              className="bg-white dark:bg-black border-l-2 border-r-2 border-black dark:border-white p-4 h-[200px] overflow-y-auto off-white-stripes"
              data-oid="t3:yiuy"
            >
              <div className="flex items-start mb-4" data-oid="1vs9kh.">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-black dark:border-white mr-2 flex-shrink-0"
                  data-oid="3bkr2on"
                >
                  <img
                    src={agentImageSrc}
                    alt={agentName}
                    className="w-full h-full object-cover"
                    data-oid="ad4r314"
                  />
                </div>
                <div
                  className="border-2 border-black dark:border-white py-2 px-3 max-w-[calc(100%-40px)]"
                  data-oid="u0mp0me"
                >
                  <p className="text-sm" data-oid="n7leuyh">
                    Hello! I'm {agentName}, your AI assistant. How can I help
                    you today?
                  </p>
                </div>
              </div>
            </div>

            {/* Input area with industrial styling */}
            <div
              className="bg-white dark:bg-black border-2 border-black dark:border-white p-3"
              data-oid="yr52drc"
            >
              <div className="relative" data-oid="z4dhrcq">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full py-2 px-3 pr-10 border-2 border-black dark:border-white bg-transparent focus:outline-none focus:ring-1 focus:ring-[#ffff00] text-sm"
                  data-oid="72piwmr"
                />

                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 bg-[#ffff00] flex items-center justify-center border-2 border-black hover:bg-opacity-80 transition-colors"
                  data-oid="nzghzm_"
                >
                  <Send size={14} className="text-black" data-oid="w:jsmwv" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
