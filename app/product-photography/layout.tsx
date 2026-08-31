import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KiteStudios | Premium Product Photography Trial for E-commerce Brands",
  description:
    "Apply for our exclusive sponsored product photography cohort. Get high-end, studio-grade hero shots and styled e-commerce photography produced completely at zero upfront cost. Verify your brand's eligibility.",
  alternates: {
    canonical: "https://kitestudios.net/product-photography",
  },
  openGraph: {
    title: "KiteStudios | Premium Product Photography Trial for E-commerce Brands",
    description:
      "Apply for our exclusive sponsored product photography cohort. Get high-end, studio-grade hero shots and styled e-commerce photography produced completely at zero upfront cost. Verify your brand's eligibility.",
    url: "https://kitestudios.net/product-photography",
    siteName: "KiteStudios",
    images: [
      {
        url: "/Portfolio/Ecommerce/0d1f7b25-872c-4763-8ed0-c6d7ecd427f3_rw_1920.jpg",
        width: 1200,
        height: 900,
        alt: "KiteStudios Premium Product Editorial Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KiteStudios | Premium Product Photography Trial for E-commerce Brands",
    description:
      "Apply for our exclusive sponsored product photography cohort. Get high-end, studio-grade hero shots and styled e-commerce photography produced completely at zero upfront cost.",
    images: ["/Portfolio/Ecommerce/0d1f7b25-872c-4763-8ed0-c6d7ecd427f3_rw_1920.jpg"],
    creator: "@tomykite",
  },
};

export default function ProductPhotographyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
