import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/types';
import { type JSX } from 'react';

export default async function ProductsServerVersion(): Promise<JSX.Element> {
  const res = await fetch('https://api.escuelajs.co/api/v1/products', {
    next: { tags: ["products"] },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await res.json();
  return (
    <ul className='px-28 py-20'>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}


// default -> SSG - server side generation
// -> только при первом рендере -> только для неизменяемой статической 

// next: { revalidate: 60 } -> ISR -> incremental server regeneration
// каждое n времени генерируется новый
// через 40 сек - получит сохраненный вариант
// 180 сек - делает еще один запрос -> возвращает опять старый вариант
// но готовит новый для следующих пользователей

// next: { revalidate: 0 } -> SSR -> генерация при каждом запросе 
// -> гораздо более затратно для сервера

// cache: "no-store",  -> SSR - такой же

// SSG - не обновляется после
// SSR - когда при каждом запросе на сервер обновляется
// ISR - по таймеру