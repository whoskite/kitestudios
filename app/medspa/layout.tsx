import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KiteStudios | Cinematic Web Production for Premier Aesthetic Clinics",
  description:
    "Apply for our exclusive local medical spa cohort. Get a cinema-grade website video walkthrough produced completely at zero upfront cost. Verify your clinic's eligibility.",
  openGraph: {
    title: "KiteStudios | Cinematic Web Production for Premier Aesthetic Clinics",
    description:
      "Apply for our exclusive local medical spa cohort. Get a cinema-grade website video walkthrough produced completely at zero upfront cost. Verify your clinic's eligibility.",
    url: "https://kitestudios.vercel.app/medspa",
    siteName: "KiteStudios",
    images: [
      {
        url: "/images/medspa/lobby.png",
        width: 1200,
        height: 900,
        alt: "KiteStudios Luxury MedSpa Ambiance Lobby",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KiteStudios | Cinematic Web Production for Premier Aesthetic Clinics",
    description:
      "Apply for our exclusive local medical spa cohort. Get a cinema-grade website video walkthrough produced completely at zero upfront cost.",
    images: ["/images/medspa/lobby.png"],
    creator: "@tomykite",
  },
};

export default function MedspaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
