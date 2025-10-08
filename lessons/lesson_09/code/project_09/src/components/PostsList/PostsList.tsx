import axios from "axios";
import { useEffect, useState } from "react";
import Posts from "../Post/Post"

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function PostsList() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IPosts[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data)
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Список постов</h2>
      <div className="row g-3">
        {posts
          .filter((_, i) => i < 21)
          .map((e) => (
            <Posts key={e.id} post={e} />
          ))}
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

export default PostsList;
