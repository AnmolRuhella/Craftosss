"use client";

import Link from "next/link";
import { Search, ShoppingCart, Menu, X, Sparkles, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DarkNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1db954] to-[#1ed760] rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-br from-[#1db954] to-[#1ed760] p-2.5 rounded-2xl shadow-lg">
                <Sparkles className="h-6 w-6 text-black" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">
                Craftoss
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-1">
                Handcrafted Excellence
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="w-full bg-[#242424] border-0 pl-10 text-white placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#1db954]/50 transition-all"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="relative text-gray-400 hover:text-[#1db954] transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#1db954] to-[#1ed760] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <Link href="/products/upload">
              <Button 
                size="sm"
                className="bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full px-6 shadow-lg shadow-[#1db954]/30 hover:shadow-xl hover:shadow-[#1db954]/40 transition-all"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#1db954] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="w-full bg-[#242424] border-0 pl-10 text-white placeholder:text-gray-400"
              />
            </div>
            <Link href="/products/upload" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#1db954] hover:bg-[#1ed760] text-black font-bold">
                <Upload className="mr-2 h-4 w-4" />
                Upload Product
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
