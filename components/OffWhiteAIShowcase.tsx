"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, CircleAlert, ShieldCheck, Sparkles } from "lucide-react";

interface ShowcaseProps {
  title: string;
  description: string;
}

export default function OffWhiteAIShowcase({
  title = "AI-ENHANCED DESIGN",
  description = "Exploring the intersection of artificial intelligence and industrial design aesthetics.",
}: ShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [linesVisible, setLinesVisible] = useState(false);

  const features = [
    {
      title: "NEURAL DESIGN",
      description:
        "AI-driven patterns inspired by neural networks and cognitive architecture.",
      icon: (
        <BrainCircuit size={24} className="text-[#ffff00]" data-oid="q8mcy4-" />
      ),
    },
    {
      title: "PREDICTIVE AESTHETICS",
      description:
        "Algorithms that anticipate future design trends and adapt in real-time.",
      icon: (
        <Sparkles size={24} className="text-[#ffff00]" data-oid="m2usepb" />
      ),
    },
    {
      title: "SYNTHETIC AUTHENTICITY",
      description:
        "Machine learning systems trained on Virgil Abloh's design principles.",
      icon: (
        <ShieldCheck size={24} className="text-[#ffff00]" data-oid="32tvzzf" />
      ),
    },
    {
      title: "GENERATIVE PATTERNS",
      description:
        "Evolving visual elements that respond to user behavior and preferences.",
      icon: (
        <CircleAlert size={24} className="text-[#ffff00]" data-oid="q1.-20e" />
      ),
    },
  ];

  // Auto-rotate features
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length, isHovering]);

  // Delayed animation for connector lines
  useEffect(() => {
    const timer = setTimeout(() => {
      setLinesVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="w-full py-20 relative off-white-grid scan-line future-grid"
      data-oid="lhoxk8s"
    >
      <div className="container mx-auto" data-oid="ekisr5p">
        {/* Header with AI styling */}
        <div className="mb-16 relative" data-oid=":ko4jxz">
          <div
            className="flex flex-col md:flex-row md:items-end justify-between"
            data-oid="vj-9-qn"
          >
            <div data-oid="vpqkbep">
              <div className="ai-badge mb-4" data-oid="9vhbr0m">
                <span className="ai-badge-text" data-oid="9fsm_:d">
                  AI-POWERED
                </span>
              </div>
              <h2
                className="industrial-text text-3xl md:text-5xl leading-tight relative"
                data-text={title}
                data-oid="4frwqx0"
              >
                <span
                  className="glitch-text"
                  data-text={title}
                  data-oid="az9rzd1"
                >
                  {title}
                </span>
              </h2>
            </div>

            <div
              className="terminal-text uppercase mt-4 md:mt-0 text-sm md:text-right max-w-xs"
              data-oid="59gkra4"
            >
              {description}
            </div>
          </div>

          <motion.div
            className="w-full h-0.5 bg-black dark:bg-white mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            data-oid="zfvisj3"
          />
        </div>

        {/* Main showcase display */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          data-oid="7na6mj5"
        >
          {/* Left: Feature list */}
          <div data-oid="jqgn_ob">
            <div className="space-y-8" data-oid="c03m5dm">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`border-2 p-4 relative cursor-pointer transition-all duration-300 ${
                    activeFeature === index
                      ? "border-[#ffff00] bg-white dark:bg-black"
                      : "border-black dark:border-white bg-transparent"
                  }`}
                  whileHover={{ x: 10 }}
                  onMouseEnter={() => {
                    setActiveFeature(index);
                    setIsHovering(true);
                  }}
                  onMouseLeave={() => setIsHovering(false)}
                  data-oid="wd:ps97"
                >
                  <div
                    className="absolute -top-3 -left-3 p-1 bg-white dark:bg-black"
                    data-oid="dmkxzsk"
                  >
                    {feature.icon}
                  </div>

                  <h3
                    className="industrial-text text-xl mb-2 mt-2 off-white-quote"
                    data-oid="9y64pgb"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm terminal-text" data-oid="9y8db1x">
                    {feature.description}
                  </p>

                  {activeFeature === index && (
                    <div
                      className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#ffff00] flex items-center justify-center text-black"
                      data-oid="tb_mypw"
                    >
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Visual showcase */}
          <div className="relative" data-oid="g223cav">
            {/* Main display container */}
            <motion.div
              className="border-2 border-black dark:border-white aspect-square relative overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              data-oid="6wwy1y7"
            >
              {/* Feature display with animated background */}
              <AnimatePresence mode="wait" data-oid="9_:qid1">
                <motion.div
                  key={activeFeature}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  data-oid="r9upcig"
                >
                  {/* Feature icon (enlarged) */}
                  <motion.div
                    className="mb-6 relative"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    data-oid="w7p4apw"
                  >
                    {features[activeFeature].icon}
                    <div
                      className="absolute -inset-8 bg-[#ffff00]/5 rounded-full animate-pulse"
                      data-oid="yfm96xq"
                    />
                  </motion.div>

                  {/* Feature title */}
                  <h3
                    className="industrial-text text-2xl mb-4 text-center off-white-quote"
                    data-oid="jq0-50h"
                  >
                    {features[activeFeature].title}
                  </h3>

                  {/* Feature description */}
                  <p
                    className="text-center terminal-text max-w-md ai-blink"
                    data-oid="r6uu4gu"
                  >
                    {features[activeFeature].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Scan line effect */}
              <div
                className="absolute inset-0 scan-line pointer-events-none"
                data-oid="olxa.us"
              ></div>

              {/* Corner decorations */}
              <div
                className="absolute top-0 left-0 w-12 h-12 border-r-2 border-b-2 border-black dark:border-white"
                data-oid="1h6y3t8"
              ></div>
              <div
                className="absolute top-0 right-0 w-12 h-12 border-l-2 border-b-2 border-black dark:border-white"
                data-oid="phhb_l2"
              ></div>
              <div
                className="absolute bottom-0 left-0 w-12 h-12 border-r-2 border-t-2 border-black dark:border-white"
                data-oid="uq2odgl"
              ></div>
              <div
                className="absolute bottom-0 right-0 w-12 h-12 border-l-2 border-t-2 border-black dark:border-white"
                data-oid="xi2--b4"
              ></div>

              {/* Technical labels */}
              <div
                className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs uppercase bg-white dark:bg-black px-2"
                data-oid="71w:5c0"
              >
                "PROTOTYPE"
              </div>
              <div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs uppercase bg-white dark:bg-black px-2"
                data-oid="a_eqyyh"
              >
                "RENDER v2.4"
              </div>
              <div
                className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-90 origin-left text-xs uppercase bg-white dark:bg-black px-2"
                data-oid="j--b8t0"
              >
                "EXPERIMENTAL"
              </div>
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 -rotate-90 origin-right text-xs uppercase bg-white dark:bg-black px-2"
                data-oid="yr97b5t"
              >
                "AI-GENERATED"
              </div>
            </motion.div>

            {/* Connector lines between features and display */}
            <div
              className="absolute left-0 inset-y-0 w-12 pointer-events-none hidden lg:block"
              data-oid=":72qbso"
            >
              {features.map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute h-0.5 bg-[#ffff00]"
                  style={{
                    top: `calc(${index * 25 + 12.5}% - 1px)`,
                    right: "0",
                    transformOrigin: "right",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: linesVisible
                      ? activeFeature === index
                        ? 1
                        : 0.3
                      : 0,
                    opacity: linesVisible
                      ? activeFeature === index
                        ? 1
                        : 0.3
                      : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  data-oid="xbq3k63"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom labels and info */}
      <div className="container mx-auto mt-16" data-oid="5gcqvmp">
        <motion.div
          className="w-full h-0.5 bg-black dark:bg-white mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          data-oid=":qr8rzh"
        />

        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center"
          data-oid="d1wiv7d"
        >
          <div className="flex items-center mb-4 md:mb-0" data-oid="3-zhx.n">
            <div className="ai-badge" data-oid="lwrouiv">
              <span className="ai-badge-text text-xs" data-oid="f_pv_qn">
                VERSION 2.4.1
              </span>
            </div>
            <span className="mx-4" data-oid="l4rv740">
              |
            </span>
            <div className="text-xs uppercase ai-blink" data-oid="ykk9k0i">
              RUNTIME ACTIVE
            </div>
          </div>

          <div className="ai-gradient-text industrial-text" data-oid="bdd9n9u">
            "OFF-WHITE × ARTIFICIAL INTELLIGENCE"
          </div>
        </div>
      </div>
    </section>
  );
}
