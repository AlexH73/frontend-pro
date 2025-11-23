import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartTotalQuantity,
} from './cartSlice';
import type { AppDispatch } from '../../app/store';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon,
  ShoppingCartCheckout,
} from '@mui/icons-material';
import PlaceholderImage from '../../../../../../../assets/images/placeholder.jpg';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-8  bg-radial-[at_25%_25%] from-white to-zinc-200 to-75% p-6'>
          <div className='flex max-md:flex-col items-center justify-between gap-4'>
            <Link
              to='/products'
              className='flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors'
            >
              <ArrowBackIcon className='w-5 h-5 max-sm:text-xs' />
              Back to Products
            </Link>
            <div className='flex items-center gap-3'>
              <ShoppingCartIcon className='w-8 h-8 text-blue-500' />
              <h1 className='text-3xl max-lg:text-xl max-sm:text-xs font-bold text-gray-900'>
                Shopping Cart
              </h1>
              {totalQuantity > 0 && (
                <span className='bg-blue-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center'>
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className='bg-white rounded-xl shadow-md p-12 text-center'>
            <ShoppingCartIcon className='w-24 h-24 text-gray-300 mx-auto mb-6' />
            <h2 className='text-2xl font-bold text-gray-700 mb-4'>
              Your cart is empty
            </h2>
            <p className='text-gray-500 mb-8 max-w-md mx-auto'>
              Looks like you haven't added any products to your cart yet. Start
              shopping to find amazing products!
            </p>
            <Link
              to='/products'
              className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors'
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className='bg-white rounded-xl shadow-md overflow-hidden'>
            {/* Cart Items */}
            <div className='p-6'>
              <div className='space-y-4'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex max-lg:flex-wrap items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200'
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-20 h-20 object-contain bg-white rounded-lg border border-gray-200'
                      onError={(e) => {
                        e.currentTarget.src = `${PlaceholderImage}`;
                      }}
                    />

                    <div className='flex-1 min-w-10'>
                      <h3 className='font-semibold text-gray-800 text-lg truncate'>
                        {item.title}
                      </h3>
                      <p className='text-green-600 font-bold text-xl'>
                        ${item.price}
                      </p>
                    </div>

                    <div className='flex items-center gap-3'>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className='w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors'
                      >
                        <RemoveIcon className='w-5 h-5' />
                      </button>

                      <span className='w-12 text-center font-semibold text-lg'>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className='w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors'
                      >
                        <AddIcon className='w-5 h-5' />
                      </button>
                    </div>

                    <div className='text-right min-w-24'>
                      <p className='font-bold text-gray-800 text-lg'>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className='align-end p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                      title='Remove from cart'
                    >
                      <DeleteIcon className='w-6 h-6' />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className='border-t border-gray-200 p-6 bg-gray-50'>
              <div className='flex justify-between items-center mb-6'>
                <div className='text-left'>
                  <p className='text-lg font-semibold text-gray-700'>
                    Total Items: {totalQuantity}
                  </p>
                  <p className='text-lg font-semibold text-gray-700'>
                    Total price:{' '}
                    <span className='text-2xl font-bold text-green-600'>
                      ${cartTotal.toFixed(2)}
                    </span>
                  </p>
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={handleClearCart}
                    className='px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2'
                  >
                    <DeleteIcon className='w-5 h-5' />
                    <span className='max-md:hidden'>Clear Cart</span>
                  </button>
                  <button
                    onClick={handleCheckout}
                    className='px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors'
                  >
                    <ShoppingCartCheckout className='w-5 h-5' />
                    <span className='max-md:hidden'>Proceed to Checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
