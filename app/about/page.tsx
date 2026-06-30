import { Metadata } from "next";
import Link from "next/link";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | KITESTUDIOS",
  description: "Learn more about KITESTUDIOS, our production philosophy, and our capabilities.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-all duration-300 flex flex-col justify-between selection:bg-sky-100 antialiased relative overflow-hidden">
      <MinimalNav />

      {/* Subtle modern background blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] aspect-square rounded-full bg-slate-50/50 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[35%] aspect-square rounded-full bg-slate-50/50 blur-[120px] pointer-events-none" />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-4xl relative z-10">
        {/* Back navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-xs font-sans font-semibold tracking-widest text-zinc-500 hover:text-accent uppercase transition-colors"
          >
            ← Back Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-16">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 uppercase font-sans mb-4">
            About KITESTUDIOS
          </h1>
          <p className="text-sm font-sans text-zinc-500 tracking-normal leading-relaxed max-w-2xl">
            Established in 2016 in Paramount, California, KITESTUDIOS specializes in corporate cinematography, high-impact event coverage, and strategic digital media assets.
          </p>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-t border-zinc-200 pt-12">
          {/* Left Column: Core Info */}
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-sans text-zinc-800 uppercase tracking-wider">
                Our Production Philosophy
              </h2>
              <p className="text-zinc-650 leading-relaxed text-sm font-sans">
                We believe that corporate video shouldn't feel corporate. Every piece of media we craft whether it's a multi-camera event highlight reel, an internal training platform, or a brand documentary is produced with cinematic composition, professional pacing, and strict attention to detail.
              </p>
              <p className="text-zinc-650 leading-relaxed text-sm font-sans">
                By focusing on high production value and engaging storytelling, we create assets that help businesses drive trust, build engagement, and communicate their message with clarity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-sans text-zinc-800 uppercase tracking-wider">
                Production Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-zinc-200 rounded-md bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-sm font-bold text-zinc-800 mb-1 font-sans">Corporate Training Videos</h3>
                  <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                    Interactive onboarding pipelines, team training databases, educational series, and software guides built to scale your organization's skills.
                  </p>
                </div>
                <div className="p-4 border border-zinc-200 rounded-md bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-sm font-bold text-zinc-800 mb-1 font-sans">Corporate Marketing Videos</h3>
                  <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                    High-impact promotional reels, product launches, B2B case studies, and strategic campaign video assets optimized to drive client acquisition.
                  </p>
                </div>
                <div className="p-4 border border-zinc-200 rounded-md bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-sm font-bold text-zinc-800 mb-1 font-sans">Internal Communications</h3>
                  <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                    Engaging executive announcements, quarterly reviews, town halls, and internal company summaries to keep your workforce aligned and inspired.
                  </p>
                </div>
                <div className="p-4 border border-zinc-200 rounded-md bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-sm font-bold text-zinc-800 mb-1 font-sans">CEO & Founder Profiles</h3>
                  <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                    Cinematic profiles, thought leadership features, keynotes, and deep-dive documentaries telling the visionaries' story behind the enterprise.
                  </p>
                </div>
                <div className="p-4 border border-zinc-200 rounded-md bg-slate-50/50 shadow-sm hover:shadow-md transition-all duration-300 sm:col-span-2">
                  <h3 className="text-sm font-bold text-zinc-800 mb-1 font-sans">Corporate Branding Videos</h3>
                  <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                    Premium brand anthems, culture showcases, recruitment commercials, and mission-driven films that shape and define your corporate brand identity.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Key Details */}
          <div className="space-y-8 font-sans">
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                Location
              </h3>
              <p className="text-sm font-semibold text-zinc-700">
                Paramount, CA<br />
                Los Angeles County
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                Founded
              </h3>
              <p className="text-sm font-semibold text-zinc-700">
                2016
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                Owner & Producer
              </h3>
              <p className="text-sm font-semibold text-zinc-700">
                Tomy Lim
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-200">
              <a
                href="mailto:tomy@kitestudios.net"
                className="inline-block px-5 py-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-all font-semibold tracking-wider text-xs uppercase rounded-md shadow-md text-center w-full cursor-pointer"
              >
                Start a Project
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
