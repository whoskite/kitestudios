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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-all duration-300 flex flex-col justify-between selection:bg-sky-500/20 antialiased relative overflow-hidden">
      <MinimalNav />

      {/* Subtle modern background blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] aspect-square rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[35%] aspect-square rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-4xl relative z-10">
        {/* Back navigation */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-xs font-sans font-semibold tracking-widest text-zinc-400 hover:text-sky-400 uppercase transition-colors"
          >
            ← Back Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-sans mb-4">
            About KITESTUDIOS
          </h1>
          <p className="text-sm font-sans text-zinc-450 tracking-normal leading-relaxed max-w-2xl font-light">
            Established in 2016 in Paramount, California, KITESTUDIOS specializes in corporate cinematography, high-impact event coverage, and strategic digital media assets.
          </p>
        </div>

        {/* Two-Column Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 border-t border-zinc-900 pt-12">
          {/* Left Column: Core Info */}
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-4">
              <h2 className="text-lg font-bold font-sans text-white uppercase tracking-wider">
                Our Production Philosophy
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm font-sans font-light">
                We believe that corporate video shouldn't feel corporate. Every piece of media we craft whether it's a multi-camera event highlight reel, an internal training platform, or a brand documentary is produced with cinematic composition, professional pacing, and strict attention to detail.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm font-sans font-light">
                By focusing on high production value and engaging storytelling, we create assets that help businesses drive trust, build engagement, and communicate their message with clarity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg font-bold font-sans text-white uppercase tracking-wider">
                Production Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 border border-zinc-900 rounded-md bg-zinc-900/40 shadow-xl hover:shadow-2xl hover:border-zinc-800 transition-all duration-300">
                  <h3 className="text-sm font-bold text-white mb-1 font-sans">Corporate Training Videos</h3>
                  <p className="text-zinc-450 text-xs font-sans leading-relaxed font-light">
                    Interactive onboarding pipelines, team training databases, educational series, and software guides built to scale your organization's skills.
                  </p>
                </div>
                <div className="p-5 border border-zinc-900 rounded-md bg-zinc-900/40 shadow-xl hover:shadow-2xl hover:border-zinc-800 transition-all duration-300">
                  <h3 className="text-sm font-bold text-white mb-1 font-sans">Corporate Marketing Videos</h3>
                  <p className="text-zinc-450 text-xs font-sans leading-relaxed font-light">
                    High-impact promotional reels, product launches, B2B case studies, and strategic campaign video assets optimized to drive client acquisition.
                  </p>
                </div>
                <div className="p-5 border border-zinc-900 rounded-md bg-zinc-900/40 shadow-xl hover:shadow-2xl hover:border-zinc-800 transition-all duration-300">
                  <h3 className="text-sm font-bold text-white mb-1 font-sans">Internal Communications</h3>
                  <p className="text-zinc-450 text-xs font-sans leading-relaxed font-light">
                    Engaging executive announcements, quarterly reviews, town halls, and internal company summaries to keep your workforce aligned and inspired.
                  </p>
                </div>
                <div className="p-5 border border-zinc-900 rounded-md bg-zinc-900/40 shadow-xl hover:shadow-2xl hover:border-zinc-800 transition-all duration-300">
                  <h3 className="text-sm font-bold text-white mb-1 font-sans">CEO & Founder Profiles</h3>
                  <p className="text-zinc-450 text-xs font-sans leading-relaxed font-light">
                    Cinematic profiles, thought leadership features, keynotes, and deep-dive documentaries telling the visionaries' story behind the enterprise.
                  </p>
                </div>
                <div className="p-5 border border-zinc-900 rounded-md bg-zinc-900/40 shadow-xl hover:shadow-2xl hover:border-zinc-800 transition-all duration-300 sm:col-span-2">
                  <h3 className="text-sm font-bold text-white mb-1 font-sans">Corporate Branding Videos</h3>
                  <p className="text-zinc-450 text-xs font-sans leading-relaxed font-light">
                    Premium brand anthems, culture showcases, recruitment commercials, and mission-driven films that shape and define your corporate brand identity.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Key Details */}
          <div className="space-y-8 font-sans">
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Location
              </h3>
              <p className="text-sm font-semibold text-zinc-305 font-light">
                Paramount, CA<br />
                Los Angeles County
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Founded
              </h3>
              <p className="text-sm font-semibold text-zinc-305 font-light">
                2016
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Owner & Producer
              </h3>
              <p className="text-sm font-semibold text-zinc-305 font-light">
                Tomy Lim
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-900">
              <Link
                href="/book"
                className="inline-block px-5 py-3 bg-sky-500 text-zinc-950 hover:bg-sky-600 transition-all font-bold tracking-wider text-xs uppercase rounded-md shadow-lg shadow-sky-500/10 text-center w-full cursor-pointer"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
