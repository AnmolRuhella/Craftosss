import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
        <Link href="/" className="font-bold text-xl">Craftoss</Link>
        <Link href="/products">Products</Link>
      </div>
    </nav>
  );
}
