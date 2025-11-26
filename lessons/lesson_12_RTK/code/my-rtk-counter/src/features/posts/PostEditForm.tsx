import { type FormEvent, type JSX, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { editTitle } from './postsSlice';
import { useSelector } from 'react-redux';
import { selectTheme } from '../theme/themeSlice';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Edit as EditIcon, Close as CloseIcon } from '@mui/icons-material';

export default function PostEditForm(props: { postId: number }): JSX.Element {
  const { postId } = props;
  const [title, setTitle] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);
  const muiTheme = useMuiTheme();
  const fullScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }

    dispatch(editTitle({ id: postId, title: title.trim() }));
    setTitle('');
    setError('');
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setError('');
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setError('');
  };

  return (
    <>
      {/* Edit Button */}
      <Tooltip title='Edit post title' arrow>
        <IconButton
          onClick={handleOpen}
          size='small'
          sx={{
            color: theme === 'dark' ? 'grey.400' : 'grey.600',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: theme === 'dark' ? 'grey.700' : 'grey.100',
            },
          }}
        >
          <EditIcon fontSize='small' />
        </IconButton>
      </Tooltip>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        maxWidth='sm'
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme === 'dark' ? 'grey.800' : 'white',
            backgroundImage: 'none',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: theme === 'dark' ? 'white' : 'grey.900',
          }}
        >
          Edit Post Title
          <IconButton onClick={handleClose} size='small'>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              multiline
              rows={3}
              variant='outlined'
              placeholder='Enter new title...'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              error={!!error}
              helperText={error}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme === 'dark' ? 'grey.900' : 'white',
                  '& fieldset': {
                    borderColor: theme === 'dark' ? 'grey.600' : 'grey.300',
                  },
                  '&:hover fieldset': {
                    borderColor: theme === 'dark' ? 'grey.500' : 'grey.400',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputBase-input': {
                  color: theme === 'dark' ? 'white' : 'grey.900',
                },
                '& .MuiFormHelperText-root': {
                  color: theme === 'dark' ? 'error.light' : 'error.main',
                },
              }}
            />
          </DialogContent>

          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button
              onClick={handleClose}
              variant='outlined'
              sx={{
                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300',
                color: theme === 'dark' ? 'grey.300' : 'grey.700',
                '&:hover': {
                  borderColor: theme === 'dark' ? 'grey.500' : 'grey.400',
                  backgroundColor: theme === 'dark' ? 'grey.700' : 'grey.50',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              variant='contained'
              disabled={!title.trim()}
              sx={{
                minWidth: 100,
              }}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
