import { mapProduct } from "../domain/product.mapper";

export async function fetchProducts() {
  const res = await fetch("/api/products");
  const data = await res.json();
  return data.map(mapProduct);
}
