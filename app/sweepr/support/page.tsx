import type { Metadata } from "next";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sweepr Support — KITESTUDIOS",
  description: "Contact and troubleshooting for the Sweepr Chrome extension.",
  alternates: { canonical: "/sweepr/support" },
  icons: { icon: "/sweepr/logo.png" },
};

export default function SweeprSupportPage() {
  return (
    <div className="site-shell">
      <MinimalNav />
      <main className="content-width" style={{ maxWidth: 760, paddingBlock: "140px 100px" }}>
        <p className="eyebrow">KITESTUDIOS / Support</p>
        <div className="mt-4 mb-8 flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sweepr/logo.png" alt="Sweepr logo" width={72} height={72} className="h-14 w-14 md:h-[72px] md:w-[72px]" />
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Sweepr support</h1>
        </div>
        <p className="mb-6 text-base leading-relaxed">
          Contact: <a className="underline" href="mailto:tomy@kitestudios.net">tomy@kitestudios.net</a>
        </p>
        <p className="mb-10 text-base leading-relaxed">
          Sweepr only deletes posts from your own profile.
        </p>

        <h2 className="mb-3 text-2xl font-bold tracking-tight">Troubleshooting</h2>
        <ul className="mb-10 list-disc space-y-4 pl-6 text-base leading-relaxed">
          <li>
            <strong>Scan finds nothing.</strong> Open your own profile on x.com, make sure you are
            logged in, and check that Chrome is version 114 or newer.
          </li>
          <li>
            <strong>Delete fails or stops.</strong> X may have changed its page. Wait and try
            again, lower the daily limit, and check whether the panel shows a rate-limit message.
          </li>
        </ul>

        <h2 className="mb-3 text-2xl font-bold tracking-tight">Report a problem</h2>
        <p className="text-base leading-relaxed">
          Email <a className="underline" href="mailto:tomy@kitestudios.net">tomy@kitestudios.net</a>{" "}
          with your Chrome version and what the panel showed.
        </p>
      </main>
      <Footer />
    </div>
  );
}
