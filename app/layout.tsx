import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import ChatAssistant from "@/components/ChatAssistant";
export const metadata: Metadata = {
  title: "KITESTUDIOS",
  description:
    "A creative platform exploring the intersection of design, technology, and community.",
  metadataBase: new URL("https://kitestudios.vercel.app"),
  icons: {
    icon: "/KITESTUDIOS_ICON.ico",
    shortcut: "/KITESTUDIOS_ICON.ico",
    apple: "/KITESTUDIOS_ICON.png",
  },
  openGraph: {
    title: "KITESTUDIOS",
    description:
      "A creative platform exploring the intersection of design, technology, and community.",
    url: "https://kitestudios.vercel.app",
    siteName: "KITESTUDIOS",
    images: [
      {
        url: "/KITESTUDIOS_1x1.png",
        width: 1200,
        height: 1200,
        alt: "KITESTUDIOS",
      },
    ],

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KITESTUDIOS",
    description:
      "A creative platform exploring the intersection of design, technology, and community.",
    images: ["/KITESTUDIOS_1x1.png"],
    creator: "@tomykite",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-oid="uog:4ts">
      <head data-oid="1qr1i44">
        <link
          rel="icon"
          href="/KITESTUDIOS_ICON.ico"
          sizes="any"
          data-oid="swxwaz8"
        />

        <link
          rel="apple-touch-icon"
          href="/KITESTUDIOS_ICON.png"
          data-oid="d5aadpw"
        />
      </head>
      <body className="" data-oid="upqvd-1">
        <Providers data-oid="bi8tsbg">
          {children}
          <ChatAssistant data-oid="_f:tp6s" />
        </Providers>
      </body>
    </html>
  );
}
