import { useEffect, useState } from "react";
import { v4 } from "uuid";
import axios from "axios";
import GitHubLink from "../../components/GitHubLink/GitHubLink";
import { FaUsers, FaInfoCircle, FaUserCheck } from "react-icons/fa";
import UserCard from "./UserCard";
import SEO from "../../components/SEO/SEO";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";

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
        description="Просмотр списка пользователей с JSONPlaceholder API. Полная информация о каждом пользователе: контакты, адрес, компания."
        keywords="пользователи, контакты, адрес, компания, JSONPlaceholder, API"
      />

      <Container className="mt-4">
        {/* Заголовок страницы с иконкой и статистикой */}
        <div className="d-flex align-items-center mb-4">
          <div className="icon-container bg-primary rounded-circle p-3 me-3">
            <FaUsers size={32} className="text-white" />
          </div>
          <div>
            <h1 className="mb-1">Список пользователей</h1>
            <p className="text-muted mb-0">
              Всего пользователей: <Badge bg="primary">{users.length}</Badge>
            </p>
          </div>
        </div>

        {/* Карточка с описанием страницы */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Header className="bg-light border-0">
            <div className="d-flex align-items-center">
              <FaInfoCircle className="text-primary me-2" />
              <h5 className="mb-0">Информация о странице</h5>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={8}>
                <p className="card-text">
                  На этой странице отображается полная контактная информация
                  всех пользователей системы. Вы можете просмотреть основные
                  данные, контакты и перейти к детальному просмотру профиля
                  каждого пользователя.
                </p>
                <div className="feature-list">
                  <h6>Особенности:</h6>
                  <ul className="list-unstyled">
                    <li>
                      <FaUserCheck className="text-success me-2" />
                      Полная контактная информация
                    </li>
                    <li>
                      <FaUserCheck className="text-success me-2" />
                      Данные о компании и адресе
                    </li>
                    <li>
                      <FaUserCheck className="text-success me-2" />
                      Быстрый переход к детальному профилю
                    </li>
                    <li>
                      <FaUserCheck className="text-success me-2" />
                      Адаптивный дизайн для всех устройств
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={4} className="text-end">
                <GitHubLink
                  filePath="/pages/Users/Users.tsx"
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Состояние загрузки */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Загружаем данные о пользователях...</p>
          </div>
        )}

        {/* Состояние ошибки */}
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Ошибка загрузки данных</Alert.Heading>
            <p className="mb-0">{error}</p>
          </Alert>
        )}

        {/* Сетка пользователей */}
        {!loading && !error && (
          <section aria-labelledby="users-grid-title">
            <h2 id="users-grid-title" className="visually-hidden">
              Карточки пользователей
            </h2>
            <Row className="g-4">
              {users.map((user) => (
                <UserCard key={v4()} user={user} />
              ))}
            </Row>
          </section>
        )}

        {/* SEO блок */}
        {!loading && !error && (
          <Card className="mt-5">
            <Card.Body className="text-center">
              <h3>JSONPlaceholder Users API</h3>
              <p className="text-muted mb-0">
                Данные о пользователях загружаются с официального
                JSONPlaceholder API. Это демонстрационные данные для
                тестирования и разработки веб-приложений.
              </p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default Users;
