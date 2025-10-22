import { type JSX } from 'react';
import { type Post } from '../../../types/post';
import styles from '../../ApiExample/ApiExample.module.css';

interface PostCardProps {
  post: Post;
  onClick?: (postId: number) => void;
}

export default function PostCard({
  post,
  onClick,
}: PostCardProps): JSX.Element {
  const handleClick = () => {
    if (onClick) {
      onClick(post.id);
    }
  };

  return (
    <div
      className={`card h-100 position-relative ${styles.card}`}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }
      }}
      onClick={handleClick}
    >
      <div
        className={`position-absolute top-0 start-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center ${styles.postId}`}
      >
        {post.id}
      </div>

      <div className='card-body'>
        <h5 className={`card-title ${styles.cardTitle}`}>
          {post.title.length > 50
            ? `${post.title.substring(0, 50)}...`
            : post.title}
        </h5>
        <p className={`card-text ${styles.cardBody}`}>
          {post.body.length > 100
            ? `${post.body.substring(0, 100)}...`
            : post.body}
        </p>
      </div>

      <div className='card-footer bg-transparent'>
        <small className='text-muted'>
          Пользователь ID: {post.userId || 1}
        </small>
      </div>
    </div>
  );
}
