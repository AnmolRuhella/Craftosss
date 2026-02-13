"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Moon, Sun } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Craftoss
          </h1>
          <p className="text-xl text-gray-600">
            Choose your experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Light/Colorful Design */}
          <Card className="p-8 bg-white hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => router.push('/product')}>
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Sun className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
              Classic Design
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Colorful, modern e-commerce experience with detailed product pages and easy ordering
            </p>
            <ul className="space-y-2 mb-6 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                Light & colorful theme
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                Multi-page navigation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                Detailed product pages
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                Grid & list views
              </li>
            </ul>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>

          {/* Dark/Spotify Design */}
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-black hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group" onClick={() => router.push('/showcase')}>
            <div className="flex items-center justify-center w-16 h-16 bg-[#1db954] rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform">
              <Moon className="h-8 w-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 text-center">
              Spotify-Style Showcase
            </h2>
            <p className="text-gray-400 mb-6 text-center">
              Dark, classy single-page design inspired by Spotify with smooth interactions
            </p>
            <ul className="space-y-2 mb-6 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1db954] rounded-full"></div>
                Dark & classy theme
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1db954] rounded-full"></div>
                Single-page experience
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1db954] rounded-full"></div>
                Spotify-style cards
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#1db954] rounded-full"></div>
                Quick view modals
              </li>
            </ul>
            <Button className="w-full bg-[#1db954] hover:bg-[#1ed760] text-black font-bold">
              View Showcase
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Or upload your products
          </p>
          <Button
            variant="outline"
            onClick={() => router.push('/products/upload')}
            className="border-gray-300 hover:bg-gray-100"
          >
            Go to Upload Page
          </Button>
        </div>
      </div>
    </div>
  );
}
