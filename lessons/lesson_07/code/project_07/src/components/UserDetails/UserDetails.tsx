import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IUser } from "../UserList/UserList";
import axios from "axios";

function UserDetails() {
  //Получаем информацию о параметре id из адресной строки
  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IUser>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (!user) {
    return (
      <>
        <div className="container mt-4"> Пользователь не найден</div>
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
      <h2>Профиль пользователя</h2>
      <div className="card mt-3 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">{user.name}</h4>
          <h6 className="card-sub-title mb-2 text-muted">@{user.username}</h6>
          <p className="card-text">
            <strong>Email: </strong>
            {user.email}
          </p>
          <p className="card-text">
            <strong>Phone: </strong>
            {user.phone}
          </p>
          <p className="card-text">
            <strong>Website: </strong>
            <a href={`https://${user.website}`} target="_blank">
              {user.website}
            </a>
          </p>
          <Link to="/users" className="btn btn-secondary btn-sm">Вернуться назад к списку пользователей</Link>
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

export default UserDetails;
