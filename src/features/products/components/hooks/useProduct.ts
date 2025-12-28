"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../services/product.service";
import { ProductEntity } from "../domain/product.entity";

export function useProducts() {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}
