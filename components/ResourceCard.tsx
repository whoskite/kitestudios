import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { StrapiData, Resource } from '@/types/strapi';

interface ResourceCardProps {
  resource: StrapiData<Resource>;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { id } = resource;
  const { title, description, link, category, image, publishedAt } = resource.attributes;
  
  const imageUrl = image?.data?.attributes?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image.data.attributes.url}`
    : '/placeholder-image.jpg';
  
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  });

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative w-full h-48">
        <Image 
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge>{category}</Badge>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4">
        <div className="flex gap-2 w-full">
          <Button asChild className="flex-1">
            <Link href={`/hub/resource/${id}`}>
              View Details
            </Link>
          </Button>
          {link && (
            <Button variant="outline" asChild>
              <Link href={link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
} 