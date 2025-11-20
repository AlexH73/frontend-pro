'use client';

import { useEffect, useState, type JSX } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard/ProductCard';

export default function ProductsClient(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch('https://api.escuelajs.co/api/v1/products');

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const arr = await res.json();
    setProducts(arr);
  }
  return (
    <ul className='px-28 py-20'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
