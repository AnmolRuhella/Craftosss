export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-stone-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      {children}
    </section>
  );
}
