import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartTotalQuantity,
} from './cartSlice';
import { type AppDispatch } from '../../app/store';
import PlaceholderImage from '../../../../../../../assets/images/placeholder.jpg';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  ShoppingCartCheckout,
} from '@mui/icons-material';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
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

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col'>
        {/* Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <ShoppingCartCheckout className='w-6 h-6 text-blue-500' />
            <h2 className='text-2xl font-bold text-gray-800'>Shopping Cart</h2>
            <span className='bg-blue-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center'>
              {totalQuantity}
            </span>
          </div>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100'
          >
            <CloseIcon className='w-6 h-6' />
          </button>
        </div>

        {/* Cart Content */}
        <div className='flex-1 overflow-y-auto p-6'>
          {cartItems.length === 0 ? (
            <div className='text-center py-12'>
              <ShoppingCartCheckout className='w-24 h-24 text-gray-300 mx-auto mb-4' />
              <h3 className='text-xl font-bold text-gray-700 mb-2'>
                Your cart is empty
              </h3>
              <p className='text-gray-500'>Add some products to get started!</p>
            </div>
          ) : (
            <div className='space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200'
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className='w-16 h-16 object-contain bg-white rounded-lg border border-gray-200'
                    onError={(e) => {
                      e.currentTarget.src = `${PlaceholderImage}`;
                    }}
                  />

                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-800 line-clamp-2'>
                      {item.title}
                    </h3>
                    <p className='text-green-600 font-bold'>${item.price}</p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className='w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors'
                    >
                      <RemoveIcon className='w-4 h-4' />
                    </button>

                    <span className='w-12 text-center font-semibold'>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className='w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors'
                    >
                      <AddIcon className='w-4 h-4' />
                    </button>
                  </div>

                  <div className='text-right min-w-20'>
                    <p className='font-bold text-gray-800'>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                    title='Remove from cart'
                  >
                    <DeleteIcon className='w-5 h-5' />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className='border-t border-gray-200 p-6 space-y-4'>
            <div className='flex justify-end gap-3 items-center text-lg'>
              <span className='font-semibold text-gray-700'>Total:</span>
              <span className='font-bold text-2xl text-green-600'>
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={handleClearCart}
                className='flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2'
              >
                <DeleteIcon className='w-5 h-5' />
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className='flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors'
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
