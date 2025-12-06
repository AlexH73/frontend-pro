// features/news/NewsPage.tsx
import { useState, useMemo } from 'react';
import { useGetNewsQuery } from '../newsApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFavorites,
  selectCategory,
  selectSortBy,
  selectViewMode,
  selectShowFavorites,
  toggleFavorite,
  markAsViewed,
  setCategory,
  setSortBy,
  setViewMode,
  setShowFavorites,
  resetFilters,
  clearFavorites,
} from '../newsSlice';
import { selectTheme } from '../../theme/themeSlice';
import {
  CircularProgress,
  Button,
  type SelectChangeEvent,
  Alert,
  Snackbar,
} from '@mui/material';
import { NewsCard } from './NewsCard';
import { NewsFilters } from './NewsFilters';
import { getThemeStyles } from './utils/themeStyles';
import { NEWS_CATEGORIES } from '../types/types';

export const NewsPage = () => {
  const [errorSnackbar, setErrorSnackbar] = useState<string | null>(null);

  // Получаем состояние из Redux
  const category = useSelector(selectCategory);
  const favorites = useSelector(selectFavorites);
  const sortBy = useSelector(selectSortBy);
  const viewMode = useSelector(selectViewMode);
  const showFavorites = useSelector(selectShowFavorites);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  // Получаем данные от API
  const { data, isLoading, error, refetch } = useGetNewsQuery(
    { category },
    { refetchOnMountOrArgChange: true }
  );

  // Получаем стили для текущей темы
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  // Обработчики
  const handleCategoryChange = (newCategory: string) => {
    dispatch(setCategory(newCategory));
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value as 'newest' | 'oldest'));
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    dispatch(setViewMode(mode));
  };

  const handleShowFavoritesChange = (show: boolean) => {
    dispatch(setShowFavorites(show));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  const handleToggleFavorite = (articleId: string) => {
    dispatch(toggleFavorite(articleId));
  };

  const handleViewArticle = (articleId: string, url: string) => {
    dispatch(markAsViewed(articleId));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRetry = () => {
    refetch();
  };

  // Фильтрация и сортировка статей
  const processedArticles = useMemo(() => {
    let articles = data?.results || [];

    // Фильтрация по избранным
    if (showFavorites && favorites.length > 0) {
      articles = articles.filter((article) =>
        favorites.includes(article.article_id)
      );
    }

    // Сортировка
    if (sortBy === 'newest') {
      articles = [...articles].sort(
        (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      );
    } else if (sortBy === 'oldest') {
      articles = [...articles].sort(
        (a, b) => new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime()
      );
    }

    return articles;
  }, [data?.results, showFavorites, favorites, sortBy]);

  // Показываем ошибку, если есть
  if (error) {
    console.error('News fetch error:', error);
    if (!errorSnackbar) {
      setErrorSnackbar('Failed to load news. Please try again.');
    }
  }

  // Лоадер
  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-96 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}
      >
        <CircularProgress size={60} />
        <p
          className={`mt-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          Loading news from NewsData.io...
        </p>
      </div>
    );
  }

  // Сообщение об отсутствии API ключа
  const apiKeyMissing = !import.meta.env.VITE_NEWSDATA_API_KEY;
  if (apiKeyMissing) {
    return (
      <div
        className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'
        }`}
      >
        <div className='text-yellow-600 text-6xl mb-4 text-center'>🔑</div>
        <h3 className='text-xl font-bold text-center mb-4 text-yellow-800'>
          API Key Required
        </h3>
        <p className='text-center mb-4 text-yellow-600'>
          Please add your NewsData.io API key to environment variables:
        </p>
        <div className='bg-gray-800 text-green-400 p-4 rounded mb-4 font-mono text-sm'>
          VITE_NEWSDATA_API_KEY=your_api_key_here
        </div>
        <p className='text-center text-sm text-gray-600 dark:text-gray-400'>
          Get your free API key from{' '}
          <a
            href='https://newsdata.io'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            newsdata.io
          </a>
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900'
      }`}
    >
      {/* Заголовок */}
      <div className='mb-8'>
        <h1 className='text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          News Dashboard
        </h1>
        <p
          className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
        >
          Real-time news from NewsData.io - {category} category
        </p>
      </div>

      {/* Компонент фильтров */}
      <NewsFilters
        category={category}
        categories={NEWS_CATEGORIES}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        showFavorites={showFavorites}
        onShowFavoritesChange={handleShowFavoritesChange}
        favoritesCount={favorites.length}
        theme={theme}
        themeStyles={themeStyles}
        onResetFilters={handleResetFilters}
        onClearFavorites={handleClearFavorites}
        hasFavorites={favorites.length > 0}
      />

      {/* Статистика */}
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
        <div
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-gray-800 to-gray-900'
              : 'bg-gradient-to-r from-white to-gray-50 shadow-sm'
          }`}
        >
          <span className='font-semibold'>Total: </span>
          <span className='text-blue-600 dark:text-blue-400 font-bold'>
            {data?.totalResults || 0} articles
          </span>
        </div>

        <div className='flex gap-4'>
          <div
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-900/30 to-purple-800/30'
                : 'bg-gradient-to-r from-purple-50 to-pink-50 shadow-sm'
            }`}
          >
            <span className='font-semibold'>Favorites: </span>
            <span className='text-purple-600 dark:text-purple-400 font-bold'>
              {favorites.length}
            </span>
          </div>

          {showFavorites && (
            <div
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-yellow-900/30 to-yellow-800/30'
                  : 'bg-gradient-to-r from-yellow-50 to-orange-50 shadow-sm'
              }`}
            >
              <span className='font-semibold'>Showing: </span>
              <span className='text-yellow-600 dark:text-yellow-400 font-bold'>
                {processedArticles.length} filtered
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Сообщение если нет статей */}
      {processedArticles.length === 0 ? (
        <div
          className={`text-center py-16 rounded-2xl shadow-lg transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-800 to-gray-900'
              : 'bg-gradient-to-br from-white to-gray-50 shadow'
          }`}
        >
          <div className='text-8xl mb-6'>📰</div>
          <h3 className='text-2xl font-bold mb-3'>
            {showFavorites ? 'No Favorite Articles Yet' : 'No Articles Found'}
          </h3>
          <p
            className={`mb-6 max-w-md mx-auto ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {showFavorites
              ? "Mark articles as favorites by clicking the heart icon, and they'll appear here."
              : 'Try selecting a different category or check your internet connection.'}
          </p>
          {showFavorites ? (
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleShowFavoritesChange(false)}
            >
              Show All Articles
            </Button>
          ) : (
            <Button variant='contained' color='primary' onClick={handleRetry}>
              Retry Loading
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Список новостей */}
          <div
            className={`grid gap-6 mb-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {processedArticles.map((article) => {
              const isFavorite = favorites.includes(article.article_id);
              const isViewed = false; // Можно добавить логику для просмотренных

              return (
                <NewsCard
                  key={article.article_id}
                  article={article}
                  theme={theme}
                  viewMode={viewMode}
                  isFavorite={isFavorite}
                  isViewed={isViewed}
                  themeStyles={themeStyles}
                  onToggleFavorite={handleToggleFavorite}
                  onViewArticle={handleViewArticle}
                />
              );
            })}
          </div>

          {/* Пагинация */}
          {!showFavorites && processedArticles.length > 0 && (
            <div
              className={`mt-8 p-6 rounded-2xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700'
                  : 'bg-gradient-to-r from-blue-50 to-gray-100 border border-gray-200'
              }`}
            >
              <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                <div className='flex-1'>
                  <h4
                    className={`font-bold text-lg mb-2 ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    Free Tier Information
                  </h4>
                  <p
                    className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    NewsData.io free tier provides{' '}
                    <span className='font-semibold'>10 latest articles</span>{' '}
                    per request. Upgrade to a paid plan for more articles,
                    pagination, and advanced features.
                  </p>
                </div>
                <div className='flex flex-col items-end'>
                  <div
                    className={`text-sm mb-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Showing {processedArticles.length} of{' '}
                    {Math.min(data?.totalResults || 0, 10)} articles
                  </div>
                  <a
                    href='https://newsdata.io/pricing'
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    View Pricing Plans
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Информация о сохранении */}
      <div
        className={`mt-10 p-4 rounded-xl text-center ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-blue-50'
        }`}
      >
        <p
          className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          💾 Your favorites and settings are automatically saved via Redux
          Persist.
        </p>
        <p
          className={`text-xs mt-1 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          Powered by{' '}
          <a
            href='https://newsdata.io'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            NewsData.io
          </a>{' '}
          • Free tier: 200 requests/day
        </p>
      </div>

      {/* Снекбар для ошибок */}
      <Snackbar
        open={!!errorSnackbar}
        autoHideDuration={6000}
        onClose={() => setErrorSnackbar(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErrorSnackbar(null)}
          severity='error'
          className='w-full'
        >
          {errorSnackbar}
          <Button
            color='inherit'
            size='small'
            onClick={handleRetry}
            className='ml-2'
          >
            Retry
          </Button>
        </Alert>
      </Snackbar>
    </div>
  );
};
