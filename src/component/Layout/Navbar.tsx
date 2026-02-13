"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X, Sparkles, Upload } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Showcase", href: "/showcase" },
  { label: "Products", href: "/product" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100/20 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-2.5 rounded-2xl shadow-lg">
                <Sparkles className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Craftoss
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase -mt-1">
                Handcrafted Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center mx-4">
            {NAV_ITEMS.map(item => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm lg:text-base font-semibold transition-all duration-200 rounded-lg whitespace-nowrap",
                    isActive 
                      ? "text-purple-600 bg-purple-50" 
                      : "text-gray-700 hover:text-purple-600 hover:bg-purple-50/70"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Shopping Bag */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Button>

            {/* Upload Product Button - Desktop */}
            <Link href="/products/upload" className="hidden md:block">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100/20">
            <nav className="flex flex-col space-y-1">
              {NAV_ITEMS.map(item => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium transition-all duration-200 rounded-lg",
                      isActive
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-purple-50/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Mobile Upload Button */}
              <Link href="/products/upload" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Product
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
