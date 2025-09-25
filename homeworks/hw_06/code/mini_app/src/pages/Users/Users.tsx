import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import GitHubLink from "../../components/GitHubLink/GitHubLink";
import { FaUsers } from "react-icons/fa";
import UserCard from "./UserCard";
import SEO from "../../components/SEO/SEO";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
}

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.data)
      .then((data) => {
        setUsers(data);
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
        title="Пользователи - JSONPlaceholder Demo"
        description="Просмотр списка пользователей с JSONPlaceholder API"
        keywords="JSONPlaceholder, API, демо, React, TypeScript"
      />
      <div className="container mt-4">
        <div className="d-flex align-items-center mb-4">
          <FaUsers size={32} className="text-primary me-3" />
          <h1 className="mb-0">Список пользователей</h1>
        </div>

        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h5 className="card-title">Задача страницы</h5>
                <p className="card-text">
                  Отображение карточек пользователей с основной контактной
                  информацией. Демонстрация работы с компонентным подходом и
                  передачей данных через props.
                </p>
                <h6>Реализация:</h6>
                <ul>
                  <li>Создание переиспользуемого компонента UserCard</li>
                  <li>Типизация props с TypeScript</li>
                  <li>Обработка состояний загрузки и ошибок</li>
                  <li>Адаптивная верстка с Bootstrap Grid</li>
                </ul>
              </div>
              <GitHubLink filePath="/pages/Users/Users.tsx" />
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading-spinner">
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

        <div className="row g-4">
          {users.map((user) => (
            <UserCard key={v4()} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
