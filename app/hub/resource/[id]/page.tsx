import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { getResourceById } from '@/lib/strapi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ResourcePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  try {
    const { data } = await getResourceById(params.id);
    
    if (!data || !data.attributes) {
      return {
        title: 'Resource Not Found - Kite Studios Hub',
        description: 'The requested resource could not be found.',
      };
    }
    
    const resource = data.attributes;
    
    return {
      title: `${resource.title} - Kite Studios Hub`,
      description: resource.description.substring(0, 160),
    };
  } catch (error) {
    return {
      title: 'Resource - Kite Studios Hub',
      description: 'Resource details',
    };
  }
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  try {
    const { data } = await getResourceById(params.id);
    
    // Handle case where data is null (Strapi not available or resource not found)
    if (!data || !data.attributes) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" asChild>
              <Link href="/hub/resource" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>
          </div>
          
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The resource you're looking for is not available or doesn't exist.
            </p>
            <Button asChild>
              <Link href="/hub/resource">
                Browse All Resources
              </Link>
            </Button>
          </div>
        </div>
      );
    }
    
    const resource = data.attributes;
    
    const imageUrl = resource.image?.data?.attributes?.url 
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${resource.image.data.attributes.url}`
      : '/placeholder-image.jpg';
    
    const formattedDate = new Date(resource.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/hub/resource" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="mb-3">{resource.category}</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{resource.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: resource.description }} />
            </div>
            
            {resource.link && (
              <div className="mt-8">
                <Button asChild>
                  <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                    Visit Resource <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
          
          <div>
            <div className="sticky top-24">
              <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                <Image 
                  src={imageUrl}
                  alt={resource.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-4">Related Resources</h3>
                <p className="text-sm text-muted-foreground">
                  Check back soon for related resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 