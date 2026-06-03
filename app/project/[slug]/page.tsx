import { Metadata } from "next";
import { projectsList } from "@/lib/portfolio-data";
import { getProjectBySlug, slugify } from "@/lib/utils";
import ProjectClient from "./ProjectClient";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug, projectsList);
  if (!project) return {};

  return {
    title: `${project} | KITESTUDIOS`,
    description: `Explore ${project} archive by Tomy Kite at KITESTUDIOS. Beautiful photography and cinematography assets.`,
  };
}

export async function generateStaticParams() {
  return projectsList.map((project) => ({
    slug: slugify(project),
  }));
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug, projectsList);
  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}
