import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import SEO from "../../components/SEO/SEO";
// import { Helmet } from "react-helmet-async";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IPost[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SEO
        title="Посты - JSONPlaceholder Demo"
        description="Просмотр списка постов с JSONPlaceholder API"
        keywords="JSONPlaceholder, API, демо, React, TypeScript"
      />
      <div className="container mt-4">
        <h1 className="mb-4">Список постов</h1>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Задача страницы</h5>
            <p className="card-text">
              Отображение списка постов, полученных с JSONPlaceholder API.
              Демонстрация работы с GET-запросами и отображением текстового
              контента.
            </p>
            <h6>Реализация:</h6>
            <ul>
              <li>Использование Axios для получения данных</li>
              <li>Обработка состояний загрузки и ошибок</li>
              <li>Типизация интерфейсов TypeScript</li>
              <li>SEO-оптимизация с помощью React Helmet</li>
            </ul>
          </div>
        </div>

        {loading && (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            Ошибка при загрузке данных: {error}
          </div>
        )}

        <div className="row g-3">
          {posts.map(({ userId, id, title, body }) => (
            <div className="col-12 col-md-6 col-lg-4" key={v4()}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{body}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">User ID: {userId}</small>
                  <small className="text-muted ms-5">ID: {id}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Posts;
