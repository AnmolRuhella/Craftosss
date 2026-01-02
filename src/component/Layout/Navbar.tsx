"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-[rgb(var(--border))] backdrop-blur bg-black/60"
    >
      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Craftoss
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[rgb(var(--muted))]">
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
      </nav>
    </motion.header>
  );
}

function NavLink({ href, children }: any) {
  return (
    <Link
      href={href}
      className="relative hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}
