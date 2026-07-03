import { Metadata } from "next";
import { Suspense } from "react";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import VideosClient, { VideoType } from "@/components/VideosClient";
import { client } from "@/lib/sanity";
import { Sparkles, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "Widescreen Videos & Cinematography | KITESTUDIOS",
  description: "Browse premium 16:9 widescreen videos, commercial brand films, and campaign cinematography by KITESTUDIOS.",
};

export const revalidate = 30; // Revalidate every 30 seconds for quick updates

export default async function VideosPage() {
  // Fetch portfolio videos from Sanity CMS
  const videos: VideoType[] = await client.fetch(`
    *[_type == "portfolioVideo" && disabled != true] | order(order asc, _createdAt desc) {
      _id,
      title,
      category,
      description,
      "videoUrl": videoFile.asset->url,
      externalVideoUrl,
      coverImage,
      "project": coalesce(project->name, "KITESTUDIOS")
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
            16:9 Cinematic Video Gallery
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.1] text-white">
            Cinematography
          </h1>

          {/* Paragraph description */}
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
            A curated selection of widescreen brand films, SaaS walkthroughs, event recap cinema, and creative commercials produced by KITESTUDIOS.
          </p>
        </section>

        {/* VIDEOS CLIENT COMPONENT INTERACTIVE FILTER & GRID */}
        <section className="space-y-12">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500 font-mono text-xs uppercase tracking-widest gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-sky-400 animate-spin" />
              Loading Videos...
            </div>
          }>
            <VideosClient videos={videos} />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
