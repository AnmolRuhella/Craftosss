"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard.";
import { useProducts } from "./hooks/useProduct";

export default function FeaturedProducts() {
  const { products, loading } = useProducts();

  if (loading) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-4">
          Featured Creations
        </h2>
        <p className="text-[rgb(var(--muted))] mb-12 max-w-xl">
          A curated selection of our finest handmade pieces.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {products.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
