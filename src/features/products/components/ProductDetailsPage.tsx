"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, 
  Star, 
  Package, 
  Ruler, 
  Palette,
  CheckCircle,
  Truck,
  Shield,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import OrderForm from "@/components/OrderForm";
import { Product } from "@/types/product";

export default function ProductDetailsPage({ id }: { id: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Button onClick={() => router.push("/product")}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden bg-white border-0 shadow-xl">
              <div className="relative aspect-square">
                <Image
                  src={product.images[selectedImage] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600">
                    ⭐ Featured
                  </Badge>
                )}
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-purple-600 shadow-lg scale-105"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Videos */}
            {product.videos && product.videos.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Product Videos</h3>
                {product.videos.map((video, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <video
                      src={video}
                      controls
                      className="w-full"
                    />
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details & Order */}
          <div className="space-y-8">
            {/* Product Info */}
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600">5.0 (Handcrafted)</span>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-purple-100">per piece</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {product.dimensions && (
                  <Card className="p-4 bg-white">
                    <Ruler className="h-5 w-5 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Dimensions</p>
                    <p className="font-semibold text-gray-900">{product.dimensions}</p>
                  </Card>
                )}
                
                {product.materials && product.materials.length > 0 && (
                  <Card className="p-4 bg-white">
                    <Palette className="h-5 w-5 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Materials</p>
                    <p className="font-semibold text-gray-900">
                      {product.materials.join(", ")}
                    </p>
                  </Card>
                )}
                
                {product.stock !== undefined && (
                  <Card className="p-4 bg-white">
                    <Package className="h-5 w-5 text-purple-600 mb-2" />
                    <p className="text-sm text-gray-600">Stock</p>
                    <p className="font-semibold text-gray-900">
                      {product.stock > 0 ? `${product.stock} available` : "Made to order"}
                    </p>
                  </Card>
                )}

                {product.customizable && (
                  <Card className="p-4 bg-white">
                    <CheckCircle className="h-5 w-5 text-green-600 mb-2" />
                    <p className="text-sm text-gray-600">Customizable</p>
                    <p className="font-semibold text-gray-900">Yes</p>
                  </Card>
                )}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-3 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <Truck className="h-5 w-5 text-purple-600" />
                  <span>Free shipping across India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>Handcrafted with premium materials</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span>Made with love by artisans</span>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <OrderForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
