"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/craftosslogo.png"
            alt="Craftoss Logo"
            width={44}
            height={44}
            priority
          />
          <span className="text-lg font-semibold text-gray-900 hidden sm:block">
            Craftoss
          </span>
        </Link>

        {/* RIGHT: Navigation */}
        <nav className="flex items-center space-x-6">
  {NAV_ITEMS.map(item => {
    const isActive =
      item.href === "/"
        ? pathname === "/"
        : pathname.startsWith(item.href);

    return (
      <Button
        key={item.href}
        asChild
        variant="ghost"
        size="lg"
        className={cn(
          "relative font-normal text-gray-700 hover:text-gray-900 hover:bg-gray-100",
          isActive && "text-gray-900"
        )}
      >
        <Link href={item.href}>
          {item.label}

          {isActive && (
            <span className="absolute left-1/2 -bottom-1 h-[2px] w-6 -translate-x-1/2 rounded-full bg-gray-900" />
          )}
        </Link>
      </Button>
    );
  })}
</nav>


      </div>
    </header>
  );
}
