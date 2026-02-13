import Navbar from "@/component/Layout/Navbar";
import "@/styles/theme.css"
import "@/styles/globals.css"

export const metadata = {
  title: "Craftoss - Handcrafted Excellence",
  description: "Premium handcrafted products made with love",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
