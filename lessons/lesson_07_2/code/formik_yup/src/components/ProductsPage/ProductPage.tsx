import { useEffect, useState, type JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import type Product from './types/Product';
import style from "./ProductsPage.module.css"

export default function ProductPage(): JSX.Element {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!productId) {
      setError('Product ID is required');
      setLoading(false);
      return;
    }

    async function loadProduct(): Promise<void> {
      try {
        setLoading(true);
        const res = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        if (!res.ok) {
          throw new Error(`Failed to load product: ${res.status}`);
        }
        const obj = await res.json();
        setProduct(obj);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  if (error) {
    return (
      <div className='alert alert-danger m-3' role='alert'>
        Error loading product: {error}
        <Link to='../products' className='btn btn-secondary ms-3'>
          Back to products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='alert alert-warning m-3' role='alert'>
        Product not found
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6'>
          <img
            src={product.image}
            alt={product.title}
            className={`img-fluid rounded shadow ${style.image}`}
          />
        </div>
        <div className='col-md-6'>
          <div className='card h-100'>
            <div className='card-body'>
              <span className='badge bg-secondary mb-2'>
                {product.category}
              </span>
              <h1 className='card-title h3'>{product.title}</h1>
              <p className='card-text text-muted'>{product.description}</p>
              <div className='mt-auto'>
                <h3 className='text-primary'>${product.price}</h3>
                <Link to='../products' className='btn btn-outline-primary mt-3'>
                  ← Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
