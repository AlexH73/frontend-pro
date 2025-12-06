import {
  IconButton,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tooltip,
  Badge,
  type SelectChangeEvent,
} from '@mui/material';
import {
  Favorite,
  GridView,
  ViewList,
  ClearAll,
  Delete,
  Sort,
} from '@mui/icons-material';

interface NewsFiltersProps {
  category: string;
  categories: readonly string[];
  onCategoryChange: (category: string) => void;
  sortBy: 'newest' | 'oldest';
  onSortChange: (event: SelectChangeEvent) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  showFavorites: boolean;
  onShowFavoritesChange: (show: boolean) => void;
  favoritesCount: number;
  theme: 'light' | 'dark';
  themeStyles: any;
  onResetFilters: () => void;
  onClearFavorites: () => void;
  hasFavorites: boolean;
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  category,
  categories,
  onCategoryChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  showFavorites,
  onShowFavoritesChange,
  favoritesCount,
  theme,
  themeStyles,
  onResetFilters,
  onClearFavorites,
  hasFavorites,
}) => {
  return (
    <div
      className={`mb-8 p-4 rounded-2xl shadow-lg transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
          : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200'
      }`}
    >
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4'>
        {/* Категории */}
        <div className='flex flex-wrap gap-2'>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat.charAt(0).toUpperCase() + cat.slice(1)}
              onClick={() => onCategoryChange(cat)}
              variant={category === cat ? 'filled' : 'outlined'}
              size='small'
              sx={
                category === cat
                  ? themeStyles.chip.selected
                  : themeStyles.chip.unselected
              }
              className={`transition-all duration-200 ${
                category === cat ? 'shadow-md scale-105' : ''
              }`}
            />
          ))}
        </div>

        {/* Кнопка сброса */}
        <Tooltip title='Reset all filters to default'>
          <Button
            variant='outlined'
            color='secondary'
            size='small'
            startIcon={<ClearAll />}
            onClick={onResetFilters}
            sx={themeStyles.button.secondary}
          >
            Reset Filters
          </Button>
        </Tooltip>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-4'>
        {/* Левая часть: Фильтры */}
        <div className='flex flex-wrap gap-3 items-center'>
          {/* Фильтр по фаворитам */}
          <Tooltip
            title={showFavorites ? 'Show All Articles' : 'Show Favorites Only'}
          >
            <Button
              variant={showFavorites ? 'contained' : 'outlined'}
              color='secondary'
              size='small'
              startIcon={<Favorite />}
              onClick={() => onShowFavoritesChange(!showFavorites)}
              sx={showFavorites ? themeStyles.button.secondary : {}}
              className='relative'
            >
              Favorites
              <Badge
                badgeContent={favoritesCount}
                color='error'
                className='absolute -top-2 -right-2'
              />
            </Button>
          </Tooltip>

          {/* Очистка избранного */}
          {hasFavorites && (
            <Tooltip title='Clear all favorites'>
              <IconButton size='small' color='error' onClick={onClearFavorites}>
                <Delete />
              </IconButton>
            </Tooltip>
          )}

          {/* Сортировка */}
          <FormControl size='small' className='min-w-[140px]'>
            <InputLabel id='sort-by-label' sx={themeStyles.label}>
              Sort By
            </InputLabel>
            <Select
              labelId='sort-by-label'
              value={sortBy}
              label='Sort By'
              onChange={onSortChange}
              sx={themeStyles.select}
              MenuProps={{
                PaperProps: {
                  sx: themeStyles.menu,
                },
              }}
            >
              <MenuItem value='newest'>
                <div className='flex items-center gap-2'>
                  <Sort className='rotate-180' />
                  Newest First
                </div>
              </MenuItem>
              <MenuItem value='oldest'>
                <div className='flex items-center gap-2'>
                  <Sort />
                  Oldest First
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Правая часть: Вид отображения */}
        <div className='flex gap-1'>
          <Tooltip title='Grid View'>
            <IconButton
              size='small'
              onClick={() => onViewModeChange('grid')}
              color={viewMode === 'grid' ? 'primary' : 'default'}
              sx={{
                ...(viewMode === 'grid' && theme === 'dark'
                  ? { backgroundColor: 'rgba(37, 99, 235, 0.3)' }
                  : viewMode === 'grid' && theme === 'light'
                  ? { backgroundColor: 'rgba(59, 130, 246, 0.1)' }
                  : {}),
                '&:hover': {
                  backgroundColor:
                    theme === 'dark'
                      ? 'rgba(37, 99, 235, 0.5)'
                      : 'rgba(59, 130, 246, 0.2)',
                },
              }}
            >
              <GridView />
            </IconButton>
          </Tooltip>
          <Tooltip title='List View'>
            <IconButton
              size='small'
              onClick={() => onViewModeChange('list')}
              color={viewMode === 'list' ? 'primary' : 'default'}
              sx={{
                ...(viewMode === 'list' && theme === 'dark'
                  ? { backgroundColor: 'rgba(37, 99, 235, 0.3)' }
                  : viewMode === 'list' && theme === 'light'
                  ? { backgroundColor: 'rgba(59, 130, 246, 0.1)' }
                  : {}),
                '&:hover': {
                  backgroundColor:
                    theme === 'dark'
                      ? 'rgba(37, 99, 235, 0.5)'
                      : 'rgba(59, 130, 246, 0.2)',
                },
              }}
            >
              <ViewList />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
