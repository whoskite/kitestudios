import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
  description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County. View our pricing for event coverage, music videos, and custom visual campaigns.",
  openGraph: {
    title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
    description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County. View our pricing for event coverage, music videos, and custom visual campaigns.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
    description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
