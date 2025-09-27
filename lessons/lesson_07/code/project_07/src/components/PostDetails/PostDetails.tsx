import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IPosts } from "../PostsList/PostsList";
import axios from "axios";

function PostDetails() {
  //Получаем информацию о параметре id из адресной строки
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<IPosts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IPosts>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (!post) {
    return (
      <>
        <div className="container mt-4"> Пост не найден</div>
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
      <h2>Детали поста</h2>
      <div className="card mt-3 shadow-sm">
        <div className="card-header">
          <h5 className="card-title">{post.title}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">
            <strong>Текст:</strong>
            <br />
            {post.body}
          </p>
          <Link to="/posts" className="btn btn-secondary btn-sm">
            Вернуться назад к списку постов
          </Link>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <small className="text-muted">User id: {post.userId}</small>
          <small className="text-muted">Post id: {post.id}</small>
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

export default PostDetails;
