import { type JSX } from 'react';
import { type Post } from '../../../types/post';

interface PostsStatsProps {
  posts: Post[];
}

export default function PostsStats({ posts }: PostsStatsProps): JSX.Element {
  const totalCharacters = posts.reduce(
    (total, post) => total + post.body.length,
    0
  );
  const averageTitleLength =
    posts.length > 0
      ? Math.round(
          posts.reduce((total, post) => total + post.title.length, 0) /
            posts.length
        )
      : 0;

  return (
    <div className='card bg-light'>
      <div className='card-body'>
        <h6 className='card-title text-center'>Статистика постов</h6>
        <div className='row text-center'>
          <div className='col-4'>
            <div className='h5 mb-1'>{posts.length}</div>
            <small className='text-muted'>Всего постов</small>
          </div>
          <div className='col-4'>
            <div className='h5 mb-1'>{totalCharacters}</div>
            <small className='text-muted'>Всего символов</small>
          </div>
          <div className='col-4'>
            <div className='h5 mb-1'>{averageTitleLength}</div>
            <small className='text-muted'>Ср. длина заголовка</small>
          </div>
        </div>
      </div>
    </div>
  );
}
