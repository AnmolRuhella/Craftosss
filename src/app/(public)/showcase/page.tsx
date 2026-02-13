"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Sparkles, TrendingUp, Clock, Star } from "lucide-react";
import DarkNavbar from "@/components/DarkNavbar";
import SpotifyProductCard from "@/components/SpotifyProductCard";
import ProductQuickView from "@/components/ProductQuickView";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

export default function ShowcasePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Filter products by category
  const featuredProducts = products.filter(p => p.featured);
  const availableProducts = products.filter(p => p.stock && p.stock > 0);
  const upcomingProducts = products.filter(p => !p.stock || p.stock === 0);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <DarkNavbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-[#121212] to-[#121212]" />
        
        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-[#1db954]" />
              <span className="text-sm font-medium">Premium Handcrafted Collection</span>
            </div>
            
            <h1 className="text-7xl font-bold mb-6 leading-tight">
              Where Art Meets
              <span className="block bg-gradient-to-r from-[#1db954] to-[#1ed760] bg-clip-text text-transparent">
                Craftsmanship
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Discover unique, handcrafted products made with love and attention to detail. 
              Each piece tells a story of tradition and innovation.
            </p>
            
            <div className="flex gap-4">
              <Button className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold px-8 py-6 rounded-full text-lg">
                Explore Collection
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Star className="h-6 w-6 text-[#1db954]" />
                  <h2 className="text-3xl font-bold">Featured Products</h2>
                </div>
                <p className="text-gray-400">Handpicked by our curators</p>
              </div>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                Show all
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {featuredProducts.slice(0, 5).map((product) => (
                <SpotifyProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Available Now Section */}
        {availableProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-6 w-6 text-[#1db954]" />
                  <h2 className="text-3xl font-bold">Available Now</h2>
                </div>
                <p className="text-gray-400">Ready to ship immediately</p>
              </div>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                Show all
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {availableProducts.slice(0, 5).map((product) => (
                <SpotifyProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Products Section */}
        {upcomingProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-6 w-6 text-[#1db954]" />
                  <h2 className="text-3xl font-bold">Coming Soon</h2>
                </div>
                <p className="text-gray-400">Made to order masterpieces</p>
              </div>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                Show all
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {upcomingProducts.slice(0, 5).map((product) => (
                <SpotifyProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section */}
        {products.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Our Full Collection</h2>
                <p className="text-gray-400">
                  Browse all {products.length} products
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => (
                <SpotifyProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <section className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#282828] rounded-full mb-6">
              <Sparkles className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No Products Yet</h3>
            <p className="text-gray-400 mb-6">
              Start by uploading your first product
            </p>
            <Button className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full px-8">
              Upload Product
            </Button>
          </section>
        )}
      </div>

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Craftoss</h4>
              <p className="text-sm text-gray-400">
                Handcrafted products made with love and attention to detail.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Featured</li>
                <li className="hover:text-white cursor-pointer">Available</li>
                <li className="hover:text-white cursor-pointer">Coming Soon</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Instagram</li>
                <li className="hover:text-white cursor-pointer">Facebook</li>
                <li className="hover:text-white cursor-pointer">Twitter</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>© 2026 Craftoss. All rights reserved. Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
