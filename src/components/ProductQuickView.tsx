"use client";

import Image from "next/image";
import { X, ShoppingCart, Heart, Share2, Package, Ruler, Palette } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-[#181818] border-gray-800 text-white p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Image */}
          <div className="relative aspect-square bg-[#121212]">
            <Image
              src={product.images[0] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.featured && (
              <Badge className="absolute top-4 left-4 bg-[#1db954] text-black border-0">
                Featured
              </Badge>
            )}
          </div>

          {/* Right: Details */}
          <div className="p-8 overflow-y-auto max-h-[80vh]">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <Badge variant="outline" className="border-gray-600 text-gray-400 mb-3">
                  {product.category}
                </Badge>
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-400">{product.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#1db954]">
                ₹{product.price.toLocaleString()}
              </span>
            </div>

            {/* Product Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {product.dimensions && (
                <div className="bg-[#242424] p-4 rounded-lg">
                  <Ruler className="h-5 w-5 text-[#1db954] mb-2" />
                  <p className="text-xs text-gray-400">Dimensions</p>
                  <p className="font-semibold">{product.dimensions}</p>
                </div>
              )}
              
              {product.stock !== undefined && (
                <div className="bg-[#242424] p-4 rounded-lg">
                  <Package className="h-5 w-5 text-[#1db954] mb-2" />
                  <p className="text-xs text-gray-400">Stock</p>
                  <p className="font-semibold">
                    {product.stock > 0 ? `${product.stock} available` : "Made to order"}
                  </p>
                </div>
              )}
              
              {product.materials && product.materials.length > 0 && (
                <div className="bg-[#242424] p-4 rounded-lg col-span-2">
                  <Palette className="h-5 w-5 text-[#1db954] mb-2" />
                  <p className="text-xs text-gray-400 mb-2">Materials</p>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material) => (
                      <Badge
                        key={material}
                        variant="secondary"
                        className="bg-[#2a2a2a] text-white border-0"
                      >
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {product.customizable && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-[#1db954] rounded-full"></div>
                  Customization available
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#1db954] rounded-full"></div>
                Handcrafted with premium materials
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-[#1db954] rounded-full"></div>
                Free shipping across India
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-[#1db954] hover:bg-[#1ed760] text-black font-bold h-12 rounded-full">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Order Now
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-[#282828] rounded-full"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-[#282828] rounded-full"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
