import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Download,
  FileArchive,
  Layers3,
  Package,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Workflow,
} from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

const releaseBase =
  "https://github.com/whoskite/NFT-ART-GENERATOR-LIVE/releases/download/v0.1.0";

const downloads = [
  {
    platform: "Windows",
    format: "64-bit installer",
    detail: "Windows 10 / 11",
    size: "2.1 MB",
    href: `${releaseBase}/NFT-Art-Generator-Windows-x64.exe`,
    primary: true,
    icon: Download,
  },
  {
    platform: "Linux",
    format: "AppImage",
    detail: "Portable · x86_64",
    size: "78 MB",
    href: `${releaseBase}/NFT-Art-Generator-Linux-x86_64.AppImage`,
    primary: false,
    icon: Package,
  },
  {
    platform: "Ubuntu / Debian",
    format: ".deb package",
    detail: "amd64",
    size: "4.1 MB",
    href: `${releaseBase}/NFT-Art-Generator-Linux-amd64.deb`,
    primary: false,
    icon: FileArchive,
  },
];

const features = [
  {
    number: "01",
    title: "Layer your artwork",
    body: "Drop in organized trait folders and build complete collections from your own artwork.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Direct the rarity",
    body: "Set trait amounts, compare target and current shares, and regenerate with intent.",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "Make the rules",
    body: "Create visual pairing and exclusion rules so every generated combination makes sense.",
    icon: Workflow,
  },
  {
    number: "04",
    title: "Export the drop",
    body: "Package rendered artwork, metadata JSON, OpenSea CSV, and an export manifest in one ZIP.",
    icon: Sparkles,
  },
];

const title = "NFT Art Generator — Download";
const description =
  "Download NFT Art Generator for Windows or Linux. Build layered collections, control rarity and rules, then export artwork and metadata.";
const socialImage =
  "/Portfolio/Products/950fcf2e-ae7c-40c6-afc6-2fc2e4e1797c_rw_1920.jpg";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/downloads/nft-art-generator" },
  openGraph: {
    title,
    description,
    url: "/downloads/nft-art-generator",
    siteName: "KITESTUDIOS",
    type: "website",
    images: [{ url: socialImage, width: 1920, height: 1280, alt: "NFT Art Generator by KITESTUDIOS" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function NftArtGeneratorDownloadPage() {
  return (
    <div className="site-shell nft-download-page">
      <MinimalNav />
      <main>
        <section className="nft-download-hero">
          <div className="nft-download-grid" aria-hidden="true" />
          <div className="nft-download-hero-inner content-width">
            <div className="nft-download-copy">
              <Link href="/#products" className="nft-back-link">
                <ArrowLeft size={14} /> All products
              </Link>
              <p className="eyebrow nft-release-kicker">
                <span /> Desktop app · v0.1.0
              </p>
              <h1>
                NFT Art
                <br />
                <em>Generator.</em>
              </h1>
              <p className="nft-download-lede">
                From loose layers to a launch-ready collection. Generate unique
                artwork, control rarity, set visual rules, and export every asset
                your drop needs.
              </p>
              <div className="nft-download-hero-actions">
                <a className="button button-dark nft-primary-download" href={downloads[0].href}>
                  <Download size={17} /> Download for Windows
                </a>
                <a
                  className="button button-quiet"
                  href="https://github.com/whoskite/NFT-ART-GENERATOR-LIVE/releases/tag/v0.1.0"
                  target="_blank"
                  rel="noreferrer"
                >
                  Release notes <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="nft-download-microcopy">Free desktop beta · No account required</p>
            </div>

            <div className="nft-app-preview" aria-label="Abstract preview of the NFT Art Generator interface">
              <div className="nft-app-titlebar">
                <span className="nft-window-dots"><i /><i /><i /></span>
                <b>NFT ART GENERATOR</b>
                <span>V0.1</span>
              </div>
              <div className="nft-app-body">
                <div className="nft-app-sidebar">
                  <span className="is-active">Preview</span>
                  <span>Attributes</span>
                  <span>Rules</span>
                  <span>Settings</span>
                  <div className="nft-layer-stack" aria-hidden="true">
                    <i /><i /><i /><i />
                  </div>
                </div>
                <div className="nft-app-canvas">
                  <div className="nft-canvas-meta"><span>24 items</span><span>Collection 01</span></div>
                  <div className="nft-token-grid" aria-hidden="true">
                    <i /><i /><i /><i /><i /><i />
                  </div>
                  <div className="nft-generation-bar"><span>Ready to generate</span><b>Generate</b></div>
                </div>
              </div>
              <div className="nft-preview-stamp">Built local.<br />Made yours.</div>
            </div>
          </div>
          <div className="nft-hero-footer content-width">
            <span>Windows + Linux</span>
            <span>Local-first workflow</span>
            <span>Artwork + metadata export</span>
          </div>
        </section>

        <section className="nft-downloads-section content-width" id="downloads">
          <div className="nft-section-intro">
            <div>
              <p className="eyebrow">[ 01 ] / Choose your build</p>
              <h2>Ready when<br /><em>you are.</em></h2>
            </div>
            <p>Version 0.1.0 · Released August 2026. Select the package that fits your computer.</p>
          </div>
          <div className="nft-download-options">
            {downloads.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.platform}
                  href={item.href}
                  className={`nft-download-option${item.primary ? " is-primary" : ""}`}
                >
                  <div className="nft-download-option-top">
                    <Icon size={22} />
                    {item.primary && <span>Recommended</span>}
                  </div>
                  <div>
                    <p className="eyebrow">{item.detail}</p>
                    <h3>{item.platform}</h3>
                    <p>{item.format}</p>
                  </div>
                  <div className="nft-download-option-bottom">
                    <span>{item.size}</span>
                    <b>Download <Download size={14} /></b>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="nft-beta-note">
            <ShieldCheck size={18} />
            <p><strong>A note about this beta.</strong> These early builds are not yet code-signed, so your computer may display a security warning. Only download from this official KITESTUDIOS page.</p>
          </div>
        </section>

        <section className="nft-feature-section">
          <div className="content-width">
            <div className="nft-section-intro nft-feature-heading">
              <div>
                <p className="eyebrow">[ 02 ] / Inside the app</p>
                <h2>Creative control.<br /><em>Without the code.</em></h2>
              </div>
              <p>A focused desktop workspace for building collections without giving up control of the details.</p>
            </div>
            <div className="nft-feature-grid">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.number} className="nft-feature-card">
                    <div><span>{feature.number}</span><Icon size={21} /></div>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="nft-local-section content-width">
          <div className="nft-local-mark" aria-hidden="true"><Layers3 size={62} /></div>
          <div>
            <p className="eyebrow">[ 03 ] / Your work stays yours</p>
            <h2>Local by<br /><em>design.</em></h2>
          </div>
          <div className="nft-local-copy">
            <p>Your artwork and project data stay on your computer. No account, no cloud upload, no collection lock-in.</p>
            <ul>
              <li><Check size={15} /> Work offline after installation</li>
              <li><Check size={15} /> Keep source artwork on your device</li>
              <li><Check size={15} /> Export portable files whenever you want</li>
            </ul>
          </div>
        </section>

        <section className="nft-final-cta">
          <div className="content-width">
            <p className="eyebrow">NFT Art Generator / v0.1.0</p>
            <h2>Build the collection<br /><em>you pictured.</em></h2>
            <a className="button nft-light-button" href={downloads[0].href}>
              Download for Windows <Download size={17} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
