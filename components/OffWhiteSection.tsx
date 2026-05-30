"use client";

import { motion } from "framer-motion";
import OffWhiteCard from "./OffWhiteCard";

export default function OffWhiteSection() {
  const projects = [
    {
      title: "PROJECT 01",
      description:
        "Industrial design concept with minimalist approach and functional aesthetics.",
      category: "DESIGN",
      image:
        "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "PROJECT 02",
      description:
        "Architectural visualization with focus on negative space and structural elements.",
      category: "ARCHITECTURE",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop",
    },
    {
      title: "PROJECT 03",
      description:
        "Experimental typography exploration with industrial influences and bold statements.",
      category: "TYPOGRAPHY",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full py-16 relative" data-oid="pmx3k0v">
      {/* Section Header */}
      <div className="container mx-auto mb-12" data-oid="9z62:v6">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          data-oid="vakds88"
        >
          <motion.h2
            className="industrial-text text-3xl md:text-4xl mb-4 md:mb-0 off-white-quote"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-oid="zaqm-ep"
          >
            FEATURED PROJECTS
          </motion.h2>

          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-oid="kv0izyv"
          >
            <div
              className="off-white-x text-sm uppercase tracking-wider"
              data-oid="c7au.wa"
            >
              CURATED SELECTION
            </div>
          </motion.div>
        </div>

        <motion.div
          className="w-full h-0.5 bg-black dark:bg-white mt-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          data-oid="v0pov_u"
        />
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto" data-oid="5ljwe4e">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          data-oid="qd2f9ga"
        >
          {projects.map((project, index) => (
            <OffWhiteCard
              key={index}
              title={project.title}
              description={project.description}
              category={project.category}
              image={project.image}
              data-oid="5da0ja7"
            />
          ))}
        </div>
      </div>

      {/* Section Footer */}
      <div className="container mx-auto mt-12" data-oid="a8wofu8">
        <motion.div
          className="w-full h-0.5 bg-black dark:bg-white mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-oid="3_pw35_"
        />

        <div className="flex justify-between items-center" data-oid="5_93v3h">
          <div className="text-xs uppercase tracking-wider" data-oid="hl.1tg8">
            "SCROLL FOR MORE"
          </div>

          <button className="off-white-button text-sm" data-oid="uots43k">
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute -left-2 top-1/2 transform -translate-y-1/2 rotate-90"
        data-oid="-naafty"
      >
        <div
          className="text-xs uppercase tracking-wider whitespace-nowrap"
          data-oid="torag9."
        >
          "KITESTUDIOS PROJECTS 2024"
        </div>
      </div>
    </section>
  );
}
