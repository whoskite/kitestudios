import { Metadata } from "next";
import Link from "next/link";
import MinimalNav from "@/components/MinimalNav";
import { client, urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Events | KITESTUDIOS",
  description: "Latest event coverage and photo galleries from KITESTUDIOS.",
};

interface EventType {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  location?: string;
  description?: string;
  coverImage: any;
}

export const revalidate = 60; // Revalidate the page every 60 seconds

export default async function EventsPage() {
  // Fetch events from Sanity CMS
  const events: EventType[] = await client.fetch(`
    *[_type == "event" && disabled != true] | order(date desc) {
      _id,
      title,
      slug,
      date,
      location,
      description,
      coverImage
    }
  `);

  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-all duration-300 flex flex-col justify-between selection:bg-sky-100 antialiased">
      <MinimalNav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-7xl">
        <div className="mb-16">
          <Link
            href="/"
            className="text-xs font-sans font-semibold tracking-widest text-zinc-500 hover:text-accent uppercase transition-colors"
          >
            ← Back Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 uppercase mt-4 mb-4 font-sans">
            Events Archive
          </h1>
          <p className="text-sm text-zinc-500 tracking-normal max-w-md leading-relaxed mt-2 font-sans">
            Exclusive coverage, photo galleries, and highlights from recent events.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-zinc-200 bg-slate-50/50 rounded-md">
            <span className="text-xs uppercase font-sans tracking-widest text-zinc-400 mb-2 font-semibold">
              No Events Found
            </span>
            <p className="text-zinc-500 text-sm max-w-xs font-light font-sans">
              There are currently no events published. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="group flex flex-col cursor-pointer"
              >
                <div className="relative overflow-hidden bg-slate-50 aspect-[4/5] mb-6 shadow-sm border border-zinc-200 rounded-md">
                  {event.coverImage ? (
                    <img
                      src={urlFor(event.coverImage).width(800).url()}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400 font-sans text-xs uppercase">
                      No Cover
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="text-lg font-bold tracking-tight text-zinc-800 group-hover:text-accent transition-colors line-clamp-2 font-sans">
                      {event.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-col space-y-1 text-xs tracking-wide text-zinc-500 font-sans mt-1">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    {event.location && <span className="opacity-80">{event.location}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full border-t border-zinc-200 py-16 bg-slate-50/50 mt-16">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-500 text-xs">
          <div className="text-center md:text-left">
            <span className="font-semibold tracking-[0.2em] text-zinc-900 uppercase block mb-1 font-sans">
              KITESTUDIOS
            </span>
            <span className="text-xs tracking-wider font-mono uppercase font-light">
              © 2026 KITESTUDIOS • PORTFOLIO
            </span>
          </div>

          <div className="flex items-center space-x-12 font-medium tracking-widest text-xs uppercase">
            <a
              href="https://instagram.com/kitestudios6"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent text-zinc-650 transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="mailto:tomy@kitestudios.net"
              className="hover:text-accent text-zinc-650 transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
