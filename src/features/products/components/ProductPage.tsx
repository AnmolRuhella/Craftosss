"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Filter, Grid, List, Package, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";

const CATEGORIES = [
  "All",
  "Decor",
  "Furniture",
  "Pottery",
  "Textiles",
  "Jewelry",
  "Art",
  "Lighting",
  "Accessories",
];

export default function ProductPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return 0;
    });

  const ProductCard = ({ product }: { product: Product }) => (
    <Card 
      onClick={() => router.push(`/product/${product.id}`)}
      className="group cursor-pointer overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.featured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600">
            ⭐ Featured
          </Badge>
        )}
        {product.customizable && (
          <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">
            <Sparkles className="h-3 w-3 mr-1" />
            Customizable
          </Badge>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Add to wishlist functionality
          }}
          className="absolute bottom-3 right-3 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
        >
          <Heart className="h-5 w-5 text-gray-700" />
        </button>
      </div>
      
      <div className="p-6">
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card
      onClick={() => router.push(`/product/${product.id}`)}
      className="group cursor-pointer overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 h-64 overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {product.name}
              </h3>
            </div>
            <div className="flex gap-2">
              {product.featured && (
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                  ⭐ Featured
                </Badge>
              )}
              {product.customizable && (
                <Badge variant="secondary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Customizable
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {product.description}
          </p>
          
          {product.materials && product.materials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.materials.map((material) => (
                <Badge key={material} variant="outline" className="text-xs">
                  {material}
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Package className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Our Collection</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Handcrafted Masterpieces
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover unique, artisan-made products crafted with love and attention to detail
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 bg-white/80 backdrop-blur border-0 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 h-11">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-11 w-11"
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-11 w-11"
              >
                <List className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid/List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
          }>
            {filteredProducts.map((product) =>
              viewMode === "grid" ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <ProductListItem key={product.id} product={product} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
