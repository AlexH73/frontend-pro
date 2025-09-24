import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import UserCard from "../Users/UserCard";

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

const Albums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IAlbum[]>("https://jsonplaceholder.typicode.com/albums")
      .then((res) => {
        setAlbums(res.data);
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
        title="Альбомы - JSONPlaceholder Demo"
        description="Просмотр альбомов с JSONPlaceholder API"
        keywords="JSONPlaceholder, API, демо, React, TypeScript"
      />
      <div className="container mt-4">
        <h1 className="mb-4">Альбомы</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Задача страницы</h5>
            <p className="card-text">
              Отображение списка альбомов пользователей. Демонстрация связей
              между сущностями (пользователь → альбом → фото) и навигации между
              связанными страницами.
            </p>
            <h6>Реализация:</h6>
            <ul>
              <li>Создание интерфейсов для связанных данных</li>
              <li>Реализация навигации между страницами</li>
              <li>Оптимизация загрузки связанных ресурсов</li>
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
          {albums.map(({ userId, id, title }) => (
            <div className="col-12 col-md-6 col-lg-4" key={v4()}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">Альбом пользователя #{userId}</p>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/photos?albumId=${id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Посмотреть фото
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Albums;
