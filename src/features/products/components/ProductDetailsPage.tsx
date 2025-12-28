export default function ProductDetailsPage({ id }: { id: string }) {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <h1 className="text-3xl font-bold">Product ID: {id}</h1>
      <p className="mt-4 text-muted-foreground">
        Detailed product page (to be expanded)
      </p>
    </div>
  );
}
