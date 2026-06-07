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
    *[_type == "event"] | order(date desc) {
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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-all duration-300 flex flex-col justify-between selection:bg-neutral-200 dark:selection:bg-neutral-800">
      <MinimalNav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-7xl">
        <div className="mb-16">
          <Link
            href="/"
            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-black dark:hover:text-white uppercase transition-colors"
          >
            ← Back Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-light tracking-[0.1em] uppercase mt-4 mb-4">
            Events Archive
          </h1>
          <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 tracking-widest max-w-md uppercase leading-relaxed">
            Exclusive coverage, photo galleries, and highlights from recent events.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-neutral-900/20">
            <span className="text-xs uppercase font-mono tracking-widest text-neutral-400 dark:text-neutral-500 mb-2">
              No Events Found
            </span>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs font-light">
              There are currently no events published. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event.slug.current}`}
                className="group flex flex-col cursor-pointer"
              >
                <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-[4/5] mb-6 shadow-sm border border-neutral-100 dark:border-neutral-900">
                  {event.coverImage ? (
                    <img
                      src={urlFor(event.coverImage).width(800).url()}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-400 font-mono text-xs uppercase">
                      No Cover
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="text-xl font-light tracking-wide uppercase line-clamp-2">
                      {event.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-col space-y-1 text-xs font-mono tracking-widest uppercase text-zinc-500">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    {event.location && <span>{event.location}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full border-t border-neutral-100 dark:border-neutral-900 py-16 bg-transparent mt-12">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-neutral-400 dark:text-neutral-500 text-xs">
          <div className="text-center md:text-left">
            <span className="font-light tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase block mb-1">
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
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
            <a
              href="mailto:tomy@kitestudios.net"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              EMAIL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
