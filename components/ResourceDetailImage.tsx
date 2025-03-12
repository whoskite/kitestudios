"use client";

import Image from 'next/image';

export default function ResourceDetailImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image 
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = '/images/placeholder-image.jpg';
      }}
    />
  );
} 