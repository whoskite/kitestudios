import Link from "next/link";

export default function Footer() {
  return <footer className="site-footer"><div><Link href="/" className="brand-mark">KITE<span>STUDIOS</span></Link><p>Independent venture product studio<br />Los Angeles / everywhere</p></div><div className="footer-right"><span>© 2026 KITESTUDIOS</span><a href="mailto:tomy@kitestudios.net">Email ↗</a><a href="https://github.com/kitestudios6" target="_blank" rel="noreferrer">GitHub ↗</a></div></footer>;
}
