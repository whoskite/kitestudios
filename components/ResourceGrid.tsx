import { StrapiResponse, Resource } from "@/types/strapi";
import ResourceCard from "./ResourceCard";

interface ResourceGridProps {
  resources: StrapiResponse<Resource>;
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
  if (!resources.data || resources.data.length === 0) {
    return (
      <div className="text-center py-12" data-oid="_qnzxmb">
        <p className="text-lg text-muted-foreground" data-oid="nvah4g.">
          No resources found. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8"
      data-oid="27mxt9z"
    >
      {resources.data.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          data-oid="qegu0rg"
        />
      ))}
    </div>
  );
}
