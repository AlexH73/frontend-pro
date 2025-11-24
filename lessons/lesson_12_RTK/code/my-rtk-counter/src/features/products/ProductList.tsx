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
import { addToCart } from '../cart/cartSlice';
import { type AppDispatch } from '../../app/store';
import { CircularProgress, Rating, Tooltip } from '@mui/material';
import {
  RemoveRedEye as ViewIcon,
  Delete as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AddShoppingCart as CartIcon,
  //   ShoppingCartOutlined as ShoppingCart,
} from '@mui/icons-material';
import ViewProductModal from './ViewProductModal';
import PlaceholderImage from '../../../../../../../assets/images/placeholder.jpg';
import { selectTheme } from '../../features/theme/themeSlice';
// import Cart from '../cart/Cart';

export default function ProductsList() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const viewingProduct = useSelector(selectViewingProduct);
  //   const cartItemCount = useSelector(selectCartItemCount);

  // Состояние для темы
  const theme = useSelector(selectTheme);

  // Состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // Состояние для корзины
  //   const [isCartOpen, setIsCartOpen] = useState(false);

  // Вычисляем индексы для текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Функции для открытия/закрытия корзины
  //   const openCart = () => setIsCartOpen(true);
  //   const closeCart = () => setIsCartOpen(false);

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
      <div
        className={`flex flex-col items-center justify-center min-h-96 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <CircularProgress size='4rem' />
        <p
          className={`mt-4 text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-2xl mx-auto mt-8 p-6'>
        <div
          className={`rounded-xl p-6 text-center transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-red-900 border-red-700'
              : 'bg-red-50 border-red-200'
          } border`}
        >
          <div className='text-red-600 text-6xl mb-4'>⚠️</div>
          <h3
            className={`text-xl font-bold mb-2 ${
              theme === 'dark' ? 'text-red-300' : 'text-red-800'
            }`}
          >
            Error Loading Products
          </h3>
          <p
            className={`mb-4 ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`}
          >
            {error}
          </p>
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
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
    >
      <div
        className={`flex justify-between items-center mb-6 p-6 rounded-lg transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-gray-800 to-gray-700'
            : 'bg-gradient-to-br from-white to-zinc-200'
        }`}
      >
        <div>
          <h2
            className={`text-3xl font-bold transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            Products
          </h2>
          <p
            className={`mt-1 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Page {currentPage} of {totalPages} • Showing{' '}
            {currentProducts.length} of {products.length} products
          </p>
        </div>

        {/* Селектор количества элементов на странице */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <label
              htmlFor='itemsPerPage'
              className={`text-sm transition-colors duration-300 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Items per page:
            </label>
            <select
              id='itemsPerPage'
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Сбрасываем на первую страницу при изменении количества
              }}
              className={`rounded-lg px-3 py-1 text-sm border transition-colors duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value='4'>4</option>
              <option value='8'>8</option>
              <option value='12'>12</option>
              <option value='16'>16</option>
              <option value='20'>20</option>
            </select>
          </div>

          {/* Кнопка корзины */}
          {/* <button
            onClick={openCart}
            className='relative bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors'
          >
            <ShoppingCart className='w-6 h-6' />
            {cartItemCount > 0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center'>
                {cartItemCount}
              </span>
            )}
          </button> */}
        </div>
      </div>
      {products.length === 0 ? (
        <div className='text-center py-12'>
          <div className='text-6xl mb-4'>📦</div>
          <h3
            className={`text-xl font-bold mb-2 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            No Products
          </h3>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
            No products available
          </p>
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {currentProducts.map((product) => {
              const rating = getProductRating(product);

              return (
                <div
                  key={product.id}
                  className={`rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className='relative'>
                    <img
                      src={product.image}
                      alt={product.title}
                      className='w-full h-48 object-contain p-4'
                      onError={(e) => {
                        e.currentTarget.src = `${PlaceholderImage}`;
                      }}
                    />
                    <div className='absolute top-3 right-2 flex gap-3 lg:opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Tooltip title='View product' arrow>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(product);
                          }}
                          className='bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full shadow-lg transition-colors cursor-pointer'
                          title='View product'
                        >
                          <ViewIcon className='w-2 h-2' />
                        </button>
                      </Tooltip>
                      <Tooltip title='Delete product' arrow>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(product.id);
                          }}
                          className='bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-lg transition-colors cursor-pointer'
                          title='Delete product'
                        >
                          <DeleteIcon className='w-2 h-2' />
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className='p-4 flex-grow flex flex-col'>
                    <div className='flex-grow'>
                      <h3
                        className={`font-semibold text-lg mb-2 line-clamp-2 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-800'
                        }`}
                      >
                        {product.title}
                      </h3>
                      <p
                        className={`text-sm mb-3 line-clamp-2 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {product.description}
                      </p>
                      <div className='flex items-center justify-between mb-3'>
                        <span className='text-2xl font-bold text-green-600'>
                          ${product.price}
                        </span>
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded capitalize transition-colors duration-300 ${
                            theme === 'dark'
                              ? 'bg-blue-900 text-blue-200'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-500'>
                      <div
                        className={`flex items-center gap-1 transition-colors duration-300 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
                        }`}
                      >
                        <Rating
                          value={rating.rate}
                          precision={0.1}
                          size='small'
                          readOnly
                        />
                        <span>({rating.count})</span>
                      </div>
                      <Tooltip title='Add to cart' arrow>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg font-semibold transition-colors flex items-center gap-2 text-sm cursor-pointer'
                        >
                          <CartIcon className='w-4 h-4' />
                        </button>
                      </Tooltip>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:bg-gray-700 text-white'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
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
                      className={`w-8 h-8 rounded-lg transition-colors duration-300 ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  theme === "dark"
                    ? 'border-gray-600 hover:bg-gray-700 text-white'
                    : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                }`}
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
      {/* {isCartOpen && <Cart isOpen={isCartOpen} onClose={closeCart} />} */}
    </div>
  );
}
