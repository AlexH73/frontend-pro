import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SEO from "../../components/SEO/SEO";

export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Photos = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get("albumId");

  useEffect(() => {
    const url = albumId
      ? `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
      : "https://jsonplaceholder.typicode.com/photos";

    axios
      .get<IPhoto[]>(url)
      .then((res) => {
        setPhotos(albumId ? res.data : res.data.slice(0, 100)); // Ограничиваем для всех фото
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      });
  }, [albumId]);

  return (
    <>
      <SEO
        title="Фото - JSONPlaceholder Demo"
        description="Просмотр фотографий с JSONPlaceholder API"
        keywords="JSONPlaceholder, API, демо, React, TypeScript"
      />
      <div className="container mt-4">
        <h1 className="mb-4">
          {albumId ? `Фото альбома #${albumId}` : "Все фото"}
        </h1>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Задача страницы</h5>
            <p className="card-text">
              Отображение фотографий из альбомов. Демонстрация работы с
              медиа-контентом, фильтрацией данных по параметрам URL и
              оптимизацией загрузки изображений.
            </p>
            <h6>Реализация:</h6>
            <ul>
              <li>Работа с параметрами URL через useSearchParams</li>
              <li>Оптимизация загрузки изображений (thumbnail vs full size)</li>
              <li>Адаптивная сетка для медиа-контента</li>
              <li>Ленивая загрузка изображений</li>
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
          {photos.map(({title, thumbnailUrl}) => (
            <div className="col-6 col-md-4 col-lg-3" key={v4()}>
              <div className="card h-100 shadow-sm">
                <img
                  src={thumbnailUrl}
                  className="card-img-top"
                  alt={title}
                  loading="lazy"
                />
                <div className="card-body">
                  <p className="card-text small">{title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Photos;
