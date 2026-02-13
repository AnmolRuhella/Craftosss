"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-28 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-semibold tracking-tight"
        >
          Handcrafted
          <span className="block text-indigo-400">With Heart & Soul</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl mx-auto text-[rgb(var(--muted))] text-lg"
        >
          Discover premium handmade creations designed to elevate your space.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link
            href="/products/upload"
            className="rounded-full bg-white text-black px-8 py-3 text-sm font-medium hover:bg-neutral-200 transition"
          >
            Explore Products
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-[rgb(var(--border))] px-8 py-3 text-sm text-white hover:border-white transition"
          >
            Our Story
          </Link>
        </motion.div>

        <Button
        variant="ghost"
        size = "lg"
        className="m-5"
        >Test Button</Button>

      </div>
    </section>
  );
}
