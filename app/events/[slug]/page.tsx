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
    `*[_type == "event" && slug.current == $slug][0]{ title, description }`,
    { slug: params.slug }
  );

  if (!event) return {};

  return {
    title: `${event.title} | KITESTUDIOS Events`,
    description: event.description || `Explore ${event.title} event gallery by Tomy Kite at KITESTUDIOS.`,
  };
}

export const revalidate = 60;

export default async function EventPage({ params }: Props) {
  const event = await client.fetch(
    `*[_type == "event" && slug.current == $slug][0]{
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
