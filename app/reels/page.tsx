import { Metadata } from "next";
import { Suspense } from "react";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import ReelsClient, { ReelType } from "@/components/ReelsClient";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { Sparkles, PhoneCall, ArrowRight, Video, Instagram } from "lucide-react";

export const metadata: Metadata = {
  title: "Vertical Videos & Reels | KITESTUDIOS",
  description: "Browse cinematic 9:16 vertical videos and reels produced by KITESTUDIOS. Engineered for high retention and conversion on Instagram, TikTok, and YouTube Shorts.",
};

export const revalidate = 30; // Revalidate every 30 seconds for quick updates

export default async function ReelsPage() {
  // Fetch reels from Sanity CMS
  const reels: ReelType[] = await client.fetch(`
    *[_type == "reel" && disabled != true] | order(order asc, _createdAt desc) {
      _id,
      title,
      category,
      description,
      "videoUrl": videoFile.asset->url,
      coverImage
    }
  `);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-sky-500/20 font-sans relative overflow-hidden antialiased">
      {/* Subtle Glowing Background Accents */}
      <div className="absolute top-[-10%] left-[10%] w-[50%] aspect-square rounded-full bg-sky-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] aspect-square rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      {/* Navigation */}
      <MinimalNav />

      {/* Main Content Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-6xl relative z-10 space-y-20">
        
        {/* HERO SECTION */}
        <section className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          {/* Highlight Badge */}
          <div className="flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-zinc-900/60 text-zinc-400 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold">
            <Sparkles className="h-3 w-3 text-sky-400 animate-pulse" />
            9:16 Cinematic Vertical Gallery
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.1] text-white">
            Short-Form Reels
          </h1>

          {/* Paragraph description */}
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
            A curated selection of vertical videos, social reels, and high-impact cinematography produced by KITESTUDIOS.
          </p>
        </section>

        {/* REELS CLIENT COMPONENT INTERACTIVE FILTER & GRID */}
        <section className="space-y-12">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 font-mono text-xs uppercase tracking-widest gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-sky-400 animate-spin" />
              Loading Reels...
            </div>
          }>
            <ReelsClient reels={reels} />
          </Suspense>
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="border-t border-zinc-900 pt-20 max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-gradient-to-br from-zinc-900/40 to-zinc-950/40 p-8 sm:p-12 text-center space-y-4">
            {/* Overlay glow */}
            <div className="absolute inset-0 bg-sky-500/5 blur-xl pointer-events-none" />
            
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
              See more of our work
            </h2>
            
            <p className="text-xs text-zinc-450 max-w-sm mx-auto font-light leading-relaxed">
              We update our latest creative productions and behind-the-scenes daily.
            </p>

            <div className="flex justify-center pt-2 relative z-10">
              <a
                href="https://instagram.com/kitestudios6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
              >
                <Instagram className="h-3.5 w-3.5 text-sky-400" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
