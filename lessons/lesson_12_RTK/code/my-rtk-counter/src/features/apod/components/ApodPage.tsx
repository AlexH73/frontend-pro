import { type JSX, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../theme/themeSlice';
import { fetchAllApodData, setSelectedImageIndex } from '../apodSlice';
import { selectApodLoading, selectApodError } from '../selectors';
import TodayApod from './TodayApod';
import ApodGrid from './ApodGrid';
import ApodModal from './ApodModal';
import {
  Alert,
  CircularProgress,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  RocketLaunch as RocketIcon,
} from '@mui/icons-material';

export default function ApodPage(): JSX.Element {
  const theme = useSelector(selectTheme);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectApodLoading);
  const error = useAppSelector(selectApodError);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllApodData());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAllApodData());
  };

  const handleTodayImageClick = () => {
    dispatch(setSelectedImageIndex(0));
    setModalOpen(true);
  };

  const handleGridImageClick = (index: number) => {
    dispatch(setSelectedImageIndex(index));
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
          : 'bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50'
      }`}
    >
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <RocketIcon
              className={`w-12 h-12 ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}
            />
            <Typography
              variant='h3'
              component='h1'
              className={`font-bold transition-colors duration-300 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              NASA Astronomy Picture of the Day
            </Typography>
          </div>
          <Typography
            variant='h6'
            className={`transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Explore the cosmos with NASA's daily images and videos
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity='error'
            sx={{ mb: 3 }}
            action={
              <Button color='inherit' size='small' onClick={handleRefresh}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress size={60} />
              <Typography
                variant='h6'
                sx={{ mt: 2 }}
                className={theme === 'dark' ? 'text-white' : 'text-gray-700'}
              >
                Loading cosmic wonders from NASA...
              </Typography>
            </Box>
          </Box>
        )}

        {/* Today's APOD */}
        {!loading && !error && (
          <>
            <div className='mb-10'>
              <TodayApod onImageClick={handleTodayImageClick} />
            </div>

            {/* Gallery Header */}
            <Box
              sx={{
                mb: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography
                variant='h4'
                className={`font-bold transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Discover More Cosmic Wonders
              </Typography>
              <Button
                variant='outlined'
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{
                  borderColor: theme === 'dark' ? 'grey.600' : 'grey.300',
                  color: theme === 'dark' ? 'grey.300' : 'grey.700',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: theme === 'dark' ? 'grey.800' : 'grey.100',
                  },
                }}
              >
                Refresh Gallery
              </Button>
            </Box>

            {/* APOD Grid */}
            <div className='mb-10'>
              <ApodGrid onCardClick={handleGridImageClick} />
            </div>

            {/* Modal */}
            <ApodModal open={modalOpen} onClose={handleModalClose} />

            {/* Info Section */}
            <Paper
              elevation={theme === 'dark' ? 1 : 2}
              sx={{
                mt: 6,
                p: 3,
                backgroundColor: theme === 'dark' ? 'grey.800' : 'white',
              }}
            >
              <Typography
                variant='h6'
                gutterBottom
                className={theme === 'dark' ? 'text-white' : 'text-gray-900'}
              >
                🌌 About This Gallery
              </Typography>
              <Typography
                variant='body2'
                className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
                paragraph
              >
                This gallery features NASA's Astronomy Picture of the Day
                (APOD). The top image is today's featured picture, while the
                grid below shows random images from APOD's extensive archive
                dating back to 1995.
              </Typography>
              <Typography
                variant='body2'
                className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              >
                <strong>Tip:</strong> Click on any image to view it in
                fullscreen mode with HD quality (if available). Use arrow keys
                or on-screen buttons to navigate between images in the gallery.
              </Typography>
            </Paper>
          </>
        )}
      </div>
    </div>
  );
}
