import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import SEO from "../../components/SEO/SEO";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<ITodo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data.slice(0, 50)); // Ограничиваем для производительности
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
        title="Задачи - JSONPlaceholder Demo"
        description="Просмотр задач с JSONPlaceholder API"
        keywords="JSONPlaceholder, API, демо, React, TypeScript"
      />
      <div className="container mt-4">
        <h1 className="mb-4">Задачи</h1>

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Задача страницы</h5>
            <p className="card-text">
              Отображение списка задач пользователей. Демонстрация работы с
              булевыми значениями, фильтрацией данных и интерактивным
              интерфейсом для отметки выполнения задач.
            </p>
            <h6>Реализация:</h6>
            <ul>
              <li>Визуализация статуса задач (выполнено/не выполнено)</li>
              <li>Фильтрация и сортировка данных на клиенте</li>
              <li>Интерактивные элементы интерфейса</li>
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
          {todos.map((todo) => (
            <div className="col-12 col-md-6" key={v4()}>
              <div
                className={`card h-100 shadow-sm ${
                  todo.completed ? "border-success" : "border-warning"
                }`}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <span
                      className={`badge ${
                        todo.completed ? "bg-success" : "bg-warning"
                      } me-2`}
                    >
                      {todo.completed ? "✓" : "…"}
                    </span>
                    <span className="card-text">{todo.title}</span>
                  </div>
                </div>
                <div className="card-footer">
                  <small className="text-muted">User ID: {todo.userId}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todos;
