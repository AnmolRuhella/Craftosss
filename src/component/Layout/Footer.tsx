import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-[rgb(var(--muted))]">
        <p>© {new Date().getFullYear()} Craftoss</p>

        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition">
            Instagram
          </Link>
          <Link href="#" className="hover:text-white transition">
            WhatsApp
          </Link>
        </div>
      </div>
    </footer>
  );
}
