"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function MinimalNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-nav"><div className="nav-inner"><Link href="/" className="brand-mark">KITE<span>STUDIOS</span></Link><nav className="nav-links hidden sm:flex"><Link href="/#products">Products</Link><Link href="/#archive">Archive</Link><Link href="/about">About</Link></nav><a href="/#contact" className="nav-cta hidden sm:inline-flex">Let&apos;s talk <span>↗</span></a><button className="menu-button sm:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X size={21} /> : <Menu size={21} />}</button></div>{open && <div className="mobile-menu"><Link href="/#products" onClick={close}>Products</Link><Link href="/#archive" onClick={close}>Archive</Link><Link href="/about" onClick={close}>About</Link><a href="/#contact" onClick={close}>Let&apos;s talk ↗</a></div>}</header>;
}
