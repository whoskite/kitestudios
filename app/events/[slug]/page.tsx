import { Metadata } from "next";
import { client } from "@/lib/sanity";
import EventClient from "./EventClient";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await client.fetch(
    `*[_type == "event" && slug.current == $slug && disabled != true][0]{ title, description }`,
    { slug: params.slug }
  );

  if (!event) return {};

  const title = `${event.title} | KITESTUDIOS Events`;
  const description = event.description || `Explore ${event.title} event gallery by Tomy Kite at KITESTUDIOS.`;
  const imageUrl = `/events/${params.slug}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const revalidate = 60;

export default async function EventPage({ params }: Props) {
  const event = await client.fetch(
    `*[_type == "event" && slug.current == $slug && disabled != true][0]{
      _id,
      title,
      date,
      location,
      description,
      photos
    }`,
    { slug: params.slug }
  );

  if (!event) {
    notFound();
  }

  return <EventClient event={event} />;
}
