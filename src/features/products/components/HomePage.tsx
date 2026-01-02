import Link from "next/link";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <section className="py-24 text-center">
      <h1 className="text-5xl font-bold mb-4">Craftoss</h1>
      <p className="text-muted-foreground mb-6">
        Handmade creations with heart
      </p>
      <Link
        href="/products"
        className="bg-black text-white px-6 py-3 rounded"
      >
        View Products
      </Link>
        <Hero />
    </section>
  );
}
