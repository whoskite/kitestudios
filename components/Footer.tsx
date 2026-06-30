import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 py-16 bg-zinc-900 mt-16 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 text-zinc-400 text-xs">
        {/* Logo and copyright */}
        <div className="text-center md:text-left">
          <span className="font-bold tracking-[0.2em] text-white uppercase block mb-1 font-sans">
            KITESTUDIOS
          </span>
          <span className="text-[10px] tracking-wider font-sans uppercase font-semibold text-zinc-500">
            © 2026 KITESTUDIOS • PORTFOLIO
          </span>
        </div>

        {/* Footer Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 font-semibold tracking-widest text-[10px] uppercase font-sans">
          <Link
            href="/about"
            className="hover:text-accent text-zinc-300 transition-colors"
          >
            ABOUT
          </Link>
          <Link
            href="/pricing"
            className="hover:text-accent text-zinc-300 transition-colors"
          >
            PRICING
          </Link>
          <Link
            href="/book"
            className="hover:text-accent text-zinc-300 transition-colors"
          >
            BOOK CONSULTATION
          </Link>
          <a
            href="https://instagram.com/kitestudios6"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent text-zinc-300 transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="mailto:tomy@kitestudios.net"
            className="hover:text-accent text-zinc-300 transition-colors"
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}
