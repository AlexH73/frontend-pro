'use client';

import type { Product } from '@/types';
import { type JSX } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}
export default function ProductCard({
  product,
}: ProductCardProps): JSX.Element {

  const router = useRouter()

  function handleDelete(id: number) {
    fetchDelete(id);
  }

  async function fetchDelete(id: number) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <li>
      <h3>{product.title}</h3>
      <Image
        src={product.images[0]}
        alt={'Product ' + product.title}
        width={200}
        height={200}
      />
      <button
        className='border rounded px-2 py-1 cursor-pointer'
        type='button'
        onClick={() => {
          handleDelete(product.id);
        }}
      >
        Delete
      </button>
      <Link
        className='border rounded px-4 py-2 cursor-pointer'
        href={`/products/server-version/${product.id}`}
      >
        Details
      </Link>
    </li>
  );
}
