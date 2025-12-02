import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../theme/themeSlice';
import { selectTodayApod } from '../selectors';
import {
  CalendarToday as CalendarIcon,
  Copyright as CopyrightIcon,
  Image as ImageIcon,
  VideoCameraBack as VideoIcon,
} from '@mui/icons-material';

interface TodayApodProps {
  onImageClick: () => void;
}

export default function TodayApod({
  onImageClick,
}: TodayApodProps): JSX.Element {
  const theme = useSelector(selectTheme);
  const todayApod = useSelector(selectTodayApod);

  if (!todayApod) {
    return (
      <div
        className={`animate-pulse rounded-2xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
        }`}
        style={{ height: '500px' }}
      ></div>
    );
  }

  const isVideo = todayApod.media_type === 'video';

  return (
    <div
      className={`rounded-2xl shadow-2xl overflow-hidden border ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-purple-900 to-gray-900 border-gray-700'
          : 'bg-gradient-to-br from-purple-50 via-white to-blue-50 border-gray-200'
      }`}
    >
      {/* Header */}
      <div
        className={`p-6 ${
          theme === 'dark'
            ? 'bg-gray-800 bg-opacity-50'
            : 'bg-white bg-opacity-80'
        }`}
      >
        <div className='mb-3'>
          <div className='flex items-center gap-2 mb-2'>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                theme === 'dark'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              Today's Picture
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {isVideo ? (
                <>
                  <VideoIcon className='w-4 h-4' />
                  <span>Video</span>
                </>
              ) : (
                <>
                  <ImageIcon className='w-4 h-4' />
                  <span>Image</span>
                </>
              )}
            </div>
          </div>

          <h1
            className={`text-2xl md:text-3xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {todayApod.title}
          </h1>

          <div className='flex flex-wrap items-center gap-4 text-sm'>
            <div
              className={`flex items-center gap-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              <CalendarIcon className='w-4 h-4' />
              <span>
                {new Date(todayApod.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            {todayApod.copyright && (
              <div
                className={`flex items-center gap-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <CopyrightIcon className='w-4 h-4' />
                <span>© {todayApod.copyright}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Media */}
      <div className='relative group cursor-pointer' onClick={onImageClick}>
        {isVideo ? (
          // Video Preview
          <div className='aspect-video w-full bg-black relative'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='text-white text-center'>
                <VideoIcon className='w-16 h-16 mx-auto mb-2 opacity-80' />
                <p className='text-lg'>Click to view video</p>
              </div>
            </div>
            <img
              src={getYouTubeThumbnail(todayApod.url)}
              alt={todayApod.title}
              className='w-full h-full object-cover opacity-50'
            />
          </div>
        ) : (
          // Image
          <div className='relative'>
            <img
              src={todayApod.url}
              alt={todayApod.title}
              className='w-full max-h-[600px] object-contain transition-transform duration-300 group-hover:scale-100'
              loading='lazy'
            />
            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
              <div
                className={`p-4 rounded-full backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800 bg-opacity-70 text-white'
                    : 'bg-white bg-opacity-80 text-gray-800'
                }`}
              >
                <span className='font-medium'>Click to view fullscreen</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div
        className={`p-6 z-50 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      >
        <p
          className={`line-clamp-3 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {todayApod.explanation}
        </p>
      </div>
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
