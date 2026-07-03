"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import MinimalNav from "@/components/MinimalNav";
import { portfolioItems, projectsList, MediaItem } from "@/lib/portfolio-data";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";

function ProjectCard({ project, assets }: { project: string; assets: MediaItem[] }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const firstAsset = assets[0];
  const photoCount = assets.filter((item) => item.type === "photo").length;
  const videoCount = assets.filter((item) => item.type === "video").length;

  let countString = "";
  if (videoCount > 0 && photoCount > 0) {
    countString = `${videoCount} Video${videoCount === 1 ? "" : "s"} • ${photoCount} Photo${photoCount === 1 ? "" : "s"}`;
  } else if (videoCount > 0) {
    countString = `${videoCount} Video${videoCount === 1 ? "" : "s"}`;
  } else {
    countString = `${photoCount} Photo${photoCount === 1 ? "" : "s"}`;
  }

  useEffect(() => {
    if (videoRef.current && firstAsset.type === "video") {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, firstAsset.type]);

  const posterUrl = firstAsset.type === "video" && (firstAsset as any).coverImage
    ? urlFor((firstAsset as any).coverImage).width(640).height(480).fit("crop").url()
    : undefined;

  return (
    <Link
      href={`/project/${slugify(project)}`}
      className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-xl cursor-pointer transition-all duration-500 hover:scale-[1.015] hover:border-sky-500/30 hover:shadow-sky-500/5 flex flex-col justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {firstAsset.type === "photo" ? (
        <img
          src={firstAsset.src}
          alt={project}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <video
          ref={videoRef}
          src={posterUrl ? firstAsset.src : `${firstAsset.src}#t=0.001`}
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent pointer-events-none z-10" />

      {/* Info Overlay */}
      <div className="relative z-20 p-6 space-y-1 pointer-events-none text-left">
        <h3 className="text-lg font-bold text-white tracking-wider uppercase font-sans">
          {project}
        </h3>
        <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest font-semibold">
          {countString}
        </p>
      </div>

      <div className="absolute top-4 right-4 z-20 w-16 h-8 rounded-full bg-zinc-950/85 backdrop-blur-sm border border-zinc-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] font-sans tracking-widest text-sky-400 font-bold uppercase">
          Open →
        </span>
      </div>
    </Link>
  );
}

function ProjectsContent() {
  const [sanityVideos, setSanityVideos] = useState<MediaItem[]>([]);
  const [sanityProjects, setSanityProjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Sanity videos and projects list on mount to combine with local assets
  useEffect(() => {
    const videosPromise = client.fetch(
      `*[_type == "portfolioVideo" && disabled != true] | order(order asc, _createdAt desc) {
        _id,
        title,
        "project": coalesce(project->name, "KITESTUDIOS"),
        category,
        description,
        "videoUrl": videoFile.asset->url,
        coverImage
      }`
    );

    const projectsPromise = client.fetch(
      `*[_type == "project"] | order(order asc, name asc) { name }`
    );

    Promise.all([videosPromise, projectsPromise])
      .then(([videosData, projectsData]) => {
        const mappedVideos: MediaItem[] = (videosData || []).map((v: any) => ({
          id: v._id,
          type: "video",
          title: v.title,
          category: v.category || "Videography",
          project: v.project || "KITESTUDIOS",
          src: v.videoUrl,
          videoUrl: v.videoUrl,
          metadata: {
            camera: "",
            lens: "",
            aperture: "",
            shutter: "",
            iso: "",
            location: v.project || "",
            date: ""
          }
        }));
        setSanityVideos(mappedVideos);

        const projectNames = (projectsData || []).map((p: any) => p.name);
        setSanityProjects(projectNames);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Sanity data in /projects:", err);
        setLoading(false);
      });
  }, []);

  const combinedItems = [...sanityVideos, ...portfolioItems];
  const uniqueProjects = Array.from(new Set([...sanityProjects, ...projectsList]));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-all duration-300 flex flex-col justify-between selection:bg-sky-500/20 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[35%] aspect-square rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[35%] aspect-square rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <MinimalNav />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-12 sm:py-24 max-w-7xl relative z-10 space-y-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-xs font-sans font-semibold tracking-widest text-zinc-400 hover:text-sky-400 uppercase transition-colors"
          >
            ← Back Home
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase mt-4 mb-4 font-sans">
            Project Archives
          </h1>
          <p className="text-sm text-zinc-455 max-w-md leading-relaxed mt-2 font-sans font-light">
            Browse through our dedicated folders of commercial photography, fashion films, SaaS highlights, and campaign shoots.
          </p>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-sky-400 animate-spin" />
            Loading Directory...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {uniqueProjects.map((project) => {
              const projectAssets = combinedItems.filter((item) => item.project === project);
              if (projectAssets.length === 0) return null;
              return (
                <ProjectCard
                  key={project}
                  project={project}
                  assets={projectAssets}
                />
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-500 font-mono text-xs uppercase tracking-widest gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-zinc-800 border-t-sky-400 animate-spin" />
        Loading Archive...
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  );
}
