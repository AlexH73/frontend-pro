import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import SEO from "../../components/SEO/SEO";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comments = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IComment[]>("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        setComments(res.data.slice(0, 50)); // Ограничиваем для производительности
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
        title="Комментарии - JSONPlaceholder Demo"
        description="Просмотр комментариев с JSONPlaceholder API"
        keywords="JSONPlaceholder, API, демо, React, TypeScript"
      />
      <div className="container mt-4">
        <h1 className="mb-4">Комментарии</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Задача страницы</h5>
            <p className="card-text">
              Отображение комментариев к постам. Демонстрация работы с большими
              массивами данных и их эффективного отображения с
              пагинацией/ограничением.
            </p>
            <h6>Реализация:</h6>
            <ul>
              <li>Ограничение вывода данных для оптимизации</li>
              <li>Структурированное отображение вложенного контента</li>
              <li>Работа с email и текстовыми данными</li>
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
          {comments.map(({ postId, id, name, email, body }) => (
            <div className="col-12 col-md-6" key={v4()}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {email}
                  </h6>
                  <p className="card-text">
                    {body.substring(0, 100)}...
                  </p>

                  {/* Добавляем ссылку на детальную страницу */}
                  <div className="mt-3">
                    <Link
                      to={`/comments/${id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <FaComment className="me-1" />
                      Читать полностью
                    </Link>
                  </div>
                </div>
                <div className="card-footer">
                  <small className="text-muted">
                    Post ID: {postId}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
