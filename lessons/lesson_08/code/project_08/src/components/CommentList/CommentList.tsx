import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const CommentList = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IComment[]>("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.data)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Список комментариев</h2>
      <div className="row g-3">
        {comments
          .filter((_, i) => i < 50)
          .map((e) => 
            <Comment key={e.id} comment={e} />
          )}
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
};

export default CommentList;
