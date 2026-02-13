import ProductDetailsPage from "@/features/products/components/ProductDetailsPage";

export default function Page({ params }: { params: { id: string } }) {
  return <ProductDetailsPage id={params.id} />;
}
