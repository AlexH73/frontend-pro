import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";

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
                <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
                <p className="card-text">{body}</p>
              </div>
              <div className="card-footer flex-row justify-content-between">
                <small className="text-muted">Post ID: {postId}</small>
                <small className="text-muted ms-5">ID: {id}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
