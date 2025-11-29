import { Rating } from '@mui/material';
import {
  Close as CloseIcon,
  AddShoppingCart as CartIcon,
} from '@mui/icons-material';
import { getProductRating, type Product } from './productsSlice';
import PlaceholderImage from '../../../../../../../assets/images/placeholder.jpg';
import { selectTheme } from '../../features/theme/themeSlice';
import { useSelector } from 'react-redux';

interface ViewProductModalProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
  };
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ViewProductModal({
  product,
  onClose,
  onAddToCart,
}: ViewProductModalProps) {
  const rating = getProductRating(product);
  const theme = useSelector(selectTheme);

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}
    >
      <div
        className={`rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <div className='p-0 m-0'>
          <div
            className={`flex p-6 justify-between items-center mb-6 pb-4 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-gray-800 to-gray-700'
                : 'bg-gradient-to-br from-white to-zinc-200'
            }`}
          >
            <h2
              className={`text-3xl font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              Product Details
            </h2>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100'
            >
              <CloseIcon className='w-6 h-6' />
            </button>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Product Image */}
            <div className='flex flex-col items-center'>
              <div
                className={`w-full max-w-md border rounded-lg p-4 ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-full h-96 object-contain'
                  onError={(e) => {
                    e.currentTarget.src = `${PlaceholderImage}`;
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className='space-y-6 px-6'>
              <div>
                <h3
                  className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {product.title}
                </h3>
                <div className='flex items-center gap-4 mb-4'>
                  <span className='text-4xl font-bold text-green-600'>
                    ${product.price}
                  </span>
                  <span
                    className={`text-sm font-medium px-4 py-2 rounded-full capitalize transition-colors duration-300 ${
                      theme === 'dark'
                        ? 'bg-blue-900 text-blue-200'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {product.category}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div
                  className={`flex items-center px-4 py-2 rounded-lg border transition-colors duration-300 ${
                    theme === 'dark'
                      ? 'text-gray-300 bg-gray-400 border-gray-300'
                      : 'text-gray-500 bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <Rating
                    value={rating.rate}
                    precision={0.1}
                    readOnly
                    size='medium'
                  />
                  <span className='font-semibold text-gray-800 ml-2'>
                    {rating.rate}
                  </span>
                  <span className='text-gray-500 ml-2'>
                    ({rating.count} reviews)
                  </span>
                </div>
                <span className='text-sm text-gray-500'>
                  Product ID: #{product.id}
                </span>
              </div>

              <div>
                <h3
                  className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  Description
                </h3>
                <p
                  className={`text-lg mb-3 leading-relaxed transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {product.description}
                </p>
              </div>

              <div className='bg-gray-50 rounded-lg p-6 border border-gray-200'>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                  Product Information
                </h3>
                <div className='grid grid-cols-2 gap-6'>
                  <div>
                    <span className='font-semibold text-gray-700 block mb-1'>
                      Category:
                    </span>
                    <p className='text-gray-600 capitalize'>
                      {product.category}
                    </p>
                  </div>
                  <div>
                    <span className='font-semibold text-gray-700 block mb-1'>
                      Price:
                    </span>
                    <p className='text-gray-600'>${product.price}</p>
                  </div>
                  <div>
                    <span className='font-semibold text-gray-700 block mb-1'>
                      Rating:
                    </span>
                    <p className='text-gray-600'>{rating.rate} / 5</p>
                  </div>
                  <div>
                    <span className='font-semibold text-gray-700 block mb-1'>
                      Reviews:
                    </span>
                    <p className='text-gray-600'>{rating.count}</p>
                  </div>
                </div>
              </div>

              <div className='flex gap-4 pt-4'>
                <button
                  onClick={handleAddToCart}
                  className='bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 flex-1 justify-center'
                >
                  <CartIcon className='w-5 h-5' />
                  Add to Cart
                </button>
                <button
                  onClick={onClose}
                  className='bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex-1'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
