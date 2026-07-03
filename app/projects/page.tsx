"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import MinimalNav from "@/components/MinimalNav";
import { portfolioItems, projectsList, MediaItem } from "@/lib/portfolio-data";
import Link from "next/link";
import { slugify } from "@/lib/utils";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";
import { getEmbedUrl, getYouTubeThumbnail, getVimeoId } from "@/lib/video-utils";
import { Play } from "lucide-react";

function ProjectCardMedia({ asset }: { asset: MediaItem }) {
  const [vimeoThumb, setVimeoThumb] = useState<string | null>(null);
  const ytThumb = asset.coverImage || getYouTubeThumbnail(asset.externalVideoUrl);
  const vimeoId = !ytThumb ? getVimeoId(asset.externalVideoUrl) : null;

  useEffect(() => {
    if (!vimeoId) return;
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}&width=640`)
      .then((r) => r.json())
      .then((d) => { if (d.thumbnail_url) setVimeoThumb(d.thumbnail_url); })
      .catch(() => {});
  }, [vimeoId]);

  if (asset.type === "photo") {
    return (
      <img
        src={asset.src}
        alt={asset.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    );
  }

  const thumbUrl = ytThumb || vimeoThumb;
  if (thumbUrl) {
    return (
      <img
        src={thumbUrl}
        alt={asset.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  if (asset.src && !asset.externalVideoUrl) {
    return (
      <video
        src={asset.src}
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
      <Play className="w-8 h-8 text-white/20" />
    </div>
  );
}

function ProjectCard({ project, assets }: { project: string; assets: MediaItem[] }) {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <Link
      href={`/project/${slugify(project)}`}
      className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 shadow-xl cursor-pointer transition-all duration-500 hover:scale-[1.015] hover:border-sky-500/30 hover:shadow-sky-500/5 flex flex-col justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProjectCardMedia asset={firstAsset} />
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
        externalVideoUrl,
        coverImage
      }`
    );

    const projectsPromise = client.fetch(
      `*[_type == "project"] | order(order asc, name asc) { name }`
    );

    Promise.all([videosPromise, projectsPromise])
      .then(([videosData, projectsData]) => {
        const mappedVideos: MediaItem[] = (videosData || []).map((v: any) => {
          const finalSrc = v.externalVideoUrl || v.videoUrl || "";
          return {
            id: v._id,
            type: "video",
            title: v.title,
            category: v.category || "Videography",
            project: v.project || "KITESTUDIOS",
            src: finalSrc,
            videoUrl: finalSrc,
            externalVideoUrl: v.externalVideoUrl || undefined,
            coverImage: v.coverImage ? urlFor(v.coverImage).width(480).url() : undefined,
            metadata: {
              camera: "",
              lens: "",
              aperture: "",
              shutter: "",
              iso: "",
              location: v.project || "",
              date: ""
            }
          };
        });
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
  
  // Deduplicate uniqueProjects case-insensitively using slugify to prevent duplicate project cards
  const uniqueProjects = (() => {
    const merged = [...sanityProjects, ...projectsList];
    const seen = new Set<string>();
    const result: string[] = [];
    for (const p of merged) {
      const slug = slugify(p);
      if (!seen.has(slug)) {
        seen.add(slug);
        result.push(p);
      }
    }
    return result;
  })();

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
              const projectAssets = combinedItems.filter((item) => item.project.toLowerCase() === project.toLowerCase());
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
