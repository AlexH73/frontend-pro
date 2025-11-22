import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
  setViewingProduct,
  clearError,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectViewingProduct,
  getProductRating,
  type Product,
} from './productsSlice';
import { addToCart, selectCartItemCount } from '../cart/cartSlice';
import { type AppDispatch } from '../../app/store';
import { CircularProgress, Rating } from '@mui/material';
import {
  RemoveRedEye as ViewIcon,
  Delete as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AddShoppingCart as CartIcon,
  ShoppingCartOutlined as ShoppingCart,
} from '@mui/icons-material';
import ViewProductModal from './ViewProductModal';
import PlaceholderImage from '../../../../../../../assets/images/placeholder.jpg';
import Cart from '../cart/Cart';

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const viewingProduct = useSelector(selectViewingProduct);
  const cartItemCount = useSelector(selectCartItemCount);

  // Состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  // Состояние для корзины
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Вычисляем индексы для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Функции для открытия/закрытия корзины
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        // Если удалили последний элемент на странице, переходим на предыдущую страницу
        if (currentProducts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Failed to delete product:', error);
      }
    }
  };

  const handleView = (product: Product) => {
    dispatch(setViewingProduct(product));
  };

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchProducts());
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-96'>
        <CircularProgress size='4rem' />
        <p className='mt-4 text-gray-600 text-lg'>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto mt-8 p-6'>
        <div className='bg-red-50 border border-red-200 rounded-xl p-6 text-center'>
          <div className='text-red-600 text-6xl mb-4'>⚠️</div>
          <h3 className='text-xl font-bold text-red-800 mb-2'>
            Error Loading Products
          </h3>
          <p className='text-red-600 mb-4'>{error}</p>
          <button
            onClick={handleRetry}
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h2 className='text-3xl font-bold text-gray-800'>Products</h2>
          <p className='text-gray-600 mt-1'>
            Page {currentPage} of {totalPages} • Showing{' '}
            {currentProducts.length} of {products.length} products
          </p>
        </div>

        {/* Селектор количества элементов на странице */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <label htmlFor='itemsPerPage' className='text-sm text-gray-600'>
              Items per page:
            </label>
            <select
              id='itemsPerPage'
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества
              }}
              className='border border-gray-300 rounded-lg px-3 py-1 text-sm'
            >
              <option value='4'>4</option>
              <option value='8'>8</option>
              <option value='12'>12</option>
              <option value='16'>16</option>
              <option value='20'>20</option>
            </select>
          </div>

          {/* Кнопка корзины */}
          <button
            onClick={openCart}
            className='relative bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors'
          >
            <ShoppingCart className='w-6 h-6' />
            {cartItemCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'>
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {products.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-6xl mb-4'>📦</div>
          <h3 className='text-xl font-bold text-gray-700 mb-2'>No Products</h3>
          <p className='text-gray-500'>No products available</p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {currentProducts.map((product) => {
              const rating = getProductRating(product);

              return (
                <div
                  key={product.id}
                  className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer'
                  onClick={() => handleView(product)}
                >
                  <div className='relative'>
                    <img
                      src={product.image}
                      alt={product.title}
                      className='w-full h-48 object-contain p-4 bg-white'
                      onError={(e) => {
                        e.currentTarget.src = `${PlaceholderImage}`;
                      }}
                    />
                    <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(product);
                        }}
                        className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors'
                        title='View product'
                      >
                        <ViewIcon className='w-4 h-4' />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(product.id);
                        }}
                        className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors'
                        title='Delete product'
                      >
                        <DeleteIcon className='w-4 h-4' />
                      </button>
                    </div>
                  </div>

                  <div className='p-4 flex-grow flex flex-col'>
                    <div className='flex-grow'>
                      <h3 className='font-semibold text-gray-800 text-lg mb-2 line-clamp-2'>
                        {product.title}
                      </h3>
                      <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                        {product.description}
                      </p>
                      <div className='flex items-center justify-between mb-3'>
                        <span className='text-2xl font-bold text-green-600'>
                          ${product.price}
                        </span>
                        <span className='bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded capitalize'>
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-500'>
                      <div className='flex items-center gap-1'>
                        <Rating
                          value={rating.rate}
                          precision={0.1}
                          size='small'
                          readOnly
                        />
                        <span>({rating.count})</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm'
                      >
                        <CartIcon className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className='flex justify-center items-center gap-4 mt-8'>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors'
              >
                <ChevronLeftIcon className='w-4 h-4' />
                Previous
              </button>

              <div className='flex gap-1'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-8 h-8 rounded-lg transition-colors ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors'
              >
                Next
                <ChevronRightIcon className='w-4 h-4' />
              </button>
            </div>
          )}
        </>
      )}
      {/* Modal for viewing single product */}
      {viewingProduct && (
        <ViewProductModal
          product={viewingProduct}
          onClose={() => dispatch(setViewingProduct(null))}
          onAddToCart={handleAddToCart}
        />
      )}
      {/* Modal for viewing cart */}
      {isCartOpen && <Cart isOpen={isCartOpen} onClose={closeCart} />}
    </div>
  );
}
