import type { Metadata } from "next";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sweepr Privacy Policy — KITESTUDIOS",
  description: "Sweepr does not collect, transmit, or sell any data.",
  alternates: { canonical: "/sweepr/privacy" },
};

export default function XBulkDeletePrivacyPage() {
  return (
    <div className="site-shell">
      <MinimalNav />
      <main className="content-width" style={{ maxWidth: 760, paddingBlock: "140px 100px" }}>
        <p className="eyebrow">KITESTUDIOS / Privacy</p>
        <h1 className="mt-4 mb-8 text-4xl font-bold tracking-tight md:text-5xl">
          Sweepr privacy policy
        </h1>
        <p className="mb-6 text-base leading-relaxed">
          Sweepr does not collect, transmit, or sell any data.
        </p>
        <ul className="mb-6 list-disc space-y-3 pl-6 text-base leading-relaxed">
          <li>
            It runs only on x.com and twitter.com, in your own browser, and only reads posts you can
            already see on your profile.
          </li>
          <li>It makes no network requests of its own and has no server.</li>
          <li>
            It stores three settings locally with <code>chrome.storage.local</code>: your delay
            range, your daily limit, and today&apos;s deletion count. This data never leaves your
            browser.
          </li>
          <li>
            It does not read or store cookies, passwords, or login tokens, and it does not call
            X&apos;s APIs. It clicks X&apos;s normal Delete buttons.
          </li>
          <li>It uses no analytics, advertising, or third-party code.</li>
        </ul>
        <p className="mb-6 text-base leading-relaxed">
          Removing the extension deletes its stored settings.
        </p>
        <p className="mb-6 text-base leading-relaxed">
          Sweepr is made by KITESTUDIOS and is not affiliated with or endorsed by X Corp.
        </p>
        <p className="text-base leading-relaxed">
          Contact: <a className="underline" href="mailto:tomy@kitestudios.net">tomy@kitestudios.net</a>
        </p>
      </main>
      <Footer />
    </div>
  );
}
