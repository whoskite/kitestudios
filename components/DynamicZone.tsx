import React from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

// Define the component types
interface MediaComponent {
  __component: 'shared.media';
  id: number;
  file: {
    data: {
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        alternativeText?: string;
      };
    };
  };
  caption?: string;
}

interface QuoteComponent {
  __component: 'shared.quote';
  id: number;
  title?: string;
  body: string;
  author?: string;
}

interface RichTextComponent {
  __component: 'shared.rich-text';
  id: number;
  content: string;
}

interface SliderComponent {
  __component: 'shared.slider';
  id: number;
  files: {
    data: Array<{
      id: number;
      attributes: {
        url: string;
        width: number;
        height: number;
        alternativeText?: string;
      };
    }>;
  };
}

type DynamicZoneComponent = 
  | MediaComponent 
  | QuoteComponent 
  | RichTextComponent 
  | SliderComponent;

interface DynamicZoneProps {
  content: DynamicZoneComponent[];
}

export default function DynamicZone({ content }: DynamicZoneProps) {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {content.map((item) => {
        switch (item.__component) {
          case 'shared.media':
            return <MediaBlock key={item.id} data={item} />;
          case 'shared.quote':
            return <QuoteBlock key={item.id} data={item} />;
          case 'shared.rich-text':
            return <RichTextBlock key={item.id} data={item} />;
          case 'shared.slider':
            return <SliderBlock key={item.id} data={item} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function MediaBlock({ data }: { data: MediaComponent }) {
  if (!data.file?.data?.attributes?.url) {
    return null;
  }

  const { url, width, height, alternativeText } = data.file.data.attributes;
  const imageUrl = url.startsWith('http') 
    ? url 
    : url.startsWith('/') && !url.startsWith('/api')
      ? url // Already a local path
      : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`;

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={alternativeText || 'Media content'}
          width={width || 1200}
          height={height || 800}
          className="w-full h-auto object-cover"
        />
      </div>
      {data.caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          {data.caption}
        </figcaption>
      )}
    </figure>
  );
}

function QuoteBlock({ data }: { data: QuoteComponent }) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 py-3 my-8">
      {data.title && (
        <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
      )}
      <p className="text-lg italic">{data.body}</p>
      {data.author && (
        <footer className="text-sm text-muted-foreground mt-2">
          — {data.author}
        </footer>
      )}
    </blockquote>
  );
}

function RichTextBlock({ data }: { data: RichTextComponent }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}

function SliderBlock({ data }: { data: SliderComponent }) {
  if (!data.files?.data || data.files.data.length === 0) {
    return null;
  }

  // For simplicity, we'll just show the images in a grid
  // In a real application, you might want to use a carousel component
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.files.data.map((file) => {
          const { url, width, height, alternativeText } = file.attributes;
          const imageUrl = url.startsWith('http') 
            ? url 
            : url.startsWith('/') && !url.startsWith('/api')
              ? url // Already a local path
              : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`;

          return (
            <div key={file.id} className="overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={alternativeText || 'Slider image'}
                width={width || 400}
                height={height || 300}
                className="w-full h-auto object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
} 