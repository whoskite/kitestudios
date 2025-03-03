import React from 'react';
import Image from 'next/image';
import { ArrowRight, Quote } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full py-16 md:py-24 off-white-grid">
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-start mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 industrial-text">
            "ABOUT"
          </h2>
          <p className="text-lg md:text-xl max-w-3xl">
            KITESTUDIOS is a creative platform founded in 2024, focused on exploring the intersection of design, technology, and community.
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative">
            <div className="aspect-square w-full max-w-md relative border-2 border-black dark:border-white">
              <div className="absolute inset-0 off-white-grid"></div>
              <div className="absolute top-0 left-0 right-0 h-2 off-white-caution"></div>
              <div className="p-4 relative z-10">
                <Image 
                  src="/founder.jpg" 
                  alt="KITESTUDIOS Founder" 
                  width={500} 
                  height={500}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/500x500/000000/FFFFFF?text=FOUNDER";
                  }}
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-white dark:bg-black px-2 py-1 border-2 border-black dark:border-white text-sm font-bold">
                "FOUNDER"
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="off-white-quote mb-6 text-xl md:text-2xl font-medium italic">
              I created KITESTUDIOS as a platform to explore creative ideas without boundaries, to build in public, and to foster a community of like-minded creators.
            </div>
            
            <p className="mb-6">
              With a background in design and technology, I've always been fascinated by the intersection of aesthetics and functionality. KITESTUDIOS represents my vision for a creative space that embraces experimentation, transparency, and collaboration.
            </p>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 border-2 border-black dark:border-white flex items-center justify-center">
                <ArrowRight size={16} />
              </div>
              <span className="text-sm font-bold uppercase">Connect on social media</span>
            </div>
          </div>
        </div>

        {/* Vision & Values */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 industrial-text">
            "VISION & VALUES"
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-black dark:border-white p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-full off-white-caution"></div>
              <h4 className="text-xl font-bold mb-3">EXPERIMENTATION</h4>
              <p>Embracing the unknown and pushing creative boundaries through constant exploration and iteration.</p>
            </div>
            
            <div className="border-2 border-black dark:border-white p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-full off-white-caution"></div>
              <h4 className="text-xl font-bold mb-3">TRANSPARENCY</h4>
              <p>Building in public, sharing processes, and maintaining open dialogue with our community.</p>
            </div>
            
            <div className="border-2 border-black dark:border-white p-6 relative">
              <div className="absolute top-0 left-0 w-2 h-full off-white-caution"></div>
              <h4 className="text-xl font-bold mb-3">COLLABORATION</h4>
              <p>Creating together is more powerful than creating alone. We value diverse perspectives and collective creativity.</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 industrial-text">
            "TIMELINE"
          </h3>
          
          <div className="relative border-l-2 border-black dark:border-white pl-8 ml-4">
            <div className="mb-12 relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center">
                <span className="text-sm font-bold">1</span>
              </div>
              <h4 className="text-xl font-bold mb-2">2024 — INCEPTION</h4>
              <p>KITESTUDIOS was founded with a vision to create a platform for experimental design and technology projects.</p>
            </div>
            
            <div className="mb-12 relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center">
                <span className="text-sm font-bold">2</span>
              </div>
              <h4 className="text-xl font-bold mb-2">2024 — COMMUNITY LAUNCH</h4>
              <p>Established the KITESTUDIOS community platform, inviting creators to collaborate and share their work.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center">
                <span className="text-sm font-bold">3</span>
              </div>
              <h4 className="text-xl font-bold mb-2">2024 — BUILD IN PUBLIC</h4>
              <p>Introduced the "Build in Public" initiative, showcasing the creative process behind our projects and encouraging transparency in creation.</p>
            </div>
          </div>
        </div>

        {/* Future */}
        <div className="border-2 border-black dark:border-white p-8 relative">
          <div className="absolute top-0 left-0 right-0 h-2 off-white-caution"></div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 industrial-text">
            "FUTURE"
          </h3>
          <p className="text-lg mb-6">
            KITESTUDIOS is constantly evolving. Our roadmap includes expanding our community initiatives, launching collaborative projects, and exploring new creative territories.
          </p>
          <div className="off-white-button inline-block">
            JOIN THE JOURNEY
          </div>
        </div>
      </div>
    </div>
  );
} 