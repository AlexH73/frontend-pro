import { Rating } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { getProductRating } from './productsSlice';
import PlaceholderImage from '../../../../../../../assets/images/placeholder.jpg';

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
}

export default function ViewProductModal({
  product,
  onClose,
}: ViewProductModalProps) {
  const rating = getProductRating(product);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6 pb-4 border-b border-gray-200'>
            <h2 className='text-3xl font-bold text-gray-800'>
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
              <div className='w-full max-w-md bg-white border border-gray-200 rounded-lg p-4'>
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
            <div className='space-y-6'>
              <div>
                <h1 className='text-4xl font-bold text-gray-800 mb-2'>
                  {product.title}
                </h1>
                <div className='flex items-center gap-4 mb-4'>
                  <span className='text-4xl font-bold text-green-600'>
                    ${product.price}
                  </span>
                  <span className='bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full capitalize'>
                    {product.category}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-4'>
                <div className='flex items-center bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200'>
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
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                  Description
                </h3>
                <p className='text-gray-600 leading-relaxed text-lg'>
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
