"use client";

import Loader from "@/src/component/Common/Loader";
import { useProducts } from "./hooks/useProduct";
import ProductCard from "./ProductCard.";



export default function ProductsPage() {
  const { products, loading } = useProducts();

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8">Our Products</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
