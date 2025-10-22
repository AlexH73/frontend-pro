import { useEffect, useState, type JSX } from 'react';
import styles from './ApiExample.module.css';

interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export default function ApiExample(): JSX.Element {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className={`container ${styles.container}`}>
        <div className={styles.loadingSpinner}>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={`container ${styles.container}`}>
        <div className={`alert alert-danger ${styles.errorAlert}`} role='alert'>
          <h4 className='alert-heading'>Ошибка!</h4>
          <p>{error}</p>
          <button
            className='btn btn-outline-danger'
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.container}`}>
      {/* Задание 1: Блок с API данными */}
      <div className={`p-4 mb-4 ${styles.header}`}>
        <h1 className='text-center mb-3'>Задание 1: Работа с API</h1>
        <p className='text-center mb-0'>
          Данные загружены с JSONPlaceholder API с использованием useEffect и
          useState
        </p>
      </div>

      {/* Сетка карточек */}
      <div className='row'>
        {data.map((item) => (
          <div key={item.id} className='col-md-6 col-lg-4 mb-4'>
            <div className={`card h-100 position-relative ${styles.card}`}>
              {/* Бейдж с ID */}
              <div className={styles.postId}>{item.id}</div>

              <div className='card-body'>
                <h5 className={`card-title ${styles.cardTitle}`}>
                  {item.title.length > 50
                    ? `${item.title.substring(0, 50)}...`
                    : item.title}
                </h5>
                <p className={`card-text ${styles.cardBody}`}>
                  {item.body.length > 100
                    ? `${item.body.substring(0, 100)}...`
                    : item.body}
                </p>
              </div>

              <div className='card-footer bg-transparent'>
                <small className='text-muted'>
                  Пользователь ID: {item.userId || 1}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Статистика */}
      <div className='row mt-4'>
        <div className='col-12'>
          <div className='card bg-light'>
            <div className='card-body text-center'>
              <h6 className='card-title'>Статистика</h6>
              <p className='card-text'>
                Загружено <strong>{data.length}</strong> постов
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Задание 2: Теория по хукам */}
      <div className='row mt-5'>
        <div className='col-12'>
          <div className={`p-4 mb-4 ${styles.header}`}>
            <h1 className='text-center mb-3'>Задание 2: React Hooks</h1>
            <p className='text-center mb-0'>
              Основные хуки React, которые нужно знать наизусть для
              собеседований
            </p>
          </div>

          <div className='row'>
            {/* useState */}
            <div className='col-md-6 mb-4'>
              <div className='card h-100 border-primary'>
                <div className='card-header bg-primary text-white'>
                  <h5 className='mb-0'>useState</h5>
                </div>
                <div className='card-body'>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    Для чего нужен:
                  </h6>
                  <p className='card-text'>
                    Управление состоянием функционального компонента
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что принимает:
                  </h6>
                  <p className='card-text'>
                    Начальное значение состояния (может быть функцией)
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что возвращает:
                  </h6>
                  <p className='card-text'>
                    Массив из двух элементов: [текущее значение, функция для
                    обновления]
                  </p>

                  <div className='mt-3'>
                    <pre className='bg-light p-2 rounded'>
                      {`const [state, setState] = useState(initialValue);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* useEffect */}
            <div className='col-md-6 mb-4'>
              <div className='card h-100 border-success'>
                <div className='card-header bg-success text-white'>
                  <h5 className='mb-0'>useEffect</h5>
                </div>
                <div className='card-body'>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    Для чего нужен:
                  </h6>
                  <p className='card-text'>
                    Выполнение побочных эффектов (запросы к API, подписки,
                    ручное изменение DOM)
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что принимает:
                  </h6>
                  <p className='card-text'>
                    Функцию с эффектом и опциональный массив зависимостей
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что возвращает:
                  </h6>
                  <p className='card-text'>
                    Опционально функцию очистки (cleanup)
                  </p>

                  <div className='mt-3'>
                    <pre className='bg-light p-2 rounded'>
                      {`useEffect(() => {
  // эффект
  return () => {
    // cleanup
  };
}, [dependencies]);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* useRef */}
            <div className='col-md-6 mb-4'>
              <div className='card h-100 border-info'>
                <div className='card-header bg-info text-white'>
                  <h5 className='mb-0'>useRef</h5>
                </div>
                <div className='card-body'>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    Для чего нужен:
                  </h6>
                  <p className='card-text'>
                    Создание изменяемой ссылки, которая сохраняется между
                    рендерами
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что принимает:
                  </h6>
                  <p className='card-text'>Начальное значение</p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что возвращает:
                  </h6>
                  <p className='card-text'>Объект ref с свойством .current</p>

                  <div className='mt-3'>
                    <pre className='bg-light p-2 rounded'>
                      {`const ref = useRef(initialValue);
console.log(ref.current);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* useMemo */}
            <div className='col-md-6 mb-4'>
              <div className='card h-100 border-warning'>
                <div className='card-header bg-warning text-dark'>
                  <h5 className='mb-0'>useMemo</h5>
                </div>
                <div className='card-body'>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    Для чего нужен:
                  </h6>
                  <p className='card-text'>
                    Мемоизация вычисляемых значений для оптимизации
                    производительности
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что принимает:
                  </h6>
                  <p className='card-text'>
                    Функцию-вычислитель и массив зависимостей
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что возвращает:
                  </h6>
                  <p className='card-text'>Мемоизированное значение</p>

                  <div className='mt-3'>
                    <pre className='bg-light p-2 rounded'>
                      {`const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* useCallback */}
            <div className='col-md-6 mb-4'>
              <div className='card h-100 border-danger'>
                <div className='card-header bg-danger text-white'>
                  <h5 className='mb-0'>useCallback</h5>
                </div>
                <div className='card-body'>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    Для чего нужен:
                  </h6>
                  <p className='card-text'>
                    Мемоизация функций для предотвращения ненужных ререндеров
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что принимает:
                  </h6>
                  <p className='card-text'>Функцию и массив зависимостей</p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что возвращает:
                  </h6>
                  <p className='card-text'>Мемоизированную версию функции</p>

                  <div className='mt-3'>
                    <pre className='bg-light p-2 rounded'>
                      {`const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]
);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* useContext */}
            <div className='col-md-6 mb-4'>
              <div className='card h-100 border-dark'>
                <div className='card-header bg-dark text-white'>
                  <h5 className='mb-0'>useContext</h5>
                </div>
                <div className='card-body'>
                  <h6 className='card-subtitle mb-2 text-muted'>
                    Для чего нужен:
                  </h6>
                  <p className='card-text'>Подписка на контекст React</p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что принимает:
                  </h6>
                  <p className='card-text'>
                    Объект контекста (созданный через React.createContext)
                  </p>

                  <h6 className='card-subtitle mb-2 text-muted'>
                    Что возвращает:
                  </h6>
                  <p className='card-text'>Текущее значение контекста</p>

                  <div className='mt-3'>
                    <pre className='bg-light p-2 rounded'>
                      {`const value = useContext(MyContext);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Важные правила использования хуков */}
          <div className='row mt-4'>
            <div className='col-12'>
              <div className='card border-secondary'>
                <div className='card-header bg-secondary text-white'>
                  <h5 className='mb-0'>📋 Правила использования хуков</h5>
                </div>
                <div className='card-body'>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                      <strong>Вызывайте хуки только на верхнем уровне</strong> -
                      не в циклах, условиях или вложенных функциях
                    </li>
                    <li className='list-group-item'>
                      <strong>Вызывайте хуки только из React-функций</strong> -
                      функциональных компонентов или кастомных хуков
                    </li>
                    <li className='list-group-item'>
                      <strong>
                        useEffect с пустым массивом зависимостей []
                      </strong>{' '}
                      - выполняется только при монтировании (аналог
                      componentDidMount)
                    </li>
                    <li className='list-group-item'>
                      <strong>useEffect без массива зависимостей</strong> -
                      выполняется при каждом рендере
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
