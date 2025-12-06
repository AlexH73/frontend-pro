import { useState } from 'react';
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
} from '@mui/material';
import { NewsCard } from '../components/NewsCard';
import { NewsFilters } from '../components/NewsFilters';
import { getThemeStyles } from '../themeStyles';

const categories = [
  'technology',
  'science',
  'business',
  'health',
  'sports',
  'entertainment',
];

export const NewsPage = () => {
  const [page, setPage] = useState(1);

  // Получаем все состояния из Redux
  const category = useSelector(selectCategory);
  const favorites = useSelector(selectFavorites);
  const sortBy = useSelector(selectSortBy);
  const viewMode = useSelector(selectViewMode);
  const showFavorites = useSelector(selectShowFavorites);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useGetNewsQuery(
    { category, page },
    { refetchOnMountOrArgChange: true }
  );

  // Получаем стили для текущей темы
  const themeStyles = getThemeStyles(theme);

  // Обработчики
  const handleCategoryChange = (newCategory: string) => {
    dispatch(setCategory(newCategory));
    setPage(1);
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
    setPage(1);
  };

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  // Фильтрация и сортировка
  let articles = data?.articles || [];

  if (showFavorites && favorites.length > 0) {
    articles = articles.filter((article) => {
      const articleId = `${article.source.id}-${article.publishedAt}`;
      return favorites.includes(articleId);
    });
  }

  if (sortBy === 'newest') {
    articles = [...articles].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } else if (sortBy === 'oldest') {
    articles = [...articles].sort(
      (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );
  }

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
          Loading news...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-red-900/20' : 'bg-red-50'
        }`}
      >
        <div className='text-red-600 text-6xl mb-4 text-center'>⚠️</div>
        <h3
          className={`text-xl font-bold text-center mb-4 ${
            theme === 'dark' ? 'text-red-300' : 'text-red-800'
          }`}
        >
          Error Loading News
        </h3>
        <p
          className={`text-center mb-4 ${
            theme === 'dark' ? 'text-red-200' : 'text-red-600'
          }`}
        >
          {error.toString()}
        </p>
        <div className='text-center'>
          <Button
            onClick={() => refetch()}
            variant='contained'
            color='error'
            className='mr-2'
          >
            Retry
          </Button>
          <Button
            onClick={handleResetFilters}
            variant='outlined'
            sx={themeStyles.button.secondary}
            className='ml-2'
          >
            Reset Filters
          </Button>
        </div>
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
          Stay updated with the latest {category} news
        </p>
      </div>

      {/* Компонент фильтров */}
      <NewsFilters
        category={category}
        categories={categories}
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
                {articles.length} filtered
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Сообщение если нет статей */}
      {articles.length === 0 ? (
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
            <Button
              variant='contained'
              color='primary'
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          )}
        </div>
      ) : (
        <>
          {/* Список новостей с использованием компонента NewsCard */}
          <div
            className={`grid gap-6 mb-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {articles.map((article) => {
              const articleId = `${article.source.id || 'unknown'}-${
                article.publishedAt
              }`;
              const isFavorite = favorites.includes(articleId);
              const isRecent =
                new Date(article.publishedAt) >
                new Date(Date.now() - 24 * 60 * 60 * 1000);

              return (
                <NewsCard
                  key={articleId}
                  article={article}
                  articleId={articleId}
                  theme={theme}
                  viewMode={viewMode}
                  isFavorite={isFavorite}
                  isRecent={isRecent}
                  themeStyles={themeStyles}
                  onToggleFavorite={() => dispatch(toggleFavorite(articleId))}
                  onViewArticle={(id, url) => {
                    dispatch(markAsViewed(id));
                    window.open(url, '_blank');
                  }}
                />
              );
            })}
          </div>

          {/* Пагинация */}
          {!showFavorites && articles.length > 0 && (
            <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
              <div
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Page {page} • {page * 10 - 9}-
                {Math.min(page * 10, data?.totalResults || 0)} of{' '}
                {data?.totalResults || 0} articles
              </div>
              <div className='flex gap-3'>
                <Button
                  variant='outlined'
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  startIcon={<span>←</span>}
                  sx={themeStyles.button.secondary}
                  className='rounded-full px-6'
                >
                  Previous
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  disabled={!data?.articles || data.articles.length < 10}
                  onClick={() => setPage((prev) => prev + 1)}
                  endIcon={<span>→</span>}
                  className='rounded-full px-6'
                >
                  Next Page
                </Button>
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
          💾 Your favorites, filters, and settings are automatically saved and
          will persist between sessions.
        </p>
      </div>
    </div>
  );
};
