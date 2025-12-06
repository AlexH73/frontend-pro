// components/NewsCard.tsx
import { IconButton, Tooltip, Button, Chip } from '@mui/material';
import { Favorite, FavoriteBorder, OpenInNew } from '@mui/icons-material';
import PlaceholderImage from '../../../../../../../../assets/images/placeholder.jpg';

interface NewsCardProps {
  article: {
    source: { id: string; name: string }; 
    publishedAt: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    author?: string;
  };
  articleId: string; 
  theme: 'light' | 'dark';
  viewMode: 'grid' | 'list';
  isFavorite: boolean;
  isRecent: boolean;
  themeStyles: any;
  onToggleFavorite: (articleId: string) => void;
  onViewArticle: (articleId: string, url: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  articleId,
  theme,
  viewMode,
  isFavorite,
  isRecent,
  themeStyles,
  onToggleFavorite,
  onViewArticle,
}) => {
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
      {article.urlToImage && (
        <div
          className={`relative overflow-hidden flex-shrink-0 ${
            viewMode === 'list' ? 'md:w-2/5' : 'h-56'
          }`}
        >
          <img
            src={article.urlToImage}
            alt={article.title}
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
            onError={(e) => {
              e.currentTarget.src = `${PlaceholderImage}`;
            }}
          />
          {isRecent && (
            <span className='absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg'>
              NEW
            </span>
          )}
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12' />
        </div>
      )}

      {/* Контент с flex-grow для растягивания */}
      <div
        className={`p-5 flex flex-col flex-grow ${
          viewMode === 'list' && article.urlToImage ? 'md:w-3/5' : ''
        }`}
      >
        {/* Заголовок */}
        <h3 className='font-bold text-xl mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
          {article.title}
        </h3>

        {/* Мета информация */}
        <div className='flex items-center justify-between mb-4'>
          <Chip
            label={article.source.name}
            size='small'
            variant='outlined'
            sx={themeStyles.chip.unselected}
          />
          <span
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Описание с flex-grow для растягивания */}
        <div className='flex-grow mb-4'>
          <p
            className={`line-clamp-3 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {article.description || 'No description available.'}
          </p>
        </div>

        {/* Автор (если есть) */}
        {article.author && (
          <div
            className={`mb-4 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <span className='font-semibold'>By:</span> {article.author}
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
                  onClick={() => onToggleFavorite(articleId)}
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
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }
                    />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <Button
              variant='contained'
              color='primary'
              size='small'
              endIcon={<OpenInNew />}
              onClick={() => onViewArticle(articleId, article.url)}
              className='rounded-full px-4'
            >
              Read Full
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
