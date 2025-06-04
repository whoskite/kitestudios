"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RandomQuote from "@/components/RandomQuote";
import OffWhiteNav from "@/components/OffWhiteNav";
import OffWhiteSection from "@/components/OffWhiteSection";
import OffWhiteAI from "@/components/OffWhiteAI";
import OffWhiteAIShowcase from "@/components/OffWhiteAIShowcase";
import Manifesto from "@/components/Manifesto";
import Community from "@/components/Community";
import BuildInPublic from "@/components/BuildInPublic";
import AIChatButton from "@/components/AIChatButton";

export default function Home() {
  const [isFutureMode, setIsFutureMode] = useState(false);

  // Initialize future mode from localStorage
  useEffect(() => {
    // Check for future mode setting
    const futureSetting = localStorage.getItem("futureMode");
    if (futureSetting !== null) {
      setIsFutureMode(futureSetting === "true");
    }
  }, []);

  // Store future mode preference
  useEffect(() => {
    localStorage.setItem("futureMode", isFutureMode.toString());
  }, [isFutureMode]);

  const toggleFutureMode = () => {
    setIsFutureMode(!isFutureMode);
  };

  return (
    <div className="page-wrapper" data-oid="tdr_71.">
      {/* Navigation */}
      <OffWhiteNav data-oid="k5y1e97" />

      <div
        className={`min-h-screen bg-white dark:bg-black off-white-caution ${isFutureMode ? "future-grid" : ""} transition-all duration-300`}
        data-oid="wgri2ks"
      >
        {/* Hero Section */}
        <main
          className={`flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black ${isFutureMode ? "future-grid scan-line" : "off-white-stripes"}`}
          data-oid="6fv.asi"
        >
          <div
            className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider"
            data-oid="pa_hiqx"
          >
            c/o 2024
          </div>

          <div
            className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-wider"
            data-oid="f:0nq7k"
          >
            "FOR DISPLAY ONLY"
          </div>

          <div
            className="absolute bottom-6 right-6 text-xs font-bold uppercase tracking-wider"
            data-oid="hrpuici"
          >
            "WEBSITE"
          </div>

          <div
            className="relative z-10 flex flex-col items-center"
            data-oid="1wowulk"
          >
            <div className="relative" data-oid="m.likk7">
              <h1
                className={`industrial-text text-5xl md:text-7xl font-bold tracking-tighter mb-2 relative ${isFutureMode ? "ai-gradient-text" : ""}`}
                data-text="KITESTUDIOS"
                data-oid="cewidzu"
              >
                KITESTUDIOS
              </h1>
            </div>

            <div
              className={`w-full max-w-md border-t-2 border-b-2 border-black dark:border-white py-2 my-4 ${isFutureMode ? "scan-line" : ""}`}
              data-oid="a8quj-p"
            >
              <RandomQuote data-oid="edw979n" />
            </div>

            <motion.div
              className={`mt-8 text-sm uppercase tracking-wider ${isFutureMode ? "ai-badge mb-4" : "off-white-arrow"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              data-oid="6a5wyjv"
            >
              {isFutureMode ? (
                <span className="ai-badge-text" data-oid="gkdfe.6">
                  ESTABLISHED 2024
                </span>
              ) : (
                "ESTABLISHED 2024"
              )}
            </motion.div>

            {isFutureMode && (
              <motion.div
                className="terminal-text text-xs mt-2 ai-blink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                data-oid="-5jlqfc"
              >
                SYSTEM POWERED BY ARTIFICIAL INTELLIGENCE
              </motion.div>
            )}

            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              data-oid="qrfy7hi"
            >
              <ArrowDown
                className={`h-6 w-6 ${isFutureMode ? "text-[#ffff00]" : ""}`}
                data-oid="9.r6ohe"
              />
            </motion.div>
          </div>
        </main>

        <div id="manifesto" data-oid="2zlnzux">
          <Manifesto data-oid="o7_iemr" />
        </div>

        {/* Community Section - Disabled */}
        {/* 
               <div id="community">
                <Community />
               </div>
               */}

        {/* Build In Public Section */}
        <div id="build" data-oid="-i74t0:">
          <BuildInPublic data-oid="ryxxmfq" />
        </div>

        {/* AI Showcase Section (only visible in future mode) */}
        {isFutureMode && (
          <OffWhiteAIShowcase
            title="AI-ENHANCED DESIGN"
            description="Exploring the intersection of artificial intelligence and industrial design aesthetics."
            data-oid="v30a618"
          />
        )}

        {/* Projects Section - Disabled */}
        {/* 
               <div className={isFutureMode ? 'future-grid' : 'off-white-grid'}>
                <OffWhiteSection />
               </div>
               */}

        {/* Footer */}
        <footer
          className={`py-12 border-t-2 border-black dark:border-white ${isFutureMode ? "future-grid" : ""}`}
          data-oid="gm363qx"
        >
          <div className="container mx-auto px-6 md:px-12" data-oid="tq7-86u">
            <div
              className="flex flex-col md:flex-row justify-between items-start md:items-center"
              data-oid="tyf1piz"
            >
              <div className="mb-6 md:mb-0 pl-4 md:pl-8" data-oid="q:h6b3r">
                <div
                  className={`industrial-text text-2xl mb-2 ${isFutureMode ? "ai-gradient-text" : ""}`}
                  data-oid="8nbenv3"
                >
                  {isFutureMode ? (
                    <span
                      className="glitch-text"
                      data-text="KITESTUDIOS"
                      data-oid="oek2ku3"
                    >
                      "KITESTUDIOS"
                    </span>
                  ) : (
                    '"KITESTUDIOS"'
                  )}
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  data-oid="7_z:qau"
                >
                  © 2024 ALL RIGHTS RESERVED
                </div>
              </div>

              <div className="flex flex-col space-y-4" data-oid="5yicz93">
                <a
                  href="https://instagram.com/kitestudios6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs uppercase tracking-wider ${isFutureMode ? "ai-badge" : "off-white-arrow"}`}
                  data-oid="hv6rs11"
                >
                  {isFutureMode ? (
                    <span className="ai-badge-text" data-oid="qzkz0cm">
                      INSTAGRAM
                    </span>
                  ) : (
                    "INSTAGRAM"
                  )}
                </a>
                <a
                  href="http://twitter.com/tomykite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs uppercase tracking-wider ${isFutureMode ? "ai-badge" : "off-white-arrow"}`}
                  data-oid="qxakg94"
                >
                  {isFutureMode ? (
                    <span className="ai-badge-text" data-oid="9eed2n:">
                      TWITTER
                    </span>
                  ) : (
                    "TWITTER"
                  )}
                </a>
                <a
                  href="https://warpcast.com/kitestudios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs uppercase tracking-wider ${isFutureMode ? "ai-badge" : "off-white-arrow"}`}
                  data-oid="35ru-23"
                >
                  {isFutureMode ? (
                    <span className="ai-badge-text" data-oid="lrn68x1">
                      WARPCAST
                    </span>
                  ) : (
                    "WARPCAST"
                  )}
                </a>
                <a
                  href="https://warpcast.com/~/channel/funquotes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs uppercase tracking-wider ${isFutureMode ? "ai-badge" : "off-white-arrow"}`}
                  data-oid="2n3lm3x"
                >
                  {isFutureMode ? (
                    <span className="ai-badge-text" data-oid="f:4dgw_">
                      FUNQUOTES
                    </span>
                  ) : (
                    "FUNQUOTES"
                  )}{" "}
                  <span className="text-[10px]" data-oid="wvfduie">
                    (COMMUNITY)
                  </span>
                </a>
                <a
                  href="#"
                  className={`text-xs uppercase tracking-wider opacity-50 cursor-not-allowed ${isFutureMode ? "ai-badge opacity-50" : "off-white-arrow opacity-50"}`}
                  data-oid="bjwgawx"
                >
                  {isFutureMode ? (
                    <span className="ai-badge-text" data-oid="w8hk53l">
                      DISCORD
                    </span>
                  ) : (
                    "DISCORD"
                  )}{" "}
                  <span className="text-[10px]" data-oid="1akcv.a">
                    (COMING SOON)
                  </span>
                </a>
              </div>
            </div>

            <div
              className="mt-12 pt-6 border-t border-black dark:border-white"
              data-oid="t9c14e3"
            >
              <div
                className="text-xs uppercase tracking-wider text-center px-4"
                data-oid="8qcyfss"
              >
                {isFutureMode
                  ? '"BUILT BY KITESTUDIOS"'
                  : '"BUILT BY KITESTUDIOS"'}
              </div>
            </div>
          </div>
        </footer>

        {/* AI Chat Assistant (only visible in future mode) */}
        {isFutureMode && <OffWhiteAI data-oid="-523mbj" />}
      </div>

      {/* AI Chat Button */}
      <AIChatButton
        agentName="Garu"
        agentImageSrc="/Garu Profile Image.png"
        data-oid="9.plze7"
      />
    </div>
  );
}
