"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Calendar,
  Sparkles,
  Code,
  PenTool,
} from "lucide-react";

export default function Community() {
  const [activeTab, setActiveTab] = useState("members");

  const communityMembers = [
    {
      name: "ALEX RIVERA",
      role: "VISUAL DESIGNER",
      focus: "TYPOGRAPHY",
      image:
        "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "JORDAN CHEN",
      role: "FRONTEND DEVELOPER",
      focus: "INTERACTIVE MOTION",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "MAYA PATEL",
      role: "PRODUCT DESIGNER",
      focus: "SYSTEM DESIGN",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "LIAM JOHNSON",
      role: "3D ARTIST",
      focus: "SPATIAL DESIGN",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBtYW58ZW58MHx8MHx8fDA%3D",
    },
  ];

  const communityEvents = [
    {
      title: "DESIGN CRITIQUE SESSION",
      date: "JUNE 15, 2024",
      description:
        "Share your work and receive structured feedback from the community in a supportive environment.",
      icon: <PenTool size={20} className="text-[#ffff00]" data-oid="ppxrrd:" />,
    },
    {
      title: "CODE JAM: 12-HOUR BUILD",
      date: "JULY 8, 2024",
      description:
        "Collaborative coding session where we build something functional from concept to completion in 12 hours.",
      icon: <Code size={20} className="text-[#ffff00]" data-oid="7nwat9t" />,
    },
    {
      title: "IDEA EXCHANGE FORUM",
      date: "AUGUST 22, 2024",
      description:
        "Present your ideas, find collaborators, and explore new concepts with fellow creators.",
      icon: (
        <Sparkles size={20} className="text-[#ffff00]" data-oid="i612jjj" />
      ),
    },
  ];

  const collaborations = [
    {
      title: "TYPOGRAPHIC SYSTEM",
      members: ["ALEX RIVERA", "TOMY LIM"],
      description:
        "A modular typography system designed for digital interfaces with industrial aesthetics.",
    },
    {
      title: "MOTION LANGUAGE LIBRARY",
      members: ["JORDAN CHEN", "MAYA PATEL"],
      description:
        "A collection of reusable animation patterns that communicate digital interaction principles.",
    },
    {
      title: "SPATIAL WEB EXPERIENCE",
      members: ["LIAM JOHNSON", "TOMY LIM"],
      description:
        "Experimental web interface that explores 3D space as a navigational paradigm.",
    },
  ];

  return (
    <section
      className="py-20 bg-white dark:bg-black off-white-caution"
      data-oid="9uzg7vi"
    >
      <div className="container mx-auto px-4" data-oid="8wu30-q">
        {/* Header */}
        <div className="mb-16 relative" data-oid="7u7zupd">
          <motion.h2
            className="industrial-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6 off-white-quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            data-oid="noh3ghw"
          >
            COMMUNITY
          </motion.h2>

          <motion.div
            className="w-full h-0.5 bg-black dark:bg-white mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-oid="rbaw1g7"
          />

          <div
            className="absolute -top-6 -left-3 bg-[#ffff00] px-2 py-1 text-black text-xs font-bold"
            data-oid="yz-o.uz"
          >
            "COLLECTIVE CREATION"
          </div>

          <motion.p
            className="text-lg max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            data-oid="6w6c7uv"
          >
            KITESTUDIOS thrives as a community of builders, creators, and
            visionaries. Together, we push boundaries, share knowledge, and
            build the future we want to see.
          </motion.p>
        </div>

        {/* Tabs */}
        <div
          className="mb-12 border-2 border-black dark:border-white p-1 flex flex-wrap"
          data-oid="k6gqjc8"
        >
          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center px-4 py-2 text-sm uppercase font-bold mr-1 ${activeTab === "members" ? "bg-[#ffff00] text-black" : "bg-transparent"}`}
            data-oid="3c3d:0b"
          >
            <Users size={16} className="mr-2" data-oid="m.ja462" />
            Members
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center px-4 py-2 text-sm uppercase font-bold mr-1 ${activeTab === "events" ? "bg-[#ffff00] text-black" : "bg-transparent"}`}
            data-oid=":cf0b8y"
          >
            <Calendar size={16} className="mr-2" data-oid="aybrb-w" />
            Events
          </button>
          <button
            onClick={() => setActiveTab("collaborations")}
            className={`flex items-center px-4 py-2 text-sm uppercase font-bold ${activeTab === "collaborations" ? "bg-[#ffff00] text-black" : "bg-transparent"}`}
            data-oid="s.a17jf"
          >
            <MessageSquare size={16} className="mr-2" data-oid="qocwhhv" />
            Collaborations
          </button>
        </div>

        {/* Members Tab */}
        {activeTab === "members" && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            data-oid="knby4ev"
          >
            {communityMembers.map((member, index) => (
              <motion.div
                key={index}
                className="border-2 border-black dark:border-white relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                data-oid="dfm1b31"
              >
                <div
                  className="h-48 overflow-hidden relative"
                  data-oid="qspls-9"
                >
                  <div
                    className="absolute inset-0 off-white-stripes opacity-70"
                    data-oid=":zilp97"
                  />

                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    data-oid="b5i01:."
                  />

                  <div
                    className="absolute top-0 right-0 bg-white dark:bg-black px-2 py-1 text-xs uppercase border-l-2 border-b-2 border-black dark:border-white"
                    data-oid="c_nf86."
                  >
                    "MEMBER"
                  </div>
                </div>

                <div className="p-4" data-oid="ydik.qs">
                  <h3
                    className="industrial-text text-xl mb-1"
                    data-oid="nxohsvd"
                  >
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase mb-2" data-oid="55wfdr4">
                    {member.role}
                  </p>

                  <div className="flex items-center" data-oid="i0v2fsa">
                    <span
                      className="text-xs text-[#ffff00] bg-black dark:bg-white px-2 py-1"
                      data-oid="15jmxw8"
                    >
                      {member.focus}
                    </span>
                  </div>
                </div>

                <div
                  className="absolute -bottom-2 -right-2 bg-[#ffff00] px-2 py-1 text-black text-xs font-bold"
                  data-oid="prfk_ex"
                >
                  "CREATOR"
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div className="space-y-6" data-oid="mz-.i-s">
            {communityEvents.map((event, index) => (
              <motion.div
                key={index}
                className="border-2 border-black dark:border-white p-6 relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-oid="n0rdc2_"
              >
                <div
                  className="absolute -top-3 -left-3 bg-white dark:bg-black p-1"
                  data-oid="sn_4-x8"
                >
                  {event.icon}
                </div>

                <div
                  className="flex flex-col md:flex-row md:items-center md:justify-between"
                  data-oid="r3i:5i9"
                >
                  <div data-oid="d6.ml6n">
                    <h3
                      className="industrial-text text-xl mb-2 mt-2"
                      data-oid="jn84.2a"
                    >
                      {event.title}
                    </h3>
                    <p className="text-sm mb-4" data-oid=":krztq9">
                      {event.description}
                    </p>
                  </div>

                  <div className="md:ml-8" data-oid="zv3kgo6">
                    <div
                      className="bg-[#ffff00] px-3 py-2 text-black text-xs font-bold mb-2"
                      data-oid="7d30f9d"
                    >
                      {event.date}
                    </div>

                    <button
                      className="off-white-button text-xs w-full"
                      data-oid="bj1:ibz"
                    >
                      JOIN EVENT
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Collaborations Tab */}
        {activeTab === "collaborations" && (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-oid="7y5z2h3"
          >
            {collaborations.map((collab, index) => (
              <motion.div
                key={index}
                className="border-2 border-black dark:border-white p-6 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-oid="9p.tlj."
              >
                <div
                  className="absolute -top-3 -right-3 bg-[#ffff00] px-2 py-1 text-black text-xs font-bold"
                  data-oid="onq13zc"
                >
                  "COLLECTIVE WORK"
                </div>

                <h3
                  className="industrial-text text-xl mb-4 mt-2"
                  data-oid="1w.t12p"
                >
                  {collab.title}
                </h3>

                <div className="mb-4" data-oid="9b8b2hm">
                  <div className="text-xs uppercase mb-1" data-oid="mah8t4l">
                    CREATORS:
                  </div>
                  <div className="flex flex-wrap" data-oid=":jn-2t6">
                    {collab.members.map((member, midx) => (
                      <span
                        key={midx}
                        className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs mr-2 mb-2"
                        data-oid="202zvb4"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm" data-oid="vumly-9">
                  {collab.description}
                </p>

                <div
                  className="mt-4 flex justify-between items-center"
                  data-oid="ne4ol7n"
                >
                  <div className="off-white-label" data-oid="iasg0b:">
                    IN PROGRESS
                  </div>

                  <button
                    className="off-white-button text-xs"
                    data-oid="hb:8tsd"
                  >
                    VIEW DETAILS
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Join Section */}
        <motion.div
          className="mt-20 border-t-2 border-black dark:border-white pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          data-oid="behw3z8"
        >
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            data-oid="pyw7vk-"
          >
            <div data-oid="fhdeiom">
              <h3
                className="industrial-text text-2xl mb-4 off-white-quote"
                data-oid="0vpq99w"
              >
                BECOME A MEMBER
              </h3>
              <p className="mb-6" data-oid="rv8c3_y">
                KITESTUDIOS community is open to creators who share our passion
                for bringing ideas to life. As a member, you'll gain access to
                events, collaborations, resources, and a network of like-minded
                builders.
              </p>

              <ul className="space-y-2 mb-6" data-oid="e5c4382">
                <li className="flex items-center" data-oid="zpzof9k">
                  <div
                    className="w-2 h-2 bg-[#ffff00] mr-3"
                    data-oid="9rhy-jw"
                  ></div>
                  <span data-oid="m1ehlmy">
                    Access to exclusive community events
                  </span>
                </li>
                <li className="flex items-center" data-oid="kydggq9">
                  <div
                    className="w-2 h-2 bg-[#ffff00] mr-3"
                    data-oid="6oms3bk"
                  ></div>
                  <span data-oid="3wnmyiy">
                    Collaboration opportunities with fellow creators
                  </span>
                </li>
                <li className="flex items-center" data-oid="4o.1i34">
                  <div
                    className="w-2 h-2 bg-[#ffff00] mr-3"
                    data-oid="51by6p-"
                  ></div>
                  <span data-oid="zp622mp">
                    Resources and tools to accelerate your projects
                  </span>
                </li>
                <li className="flex items-center" data-oid="7bgcbuh">
                  <div
                    className="w-2 h-2 bg-[#ffff00] mr-3"
                    data-oid="5xa80wm"
                  ></div>
                  <span data-oid="6a-.yxi">
                    Feedback and support from the community
                  </span>
                </li>
              </ul>

              <div className="bg-[#ffff00] inline-block" data-oid=":e:hl38">
                <button
                  className="border-2 border-black px-6 py-3 text-black font-bold uppercase tracking-wider transform -translate-x-1 -translate-y-1 hover:translate-x-0 hover:translate-y-0 transition-transform"
                  data-oid="9rac6ue"
                >
                  Apply to Join
                </button>
              </div>
            </div>

            <div className="relative" data-oid="cu9xk26">
              <div
                className="border-2 border-black dark:border-white h-full"
                data-oid="-m0jsf4"
              >
                <div className="off-white-grid h-64" data-oid="ciaggpp"></div>
                <div
                  className="p-6 bg-black dark:bg-white text-white dark:text-black"
                  data-oid="g550age"
                >
                  <h4 className="text-xl mb-4" data-oid="ggmgtpa">
                    "COMMUNITY VOICES"
                  </h4>
                  <p className="text-sm italic" data-oid="yq6o51f">
                    "Joining KITESTUDIOS gave me the creative community I didn't
                    know I needed. Ideas flow freely, collaboration happens
                    naturally, and there's an energy that pushes everyone to
                    elevate their craft."
                  </p>
                  <p className="text-xs mt-4" data-oid="a6meldo">
                    — COMMUNITY MEMBER
                  </p>
                </div>
              </div>
              <div
                className="absolute -bottom-4 -right-4 border-2 border-black dark:border-white bg-white dark:bg-black w-16 h-16 flex items-center justify-center"
                data-oid="z9lv56l"
              >
                <Users
                  size={24}
                  className="text-[#ffff00]"
                  data-oid="io2usv1"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
