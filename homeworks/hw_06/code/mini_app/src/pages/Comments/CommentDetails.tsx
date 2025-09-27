import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaComment,
  FaUser,
  FaEnvelope,
  FaFileAlt,
  FaArrowLeft,
  FaCalendar,
  FaIdBadge,
  FaHome,
  FaExternalLinkAlt,
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
  Badge,
} from "react-bootstrap";
import axios from "axios";
import SEO from "../../components/SEO/SEO";
import GitHubLink from "../../components/GitHubLink/GitHubLink";
import type { IComment } from "../Comments/Comments";
import "./CommentDetails.css";

const CommentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState<IComment | null>(null);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("ID комментария не указан");
      setLoading(false);
      return;
    }

    const fetchComment = async () => {
      try {
        const commentResponse = await axios.get<IComment>(
          `https://jsonplaceholder.typicode.com/comments/${id}`
        );
        setComment(commentResponse.data);

        // Загружаем информацию о посте
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${commentResponse.data.postId}`
        );
        setPost(postResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching comment:", error);
        setError("Комментарий не найден или произошла ошибка загрузки");
        setLoading(false);
      }
    };

    fetchComment();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Загрузка комментария...</p>
        </div>
      </Container>
    );
  }

  if (error || !comment) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>Ошибка</Alert.Heading>
          <p>{error || "Комментарий не найден"}</p>
          <Button
            variant="outline-danger"
            onClick={() => navigate("/comments")}
          >
            Вернуться к списку комментариев
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`Комментарий от ${comment.name}`}
        description={`Комментарий пользователя ${
          comment.name
        }: ${comment.body.substring(0, 150)}...`}
        keywords={`комментарий, ${comment.name}, ${comment.email}, пост ${comment.postId}`}
        author="JSONPlaceholder Demo"
        canonicalUrl={`/comments/${comment.id}`}
      />

      <Container className="mt-4">
        {/* Хлебные крошки */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            <FaHome className="me-1" />
            Главная
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/comments" }}>
            Комментарии
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Комментарий #{comment.id}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Заголовок страницы */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/comments")}
              className="mb-3"
            >
              <FaArrowLeft className="me-2" />
              Назад к списку
            </Button>
            <h1 className="mb-0">Детали комментария</h1>
          </div>
          <GitHubLink filePath="/pages/Comments/CommentDetails.tsx" />
        </div>

        <Row>
          {/* Основная информация о комментарии */}
          <Col lg={8} className="mb-4">
            <Card className="comment-card">
              <Card.Header className="comment-header">
                <div className="d-flex align-items-center">
                  <FaComment className="me-2" />
                  <span>Комментарий #{comment.id}</span>
                  <Badge bg="secondary" className="ms-2">
                    Пост #{comment.postId}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="comment-content">
                  <p className="comment-text" itemProp="text">
                    {comment.body}
                  </p>
                </div>

                <div className="comment-metadata">
                  <div className="metadata-item">
                    <FaCalendar className="me-2 text-muted" />
                    <small className="text-muted">
                      Опубликовано: {new Date().toLocaleDateString("ru-RU")}
                    </small>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Информация о авторе */}
            <Card className="mt-4">
              <Card.Header>
                <FaUser className="me-2" />
                Информация об авторе
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="author-info-item">
                      <FaIdBadge className="me-2 text-primary" />
                      <strong>Имя:</strong> {comment.name}
                    </div>
                    <div className="author-info-item">
                      <FaEnvelope className="me-2 text-primary" />
                      <strong>Email:</strong>
                      <a href={`mailto:${comment.email}`} className="ms-1">
                        {comment.email}
                      </a>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="author-stats">
                      <small className="text-muted">
                        📊 Всего комментариев: <strong>50</strong>
                      </small>
                      <br />
                      <small className="text-muted">
                        👍 Рейтинг: <strong>4.5</strong>
                      </small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Боковая панель с информацией о посте */}
          <Col lg={4}>
            <Card className="post-info-card">
              <Card.Header className="bg-primary text-white">
                <FaFileAlt className="me-2" />
                Информация о посте
              </Card.Header>
              <Card.Body>
                {post ? (
                  <>
                    <h6 className="post-title">{post.title}</h6>
                    <p className="post-excerpt">
                      {post.body.substring(0, 100)}...
                    </p>
                    <div className="post-meta">
                      <small className="text-muted">
                        Автор поста: <strong>User #{post.userId}</strong>
                      </small>
                    </div>
                    <Link
                      to={`/posts/${post.id}`}
                      className="text-decoration-none d-inline-block"
                    >
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mt-2"
                      >
                        <FaExternalLinkAlt className="me-1" />
                        Перейти к посту
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Spinner animation="border" size="sm" />
                )}
              </Card.Body>
            </Card>

            {/* Дополнительная информация */}
            <Card className="mt-4">
              <Card.Header>Дополнительная информация</Card.Header>
              <Card.Body>
                <div className="additional-info">
                  <h6>Статистика комментария</h6>
                  <ul className="list-unstyled small">
                    <li>
                      📏 Длина текста:{" "}
                      <strong>{comment.body.length} символов</strong>
                    </li>
                    <li>
                      🔢 ID комментария: <strong>{comment.id}</strong>
                    </li>
                    <li>
                      📝 ID поста: <strong>{comment.postId}</strong>
                    </li>
                    <li>
                      👤 Автор: <strong>{comment.name}</strong>
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>

            {/* Быстрые действия */}
            <Card className="mt-4">
              <Card.Header>Быстрые действия</Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="outline-success" size="sm">
                    👍 Ответить
                  </Button>
                  <Button variant="outline-info" size="sm">
                    🔄 Цитировать
                  </Button>
                  <Button variant="outline-warning" size="sm">
                    ⭐ В избранное
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    📋 Скопировать текст
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* SEO текст внизу страницы */}
        <Card className="mt-4">
          <Card.Body>
            <h3>Подробная информация о комментарии</h3>
            <p className="text-muted">
              На этой странице представлена полная информация о комментарии
              пользователя <strong>{comment.name}</strong>. Комментарий был
              оставлен к посту <strong>#{comment.postId}</strong> и содержит
              следующий текст: "{comment.body}". Для связи с автором комментария
              можно использовать email: <strong>{comment.email}</strong>.
            </p>
            <p className="text-muted">
              Данные загружены с JSONPlaceholder API - бесплатного фейкового API
              для тестирования и прототипирования. Комментарии являются
              демонстрационными и используются для проверки функциональности
              веб-приложений.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default CommentDetails;
