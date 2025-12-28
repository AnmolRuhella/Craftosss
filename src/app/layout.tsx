
import Navbar from "../component/Layout/Navbar";
import Footer from "../component/Layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-stone-800">
        <Navbar />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
