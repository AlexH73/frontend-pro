import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaMapMarkerAlt,
  FaBuilding,
  FaIdCard,
  FaArrowLeft,
  FaStreetView,
  FaCity,
  FaMapPin,
  FaBriefcase,
  FaLink,
  FaHome,
} from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Breadcrumb,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import SEO from "../../components/SEO/SEO";
import GitHubLink from "../../components/GitHubLink/GitHubLink";
import type { IUser } from "../Users/Users";
import "./UserDetails.css";

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("ID пользователя не указан");
      setLoading(false);
      return;
    }

    axios
      .get<IUser>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError("Пользователь не найден или произошла ошибка загрузки");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Загрузка информации о пользователе...</p>
        </div>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Ошибка</Alert.Heading>
          <p>{error || "Пользователь не найден"}</p>
          <Button variant="outline-danger" onClick={() => navigate("/users")}>
            Вернуться к списку пользователей
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`${user.name} - Профиль пользователя`}
        description={`Подробная информация о пользователе ${user.name}. Контакты: ${user.email}, ${user.phone}. Адрес: ${user.address.city}, ${user.address.street}. Работа: ${user.company.name}.`}
        keywords={`${user.name}, ${user.username}, профиль, контакты, ${user.company.name}, ${user.address.city}`}
        author="JSONPlaceholder Demo"
        canonicalUrl={`/users/${user.id}`}
      />

      <Container className="mt-4">
        {/* Хлебные крошки */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            <FaHome className="me-1" />
            Главная
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/users" }}>
            Пользователи
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{user.name}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Заголовок страницы */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/users")}
              className="mb-3"
            >
              <FaArrowLeft className="me-2" />
              Назад к списку
            </Button>
            <h1 className="mb-0">Профиль пользователя</h1>
          </div>
          <GitHubLink
            filePath="/pages/Users/UserDetails.tsx"
          />
        </div>

        <Row>
          {/* Основная информация */}
          <Col lg={4} className="mb-4">
            <Card className="user-profile-card h-100">
              <Card.Body className="text-center">
                <div className="user-avatar-large mb-3">
                  <FaUser size={48} />
                </div>
                <h2 className="h4 mb-2" itemProp="name">
                  {user.name}
                </h2>
                <p className="text-muted mb-3">
                  <FaIdCard className="me-2" />
                  <span itemProp="alternateName">@{user.username}</span>
                </p>
                <div className="badge bg-primary fs-6">ID: {user.id}</div>

                <hr />

                <div className="contact-info">
                  <h5 className="mb-3">Контактная информация</h5>
                  <div className="contact-item">
                    <FaEnvelope className="me-2 text-primary" />
                    <a href={`mailto:${user.email}`} itemProp="email">
                      {user.email}
                    </a>
                  </div>
                  <div className="contact-item">
                    <FaPhone className="me-2 text-primary" />
                    <a
                      href={`tel:${user.phone.replace(/[^\d+]/g, "")}`}
                      itemProp="telephone"
                    >
                      {user.phone}
                    </a>
                  </div>
                  <div className="contact-item">
                    <FaGlobe className="me-2 text-primary" />
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="url"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Детальная информация */}
          <Col lg={8}>
            <Row>
              {/* Адрес */}
              <Col md={6} className="mb-4">
                <Card className="h-100">
                  <Card.Header className="bg-primary text-white">
                    <FaMapMarkerAlt className="me-2" />
                    Адрес
                  </Card.Header>
                  <Card.Body
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                  >
                    <div className="address-item">
                      <FaStreetView className="me-2 text-muted" />
                      <span itemProp="streetAddress">
                        {user.address.street}, {user.address.suite}
                      </span>
                    </div>
                    <div className="address-item">
                      <FaCity className="me-2 text-muted" />
                      <span itemProp="addressLocality">
                        {user.address.city}
                      </span>
                    </div>
                    <div className="address-item">
                      <FaMapPin className="me-2 text-muted" />
                      <span itemProp="postalCode">{user.address.zipcode}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Компания */}
              <Col md={6} className="mb-4">
                <Card className="h-100">
                  <Card.Header className="bg-success text-white">
                    <FaBuilding className="me-2" />
                    Компания
                  </Card.Header>
                  <Card.Body
                    itemProp="worksFor"
                    itemScope
                    itemType="https://schema.org/Organization"
                  >
                    <div className="company-info">
                      <FaBriefcase className="me-2 text-muted" />
                      <span itemProp="name" className="fw-bold">
                        {user.company.name}
                      </span>
                    </div>
                    <p className="text-muted mt-2 small">
                      Информация о должности и сфере деятельности компании может
                      быть добавлена здесь.
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Дополнительная информация */}
              <Col md={6} className="mb-4">
                <Card className="h-100">
                  <Card.Header className="bg-info text-white">
                    <FaLink className="me-2" />
                    Дополнительно
                  </Card.Header>
                  <Card.Body>
                    <h6>Статистика профиля</h6>
                    <ul className="list-unstyled">
                      <li>
                        🖊️ Постов: <strong>10</strong>
                      </li>
                      <li>
                        📸 Альбомов: <strong>10</strong>
                      </li>
                      <li>
                        ✅ Задач: <strong>20</strong>
                      </li>
                      <li>
                        💬 Комментариев: <strong>50</strong>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>

              {/* Быстрые действия */}
              <Col md={6} className="mb-4">
                <Card className="h-100">
                  <Card.Header className="bg-warning text-dark">
                    Быстрые действия
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Button variant="outline-primary" size="sm">
                        📧 Написать сообщение
                      </Button>
                      <Button variant="outline-success" size="sm">
                        📞 Позвонить
                      </Button>
                      <Button variant="outline-info" size="sm">
                        🌐 Посетить сайт
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        📋 Скопировать контакты
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* SEO текст */}
        <Card className="mt-4">
          <Card.Body>
            <h3>Подробная информация о пользователе {user.name}</h3>
            <p className="text-muted">
              На этой странице представлена полная контактная информация
              пользователя <strong>{user.name}</strong>
              (никнейм: @{user.username}). Пользователь работает в компании{" "}
              <strong>{user.company.name}</strong>и проживает в городе{" "}
              <strong>{user.address.city}</strong> по адресу:{" "}
              {user.address.street}, {user.address.suite}. Для связи доступны
              email: <strong>{user.email}</strong> и телефон:{" "}
              <strong>{user.phone}</strong>.
            </p>
            <p className="text-muted">
              Данные загружены с JSONPlaceholder API - бесплатного фейкового API
              для тестирования и прототипирования.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserDetails;
