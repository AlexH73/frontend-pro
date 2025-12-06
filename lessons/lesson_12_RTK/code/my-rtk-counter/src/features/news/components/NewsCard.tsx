import { IconButton, Tooltip, Button, Chip } from '@mui/material';
import { Favorite, FavoriteBorder, OpenInNew } from '@mui/icons-material';
import PlaceholderImage from '../../../../../../../../assets/images/placeholder.jpg';
import type { NewsDataArticle } from '../types/types';

interface NewsCardProps {
  article: NewsDataArticle;
  theme: 'light' | 'dark';
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  isViewed: boolean;
  themeStyles: any;
  onToggleFavorite: (articleId: string) => void;
  onViewArticle: (articleId: string, url: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  theme,
  viewMode,
  isFavorite,
  themeStyles,
  onToggleFavorite,
  onViewArticle,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const imageUrl = article.image_url || PlaceholderImage;

  return (
    <div
      className={`group overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] flex flex-col h-full ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
          : 'bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-gray-100'
      } shadow-lg hover:shadow-2xl border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      } ${viewMode === 'list' ? 'md:flex-row' : ''}`}
    >
      {/* Изображение */}
      <div
        className={`relative overflow-hidden flex-shrink-0 ${
          viewMode === 'list' ? 'md:w-2/5' : 'h-56'
        }`}
      >
        <img
          src={imageUrl}
          alt={article.title}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
          loading='lazy'
          onError={(e) => {
            e.currentTarget.src = `${PlaceholderImage}`;
          }}
        />
        {/* Бейдж для новых статей (менее 24 часов) */}
        {Date.now() - new Date(article.pubDate).getTime() <
          24 * 60 * 60 * 1000 && (
          <span className='absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg'>
            NEW
          </span>
        )}
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12' />
      </div>

      {/* Контент */}
      <div
        className={`p-5 flex flex-col flex-grow ${
          viewMode === 'list' ? 'md:w-3/5' : ''
        }`}
      >
        {/* Заголовок */}
        <h3 className='font-bold text-xl mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
          {article.title}
        </h3>

        {/* Мета информация */}
        <div className='flex items-center justify-between mb-4 flex-wrap gap-2'>
          <div className='flex items-center gap-2'>
            <Chip
              label={article.source_name}
              size='small'
              variant='outlined'
              sx={themeStyles.chip.unselected}
            />
            {article.category && article.category.length > 0 && (
              <Chip
                label={article.category[0]}
                size='small'
                sx={{
                  ...themeStyles.chip.unselected,
                  backgroundColor:
                    theme === 'dark'
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(59, 130, 246, 0.05)',
                }}
              />
            )}
          </div>
          <span
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {formatDate(article.pubDate)}
          </span>
        </div>

        {/* Описание */}
        <div className='flex-grow mb-4'>
          <p
            className={`line-clamp-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {article.description ||
              article.content?.substring(0, 200) ||
              'No description available.'}
          </p>
        </div>

        {/* Автор */}
        {article.creator && article.creator.length > 0 && (
          <div
            className={`mb-4 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <span className='font-semibold'>By: </span>
            {article.creator.join(', ')}
          </div>
        )}

        {/* Ключевые слова */}
        {article.keywords && article.keywords.length > 0 && (
          <div className='mb-4 flex flex-wrap gap-1'>
            {article.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        {/* Кнопки действий */}
        <div className='mt-auto pt-4 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <Tooltip
                title={
                  isFavorite ? 'Remove from favorites' : 'Add to favorites'
                }
              >
                <IconButton
                  size='small'
                  onClick={() => onToggleFavorite(article.article_id)}
                  sx={{
                    ...(isFavorite && {
                      animation: 'pulse 2s infinite',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.1)' },
                        '100%': { transform: 'scale(1)' },
                      },
                    }),
                  }}
                >
                  {isFavorite ? (
                    <Favorite sx={{ color: '#ef4444' }} />
                  ) : (
                    <FavoriteBorder
                      className={
                        theme === 'dark'
                          ? 'text-gray-300 hover:text-gray-800'
                          : ''
                      }
                    />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outlined'
                size='small'
                onClick={() => onViewArticle(article.article_id, article.link)}
                className='rounded-full px-4'
              >
                Read
              </Button>
              <Button
                variant='contained'
                color='primary'
                size='small'
                endIcon={<OpenInNew />}
                onClick={() => onViewArticle(article.article_id, article.link)}
                className='rounded-full px-4'
              >
                Full Article
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
