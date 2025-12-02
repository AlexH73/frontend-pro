import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/hooks';
import { selectTheme } from '../../theme/themeSlice';
import {
  selectSelectedApod,
  selectHasNextImage,
  selectHasPrevImage,
} from '../selectors';
import {
  clearSelectedImageIndex,
  navigateToNextImage,
  navigateToPrevImage,
} from '../apodSlice';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBackIos as PrevIcon,
  ArrowForwardIos as NextIcon,
  Download as DownloadIcon,
  OpenInNew as OpenIcon,
  CalendarToday as CalendarIcon,
  Copyright as CopyrightIcon,
  Image as ImageIcon,
  VideoCameraBack as VideoIcon,
} from '@mui/icons-material';

interface ApodModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ApodModal({
  open,
  onClose,
}: ApodModalProps): JSX.Element {
  const theme = useSelector(selectTheme);
  const selectedApod = useSelector(selectSelectedApod);
  const hasNext = useSelector(selectHasNextImage);
  const hasPrev = useSelector(selectHasPrevImage);
  const dispatch = useAppDispatch();

  if (!selectedApod) return <></>;

  const isVideo = selectedApod.media_type === 'video';
  const hasHd = !isVideo && selectedApod.hdurl;

  const handleClose = () => {
    dispatch(clearSelectedImageIndex());
    onClose();
  };

  const handleNext = () => {
    dispatch(navigateToNextImage());
  };

  const handlePrev = () => {
    dispatch(navigateToPrevImage());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' && hasNext) {
      handleNext();
    } else if (e.key === 'ArrowLeft' && hasPrev) {
      handlePrev();
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xl'
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme === 'dark' ? 'grey.900' : 'background.paper',
          maxHeight: '90vh',
          height: '90vh',
          margin: 0,
        },
      }}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${
            theme === 'dark' ? 'grey.700' : 'grey.200'
          }`,
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            color: theme === 'dark' ? 'white' : 'text.primary',
          }}
        >
          {selectedApod.title}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Main Content */}
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          p: 0,
          overflow: 'hidden',
        }}
      >
        {/* Left Column - Media */}
        <Box
          sx={{
            flex: { md: 1 },
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            backgroundColor: 'black',
            minHeight: { xs: '50vh', md: 'auto' },
          }}
        >
          {/* Navigation Buttons */}
          {hasPrev && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                zIndex: 10,
              }}
            >
              <PrevIcon />
            </IconButton>
          )}

          {hasNext && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
                zIndex: 10,
              }}
            >
              <NextIcon />
            </IconButton>
          )}

          {/* Media */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {isVideo ? (
              <iframe
                src={selectedApod.url}
                className='w-full h-full'
                title={selectedApod.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            ) : (
              <img
                src={hasHd ? selectedApod.hdurl : selectedApod.url}
                alt={selectedApod.title}
                className='w-full h-full object-contain'
                style={{ maxHeight: '70vh' }}
              />
            )}
          </Box>

          {/* Media Actions */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              gap: 1,
              borderTop: `1px solid ${
                theme === 'dark' ? 'grey.700' : 'grey.200'
              }`,
              backgroundColor: theme === 'dark' ? 'grey.800' : 'grey.100',
            }}
          >
            <a
              href={selectedApod.hdurl}
              target='_blank'
              rel='noopener noreferrer'
              className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              <OpenIcon sx={{ fontSize: 16 }} />
              Open
            </a>

            {hasHd && (
              <a
                href={selectedApod.hdurl}
                target='_blank'
                rel='noopener noreferrer'
                className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <DownloadIcon sx={{ fontSize: 16 }} />
                Download HD
              </a>
            )}
          </Box>
        </Box>

        {/* Right Column - Info */}
        <Box
          sx={{
            flex: { md: 1 },
            p: 3,
            overflow: 'auto',
            maxHeight: { md: '70vh' },
          }}
        >
          {/* Meta Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: theme === 'dark' ? 'grey.400' : 'grey.600',
              }}
            >
              <CalendarIcon sx={{ fontSize: 16 }} />
              <Typography variant='body2'>
                {new Date(selectedApod.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: theme === 'dark' ? 'grey.400' : 'grey.600',
              }}
            >
              {isVideo ? (
                <VideoIcon sx={{ fontSize: 16 }} />
              ) : (
                <ImageIcon sx={{ fontSize: 16 }} />
              )}
              <Typography variant='body2'>
                {isVideo ? 'Video' : 'Image'}
              </Typography>
            </Box>

            {selectedApod.copyright && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: theme === 'dark' ? 'grey.400' : 'grey.600',
                }}
              >
                <CopyrightIcon sx={{ fontSize: 16 }} />
                <Typography variant='body2'>
                  © {selectedApod.copyright}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Explanation */}
          <Typography
            variant='body1'
            sx={{
              lineHeight: 1.8,
              color: theme === 'dark' ? 'grey.300' : 'text.secondary',
              whiteSpace: 'pre-line',
            }}
          >
            {selectedApod.explanation}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
