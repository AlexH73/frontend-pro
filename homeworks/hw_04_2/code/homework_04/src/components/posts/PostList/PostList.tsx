import { type JSX } from 'react'
import { type Post } from '../../../types/post';
import PostCard from '../PostCard/PostCard';

interface PostListProps {
  posts: Post[];
  onPostClick?: (postId: number) => void;
}

export default function PostList({ posts, onPostClick }: PostListProps): JSX.Element {
  if (posts.length === 0) {
    return (
      <div className='text-center py-5'>
        <p className='text-muted'>Нет постов для отображения</p>
      </div>
    );
  }

  return (
    <div className='row'>
      {posts.map((post) => (
        <div key={post.id} className='col-md-6 col-lg-4 mb-4'>
          <PostCard post={post} onClick={onPostClick} />
        </div>
      ))}
    </div>
  );
}