"use client";

import Image from "next/image";
import { Play, Heart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";

interface SpotifyProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function SpotifyProductCard({ product, onClick }: SpotifyProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-md bg-[#282828]">
        <Image
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Play Button */}
          <button className="absolute bottom-2 right-2 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform hover:bg-[#1ed760]">
            <Play className="h-5 w-5 text-black fill-black ml-0.5" />
          </button>
          
          {/* Heart Icon */}
          <button className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
            <Heart className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Badges */}
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-[#1db954] text-black border-0">
            Featured
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-bold text-white truncate group-hover:underline">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-[#1db954]">
            ₹{product.price.toLocaleString()}
          </span>
          <Badge variant="outline" className="border-gray-600 text-gray-400">
            {product.category}
          </Badge>
        </div>
      </div>
    </div>
  );
}
