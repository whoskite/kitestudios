import { Metadata } from "next";
import Link from "next/link";
import MinimalNav from "@/components/MinimalNav";
import { client, urlFor } from "@/lib/sanity";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-all duration-300 flex flex-col justify-between selection:bg-sky-500/20 antialiased relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] aspect-square rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[35%] aspect-square rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <MinimalNav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-7xl relative z-10">
        <div className="mb-16">
          <Link
            href="/"
            className="text-xs font-sans font-semibold tracking-widest text-zinc-400 hover:text-sky-400 uppercase transition-colors"
          >
            ← Back Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mt-4 mb-4 font-sans">
            Events Archive
          </h1>
          <p className="text-sm text-zinc-450 tracking-normal max-w-md leading-relaxed mt-2 font-sans">
            Exclusive coverage, photo galleries, and highlights from recent events.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border border-zinc-900 bg-zinc-950/60 rounded-md">
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
                <div className="relative overflow-hidden bg-zinc-950 aspect-[4/5] mb-6 shadow-xl border border-zinc-900 rounded-md">
                  {event.coverImage ? (
                    <img
                      src={urlFor(event.coverImage).width(800).url()}
                      alt={event.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 font-sans text-xs uppercase">
                      No Cover
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2 className="text-lg font-bold tracking-tight text-zinc-100 group-hover:text-sky-400 transition-colors line-clamp-2 font-sans uppercase">
                      {event.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-col space-y-1 text-xs tracking-wide text-zinc-450 font-sans mt-1">
                    <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    {event.location && <span className="opacity-80">{event.location}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
