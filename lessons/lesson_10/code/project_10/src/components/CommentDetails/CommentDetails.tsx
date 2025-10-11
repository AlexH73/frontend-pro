import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IComment } from "../CommentList/CommentList";

function CommentDetails() {
  //Получаем информацию о параметре id из адресной строки
  const { commentId } = useParams<{ commentId: string }>();

  const [comment, setComment] = useState<IComment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IComment>(
        `https://jsonplaceholder.typicode.com/comments/${commentId}`
      )
      .then((res) => res.data)
      .then((data) => {
        setComment(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [commentId]);

  if (!comment) {
    return (
      <>
        <div className="container mt-4">Комментарий не найден</div>
        <div>
          {loading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </div>
        <div>
          {error && (
            <div className="alert alert-danger" role="alert">
              Ошибка при загрузке данных: {error}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Детальная информация о комментарии</h2>
      <div className="card mt-3 shadow-sm">
        <div className="card-header">
          <h5 className="card-title">{comment.name}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-4 text-muted">
            <strong>Пользователь:</strong> {comment.email}
          </h6>
          <p className="card-text">
            <strong>Написал:</strong>
            <br />
            {comment.body}
          </p>
          <Link to="/comments" className="btn btn-secondary btn-sm">
            Вернуться назад к списку комментариев
          </Link>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <small className="text-muted">Comment id: {commentId}</small>
          <small className="text-muted">Post id: {comment.postId}</small>
        </div>
      </div>
      <div>
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div>
        {error && (
          <div className="alert alert-danger" role="alert">
            Ошибка при загрузке данных: {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentDetails;
