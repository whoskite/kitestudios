"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { StrapiData, Resource } from "@/types/strapi";

// Separate client component for the image with error handling
function ResourceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/images/placeholder-image.jpg";
      }}
      data-oid="j6qmy-x"
    />
  );
}

interface ResourceCardProps {
  resource: StrapiData<Resource>;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { id } = resource;
  const { title, description, link, category, image, publishedAt } =
    resource.attributes;

  const imageUrl = image?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}${image.data.attributes.url}`
    : "/images/placeholder-image.jpg";

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";

  const cleanDescription = description
    ? description.replace(/<[^>]*>/g, "")
    : "No description available";

  return (
    <Card className="h-full flex flex-col overflow-hidden" data-oid="4u33sau">
      <div className="relative w-full h-48" data-oid="c6u.cwh">
        <ResourceImage
          src={imageUrl}
          alt={title || "Resource"}
          data-oid="jwiua1z"
        />
      </div>
      <CardHeader data-oid="m422rd6">
        <div
          className="flex justify-between items-start mb-2"
          data-oid="-sfcu5c"
        >
          <Badge data-oid="hki8a6n">{category || "Uncategorized"}</Badge>
          <span className="text-xs text-muted-foreground" data-oid="i:zpnle">
            {formattedDate}
          </span>
        </div>
        <CardTitle className="line-clamp-2" data-oid="hyc4288">
          {title || "Untitled Resource"}
        </CardTitle>
        <CardDescription className="line-clamp-3" data-oid="ggz7utd">
          {cleanDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4" data-oid="7qhe0by">
        <div className="flex gap-2 w-full" data-oid="52i_un_">
          <Button asChild className="flex-1" data-oid="vp5f8sn">
            <Link href={`/hub/resource/${id}`} data-oid="1m4g-ar">
              View Details
            </Link>
          </Button>
          {link && (
            <Button variant="outline" asChild data-oid="s_7u-p:">
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                data-oid="8ihbw20"
              >
                <ExternalLink className="h-4 w-4" data-oid="gsx3qj0" />
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
