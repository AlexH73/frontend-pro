import { useEffect, useState, type JSX } from 'react';
import type { Post } from '../../types/post';
import { useIpInfo } from '../../hooks/useIpInfo';
import styles from './ApiExample.module.css';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';
import PostList from '../posts/PostList/PostList';
import PostsStats from '../posts/PostsStats/PostsStats';
import HooksList from '../hooks-docs/HooksList/HooksList';
import HookRules from '../hooks-docs/HookRules/HookRules';
import IpInfo from '../IpInfo/IpInfo';

export default function ApiExample(): JSX.Element {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { geoData, loading: ipLoading, error: ipError } = useIpInfo();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=6'
        );
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        const result = await response.json();

        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Произошла неизвестная ошибка');
          }
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePostClick = (postId: number) => {
    console.log(`Клик по посту ${postId}`);
    alert(`Вы кликнули на пост с ID: ${postId}`);
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    window.location.reload();
  };

  if (loading) return <LoadingSpinner message='Загружаем посты...' />;
  if (error) return <ErrorAlert error={error} onRetry={handleRetry} />;

  return (
    <div className={`container ${styles.container}`}>
      {/* Задание 1: Блок с API данными */}
      <section className='mb-5'>
        <div className={`p-4 mb-4 ${styles.header}`}>
          <h1 className='text-center mb-3'>Задание 1: Работа с API</h1>
          <p className='text-center mb-0'>
            Данные загружены с JSONPlaceholder API с использованием useEffect и
            useState
          </p>
        </div>
        {/* Сетка карточек */}
        <PostList posts={data} onPostClick={handlePostClick} />

        {/* Статистика */}
        <div className='row mt-4'>
          <div className='col-12 col-md-8 mx-auto'>
            <PostsStats posts={data} />
          </div>
        </div>
      </section>

      {/* Блок с IP информацией */}
      <section className='mb-5 '>
        <div className={`p-4 mb-4 ${styles.sectionHeader}`}>
          <h1 className='text-center mb-3'>🌐 Информация о вашем IP</h1>
          <p className='text-center mb-0'>
            Данные получены с ipify.org и ipinfo.io
          </p>
        </div>

        <div className='row'>
          <div className='col-12 col-lg-8 mx-auto'>
            <IpInfo geoData={geoData} loading={ipLoading} error={ipError} />
          </div>
        </div>
      </section>

      {/* Задание 2: Теория по хукам */}
      <section>
        <div className='row mt-5'>
          <div className='col-12'>
            <div className={`p-4 mb-4 ${styles.header}`}>
              <h1 className='text-center mb-3'>Задание 2: React Hooks</h1>
              <p className='text-center mb-0'>
                Основные хуки React, которые нужно знать наизусть для
                собеседований
              </p>
            </div>

            <HooksList />

            <div className='row mt-4'>
              <div className='col-12'>
                <HookRules />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
