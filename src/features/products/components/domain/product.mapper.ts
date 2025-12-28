import { ProductEntity } from "./product.entity";

export function mapProduct(data: any) {
  return new ProductEntity(
    data.id,
    data.name,
    data.description,
    data.images,
    data.category,
    data.video
  );
}
