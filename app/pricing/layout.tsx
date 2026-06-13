import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
  description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County. View our pricing for event coverage, commercial brand campaigns, monthly social retainers, ecommerce product drops, and hybrid AI product styling.",
  openGraph: {
    title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
    description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County. View our pricing for event coverage, commercial brand campaigns, monthly social retainers, ecommerce product drops, and hybrid AI product styling.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Packages & Pricing | Long Beach & LA County | KITESTUDIOS",
    description: "Professional photo and cinematic motion packages based in Long Beach and Los Angeles County. View our pricing for event coverage, commercial brand campaigns, monthly social retainers, ecommerce product drops, and hybrid AI product styling.",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
