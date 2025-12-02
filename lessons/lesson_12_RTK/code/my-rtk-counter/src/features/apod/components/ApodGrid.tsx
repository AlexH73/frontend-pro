import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../theme/themeSlice';
import { selectRandomApods } from '../selectors';
import {
  Image as ImageIcon,
  VideoCameraBack as VideoIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

interface ApodGridProps {
  onCardClick: (index: number) => void;
}

export default function ApodGrid({ onCardClick }: ApodGridProps): JSX.Element {
  const theme = useSelector(selectTheme);
  const randomApods = useSelector(selectRandomApods);

  if (!randomApods.length) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`animate-pulse rounded-xl ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}
            style={{ height: '200px' }}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {randomApods.map((apod, index) => {
        const isVideo = apod.media_type === 'video';

        return (
          <div
            key={`${apod.date}-${index}`}
            className={`group relative rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            } border`}
            onClick={() => onCardClick(index + 1)} // +1 потому что 0 индекс - today's apod
          >
            {/* Media */}
            <div className='relative h-48 overflow-hidden'>
              {isVideo ? (
                <div className='absolute inset-0 bg-black flex items-center justify-center'>
                  <VideoIcon className='w-12 h-12 text-white opacity-70' />
                  <img
                    src={getYouTubeThumbnail(apod.url)}
                    alt={apod.title}
                    className='w-full h-full object-cover opacity-50'
                  />
                </div>
              ) : (
                <img
                  src={apod.url}
                  alt={apod.title}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                  loading='lazy'
                />
              )}

              {/* Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='absolute bottom-3 left-3 right-3'>
                  <h3 className='text-white font-semibold text-sm line-clamp-2'>
                    {apod.title}
                  </h3>
                </div>
              </div>

              {/* Media Type Badge */}
              <div className='absolute top-2 right-2'>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isVideo ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  {isVideo ? (
                    <>
                      <VideoIcon className='w-3 h-3' />
                      <span>Video</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className='w-3 h-3' />
                      <span>Image</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div
              className={`p-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className='flex items-center gap-2 mb-2'>
                <CalendarIcon
                  className={`w-3 h-3 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <span
                  className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {new Date(apod.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h3
                className={`font-medium text-sm line-clamp-2 mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {apod.title}
              </h3>

              <p
                className={`text-xs line-clamp-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {apod.explanation}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Вспомогательная функция для YouTube thumbnail
const getYouTubeThumbnail = (url: string): string => {
  try {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  } catch (error) {
    console.warn('Failed to extract YouTube thumbnail:', error);
  }
  return '/video-placeholder.jpg';
};
