import { Suspense } from 'react';
import { Metadata } from 'next';
import { getHubResources } from '@/lib/strapi';
import ResourceGrid from '@/components/ResourceGrid';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Hub Resources - Kite Studios',
  description: 'Browse our collection of resources, tutorials, and tools.',
};

async function ResourcesContent() {
  const resources = await getHubResources();
  return <ResourceGrid resources={resources} />;
}

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Hub Resources</h1>
        <p className="text-xl text-muted-foreground">
          Browse our collection of resources, tutorials, and tools
        </p>
      </div>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col h-full">
              <Skeleton className="w-full h-48" />
              <div className="py-4">
                <Skeleton className="w-1/4 h-5 mb-2" />
                <Skeleton className="w-3/4 h-8 mb-2" />
                <Skeleton className="w-full h-20" />
              </div>
              <div className="mt-auto pt-4">
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          ))}
        </div>
      }>
        <ResourcesContent />
      </Suspense>
    </div>
  );
} 