import type { Metadata } from "next";
import Link from "next/link";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sweepr - bulk delete your own X posts",
  description:
    "Sweepr is a Chrome extension that deletes your own posts on X in bulk from the side panel, with safe pacing and a typed confirmation.",
  alternates: { canonical: "/sweepr" },
  icons: { icon: "/sweepr/logo.png" },
};

const screenshots = [
  { src: "/sweepr/01-scan.jpg", alt: "Sweepr scan results with metrics for each post" },
  { src: "/sweepr/02-filter.jpg", alt: "Filtering scanned posts by text and date" },
  { src: "/sweepr/03-confirm.jpg", alt: "Confirmation dialog that requires typing DELETE" },
  { src: "/sweepr/04-progress.jpg", alt: "Deletion progress with step timings" },
  { src: "/sweepr/05-limits.jpg", alt: "Delay range and daily limit settings" },
];

export default function SweeprPage() {
  return (
    <div className="site-shell">
      <MinimalNav />
      <main className="content-width" style={{ maxWidth: 760, paddingBlock: "140px 100px" }}>
        <p className="eyebrow">KITESTUDIOS / Sweepr</p>
        <div className="mt-4 mb-6 flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sweepr/logo.png" alt="Sweepr logo" width={72} height={72} className="h-14 w-14 md:h-[72px] md:w-[72px]" />
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Sweepr</h1>
        </div>
        <p className="mb-10 text-lg leading-relaxed">
          Bulk delete your own posts on X from Chrome&apos;s side panel.
        </p>

        <h2 className="mb-3 text-2xl font-bold tracking-tight">How it works</h2>
        <ol className="mb-10 list-decimal space-y-2 pl-6 text-base leading-relaxed">
          <li>Open your profile on x.com.</li>
          <li>Click the Sweepr toolbar icon and scan your posts.</li>
          <li>Select the posts you want to remove.</li>
          <li>Type DELETE to confirm.</li>
        </ol>

        <h2 className="mb-3 text-2xl font-bold tracking-tight">Features</h2>
        <ul className="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed">
          <li>Filter posts by text and date.</li>
          <li>Delete posts and quotes, or undo reposts.</li>
          <li>Randomized delays and backoff after errors.</li>
          <li>A daily limit you can lower, and a Stop button.</li>
        </ul>
        <p className="mb-10 text-base font-bold leading-relaxed">
          Deletion is permanent. Consider downloading your X archive first.
        </p>

        <h2 className="mb-4 text-2xl font-bold tracking-tight">Screenshots</h2>
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {screenshots.map((shot) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={shot.src} src={shot.src} alt={shot.alt} width={1280} height={800} loading="lazy" className="h-auto w-full border border-neutral-200 dark:border-neutral-800" />
          ))}
        </div>

        <p className="mb-6 text-base leading-relaxed">
          <Link className="underline" href="/sweepr/privacy">Privacy policy</Link>
          {" · "}
          <Link className="underline" href="/sweepr/support">Support</Link>
        </p>
        <p className="text-sm leading-relaxed">
          Sweepr is made by KITESTUDIOS and is not affiliated with or endorsed by X Corp. X is a
          trademark of X Corp.
        </p>
      </main>
      <Footer />
    </div>
  );
}
