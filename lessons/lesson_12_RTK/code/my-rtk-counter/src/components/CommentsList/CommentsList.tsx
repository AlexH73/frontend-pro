import { useEffect, useState, type JSX } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { Box, Typography, Avatar, Card, CardContent } from '@mui/material';
import type Comment from './types/Comment';

// Temporary mock data - replace with real API calls
const mockComments = [
  { id: 1, user: 'John Doe', text: 'Great post! Thanks for sharing.' },
  { id: 2, user: 'Jane Smith', text: 'Very insightful content.' },
];

export default function CommentsList(props: { postId: number }): JSX.Element {
  const theme = useSelector(selectTheme);
  const { postId } = props;
  const [, setComments] = useState<Comment[]>([]);

  async function loadComments(): Promise<void> {
    const res = await fetch(`https://dummyjson.com/comments/post/${postId}`);
    const obj: { comments: Comment[] } = await res.json();
    setComments(obj.comments);
  }
  useEffect(() => {
    loadComments();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      {mockComments.map((comment) => (
        <Card
          key={comment.id}
          variant='outlined'
          sx={{
            mb: 1,
            backgroundColor: theme === 'dark' ? 'grey.800' : 'grey.50',
            borderColor: theme === 'dark' ? 'grey.700' : 'grey.200',
          }}
        >
          <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  bgcolor: theme === 'dark' ? 'primary.dark' : 'primary.main',
                }}
              >
                {comment.user.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant='subtitle2'
                  className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {comment.user}
                </Typography>
                                    {/* <ul style={{ listStyleType: 'none' }}>
                                      {comments.map((comment) => (
                                        <li key={comment.id}>
                                          <b>{comment.user.username}</b> {comment.body}
                                        </li>
                                      ))}
                                    </ul> */}
                <Typography
                  variant='body2'
                  className={`transition-colors duration-300 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {comment.text}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
