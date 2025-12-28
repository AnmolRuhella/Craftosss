import { ProductEntity } from "./domain/product.entity";


export default function ProductCard({ product }: { product: ProductEntity }) {
  return (
    <div className="bg-white rounded-xl shadow">
      <img
        src={product.primaryImage}
        className="h-52 w-full object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
    </div>
  );
}
