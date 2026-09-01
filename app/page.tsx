"use client";

import Link from "next/link";
import { ArrowUpRight, Download, Github, MoveDown, Sparkles } from "lucide-react";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

type Product = { number: string; type: string; name: string; description: string; status: string; image: string; href?: string; download?: string; downloadPage?: string };

const products: Product[] = [
  { number: "01", type: "Web app / utility", name: "SnapRename", description: "Bulk rename and organize image files without the busywork.", status: "Live now", image: "/images/snaprename.png", href: "https://snaprename.vercel.app/" },
  { number: "02", type: "Mobile app / playful", name: "FunQuotes", description: "A small daily prompt for finding the right words, whenever you need them.", status: "Live now", image: "/images/funquotes.png", href: "https://www.funquotes.xyz/" },
  { number: "03", type: "Brand site / hospitality", name: "Chester & Loki", description: "A warm digital home for a matcha cafe with a point of view.", status: "Live now", image: "/images/chesaterandloki.png", href: "https://chesterandloki-website.vercel.app/" },
  { number: "04", type: "Creative tool / generative", name: "NFT Art Generator", description: "Build layered collections, tune rarity, set pairing rules, and export launch-ready artwork.", status: "Download / v0.1", image: "/Portfolio/Products/950fcf2e-ae7c-40c6-afc6-2fc2e4e1797c_rw_1920.jpg", downloadPage: "/downloads/nft-art-generator" },
];

function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <div className="product-image-wrap"><img src={product.image} alt="" className="product-image" /><span className="product-index">{product.number}</span><span className="product-status">{product.status}</span></div>
    <div className="product-copy"><div><p className="eyebrow">{product.type}</p><h3>{product.name}</h3></div><p className="product-description">{product.description}</p><div className="product-actions">
      {product.downloadPage ? <Link href={product.downloadPage} className="text-link accent-link"><Download size={15} /> Download</Link> : product.download ? <a href={product.download} download className="text-link accent-link"><Download size={15} /> Download</a> : null}
      {product.href && <a href={product.href} target="_blank" rel="noreferrer" className="text-link">Open product <ArrowUpRight size={15} /></a>}
    </div></div>
  </article>;
}

export default function Home() {
  return <div className="site-shell"><MinimalNav /><main>
    <section className="hero-section" id="top"><div className="hero-grid" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true"><span /></div><div className="hero-content">
      <p className="eyebrow hero-kicker"><Sparkles size={14} /> Venture product studio / Los Angeles</p><h1>Build the thing<br /><em>people keep.</em></h1><p className="hero-lede">KITESTUDIOS is an independent studio for ambitious products, useful software, and the ideas that deserve a real shot at becoming something.</p><div className="hero-actions"><a href="#products" className="button button-dark">Explore the work <ArrowUpRight size={17} /></a><a href="#contact" className="button button-quiet">Start a conversation <span>↗</span></a></div>
    </div><div className="hero-meta"><span>01—04</span><span>Ideas → products</span><span className="scroll-cue"><MoveDown size={14} /> Scroll to explore</span></div></section>
    <section className="intro-section content-width"><div className="section-marker">[ 01 ]</div><div className="intro-statement">We make the leap from <span>“someone should build this”</span> to “how do I get it?”</div><div className="intro-detail"><p>Some ventures are ours. Some begin with a sharp founder and a messy whiteboard. The common thread is simple: make it clear, make it useful, and put it in people&apos;s hands.</p><Link href="/about" className="text-link">What we believe <ArrowUpRight size={15} /></Link></div></section>
    <section className="products-section content-width" id="products"><div className="section-heading"><div><p className="eyebrow">[ 02 ] / The product shelf</p><h2>Made here.<br /><em>Out in the world.</em></h2></div><p className="heading-note">Shipped products, playful experiments, and new releases from the KITESTUDIOS bench. Click through to try what&apos;s live.</p></div><div className="product-grid">{products.map((product) => <ProductCard key={product.number} product={product} />)}</div></section>
    <section className="manifesto-section"><div className="content-width manifesto-inner"><p className="eyebrow">[ 03 ] / Studio note</p><p className="manifesto">The best products feel a little inevitable <span>after they exist.</span></p><div className="manifesto-signature">— KITE / 2026</div></div></section>
    <section className="archive-section content-width" id="archive"><div className="archive-copy"><p className="eyebrow">[ 04 ] / The archive</p><h2>Visual thinking<br /><em>still matters.</em></h2><p>The camera was the first tool. It taught us how to notice, frame, and make a feeling legible. That instinct now travels into every interface, launch, and product we make.</p><Link href="/projects" className="text-link">Browse the archive <ArrowUpRight size={15} /></Link></div><div className="archive-image"><img src="/Portfolio/Fashion/fashion_10.jpg" alt="KITESTUDIOS visual archive" /></div></section>
    <section className="contact-section content-width" id="contact"><div><p className="eyebrow">[ 05 ] / Open door</p><h2>Have a sharp<br /><em>idea?</em></h2></div><div className="contact-copy"><p>Tell us what you&apos;re building, what&apos;s missing, or what you can&apos;t stop thinking about.</p><a href="mailto:tomy@kitestudios.net" className="contact-email">tomy@kitestudios.net <ArrowUpRight size={20} /></a><div className="contact-links"><a href="https://github.com/kitestudios6" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><a href="https://instagram.com/kitestudios6" target="_blank" rel="noreferrer">Instagram ↗</a></div></div></section>
  </main><Footer /></div>;
}
