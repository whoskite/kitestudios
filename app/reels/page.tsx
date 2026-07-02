import { Metadata } from "next";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import ReelsClient, { ReelType } from "@/components/ReelsClient";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { Sparkles, PhoneCall, ArrowRight, Video } from "lucide-react";

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
          {/* Animated Highlight Badge */}
          <div className="flex items-center gap-2 px-3 py-1 border border-zinc-800 bg-zinc-900/60 text-zinc-400 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold">
            <Sparkles className="h-3 w-3 text-sky-400 animate-pulse" />
            9:16 CINEMATIC VERTICAL GALLERY
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.1] text-white">
            Short-Form Reels <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-indigo-400 italic">
              That Convert
            </span>
          </h1>

          {/* Paragraph description */}
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Stop losing prospect attention with generic stock video. We script, film, and produce cinema-grade 9:16 vertical videos for brands, executives, SaaS companies, and premium medical spas. Engineered to capture hook attention, build trust, and accelerate user actions.
          </p>

          {/* CTA Link Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2">
            <Link
              href="/book"
              className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-zinc-950 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg shadow-lg shadow-sky-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              Book a Short Consultation
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* REELS CLIENT COMPONENT INTERACTIVE FILTER & GRID */}
        <section className="space-y-12">
          <ReelsClient reels={reels} />
        </section>

        {/* BOTTOM CTA SECTION */}
        <section className="border-t border-zinc-900 pt-20 max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-900 bg-gradient-to-br from-zinc-900/40 to-zinc-950/40 p-8 sm:p-12 text-center space-y-6">
            {/* Overlay glow */}
            <div className="absolute inset-0 bg-sky-500/5 blur-xl pointer-events-none" />
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Ready to Upgrade <br className="sm:hidden" /> Your Visual Brand?
            </h2>
            
            <p className="text-sm text-zinc-400 max-w-lg mx-auto font-light leading-relaxed">
              We help you scale your digital presence with strategic creative direction and cinema-grade short-form assets. Let's discuss your targets.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 relative z-10">
              <Link
                href="/book"
                className="px-6 py-3.5 bg-white hover:bg-zinc-150 text-zinc-950 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <PhoneCall className="h-3.5 w-3.5 text-zinc-950" />
                Schedule Brief Call
              </Link>
              <a
                href="https://instagram.com/kitestudios6"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 font-mono font-bold tracking-wider text-xs uppercase transition-all duration-300 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Instagram className="h-3.5 w-3.5 text-sky-400" />
                Follow Instagram
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
