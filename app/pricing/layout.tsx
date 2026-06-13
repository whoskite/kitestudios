import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
  description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County. View our pricing for event coverage, commercial brand campaigns, and monthly social retainers.",
  openGraph: {
    title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
    description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County. View our pricing for event coverage, commercial brand campaigns, and monthly social retainers.",
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
