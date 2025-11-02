import { useEffect, type JSX } from 'react';
import type Product from './types/Product';
import { Link } from 'react-router-dom';
import style from './ProductsPage.module.css';
import { useApi } from '../../hooks/useApi/useApi';

export default function ProductsPage(): JSX.Element {
    const { data: products, loading, error, get } = useApi<Product[]>();

    useEffect(() => {
      get('https://fakestoreapi.com/products');
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
        Error loading products: {error.message}
        <button
          onClick={() => get('https://fakestoreapi.com/products')}
          className='btn btn-secondary ms-3'
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className='container mt-4'>
      <h1 className='h2 mb-4'>Our Products</h1>
      <div className='row'>
        {products?.map((product) => (
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
