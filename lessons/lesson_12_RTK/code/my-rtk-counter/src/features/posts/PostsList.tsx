import { useEffect, useState, type JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFiltered } from './selectors';
import { loadPostsByWord, loadPosts } from './postsSlice';
import PostEditForm from './PostEditForm';
import CommentsList from '../../components/CommentsList/CommentsList';
import { useSelector } from 'react-redux';
import { selectTheme } from '../theme/themeSlice';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Chip,
  Box,
  Typography,
  Container,
  IconButton,
  Tooltip,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Tag as TagIcon,
  Comment as CommentIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';

export default function PostsList(): JSX.Element {
  const posts = useAppSelector(selectFiltered);
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);
  const muiTheme = useTheme();
  const [word, setWord] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      if (word.trim() === '') {
        await dispatch(loadPosts());
      } else {
        await dispatch(loadPostsByWord(word));
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(loadData, 500);
    return () => clearTimeout(timeoutId);
  }, [dispatch, word]);

  const getReactionColor = (reactions: number) => {
    if (reactions > 10) return 'error';
    if (reactions > 5) return 'warning';
    return 'action';
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant='h3'
          component='h1'
          gutterBottom
          color={theme === 'dark' ? 'white' : 'text.primary'}
          fontWeight='bold'
        >
          Community Forum
        </Typography>
        <Typography
          variant='h6'
          color={theme === 'dark' ? 'grey.400' : 'text.secondary'}
          sx={{ mb: 4 }}
        >
          Discover and discuss with our community
        </Typography>
      </Box>

      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant='outlined'
          placeholder='Search posts by keyword...'
          value={word}
          onChange={(e) => setWord(e.target.value)}
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  color: 'action.active',
                }}
              />
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme === 'dark' ? 'grey.900' : 'white',
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
      </Box>

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Posts List - Using Tailwind CSS grid instead of MUI Grid */}
      <div className='space-y-6'>
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{
              transition: 'all 0.3s ease-in-out',
              backgroundColor:
                theme === 'dark' ? 'grey.800' : 'background.paper',
              border:
                theme === 'dark' ? '1px solid grey.700' : '1px solid grey.200',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: muiTheme.shadows[8],
              },
            }}
          >
            <CardHeader
              title={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant='h6'
                    component='h2'
                    color={theme === 'dark' ? 'white' : 'text.primary'}
                    sx={{
                      fontWeight: 600,
                      flex: 1,
                      mr: 2,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <PostEditForm postId={post.id} />
                </Box>
              }
              subheader={
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}
                >
                  <Typography
                    variant='caption'
                    color={theme === 'dark' ? 'grey.400' : 'text.secondary'}
                  >
                    Post ID: {post.id}
                  </Typography>
                  <Typography
                    variant='caption'
                    color={theme === 'dark' ? 'grey.400' : 'text.secondary'}
                  >
                    User ID: {post.userId}
                  </Typography>
                  <Tooltip title='Reactions' arrow>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <FavoriteIcon
                        fontSize='small'
                        color={getReactionColor(post.reactions)}
                      />
                      <Typography
                        variant='caption'
                        color={getReactionColor(post.reactions)}
                      >
                        {post.reactions}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
              }
            />

            <CardContent>
              {/* Post Body */}
              <Typography
                variant='body1'
                paragraph
                color={theme === 'dark' ? 'grey.300' : 'text.primary'}
                sx={{
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {post.body}
              </Typography>

              {/* Tags */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TagIcon
                    sx={{
                      fontSize: 20,
                      mr: 1,
                      color: theme === 'dark' ? 'grey.400' : 'grey.600',
                    }}
                  />
                  <Typography
                    variant='subtitle2'
                    color={theme === 'dark' ? 'grey.400' : 'text.secondary'}
                  >
                    Tags
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size='small'
                      variant='outlined'
                      sx={{
                        borderColor: theme === 'dark' ? 'grey.600' : 'grey.300',
                        color: theme === 'dark' ? 'grey.300' : 'grey.700',
                        backgroundColor:
                          theme === 'dark' ? 'grey.700' : 'grey.100',
                        '&:hover': {
                          backgroundColor:
                            theme === 'dark' ? 'grey.600' : 'grey.200',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Comments Section */}
              <Box
                sx={{
                  borderTop: `1px solid ${
                    theme === 'dark' ? 'grey.700' : 'grey.200'
                  }`,
                  pt: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CommentIcon
                    sx={{
                      fontSize: 20,
                      mr: 1,
                      color: theme === 'dark' ? 'grey.400' : 'grey.600',
                    }}
                  />
                  <Typography
                    variant='subtitle2'
                    color={theme === 'dark' ? 'grey.300' : 'text.primary'}
                  >
                    Comments
                  </Typography>
                </Box>
                <CommentsList postId={post.id} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: theme === 'dark' ? 'grey.400' : 'text.secondary',
          }}
        >
          <Typography variant='h5' gutterBottom>
            {word ? 'No matching posts found' : 'No posts available'}
          </Typography>
          <Typography variant='body1'>
            {word
              ? `Try searching with different keywords`
              : 'Posts will appear here once loaded'}
          </Typography>
        </Box>
      )}

      {/* Posts Count */}
      {!loading && posts.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant='body2'
            color={theme === 'dark' ? 'grey.400' : 'text.secondary'}
          >
            Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
            {word && ` matching "${word}"`}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
