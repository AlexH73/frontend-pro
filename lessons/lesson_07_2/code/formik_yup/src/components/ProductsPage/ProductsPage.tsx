import { useEffect, useState, type JSX } from 'react';
import type Product from './types/Product';
import { Link } from 'react-router-dom';
import style from './ProductsPage.module.css';

export default function ProductsPage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  async function loadProducts(): Promise<void> {
    try {
      setLoading(true);
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) {
        throw new Error(`Failed to load products: ${res.status}`);
      }
      const arr = await res.json();
      setProducts(arr);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '50vh' }}
      >
        <div className='spinner-border text-primary' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-danger m-3' role='alert'>
        Error loading products: {error}
        <button onClick={loadProducts} className='btn btn-secondary ms-3'>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h1 className='h2 mb-4'>Our Products</h1>
      <div className='row'>
        {products.map((product) => (
          <div className='col-lg-4 col-md-6 mb-4' key={product.id}>
            <div className={`card h-100 ${style.productCard}`}>
              <div className={style.imageContainer}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={`card-img-top ${style.productImage}`}
                />
              </div>
              <div className='card-body d-flex flex-column'>
                <span className='badge bg-secondary mb-2 align-self-start'>
                  {product.category}
                </span>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text flex-grow-1 text-truncate'>
                  {product.description}
                </p>
                <div className='mt-auto'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <strong className='h5 text-primary mb-0'>
                      ${product.price}
                    </strong>
                    <Link
                      to={String(product.id)}
                      className='btn btn-primary btn-sm'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
