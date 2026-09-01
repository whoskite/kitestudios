import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Boxes, Check, Lightbulb, Rocket, Sparkles } from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About KITESTUDIOS — Independent Venture Product Studio",
  description: "KITESTUDIOS is an independent venture product studio in Los Angeles, building useful software, original products, and ambitious ideas worth keeping.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About KITESTUDIOS — Independent Venture Product Studio",
    description: "We turn promising ideas into useful products—from first principle to first customer.",
    url: "/about",
    siteName: "KITESTUDIOS",
    type: "website",
    images: [{ url: "/KITESTUDIOS_1x1.png", width: 1200, height: 1200, alt: "KITESTUDIOS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About KITESTUDIOS — Independent Venture Product Studio",
    description: "We turn promising ideas into useful products—from first principle to first customer.",
    images: ["/KITESTUDIOS_1x1.png"],
  },
};

const capabilities = [
  { number: "01", title: "Find the sharp idea", description: "We pressure-test the problem, audience, and opportunity until the product has a reason to exist.", icon: Lightbulb },
  { number: "02", title: "Shape the product", description: "Positioning, product strategy, identity, interface, and technical decisions become one coherent system.", icon: Boxes },
  { number: "03", title: "Build and launch", description: "We turn the concept into working software, ship it into the world, and learn from what people actually use.", icon: Rocket },
];

const partnershipTypes = ["Studio-owned ventures", "Founder partnerships", "Selected product commissions"];

export default function AboutPage() {
  return (
    <div className="site-shell venture-about-page">
      <MinimalNav />
      <main>
        <section className="venture-about-hero">
          <div className="venture-about-grid" aria-hidden="true" />
          <div className="venture-about-orbit" aria-hidden="true"><span /></div>
          <div className="content-width venture-about-hero-inner">
            <Link href="/" className="venture-about-back"><ArrowLeft size={14} /> Back home</Link>
            <p className="eyebrow venture-about-kicker"><Sparkles size={14} /> Independent venture product studio</p>
            <h1>We build what<br /><em>we wish existed.</em></h1>
            <div className="venture-about-hero-copy">
              <p>KITESTUDIOS turns promising ideas into useful products—from first principle to first customer.</p>
              <span>Los Angeles / Founded 2016</span>
            </div>
          </div>
          <div className="venture-about-hero-meta"><span>Ideas → systems → products</span><span>Independent by design</span></div>
        </section>

        <section className="venture-about-statement content-width">
          <div className="section-marker">[ 01 ]</div>
          <p>We are a small, founder-led studio for ambitious products, useful software, and ideas that deserve a real shot at becoming<span> something people keep.</span></p>
        </section>

        <section className="venture-about-story content-width">
          <div><p className="eyebrow">[ 02 ] / Why we exist</p><h2>The space between<br /><em>idea and real.</em></h2></div>
          <div className="venture-about-story-copy">
            <p>Good ideas are common. Clear decisions, sustained craft, and the nerve to ship are not. KITESTUDIOS exists to close that gap.</p>
            <p>We work across strategy, design, and technology because products rarely fail inside one neat discipline. The name, interface, business model, and build all need to point in the same direction.</p>
            <p>Some ventures begin here. Others begin with a founder who sees a problem worth solving. Either way, we stay close to the work and build toward something useful, distinct, and durable.</p>
          </div>
        </section>

        <section className="venture-about-capabilities">
          <div className="content-width">
            <div className="venture-about-section-heading">
              <div><p className="eyebrow">[ 03 ] / What we do</p><h2>One studio.<br /><em>The whole leap.</em></h2></div>
              <p>We move from an early opportunity to a clear, working product without handing the idea between disconnected teams.</p>
            </div>
            <div className="venture-capability-grid">
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return <article key={capability.number}><div className="venture-capability-top"><span>{capability.number}</span><Icon size={22} /></div><h3>{capability.title}</h3><p>{capability.description}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="venture-about-model content-width">
          <div className="venture-about-model-title"><p className="eyebrow">[ 04 ] / How we partner</p><h2>Built close.<br /><em>Built to last.</em></h2></div>
          <div className="venture-about-model-copy">
            <p>We keep the studio intentionally focused. That means fewer projects, direct collaboration, and no layers between the idea and the people making it real.</p>
            <ul>{partnershipTypes.map((item) => <li key={item}><Check size={15} /> {item}</li>)}</ul>
          </div>
          <aside><span>Founder / Studio lead</span><strong>Tomy Lim</strong><p>Paramount, California<br />Los Angeles County</p></aside>
        </section>

        <section className="venture-about-note">
          <div className="content-width"><p className="eyebrow">[ Studio note ]</p><blockquote>“The best products feel a little inevitable<span> after they exist.”</span></blockquote><p className="venture-about-signature">— KITE / 2026</p></div>
        </section>

        <section className="venture-about-cta content-width">
          <div><p className="eyebrow">[ 05 ] / Open door</p><h2>Have an idea<br /><em>with gravity?</em></h2></div>
          <div><p>Tell us what you see, what is missing, and why you cannot leave it alone.</p><a href="mailto:tomy@kitestudios.net" className="venture-about-email">Start a conversation <ArrowUpRight size={18} /></a></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
