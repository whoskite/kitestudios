import { Metadata } from "next";
import { projectsList } from "@/lib/portfolio-data";
import { getProjectBySlug, slugify } from "@/lib/utils";
import ProjectClient from "./ProjectClient";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";

interface Props {
  params: {
    slug: string;
  };
}

async function getAllProjects(): Promise<string[]> {
  try {
    const sanityData = await client.fetch(`*[_type == "project"] { name }`);
    const sanityProjects = (sanityData || []).map((p: any) => p.name);
    return Array.from(new Set([...sanityProjects, ...projectsList]));
  } catch (err) {
    console.error("Error fetching projects from Sanity on server:", err);
    return projectsList;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const allProjects = await getAllProjects();
  const project = getProjectBySlug(params.slug, allProjects);
  if (!project) return {};

  return {
    title: `${project} | KITESTUDIOS`,
    description: `Explore ${project} archive by Tomy Kite at KITESTUDIOS. Beautiful photography and cinematography assets.`,
  };
}

export async function generateStaticParams() {
  const allProjects = await getAllProjects();
  return allProjects.map((project) => ({
    slug: slugify(project),
  }));
}

export default async function ProjectPage({ params }: Props) {
  const allProjects = await getAllProjects();
  const project = getProjectBySlug(params.slug, allProjects);
  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}
